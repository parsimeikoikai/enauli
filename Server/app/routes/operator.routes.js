

const controller = require("../controllers/fleet/operator.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/operator/create",
        [authJwt.verifyToken],
        controller.createOperator);

    app.post("/api/operator/update",
        [authJwt.verifyToken],
        controller.updateOperator);


};


