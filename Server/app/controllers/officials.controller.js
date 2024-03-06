

const controller = {};
const db = require("../models");
const Officials = db.officials;


controller.createOfficials = async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;

        const officials = await Officials.findOne({
            where: { phoneNumber }
        });

        if (!officials) {
            await Officials.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                designation: req.body.designation,
                saccoId: req.body.saccoId,
                userId: req.body.userId,
                status: req.body.status,
            });
            res.send({ message: "Official has been created!" });
        } else {
            return res.status(401).send({
                message: `Error ! Official with phoneNumber ${req.body.phoneNumber} Exists!`,
            });
        }

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

}

controller.updateOfficials = (req, res) => {
    const id =  req.body.id;
    if(!id)
    {
        return res.status(401).send({
            message: "Please provide Id!",
          });  
    }

    Officials.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Officials updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Official with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Officials with id=" + id
            });
        });
};


controller.deactivateOfficials = (req, res) => {

    const id = req.params.id;
 
    Officials.update({
        status: 1
      },
        { where: { id: id } }
      )
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Officials Deactivated."
            });
          } else {
            res.send({
              message: `Cannot update Official with id ${id}`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error deactivating Officials"
          });
        });
    
};

controller.listOfficials = async (req, res) => {

    const id = req.params.id;
 
    try {
  
        const officials = await Officials.findAll({
          where: { id },
          attributes: ['id', 'firstName', 'lastName',
            'phoneNumber', 'designation', 'status'],
        });
    
        return res.json(officials);
      } catch (err) {
        console.log(err)
        return res.status(500).json(err);
      }
    
};

module.exports = controller;