
const controller = require("../controllers/officials.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/officials/create",
        [authJwt.verifyToken],
        controller.createOfficials);

    app.post("/api/officials/update",
        [authJwt.verifyToken],
        controller.updateOfficials);

    app.get("/api/officials/deactivate/:id",
        [authJwt.verifyToken],
        controller.deactivateOfficials);

    app.get("/api/officials/list/:id",
        [authJwt.verifyToken],
        controller.listOfficials);

};


