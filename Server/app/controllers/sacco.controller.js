

const controller = {};
const db = require("../models");
const Sacco = db.sacco;
const Op = db.Sequelize.Op;


controller.updateSacco = (req, res) => {
    const id =  req.body.id;

    Sacco.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Sacco updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Sacco with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Sacco with id=" + id
            });
        });
};

controller.createSacco = async (req, res) => {
    try {
        const name = req.body.name;

        const saccos = await Sacco.findOne({
            where: { name }
        });

        if (!saccos) {
            await Sacco.create({
                name: req.body.name,
                location: req.body.location,
                creditLimit: req.body.creditLimit,
                userId: req.body.userId,
                status: req.body.status
            });
            res.send({ message: "Sacco has been created!" });
        } else {
            return res.status(401).send({
                message: `Error ! Sacco with name ${req.body.name} Exists!`,
            });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}
controller.deactivateSacco = (req, res) => {

    const id = req.params.id;
 
    Sacco.update({
        status: 1
      },
        { where: { id: id } }
      )
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Sacco Deactivated."
            });
          } else {
            res.send({
              message: "Cannot deactivate sacco"
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error deactivating sacco"
          });
        });
    
};
module.exports = controller;