


const controller = {};
const db = require("../../models");
const Operator = db.operator;


controller.createOperator = async (req, res) => {
    try {
        const drivingLicenseNo = req.body.drivingLicenseNo;

        const operators = await Operator.findOne({
            where: { drivingLicenseNo }
        });

        if (!operators) {
            await Operator.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                vehicleId: req.body.vehicleId,
                userId: req.body.userId,
                drivingLicenseNo: req.body.drivingLicenseNo
            });
            res.send({ message: "Operator has been created!" });
        } else {
            return res.status(401).send({
                message: `Error ! Operator with drivingLicenseNo ${req.body.drivingLicenseNo} Exists!`,
            });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

controller.updateOperator = (req, res) => {
    const id = req.body.id;
    if (!id) {
        return res.status(401).send({
            message: "Please provide Id!",
        });
    }

    Operator.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Operator updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Operator with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Operator with id=" + id
            });
        });
};


module.exports = controller;