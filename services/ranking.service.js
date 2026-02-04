function rankTrips(trips, intent) {
  return trips
    .map(trip => {
      let score = trip.stars * 20;

      if (intent.budget === "low" && trip.price < 4500) score += 20;
      if (intent.budget === "high" && trip.price > 5500) score += 20;

      if (trip.tags.includes(intent.tripType)) score += 30;

      score = Math.min(score, 100);

      return {
        ...trip,
        matchScore: score
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

module.exports = { rankTrips };
