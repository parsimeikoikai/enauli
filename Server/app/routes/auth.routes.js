const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
 
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUser
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/reset",
    [authJwt.verifyToken],
    controller.reset);

    app.post("/api/auth/changePin",
    [authJwt.verifyToken],
    controller.changePin);

  app.post("/api/auth/signout", controller.signout);
};

