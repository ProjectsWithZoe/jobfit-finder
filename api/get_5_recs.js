import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cvSkills } = req.body;
    const prompt = `You are an expert career advisor. Based on the CV skills provided, recommend 5 job roles that are the best fit for the candidate.

### Input:
- CV Skills: ${cvSkills} (These are technical and soft skills extracted from the candidate's resume)

### Output Format (JSON Only):
{
  "jobRecommendations": [
    "Job Title 1",
    "Job Title 2",
    "Job Title 3",
    "Job Title 4",
    "Job Title 5"
  ]
}

### Requirements:
- Only include job roles that strongly match the given skills.
- Ensure the job titles are precise and commonly used in the industry.
- Do NOT include explanations, only return the JSON object.`;

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
    const parsedResponse = response.choices[0].message.content;
    const jobRecs = parsedResponse["jobRecommendations"];
    res.status(200).json({ jobRecs });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
