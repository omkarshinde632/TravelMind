function normalizeIntent(newIntent, oldIntent = {}) {
  return {
    tripType: newIntent.tripType || oldIntent.tripType || "general",
    duration: newIntent.duration || oldIntent.duration || "3",
    budget: newIntent.budget || oldIntent.budget || "medium",
    from: newIntent.from || oldIntent.from || "India",
    keywords: [
      ...(oldIntent.keywords || []),
      ...(newIntent.keywords || [])
    ]
  };
}

module.exports = { normalizeIntent };
