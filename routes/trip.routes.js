const express = require("express");
const router = express.Router();

const hotels = require("../data/hotels.json");

// Individual trip page
router.get("/:id", (req, res) => {
  const tripId = parseInt(req.params.id, 10); // 🔥 FIX HERE

  const trip = hotels.find(h => h.id === tripId);

  if (!trip) {
    return res.status(404).send("Trip not found");
  }

  res.render("trip", { trip });
});

router.post("/save/:id", (req, res) => {
  if (!req.session.savedTrips) {
    req.session.savedTrips = [];
  }

  const trip = hotels.find(h => h.id === Number(req.params.id));
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  if (!req.session.savedTrips.find(t => t.id === trip.id)) {
    req.session.savedTrips.push(trip);
  }

  res.json({ success: true });
});


module.exports = router;
