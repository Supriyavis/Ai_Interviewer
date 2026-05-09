// import fetch from "node-fetch";

// // ✅ GET QUESTION

// export const getQuestion = async (req, res) => {
//   try {
//     const domain = req.query.domain || "general";

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `Generate one interview question for ${domain}`,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log("Gemini response:", data);

//     const question =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     if (!question) {
//       return res.status(500).json({
//         error: "No question generated",
//         raw: data,
//       });
//     }

//     res.json({ question });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error generating question" });
//   }
// };



// // ✅ EVALUATE ANSWER (ADD THIS 👇)
// export const evaluateAnswer = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: `
// Evaluate this answer.

// Question: ${question}
// Answer: ${answer}

// Give response in JSON:
// {
//   "score": number (0-100),
//   "clarity": number (0-10),
//   "technical": number (0-10),
//   "communication": number (0-10),
//   "feedback": "short feedback"
// }
//                   `,
//                 },
//               ],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     const text =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     let result;

//     try {
//       result = JSON.parse(text);
//     } catch {
//       result = {
//         score: 50,
//         clarity: 5,
//         technical: 5,
//         communication: 5,
//         feedback: text || "Could not parse response",
//       };
//     }

//     res.json(result);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Evaluation failed" });
//   }
// };
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ GET QUESTION
export const getQuestion = async (req, res) => {
  const domain = req.query.domain || "general";
  const qNum = req.query.qNum || 1;
  try {
    
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing in environment variables!");
      return res.status(500).json({ error: "GEMINI_API_KEY is missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.9, // Increase randomness so it doesn't give the same question
      }
    });

    const result = await model.generateContent(
      `Generate exactly ONE short, single-sentence interview question for a ${domain} role. This is question #${qNum} of the interview. Make it a unique, random, and challenging question, completely different from standard introductory questions. Do NOT include any explanations, formatting, or extra text.`
    );

    const response = await result.response;
    const text = response.text();

    if (!text) {
      return res.status(500).json({ error: "No question generated" });
    }

    res.json({ question: text });

  } catch (error) {
    console.error("Error in getQuestion details:", error);
    if (error.response) console.error("API Response Error:", error.response);
    
    // 🚀 FALLBACK: If rate limited, give a random fake question so the app doesn't break
    if (error.message?.includes("429") || error.status === 429) {
      const mockQuestions = [
        `(Mock) Can you explain a challenging problem you solved in ${domain} and how you approached it?`,
        `(Mock) What are the most important principles to follow when working on ${domain}?`,
        `(Mock) How do you stay updated with the latest trends and tools in ${domain}?`,
        `(Mock) Describe a time you had to optimize performance for a ${domain} project.`,
        `(Mock) If you had to teach a beginner about ${domain}, what concept would you start with?`
      ];
      const randomMock = mockQuestions[Math.floor(Math.random() * mockQuestions.length)];
      return res.json({ question: randomMock });
    }
    
    let errorMsg = "Error generating question";
    if (error.message?.includes("404")) {
      errorMsg = "AI Model not found or deprecated. Try gemini-2.0-flash or gemini-2.5-flash.";
    } else if (error.message?.includes("API key")) {
      errorMsg = "Invalid API Key. Please check your .env file.";
    }
    res.status(500).json({ error: errorMsg, details: error.message });
  }
};


// ✅ EVALUATE ANSWER
export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing in environment variables!");
      return res.status(500).json({ error: "GEMINI_API_KEY is missing" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const prompt = `
Evaluate the candidate's answer for an interview.

Question: ${question}
Answer: ${answer}

Return JSON strictly in this format:
{
  "score": number (0-100),
  "improvement_areas": "A short 3-5 word summary of what to improve (e.g., 'Technical depth', 'Missing core concepts', 'Better structure')",
  "feedback": "Provide exactly 5 short bullet points. 
  - If the answer is correct and high quality, provide tips to reach an expert level. 
  - If the answer is partially correct, identify what is missing or incorrect. 
  - If the answer is completely wrong or unrelated, explain WHY it is wrong and what key concepts were expected, but do NOT simply provide a 'copy-paste' correct answer.
  - Keep the tone professional and constructive."
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let parsed;

    try {
      // Remove any markdown block syntax if present (e.g., ```json ... ```)
      const cleanText = text.replace(/```(json)?/gi, "").trim();
      parsed = JSON.parse(cleanText);
    } catch {
      parsed = {
        score: 50,
        improvement_areas: "Unable to parse AI feedback",
        feedback: text,
      };
    }

    res.json(parsed);

  } catch (error) {
    console.error("Error in evaluateAnswer details:", error);
    if (error.response) console.error("API Response Error:", error.response);

    // 🚀 FALLBACK: If rate limited, give a fake evaluation so the app doesn't break
    if (error.message?.includes("429") || error.status === 429) {
      return res.json({
        score: 75,
        improvement_areas: "Add more specific examples",
        feedback: "• (Mock Result due to Google Rate Limit)\n• You explained the basics well.\n• Try to dive deeper into technical details.\n• Structure your answer more clearly.\n• Always mention the business impact of your work."
      });
    }

    let errorMsg = "Evaluation failed";
    if (error.message?.includes("404")) {
      errorMsg = "AI Model not found or deprecated.";
    }
    res.status(500).json({ error: errorMsg, details: error.message });
  }
};