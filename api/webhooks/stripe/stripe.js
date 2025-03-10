import Stripe from "stripe";
import express from "express";
import dotenv from "dotenv";
import getRawBody from "raw-body"; // 🔥 Fix: Ensures raw request body for Stripe
import { db } from "../../../src/pages/firebaseAuth.js"; // ✅ Ensure this exists

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// 🔥 Fix: Express should use `express.raw()` for Stripe Webhooks
app.post(
  "/api/webhooks/stripe/stripe_route",
  express.raw({ type: "application/json" }), // 👈 Important!
  async (req, res) => {
    const signature = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
      console.log("✅ Webhook event successfully verified:", event.type);
    } catch (error) {
      console.error("❌ Webhook signature verification failed:", error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // 🔹 Handle Stripe Events
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          event.data.object.id
        );
        const userEmail = session.customer_details.email;
        console.log("✅ Payment completed for:", userEmail);

        try {
          const q = db.collection("users").where("userId", "==", userEmail);
          const querySnapshot = await q.get();

          if (querySnapshot.empty) {
            console.log("❌ No matching user found");
            return res.status(404).send("User not found");
          }

          querySnapshot.forEach(async (doc) => {
            const plan = session.amount_total === 1999 ? "premium" : "pro";
            await doc.ref.set({ subscription: plan }, { merge: true });
            console.log("✅ Updated access for:", userEmail);
          });

          return res.status(200).send("User access updated");
        } catch (error) {
          console.error("❌ Error updating Firestore:", error);
          return res.status(500).send("Internal error");
        }

      case "payment_intent.succeeded":
        console.log("✅ Payment intent succeeded:", event.data.object.amount);
        break;

      default:
        console.log("⚠️ Unhandled event type:", event.type);
    }

    res.status(200).send("Event received");
  }
);

// 🔥 Fix: Use express.json() for all other routes
app.use(express.json());

app.listen(4242, () => console.log("🚀 Webhook server running on port 4242"));
