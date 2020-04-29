"use strict";
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("tests", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    gmail_thread: {
      type: Sequelize.STRING
    },
    test_type: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    due_time: {
        type: Sequelize.STRING
    },
    note: {
        type: Sequelize.STRING
    },
    due_date: {
        type: Sequelize.DATEONLY
    },
    lead_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'leads',
          key: 'id'
        }
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
