
const controller = require("../controllers/stations.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/station/create",
        [authJwt.verifyToken],
        controller.createStation);

    app.post("/api/station/update",
        [authJwt.verifyToken],
        controller.updateStation);

        app.get("/api/station/deactivate/:id",
        [authJwt.verifyToken],
        controller.deactivateStation);

};


