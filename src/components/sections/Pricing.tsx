import React, { useEffect } from "react";

import { BarChart, Percent, Search, Users, Crown, Check } from "lucide-react";
import { Button } from "../ui/button";
import { FeatureCard } from "../ui/FeatureCard";
import { useNavigate } from "react-router-dom";
import { auth } from "../../pages/firebaseAuth";

export function Pricing({ isAuthenticated, userEmail }) {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      title: "FREE",
      price: "$0",
      description: [
        "Analyze up to 10 CVs per month",
        "Basic skill matching",
        "Support via email",
      ],

      buttonText: "Try for free",
      paymentLink: "",
    },
    {
      title: "PREMIUM",
      price: "$19.99",
      description: [
        "Analyze unlimited CVs per month",
        "Get a list of matched skills",
        "Priority support",
      ],
      buttonText: "Get Premium",
      isPopular: true,
      paymentLink: "https://buy.stripe.com/14kaI96FI3HD3F67ss",
    },
    {
      title: "PRO",
      price: "$24.99",
      description: [
        "Discover required skills for specific roles",
        "Detailed analytics on job fit",
        "AI-driven career guidance",
      ],
      buttonText: "Get Pro",
      paymentLink: "https://buy.stripe.com/fZe9E52ps6TPfnO6op",
    },
  ];

  return (
    <section id="pricing" className="py-4 px-6 bg-accent/50 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our pricing plans are designed to help you find the right job and
            grow your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-pricing">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg h-full flex flex-col bg-background">
                {/* Purple Header with Title and Price */}
                <div className="bg-primary text-white p-6 text-center relative">
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
                      <Crown size={14} className="mr-1" />
                      MOST POPULAR
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <div className="text-3xl font-bold">{plan.price}</div>
                  {plan.title == "FREE" ? (
                    <div className="text-sm opacity-80 mt-1">always</div>
                  ) : (
                    <div className="text-sm opacity-80 mt-1">one-time fee</div>
                  )}
                </div>

                {/* Features List */}
                <div className="p-6 flex-grow">
                  <ul className="space-y-4">
                    {plan.description.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check
                          size={18}
                          className="text-purple-500 mr-2 mt-1 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <div className="p-6 pt-0 mt-auto">
                  <a
                    target="_blank"
                    href={plan.paymentLink + "?prefilled_email=" + userEmail}
                  >
                    <Button
                      onClick={() => {
                        
  fbq('track', 'InitiateCheckout');

                        console.log(userEmail);
                      }}
                      className={`w-full py-5 text-lg font-medium ${
                        plan.isPopular
                          ? "bg-purple-800 hover:bg-purple-400"
                          : ""
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
/*<FeatureCard
  className="bg-purple-100 justify-center items-center flex flex-col h-full text-lg"
  buttonText={pricing.buttonText}
  onButtonClick={pricing.onButtonClick}
  title={pricing.title}
  description={pricing.description}
  buttonClassName="flex flex-col w-full"
/>;*/
