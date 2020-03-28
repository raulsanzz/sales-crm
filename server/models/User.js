module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {
    registrationNumber: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      field: "registration_number"
    },
    name: {
      type: Sequelize.STRING
    },
    designation: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    profile: {
      type: Sequelize.STRING
    },
    //Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
