"use strict";
module.exports = (sequelize, Sequelize) => {
  return sequelize.define("jobs", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    job_title: {
      type: Sequelize.STRING
    },
    location: { //job location
      type: Sequelize.STRING
    },
    salary: { //job salary
      type: Sequelize.INTEGER
    },
    url: { //url for job-link
      type: Sequelize.STRING,
      unique: true
    },
    source: { //indeed, etc
      type: Sequelize.STRING
    },
    gmail_thread: {
      type: Sequelize.STRING
    },
    status: { // job status
      type: Sequelize.STRING
    },
    lead_status: {
      type: Sequelize.STRING
    },
    call_status: {
      type: Sequelize.STRING
    },
    interview_status: {
      type: Sequelize.STRING
    },
    companyName: {
      type: Sequelize.STRING,
      unique: true,
      field: "company_name"
    },
    website: { // Company/Client Webiste
      type: Sequelize.STRING
    },
    email: { // Company/Client Email
      type: Sequelize.STRING
    },
    client_name: {
      type: Sequelize.STRING
    },
    phone_number: { // Company/Client number
      type: Sequelize.STRING
    },
    time_zone: { //client_timeZone
      type: Sequelize.STRING
    },
    call_time: {
      type: Sequelize.STRING
    },
    call_date: {
      type: Sequelize.DATEONLY
    },
    contact_via: { // phone or an app like Zoom , GotoMeeting etc
      type: Sequelize.STRING
    },
    contact_via_detail: { // number or link deprnding on "contact_via"
      type: Sequelize.STRING
    },
    user_id: { //which user added this jon
      type: Sequelize.INTEGER,
      references: {         
        model: 'users',
        key: 'registration_number'
      }
    },
    profile_id: { //profile assiged on the job
      type: Sequelize.INTEGER,
      references: {         
        model: 'profiles',
        key: 'id'
      }
    },
    assignTo: {
      type: Sequelize.INTEGER,
      field: "assign_to"
    },
    // Timestamps
    createdAt: Sequelize.DATEONLY,
    updatedAt: Sequelize.DATEONLY
  });
};
