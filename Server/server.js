const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// routes

require("./app/routes/auth.routes")(app);
require("./app/routes/sacco.routes")(app);
require("./app/routes/officials.routes")(app);
require("./app/routes/stations.routes")(app);
require("./app/routes/charge.routes")(app);
require("./app/routes/vehicles.routes")(app);
require("./app/routes/operator.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


