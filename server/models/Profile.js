'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('profiles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    //Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
  