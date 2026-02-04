function generateAIInsight(intent, trips, fatigue) {
  const templates = [
    `To match your ${intent.tripType} trip preference, we prioritized trips that fit your ${intent.duration}-day plan within your ${intent.budget} budget.`,
    `Trips were ranked to balance cost, comfort, and duration while reducing unnecessary options.`,
    `We shortlisted high-value options to help you decide faster without decision fatigue.`
  ];

  const fatigueLine =
    fatigue.level === "High"
      ? "Choices were intentionally limited to reduce overload."
      : "You still have flexibility to explore alternatives.";

  const randomTemplate =
    templates[Math.floor(Math.random() * templates.length)];

  return `${randomTemplate} ${fatigueLine}`;
}

module.exports = { generateAIInsight };
