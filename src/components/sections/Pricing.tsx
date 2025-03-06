import React from "react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { BarChart, Percent, Search, Users } from "lucide-react";
import { Button } from "../ui/button";

export function Pricing() {
  const features = [
    {
      icon: Percent,
      title: "FREE",
      description: [
        "Analyze up to 10 CVs per month",
        "Basic skill matching",
        "Support via email",
      ],

      buttonText: "Try for free",
      onButtonClick: () => {
        alert("Free clicked!");
      },
    },
    {
      icon: Search,
      title: "PREMIUM",
      description: [
        "Analyze unlimited CVs per month",
        "Get a list of matched skills",
        "Priority support",
      ],
      buttonText: "Get Premium",
      onButtonClick: () => {
        alert("Premium clicked!");
      },
    },
    {
      icon: BarChart,
      title: "PRO",
      description: [
        "Discover required skills for specific roles",
        "Detailed analytics on job fit",
        "AI-driven career guidance",
      ],
      buttonText: "Get Pro",
      onButtonClick: () => {
        alert("Pro clicked!");
      },
    },
  ];

  return (
    <section id="pricing" className="py-4 px-6 bg-accent/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our pricing plans are designed to help you find the right job and
            grow your career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                className="bg-purple-100 justify-center items-center flex flex-col h-full text-lg"
                buttonText={feature.buttonText}
                onButtonClick={feature.onButtonClick}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
