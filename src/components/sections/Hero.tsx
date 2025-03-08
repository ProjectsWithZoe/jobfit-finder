import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { PercentageDisplay } from "@/components/ui/PercentageDisplay";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import { Results } from "@/components/sections/Results";

export function Hero() {
  const [isTextareaActive, setIsTextareaActive] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [cv, setCv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [matchPercentage, setMatchPercentage] = useState(0);
  const [jobDescriptionSkills, setJobDescriptionSkills] = useState([]);
  const [cvSkills, setCvSkills] = useState([]);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [unmatchedJobs, setUnmatchedJobs] = useState([]);
  const [fiveJobRecommendations, setFiveJobRecommendations] = useState([]);
  const [tenJobRecommendations, setTenJobRecommendations] = useState([]);
  const [learningResources, setLearningResources] = useState([]);

  const analyzeJobDesc = async () => {
    try {
      const response = await fetch("/api/extract_job_skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription }),
      });

      const data = await response.json();
      console.log("Raw data:", data);

      const jobSkillsArray = data.jobSkills
        ? data.jobSkills.map((skill) => skill.trim().toLowerCase())
        : [];
      setJobDescriptionSkills(jobSkillsArray);
      console.log("Processed job skills:", jobSkillsArray);
    } catch (error) {
      console.error("Detailed error:", error);
      console.error("Error message:", error.message);
      setError("An error occurred. Please try again.");
    }
  };

  const analyzeUserCv = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/extract_cv_skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cv }),
      });
      const data = await response.json();
      console.log("Raw data:", data);
      const cvSkillsArray = data.cvSkills
        ? data.cvSkills.map((skill) => skill.trim().toLowerCase())
        : [];
      setCvSkills(cvSkillsArray);
      console.log("Processed cv skills:", cvSkillsArray);

      if (cvSkillsArray.length > 0) {
        get_5_recs(cvSkillsArray);
      }
    } catch (error) {
      console.error("Detailed error:", error);
      console.error("Error message:", error.message);
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  const getMatch = async () => {
    if (!jobDescriptionSkills.length || !cvSkills.length) {
      setError("Please ensure both job description and CV have been analyzed.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/get_matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescriptionSkills,
          cvSkills,
        }),
      });

      const data = await response.json();
      const matchedSkills = data.matchedSkills || [];
      const unmatchedSkills = data.unmatchedSkills || [];
      const matchPercentage = data.matchPercentage || 0;

      setMatchPercentage(matchPercentage);
      setMatchedJobs(matchedSkills);
      setUnmatchedJobs(unmatchedSkills);

      // Now that we have match data, get resources immediately
      if (cvSkills.length > 0) {
        // Pass the unmatched skills we just received
        get_recs_resources(cvSkills, unmatchedSkills);
      }
    } catch (error) {
      console.error("Error getting matches:", error);
      setError(
        "An error occurred while calculating the match. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const get_5_recs = async (cvSkills) => {
    setLoading(true);

    if (!cvSkills) return;
    try {
      const response = await fetch("/api/get_5_recs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvSkills: cvSkills,
        }),
      });

      const data = await response.json();

      console.log("Data", data);
      setFiveJobRecommendations(data);
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  const get_recs_resources = async (cvSkills, unmatchedSkills) => {
    if (!cvSkills || !unmatchedSkills) return;
    setLoading(true);
    try {
      console.log("Sending to API - cvSkills:", cvSkills);
      console.log("Sending to API - unmatchedJobs:", unmatchedJobs);
      const response = await fetch("/api/get_recs_resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvSkills: cvSkills,
          unmatchedJobs: unmatchedSkills,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    console.log(jobDescriptionSkills);
    analyzeJobDesc();
    return () => {
      setMatchPercentage(0);
    };
  }, [jobDescription]);

  useEffect(() => {
    console.log(cvSkills);
    analyzeUserCv();

    return () => {
      setMatchPercentage(0);
    };
  }, [cv]);

  useEffect(() => {
    console.log("Updated Job Skills:", jobDescriptionSkills);
  }, [jobDescriptionSkills]); // Runs whenever jobDescriptionSkills changes

  useEffect(() => {
    console.log("Updated CV Skills:", cvSkills);
  }, [cvSkills]); // Runs whenever cvSkills changes

  useEffect(() => {
    console.log("Missing CV Skills:", unmatchedJobs);
  }, [unmatchedJobs]); // Runs whenever cvSkills changes

  /*const analyzeGetPercentage = async (jobDescription, cv) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/get-percentage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobDescription, cv }),
      });
      const data = await response.json();
      setMatchPercentage(data["matchPercentage"]);
      console.log(data["matchPercentage"]);
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (jobDescription && cv) {
      analyzeGetPercentage(jobDescription, cv);
    }
  }, [jobDescription, cv]);*/

  return (
    <>
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-radial from-primary/20 to-transparent opacity-60 blur-3xl pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in">
                <span className="text-sm font-medium text-primary">
                  AI-Powered Job Matching
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                Match Your{" "}
                <AnimatedText text="CV" type="gradient" className="font-bold" />{" "}
                with
                <br className="hidden md:block" /> Job Descriptions In{" "}
                <AnimatedText
                  text="Seconds"
                  type="gradient"
                  className="font-bold"
                />
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in">
                Instantly analyze your resume against job postings and discover
                your match percentage. Get personalized job recommendations
                based on your skills.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center lg:justify-start animate-fade-in">
                <a className="flex" href="#jobDesc">
                  <Button size="lg" className="w-full px-12">
                    Try It Free
                  </Button>
                </a>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg animate-fade-in">
              <div className="flex flex-col glass-card p-8 rounded-2xl relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <label
                        id="jobDesc"
                        className=" text-sm font-medium block"
                      >
                        Job Description
                      </label>
                      <textarea
                        className="min-h-[120px] min-w-[250px] rounded-lg text-sm border transition-all border-primary ring-2 ring-primary/10 glass-input"
                        placeholder="Job Description here..."
                        onChange={(e) =>
                          setJobDescription(e.target.value.toLowerCase().trim())
                        }
                        value={jobDescription}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium block">
                        Your CV
                      </label>
                      <textarea
                        className="min-h-[120px] min-w-[250px] rounded-lg text-sm border transition-all border-primary ring-2 ring-primary/10 glass-input"
                        placeholder="CV here..."
                        onChange={(e) =>
                          setCv(e.target.value.toLowerCase().trim())
                        }
                        value={cv}
                      />
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center justify-center">
                    <PercentageDisplay matchPercentage={matchPercentage} />
                  </div>
                </div>
                <Button
                  size="xxl"
                  className="flex-col px-16 mt-4 bg-gradient-to-r to-blue-500 from-purple-700 text-3xl"
                  onClick={getMatch}
                >
                  MatchMe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Add the Results component with data */}
      {(matchedJobs.length > 0 || unmatchedJobs.length > 0) && (
        <Results
          matchedJobs={matchedJobs}
          unmatchedJobs={unmatchedJobs}
          jobRecommendations={fiveJobRecommendations}
        />
      )}
    </>
  );
}
