"use strict";
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("leads", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    gmail_thread: {
      type: Sequelize.STRING
    },
    voice: {
      type: Sequelize.STRING
    },
    status: { // lead status
      type: Sequelize.STRING
    },
    interview_status: {
      type: Sequelize.STRING
    },
    job_id: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'jobs',
          key: 'id'
        }
    },
    profile_id: { //profile assiged on the job
      type: Sequelize.INTEGER,
      references: {         
        model: 'profiles',
        key: 'id'
      }
    },
    assign_to: { //which user is assigned this job
      type: Sequelize.INTEGER,
      references: {         
        model: 'users',
        key: 'registration_number'
      }
    },
    call_id: {
        type: Sequelize.INTEGER,
        references: {         
          model: 'calls',
          key: 'id'
        }
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
