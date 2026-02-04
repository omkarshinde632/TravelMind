const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");

app.use(
  session({
    secret: "travelmind-secret",
    resave: false,
    saveUninitialized: true
  })
);

app.use(expressLayouts);
app.set("layout", "layout");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const savedRoutes = require("./routes/saved.routes");
const searchRoutes = require("./routes/search.routes");
const tripRoutes = require("./routes/trip.routes");
const PORT = process.env.PORT || 3000;

app.use("/", searchRoutes);


app.listen(PORT, () => {
  console.log(`TravelMind running on http://localhost:${PORT}`);
});

app.use("/trip", tripRoutes);

app.use("/saved", savedRoutes);

const compareRoutes = require("./routes/compare.routes");
app.use("/compare", compareRoutes);


