'use strict';
module.exports = (sequelize, Sequelize) => {
  return sequelize.define('notes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    note: { //extra notes for the agenda of the call
        type: Sequelize.STRING
    },
    call_status: { //status of every call `done, Not-Taken, rescheduled by client`
        type: Sequelize.STRING
    },
    voice: { //extra notes for the agenda of the call
        type: Sequelize.STRING
    },
    agenda_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'agendas',
          key: 'call_id'
        }
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};