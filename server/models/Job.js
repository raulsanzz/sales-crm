"use strict";
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("jobs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {         
        model: 'users',
        key: 'registration_number'
      }
    },
    assignTo: {
      type: Sequelize.INTEGER,
      field: "assign_to"
    },
    url: {
      type: Sequelize.STRING,
      unique: true
    },
    companyName: {
      type: Sequelize.STRING,
      unique: true,
      field: "company_name"
    },
    profile_id: {
      type: Sequelize.INTEGER,
      references: {         
        model: 'profiles',
        key: 'id'
      }
    },
    job_title: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    salary: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.STRING
    },
    client_name: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    source: {
      type: Sequelize.STRING
    },
    call_status: {
      type: Sequelize.STRING
    },
    phone_number: {
      type: Sequelize.STRING
    },
    call_time: {
      type: Sequelize.STRING
    },
    time_zone: {
      type: Sequelize.STRING
    },
    lead_status: {
      type: Sequelize.STRING
    },
    call_date: {
      type: Sequelize.DATEONLY
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
