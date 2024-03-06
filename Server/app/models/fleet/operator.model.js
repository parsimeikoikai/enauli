

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("tbl_operators", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        drivingLicenseNo: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        vehicleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
