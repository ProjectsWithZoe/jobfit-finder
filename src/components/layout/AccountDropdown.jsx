import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AccountDropdown = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update state when auth state changes
      set();
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="relative">
      {user ? (
        // User is logged in, show dropdown
        <div>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            Account
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <div className="px-4 py-2 text-sm text-gray-900">
                {user.email}
              </div>
              <div className="px-4 py-2 text-sm text-gray-600">
                Subscription: Free
              </div>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        // User is not logged in, show login button
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default AccountDropdown;
