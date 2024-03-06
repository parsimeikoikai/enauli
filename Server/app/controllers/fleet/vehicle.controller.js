

const controller = {};
const db = require("../../models");
const Vehicles = db.vehicles;


controller.createVehicle = async (req, res) => {
    try {
        const registration = req.body.registration;

        const vehicles = await Vehicles.findOne({
            where: { registration }
        });

        if (!vehicles) {
            await Vehicles.create({
                make: req.body.make,
                registration: req.body.registration,
                capacity: req.body.capacity,
                saccoId: req.body.saccoId,
                userId: req.body.userId,
                status: req.body.status,
            });
            res.send({ message: "Vehicle has been created!" });
        } else {
            return res.status(401).send({
                message: `Error ! Vehicle with registration ${req.body.registration} Exists!`,
            });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

controller.updateVehicle = (req, res) => {
    const id =  req.body.id;
    if(!id)
    {
        return res.status(401).send({
            message: "Please provide Id!",
          });  
    }

    Vehicles.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Vehicles updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Vehicles with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Vehicles with id=" + id
            });
        });
};


controller.listVehicles = async (req, res) => {

    const saccoId = req.params.saccoId;
 
    try {
  
        const vehicles = await Vehicles.findAll({
          where: { saccoId },
          attributes: ['make', 'registration', 'capacity',
            'userId'],
        });
    
        return res.json(vehicles);
      } catch (err) {
        console.log(err)
        return res.status(500).json(err);
      }
    
};

module.exports = controller;