import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cvSkills, unmatchedJobs } = req.body;
    const prompt = `Analyze the given CV skills and identify 10 job roles that closely align with the candidate's skill set. Ensure the job recommendations are relevant to the industry and expertise level.  
cvSkills: ${cvSkills}  

Provide 5 high-quality websites or resources where the candidate can learn these unmatched skills.  
unmatchedSkills: ${unmatchedSkills}  

Format the response strictly as JSON:  
{
  "jobRecommendations": ["Job Title 1", "Job Title 2", ..., "Job Title 10"],
  "learningResources": ["Resource URL 1", "Resource URL 2", ..., "Resource URL 5"]
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
