import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post("/api/get-matches", async (req, res) => {
  try {
    const { jobDescriptionSkills, cvSkills } = req.body;

    const prompt = `Compare the following CV skills and job description skills strictly using a keyword-matching method. 
Count how many skills from the CV appear in the job description and calculate the exact match percentage using this formula:

matchPercentage = (number of matched skills / total job description skills) * 100

Only consider exact keyword matches (case-insensitive). Include synonyms and similar concepts.

CV skills:
${cvSkills}

Job Description skills:
${jobDescriptionSkills}

Respond with only this JSON format:
{
  "matchPercentage": 80
  "matchedSkills": ["skill1", "skill2"],
  "unmatchedSkills": ["skill3", "skill4"]
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

    console.log(parsedResponse);
    res.json(parsedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
