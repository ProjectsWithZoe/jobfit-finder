import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export function Navbar({ isAuthenticated, userEmail }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    /*const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set logged-in user
    });*/

    return () => {
      window.removeEventListener("scroll", handleScroll);
      //unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login"); // Redirect to login after sign-out
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            <span className="text-primary">Match</span>Me
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Testimonials
          </a>
          {/* Account Button */}
          <div className="relative">
            {isAuthenticated ? (
              // If logged in, show dropdown
              <>
                <button
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Account
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-75 bg-white border border-purple-500 rounded-lg shadow-lg">
                    <div className="px-4 py-2 text-sm text-gray-900">
                      {userEmail}
                    </div>
                    <button className="flex w-full px-4 py-2 text-sm text-purple-500 hover:bg-purple-100">
                      My Subscription
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              // If not logged in, redirect to login
              <Link
                to="/login"
                className="text-sm font-medium hover:text-primary"
              >
                Account
              </Link>
            )}
          </div>

          <Button size="sm">Try Now</Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <i className="fa-solid fa-x h-20 w-20"></i>
            ) : (
              <i className="fa-solid fa-bars h-20 w-20"></i>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg shadow-lg p-4 flex flex-col space-y-4 animate-slide-in">
          <a
            href="#features"
            className="text-sm font-medium px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </a>
          {/*fix mobile nav*/}
          <a
            href="#account"
            className="text-sm font-medium px-4 py-2 hover:bg-primary/10 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Account
          </a>
          <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
            Try Now
          </Button>
        </div>
      )}
    </nav>
  );
}
