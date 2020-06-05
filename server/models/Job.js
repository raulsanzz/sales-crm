'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('jobs', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    job_title: {
      type: Sequelize.STRING
    },
    url: { //url for job-link
      type: Sequelize.STRING,
      unique: true
    },
    source: { //indeed, etc
      type: Sequelize.STRING
    },
    user_id: { //which user added this job
      type: Sequelize.INTEGER,
      references: {         
        model: 'users',
        key: 'registration_number'
      }
    },
    client_id: { //which user added this job
      type: Sequelize.INTEGER,
      references: {         
        model: 'clients',
        key: 'id'
      }
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
