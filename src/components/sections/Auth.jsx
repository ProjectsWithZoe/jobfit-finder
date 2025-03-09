import { useEffect, useState } from "react";
import { auth, db } from "../firebaseAuth"; // Ensure correct import
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Auth = ({ onAuthSuccess }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        checkUserSubscription(user.email);
      } else {
        setIsAuthenticated(false);
        onAuthSuccess(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const checkUserSubscription = (email) => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));

    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.exists() && doc.data().subscription) {
          onAuthSuccess(true);
          console.log(doc.data().subscription);
        }
      });
    });

    return unsubscribeFirestore; // Ensure proper cleanup
  };

  return null; // No UI needed, only logic
};

export default Auth;
