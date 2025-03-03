import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post("/api/analyze-job-description", async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const prompt = `Extract key skills, technologies, and required qualifications from the following job description:
        ${jobDescription}
        
        Format the response as a JSON object like this:
        {
          "skills": ["Python", "JavaScript", "React"],
          "technologies": ["AWS", "Docker"],
          "qualifications": ["Bachelor's Degree", "5+ years experience"]
        }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const parsedResponse = response.choices[0].message.content;
    const finalData = parsedResponse.split("\n");
    console.log(finalData);
    res.json(finalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/analyze-user-cv", async (req, res) => {
  try {
    const { cv } = req.body;

    const prompt = `Extract key skills, technologies, and required qualifications from the following userCV:
        ${cv}
        
        Format the response as a JSON object like this:
        {
          "skills": ["Python", "JavaScript", "React"],
          "technologies": ["AWS", "Docker"],
          "qualifications": ["Bachelor's Degree", "5+ years experience"]
        }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    const parsedResponse = response.choices[0].message.content;
    const finalData = parsedResponse.split("\n");
    console.log(finalData);
    res.json(finalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/get-percentage", async (req, res) => {
  try {
    const { jobDescription, cv } = req.body;

    const prompt = `Compare the following CV and job description strictly using a keyword-matching method. Assign a percentage based on keyword overlap, focusing on technical skills, qualifications, and job requirements.

CV:
${cv}

Job Description:
${jobDescription}

Respond with only this JSON format:
{
  "matchPercentage": 80
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

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
