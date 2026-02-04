const express = require("express");
const router = express.Router();
const hotels = require("../data/hotels.json");

// Add trip to saved list
router.post("/add/:id", (req, res) => {
  const tripId = Number(req.params.id);

  if (!req.session.savedTrips) {
    req.session.savedTrips = [];
  }

  if (!req.session.savedTrips.includes(tripId)) {
    req.session.savedTrips.push(tripId);
  }

  res.redirect("/saved");
});

// Saved trips page
router.get("/", (req, res) => {
  const savedIds = req.session.savedTrips || [];
  const savedTrips = hotels.filter(h => savedIds.includes(h.id));

  res.render("saved", { trips: savedTrips });
});

module.exports = router;
