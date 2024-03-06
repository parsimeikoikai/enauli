
const controller = require("../controllers/sacco.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/sacco/create",
        [authJwt.verifyToken],
        controller.createSacco);

    app.post("/api/sacco/update",
        [authJwt.verifyToken],
        controller.updateSacco);

        app.get("/api/sacco/deactivate/:id",
        [authJwt.verifyToken],
        controller.deactivateSacco);

};


