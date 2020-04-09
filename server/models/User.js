module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {
    registration_number: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    designation: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    //Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
