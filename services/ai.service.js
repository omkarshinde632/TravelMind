const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askTravelAI(userQuery) {
  console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
You are an expert AI travel agent.

From the user query below, extract structured travel intent.

User query:
"${userQuery}"

Return ONLY a JSON object.
NO markdown.
NO explanation.
NO extra text.

Required format:
{
  "tripType": "",
  "duration": "",
  "budget": "",
  "from": "",
  "keywords": []
}
`;

  const result = await model.generateContent(prompt);
  let text = result.response.text();

  // 🔍 LOG RAW OUTPUT (TEMPORARY – VERY IMPORTANT)
  console.log("RAW GEMINI OUTPUT:\n", text);

  // 🧼 Clean common Gemini formatting
  text = text.replace(/```json/gi, "")
             .replace(/```/g, "")
             .trim();

  // 🧠 Extract JSON using regex (KEY FIX)
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    console.error("No JSON object found in Gemini response");
    throw new Error("Invalid Gemini response");
  }

  let intent;
  try {
    intent = JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error("JSON parse failed:", jsonMatch[0]);
    throw err;
  }

  return intent;
}

module.exports = { askTravelAI };