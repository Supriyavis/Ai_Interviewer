import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getQuestion = async (req, res) => {
  try {
    const domain = req.query.domain || "Frontend Developer";

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      `Ask one interview question for ${domain}`
    );

    const text = result.response.text();

    res.json({ question: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ question: "Error generating question" });
  }
};