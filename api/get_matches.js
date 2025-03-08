import Fuse from "fuse.js";

const fuzzMatchSkills = (jobSkills, cvSkills, threshold = 0.3) => {
  const fuse = new Fuse(cvSkills, {
    threshold: threshold,
    includeScore: true,
  });
  const matchedSkills = [];
  const unmatchedSkills = [];

  jobSkills.forEach((skill) => {
    const result = fuse.search(skill);
    if (result.length > 0 && result[0].score <= threshold) {
      matchedSkills.push({ skill, matchedSkill: result[0].item });
    } else {
      unmatchedSkills.push(skill);
    }
  });
  return {
    matchedSkills,
    unmatchedSkills,
    matchPercentage: Math.round(
      (matchedSkills.length / jobSkills.length) * 100
    ),
  };
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { jobDescriptionSkills, cvSkills } = req.body;
    console.log(req.body);
    const { matchedSkills, unmatchedSkills, matchPercentage } = fuzzMatchSkills(
      jobDescriptionSkills,
      cvSkills
    );
    res.status(200).json({ matchedSkills, unmatchedSkills, matchPercentage });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
