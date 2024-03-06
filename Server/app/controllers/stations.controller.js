


const controller = {};
const db = require("../models");
const Stations = db.stations;

controller.createStation = async (req, res) => {
    try {
        const name = req.body.name;

        const stations = await Stations.findOne({
            where: { name }
        });

        if (!stations) {
            await Stations.create({
                name: req.body.name,
                location: req.body.location,
                saccoId: req.body.saccoId,
                userId: req.body.userId,
                status: req.body.status
            });
            res.send({ message: "Station has been created!" });
        } else {
            return res.status(401).send({
                message: `Error ! Station with name ${req.body.name} Exists!`,
            });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

controller.updateStation = (req, res) => {
    const id =  req.body.id;

    Stations.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Station updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Station with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Station with id=" + id
            });
        });
};


controller.deactivateStation = (req, res) => {

    const id = req.params.id;

    Stations.update({
        status: 1
      },
        { where: { id: id } }
      )
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Station Deactivated."
            });
          } else {
            res.send({
              message: "Cannot deactivate Station"
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error deactivating Station"
          });
        });
    
};
module.exports = controller;