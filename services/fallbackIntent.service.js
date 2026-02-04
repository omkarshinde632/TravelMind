function fallbackIntent(query) {
  return {
    tripType: "general",
    duration: "3–5",
    budget: "medium",
    from: "India",
    keywords: query.split(" ").slice(0, 5)
  };
}

module.exports = { fallbackIntent };
