function detectIntent(query) {
  query = query.toLowerCase();

  const intent = {
    tripType: query.includes("beach")
      ? "beach"
      : query.includes("mountain")
      ? "mountain"
      : "general",

    duration: query.includes("5") ? 5 : query.includes("3") ? 3 : 4,

    budget:
      query.includes("cheap") || query.includes("budget")
        ? "low"
        : query.includes("luxury")
        ? "high"
        : "medium"
  };

  intent.keywords = [
    intent.tripType !== "general" ? intent.tripType : null,
    intent.budget !== "medium" ? intent.budget : null,
    `${intent.duration} days`
  ].filter(Boolean);

  return intent;
}

module.exports = { detectIntent };
