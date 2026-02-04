const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getGeminiInsight(intent, trips) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are a travel assistant.

User intent:
- Trip Type: ${intent.tripType}
- Duration: ${intent.duration} days
- Budget: ${intent.budget}
- From: ${intent.from}

Top recommendation:
- ${trips[0].name}
- Price: ₹${trips[0].price}
- Rating: ${trips[0].stars}

Explain in 2 short sentences why these trips were selected.
Keep it clear, professional, and helpful.
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

module.exports = { getGeminiInsight };
