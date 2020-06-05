'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('clients', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    client_name: {
        type: Sequelize.STRING
    },
    company_name: {
      type: Sequelize.STRING,
      unique: true,
    },
    location: {
      type: Sequelize.STRING
    },
    website: { // Company/Client Webiste
      type: Sequelize.STRING
    },
    email: { // Company/Client Email
      type: Sequelize.STRING
    },
    phone_number: { // Company/Client number
      type: Sequelize.STRING
    },
    time_zone: {
      type: Sequelize.STRING
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
