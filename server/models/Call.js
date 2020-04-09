"use strict";
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("calls", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    call_time: {
        type: Sequelize.STRING
    },
    call_date: {
    type: Sequelize.DATEONLY
    },
    time_zone: {
      type: Sequelize.STRING
    },
    contact_via: { // phone or an app like Zoom , GotoMeeting etc
      type: Sequelize.STRING
    },
    contact_via_detail: { // number or link deprnding on "contact_via"
      type: Sequelize.STRING
    },
    call_status: {
      type: Sequelize.STRING
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
