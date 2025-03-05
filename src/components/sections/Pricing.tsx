import React from "react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { BarChart, Percent, Search, Users } from "lucide-react";

export function Pricing() {
  const features = [
    {
      icon: Percent,
      title: "Match Analysis",
      description:
        "Get detailed percentage match between your CV and job descriptions with key skills highlighted.",
    },
    {
      icon: Search,
      title: "AI-Powered Scanning",
      description:
        "Our algorithm identifies skills, experiences, and qualifications that matter most to employers.",
    },
    {
      icon: BarChart,
      title: "Skill Gap Analysis",
      description:
        "Discover which skills you need to acquire to improve your chances for specific roles.",
    },
    {
      icon: Users,
      title: "Job Recommendations",
      description:
        "Receive personalized job suggestions based on your existing skills and experience.",
    },
  ];

  return (
    <section id="features" className="py-24 px-6 bg-accent/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our platform helps you understand exactly how well your profile
            matches with job requirements and suggests opportunities that align
            with your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard
                icon={feature.icon}
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
