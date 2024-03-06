module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tbl_users", {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pinNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });
};
