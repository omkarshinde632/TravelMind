const hotels = require("../data/hotels.json");

function buildTrip(intent) {
  return hotels.filter(hotel => {
    if (intent.tripType === "general") return true;
    return hotel.tags.includes(intent.tripType);
  });
}

module.exports = { buildTrip };
