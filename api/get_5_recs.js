import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cvSkills } = req.body;
    const prompt = `Based on the CV skills provided, recommend 5 job descriptions that match the candidate's skills. cvSKills : ${cvSkills}

Respond with only this JSON format:
{
  "jobRecommendations": ["job1", "job2"]
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
    res.status(200).json({ parsedResponse });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
