const config = require("../config/auth.config");

const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//changepasswd
exports.changePin = async (req, res) => {
  const oldPin = req.body.oldPin;
  const newPin = req.body.newPin;
  const id = req.body.id;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  if (user) {
    const pinIsValid = bcrypt.compareSync(
      oldPin,
      user.pinNumber
    );
    if (!pinIsValid) {
      return res.status(401).send({
        message: "Invalid Old Pin!",
      });
    }
    User.update({
      pinNumber: bcrypt.hashSync(newPin, 8)
    },
      { where: { id: id } }
    )
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pin was changed successfully."
          });
        } else {
          res.send({
            message: `Cannot change Pin with id=${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User Pin with id=" + id
        });
      });
  }
};
exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const phoneNumber = req.body.phoneNumber;
    const users = await User.findOne({
      where: { phoneNumber }
    });

    if (!users) {
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        pinNumber: await bcrypt.hashSync(req.body.pinNumber, 8),
      });
      res.send({ message: "User registered successfully!" });
    } else {
      res.send({ message: "Error registering user!" });
    }

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//resetpassword
exports.reset = (req, res) => {
  const id = req.body.id;
  const pinNumber = req.body.pinNumber;
  const confirmPinNumber = req.body.confirmPinNumber;
  if (pinNumber !== confirmPinNumber) {
    return res.status(401).send({
      message: "Pin Mismatch!",
    });
  } 
    User.update({
      pinNumber: bcrypt.hashSync(confirmPinNumber, 8)
    },
      { where: { id: id } }
    )
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Pin was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User Pin with id=${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User Pin with id=" + id
        });
      });
  


};

exports.signin = async (req, res) => {
  try {

    const user = await User.findOne({
      where: {
        phoneNumber: req.body.phoneNumber,
      },
    });


    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.pinNumber,
      user.pinNumber
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    req.session.token = token;
    return res.status(200).send({
      id: user.id,
      emailAddress: user.emailAddress,
      phoneNumber: user.phoneNumber,
      token: token
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
