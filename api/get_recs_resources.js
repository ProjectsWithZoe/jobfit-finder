import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cvSkills, unmatchedJobs } = req.body;
    const prompt = `Based on the CV skills provided, recommend 10 job descriptions that match the candidate's skills. cvSKills : ${cvSkills}. Give 5 websites/resources to learn the unmatched skills. unmatchedSkills : ${unmatchedJobs}.

Respond with only this JSON format:
{
  "jobRecommendations": ["job1", "job2"],
    "learningResources": ["resource1", "resource2"]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      temperature: 0,
    });
    const parsedResponse = JSON.parse(response.choices[0].message.content);
    const jobRecs = parsedResponse["jobRecommendations"];
    const learningResources = parsedResponse["learningResources"];
    res.status(200).json({ jobRecs, learningResources });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
