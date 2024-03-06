
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("tbl_vehicles", {
        make: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        registration: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        capacity: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        saccoId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
};
