import Stripe from "stripe";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { buffer } from "micro";

admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  ),
});

dotenv.config();

const db = admin.firestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  let event;

  const buf = await buffer(req);
  const signature = req.headers["stripe-signature"];

  try {
    event = stripe.webhooks.constructEvent(buf, signature, endpointSecret);
    console.log("Webhook event successfully verified");
  } catch (error) {
    console.error("Webhook signature verification failed", error.message);
    return res.status(400).send("Webhook error", error.message);
  }

  console.log("✅ Success:", event.id);

  switch (event.type) {
    case "checkout.session.completed":
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id
      );
      const userEmail = session.customer_details.email;
      console.log("Payment completed for: " + userEmail);

      try {
        const q = db.collection("users").where("email", "==", userEmail);
        const querySnapshot = await q.get();

        if (querySnapshot.empty) {
          console.log("No matching user found");
          return res.status(404).send("User not found");
        }

        querySnapshot.forEach(async (doc) => {
          const plan = session.amount_total == 1999 ? "premium" : "pro";
          console.log(plan);
          console.log(session.amount_total);
          if (session.amount_total > 1998) {
            await doc.ref.set({ subscription: plan }, { merge: true });
            console.log("Updated access for: " + userEmail + "to " + plan);
          }
        });
        return res.status(200).send("User access updated");
      } catch (error) {
        console.error("Error updating Firestore");
        return res.status(500).send("Internal error");
      }
      break;

    case "payment_intent.succeeded":
      console.log("Payment intent succeeded for: " + event.data.object.amount);
      break;

    default:
      console.log("Unhandled event: " + event.type);
      break;
  }
  res.status(200).send("Event received");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
