
const controller = require("../controllers/charge.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/charge/create",
        [authJwt.verifyToken],
        controller.createCharge);

    app.post("/api/charge/update",
        [authJwt.verifyToken],
        controller.updateCharge);


};


