"use strict";
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("agendas", {
    call_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {         
          model: 'calls',
          key: 'id'
        }
    },
    remote: { //Is the client Ok with remote
      type: Sequelize.STRING
    },
    relocation: { //Is the client firm on relocation
      type: Sequelize.STRING
    },
    contract: { //W2_w9
      type: Sequelize.STRING
    },
    work_type: { //type of work
      type: Sequelize.STRING
    },
    project_type: { //type of project
      type: Sequelize.STRING
    },
    compensation: { // Salary/compensation 
      type: Sequelize.STRING
    },
    test_taken: { // test takes or not
      type: Sequelize.STRING
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
