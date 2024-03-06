const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

checkDuplicateUser = async (req, res, next) => {
  try {

    // check if phone number is already existing
    user = await User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber
      }
    });
  
    if (user) {
      return res.status(400).send({
        message: "Failed! phoneNumber is already in use!"
      });
    }
  
    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};
const verifySignUp = {
  checkDuplicateUser
};

module.exports = verifySignUp;
