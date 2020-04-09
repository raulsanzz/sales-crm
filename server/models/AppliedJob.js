"use strict";
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("appliedJobs", {
    job_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {         // Job hasMany appliedJobs through different Profiles n:n
          model: 'jobs',
          key: 'id'
      }
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {         // User hasMany appliedJobs through different profiles n:n
          model: 'users',
          key: 'registration_number'
      }
    },
    profile_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {         // profile hasMany appliedJobs
          model: 'profiles',
          key: 'id'
      }
    },
    applied: {
      type: Sequelize.BOOLEAN
    },
    lead_status: {
      type: Sequelize.STRING
    },
    //Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
  