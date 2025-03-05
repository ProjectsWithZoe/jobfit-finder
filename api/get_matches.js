const Fuse = require("fuse.js");

const fuzzMatchSkills = (jobSkills, cvSkills, threshold = 0.3) => {
  const fuse = new Fuse(jobSkills, {
    threshold: threshold,
    includeScore: true,
  });
  const matchedSkills = [];
  const unmatchedSkills = [];

  cvSkills.forEach((skill) => {
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
    matchPercentage: (matchedSkills.length / jobSkills.length) * 100,
  };
};

module.exports = (req, res) => {
  if (req.method === "POST") {
    const { jobDescriptionSkills, cvSkills } = req.body;
    const { matchedSkills, unmatchedSkills, matchPercentage } = fuzzMatchSkills(
      jobDescriptionSkills,
      cvSkills
    );
    res.status(200).json({ matchedSkills, unmatchedSkills, matchPercentage });
  }
};
