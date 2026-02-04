const express = require("express");
const router = express.Router();

const hotels = require("../data/hotels.json");

router.get("/", (req, res) => {
  const ids = req.query.ids?.split(",").map(Number);

  if (!ids || ids.length !== 2) {
    return res.redirect("/");
  }

  const trips = hotels.filter(h => ids.includes(h.id));

  if (trips.length !== 2) {
    return res.redirect("/");
  }

  // ---- AI SUMMARY LOGIC ----
  let aiSummary = "";

  if (trips[0].price < trips[1].price) {
    aiSummary = `${trips[0].name} is more budget-friendly, while ${trips[1].name} offers a more premium experience.`;
  } else {
    aiSummary = `${trips[1].name} is more affordable, while ${trips[0].name} focuses on luxury and comfort.`;
  }

  aiSummary += ` ${
    trips[0].rating > trips[1].rating
      ? `${trips[0].name} has slightly better guest satisfaction.`
      : `${trips[1].name} is rated higher by travelers.`
  }`;

  res.render("compare", {
    trips,
    aiSummary
  });
});

module.exports = router;
