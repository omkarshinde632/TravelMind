const express = require("express");
const router = express.Router();

// 🔥 AI services
const { askTravelAI } = require("../services/ai.service");
const { getGeminiInsight } = require("../services/geminiInsight.service");
const { generateAIInsight } = require("../services/aiInsight.service");
const { fallbackIntent } = require("../services/fallbackIntent.service");
const { normalizeIntent } = require("../services/intentNormalizer.service");

// Core logic services
const { buildTrip } = require("../services/tripBuilder.service");
const { rankTrips } = require("../services/ranking.service");
const {
  explainTrip,
  calculateDecisionFatigue,
  buildTradeOffs
} = require("../services/explain.service");

// 🏠 Home
router.get("/", (req, res) => {
  res.render("index");
});

// 🔍 SEARCH (POST + refine + memory-safe)
router.all("/search", async (req, res) => {
  try {
    const query =
      (req.method === "POST" ? req.body.query : req.query.q) || "";

    // 🚫 Empty query → go home
    if (!query.trim()) {
      return res.redirect("/");
    }

    let rawIntent;

    // 🧠 1️⃣ Extract intent (AI → fallback)
    try {
      rawIntent = await askTravelAI(query);
    } catch (err) {
      console.log("Gemini intent failed, using fallback");
      rawIntent = fallbackIntent(query);
    }

    // 🧠 2️⃣ Normalize intent (CRITICAL FIX)
    const intent = normalizeIntent(rawIntent, req.session.lastIntent);

    // Always safe for EJS
    intent.keywords = intent.keywords || [];

    // 💾 Save intent for refinement
    req.session.lastIntent = intent;

    // 🧱 3️⃣ Build trips
    const trips = buildTrip(intent);

    // 🏆 4️⃣ Rank trips
    const rankedTrips = rankTrips(trips, intent);

    // 🧠 5️⃣ Decision fatigue
    const fatigue = calculateDecisionFatigue(rankedTrips);

    // 🎯 6️⃣ Reduce overload + trade-offs
    const finalTrips = rankedTrips.slice(0, 3).map(trip => ({
      ...trip,
      tradeOffs: buildTradeOffs(trip)
    }));

    // 🧾 7️⃣ Explain trips
    explainTrip(finalTrips, intent);

    // 🤖 8️⃣ AI Insight (Gemini → safe fallback)
    let aiInsight;
    try {
      aiInsight = await getGeminiInsight(intent, finalTrips);
    } catch {
      aiInsight = generateAIInsight(intent, finalTrips, fatigue);
    }

    // 🖼 9️⃣ Render results
    return res.render("results", {
      intent,
      trips: finalTrips,
      fatigue,
      aiInsight
    });

  } catch (error) {
    console.error("AI Search Error:", error);

    return res.render("results", {
      intent: {
        tripType: "unknown",
        duration: "-",
        budget: "-",
        from: "-"
      },
      trips: [],
      fatigue: {
        level: "Unknown",
        message: "AI service temporarily unavailable"
      },
      aiInsight:
        "We’re experiencing temporary AI issues. Please try again shortly."
    });
  }
});

module.exports = router;
