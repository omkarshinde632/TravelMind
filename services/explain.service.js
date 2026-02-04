function generateAIInsight(intent) {
  let insights = [];

  if (intent.tripType !== "general") {
    insights.push(`your preference for a ${intent.tripType} trip`);
  }

  if (intent.budget === "low") {
    insights.push("budget-friendly options");
  } else if (intent.budget === "high") {
    insights.push("premium stays");
  }

  insights.push(`${intent.duration}-day duration`);

  return `Based on ${insights.join(
    ", "
  )}, TravelMind prioritized trips that balance price, ratings, and experience relevance.`;
}

function explainTrip(trips, intent) {
  const aiInsight = generateAIInsight(intent);

  return trips.map((trip, index) => ({
    ...trip,
    explanation:
      index === 0
        ? "Best overall match considering your preferences"
        : "Strong alternative matching your intent",
    aiInsight
  }));
}
function calculateDecisionFatigue(results) {
  const count = results.length;

  if (count <= 3) return { level: "Low", message: "Easy decision, limited options" };
  if (count <= 6) return { level: "Medium", message: "Some comparison required" };
  return { level: "High", message: "Too many options, narrowing recommended" };
}

function buildTradeOffs(trip) {
  return {
    cost: trip.price < 4000 ? "Low" : trip.price < 8000 ? "Medium" : "High",
    comfort: trip.rating >= 4.5 ? "High" : trip.rating >= 3.5 ? "Medium" : "Low",
    durationFit: "Good"
  };
}

module.exports = { explainTrip, calculateDecisionFatigue, buildTradeOffs };

