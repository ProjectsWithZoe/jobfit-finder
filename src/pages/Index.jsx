import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { CallToAction } from "@/components/sections/CallToAction";
import { Footer } from "@/components/sections/Footer";
import { RewardTracker } from "@/components/ui/RewardTracker";
import { toast } from "sonner";
import { Pricing } from "@/components/sections/Pricing";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseAuth";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        setIsAuthenticated(true);
        setUserEmail(user.email);
        checkUserSubscription(user.email);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkUserSubscription = (email) => {
    console.log(email);
    const userRef = collection(db, "users");
    console.log(userRef);
    const q = query(userRef, where("email", "==", email));
    console.log(q);

    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.exists() && doc.data().subscription) {
          console.log(doc.data().subscription);
          setSubscription(doc.data().subscription);
        }
      });
    });

    return unsubscribeFirestore; // Ensure proper cleanup
  };

  useEffect(() => {
    // Welcome toast for new visitors
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => {
        toast("Welcome to our CV matching platform!", {
          description: "Track your progress in our new rewards system!",
          duration: 5000,
        });
        localStorage.setItem("hasVisited", "true");
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Navbar isAuthenticated={isAuthenticated} userEmail={userEmail} />
      <main>
        <Hero />
        <Features />
        <Pricing isAuthenticated={isAuthenticated} userEmail={userEmail} />
        <HowItWorks />

        {/* Rewards section */}
        <section className="py-12 bg-gradient-to-br from-white to-purple-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Track Your Progress</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                For every 5 CVs with over 50% match you analyze, you'll earn
                rewards. Unlock badges and special treats as you progress!
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <RewardTracker className="shadow-lg" />
            </div>
          </div>
        </section>

        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
