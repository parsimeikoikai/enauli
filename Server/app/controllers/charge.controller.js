


const controller = {};
const db = require("../models");
const Charge = db.charge;


controller.createCharge = async (req, res) => {
    try {
        const name = req.body.name;

        const charge = await Charge.findOne({
            where: { name }
        });

        if (!charge) {
            await Charge.create({
                name: req.body.name,
                amount: req.body.amount,
                saccoId: req.body.saccoId,
                userId: req.body.userId,
            });
            res.send({ message: "Charge has been created!" });
        } else {
            return res.status(401).send({
                message: `Error ! Charge with Name ${req.body.name} Exists!`,
            });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

controller.updateCharge = (req, res) => {
    const id =  req.body.id;
    if(!id)
    {
        return res.status(401).send({
            message: "Please provide Id!",
          });  
    }

    Charge.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Charge updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Charge with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Charge with id=" + id
            });
        });
};


module.exports = controller;