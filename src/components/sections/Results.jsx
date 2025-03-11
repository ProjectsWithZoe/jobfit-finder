import React from "react";
import { FeatureCard } from "@/components/ui/FeatureCard";
import {
  BarChart,
  Percent,
  Search,
  Users,
  CheckCircle,
  XCircle,
  BookOpen,
  Lightbulb,
} from "lucide-react";

export function ResultsPremium({
  matchedJobs = [],
  unmatchedJobs = [],
  jobRecommendations = [],
}) {
  const features = [
    {
      icon: CheckCircle,
      title: "Matched Skills",
      skills: true,
      description:
        "Skills from your CV that match the job description requirements.",
      data: matchedJobs,
      color: "text-green-500",
      textColor: "green",
    },
    {
      icon: XCircle,
      title: "Missing Skills",
      skills: true,
      description: "Skills required by the job that weren't found in your CV.",
      data: unmatchedJobs,
      color: "text-red-500",
      textColor: "red",
    },
    {
      icon: Lightbulb,
      title: "Job Recommendations",
      skills: false,
      description: "Suggested job roles based on your current skill set.",
      data: jobRecommendations,
      color: "text-blue-500",
      textColor: "blue",
    },
  ];

  // Helper function to render the item based on its type
  const renderItem = (item) => {
    if (typeof item === "string") {
      return item;
    } else if (typeof item === "object") {
      // Handling objects with skill and matchedSkill keys
      if (item.skill) {
        return item.skill;
      } else if (item.matchedSkill) {
        return item.matchedSkill;
      } else {
        // Fallback for other object structures
        return JSON.stringify(item);
      }
    }
    return String(item);
  };

  return (
    <section id="results" className="py-24 px-6 bg-accent/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Results</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Review your skill matches, missing qualifications, and personalized
            job recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-slide-up border border-black-50 shadow-lg rounded-lg bg-gray-50 p-4"
              style={{
                animationDelay: `${index * 0.1}s`,
                borderTopColor: feature.color.replace("text-", ""),
              }}
            >
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <div className={`text-xl text-${feature.textColor}-500`}>
                    {feature.title}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {feature.description}
                </p>
              </div>
              <div>
                {feature.data.length > 0 ? (
                  feature.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {feature.data.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-row items-center gap-2 bg-purple-100 p-2"
                        >
                          <span className="text-sm">{renderItem(item)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {feature.data.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex flex-row items-center gap-2"
                        >
                          <span className="text-sm bg-purple-100 p-2 rounded">
                            {renderItem(item)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                    No data available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResultsPro({
  matchedJobs = [],
  unmatchedJobs = [],
  jobRecommendations = [],
  learningResources = [],
}) {
  const features = [
    {
      icon: CheckCircle,
      title: "Matched Skills",
      skills: true,
      description:
        "Skills from your CV that match the job description requirements.",
      data: matchedJobs,
      color: "text-green-500",
      textColor: "green",
    },
    {
      icon: XCircle,
      title: "Missing Skills",
      skills: true,
      description: "Skills required by the job that weren't found in your CV.",
      data: unmatchedJobs,
      color: "text-red-500",
      textColor: "red",
    },
    {
      icon: Lightbulb,
      title: "Job Recommendations",
      skills: false,
      description: "Suggested job roles based on your current skill set.",
      data: jobRecommendations,
      color: "text-blue-500",
      textColor: "blue",
    },
    {
      icon: BookOpen,
      title: "Resources",
      skills: false,
      learningResources: true,
      description: "Suggested learning resources based on missing skills.",
      data: learningResources,
      color: "text-yellow-500",
      textColor: "yellow",
    },
  ];

  // Helper function to render the item based on its type
  const renderItem = (item) => {
    if (typeof item === "string") {
      return item;
    } else if (typeof item === "object") {
      // Handling objects with skill and matchedSkill keys
      if (item.skill) {
        return item.skill;
      } else if (item.matchedSkill) {
        return item.matchedSkill;
      } else {
        // Fallback for other object structures
        return JSON.stringify(item);
      }
    }
    return String(item);
  };

  return (
    <section id="results" className="py-24 px-6 bg-accent/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Results</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Review your skill matches, missing qualifications, and personalized
            job recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-slide-up border border-black-50 shadow-lg rounded-lg bg-gray-50 p-4"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="pb-2">
                <div className="flex items-center gap-2">
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  <div
                    className={`text-xl text-${feature.textColor}-500 rounded-full border border-${feature.textColor}-500`}
                  >
                    {feature.title}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {feature.description}
                </p>
              </div>
              <div>
                {feature.data.length > 0 ? (
                  feature.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {feature.data.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-row items-center gap-2 bg-purple-100 rounded-full p-2"
                        >
                          <span className="text-sm">{renderItem(item)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {feature.learningResources
                        ? feature.data.map((item, idx) => {
                            const [key, value] = Object.entries(item)[0]; // Extract key-value pair
                            return (
                              <li
                                key={idx}
                                className="flex flex-row items-center gap-2 text-sm"
                              >
                                {key} -
                                <a
                                  href={value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 underline text-sm"
                                >
                                  Link to {key} training
                                </a>
                              </li>
                            );
                          })
                        : feature.data.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex flex-row items-center gap-2"
                            >
                              <span className="text-sm bg-purple-100 p-2 rounded-full">
                                {renderItem(item)}
                              </span>
                            </li>
                          ))}
                    </ul>
                  )
                ) : (
                  <div className="flex items-center justify-center h-24 text-muted-foreground text-sm">
                    No data available
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
