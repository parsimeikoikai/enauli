

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("tbl_charges", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        amount: {
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
