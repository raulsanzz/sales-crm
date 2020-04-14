const Sequelize = require("sequelize");

//live db connection
const sequelize = new Sequelize("sales-crm", "postgres", "Sql1server2!", {
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  },
  host: "sales-crm.ccgqx43uwom0.us-east-2.rds.amazonaws.com",
  dialect: "postgres"
});

//local db connection
// const sequelize = new Sequelize("cloudtek", "test", 5432, {
//   pool: {
//     max: 5,
//     min: 0,
//     require: 30000,
//     idle: 10000
//   },
//   host: "localhost",
//   dialect: "postgres"
// });


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/User")(sequelize, Sequelize);
db.job = require("../models/Job")(sequelize, Sequelize);
db.appliedJob = require("../models/AppliedJob")(sequelize, Sequelize);
db.profile = require("../models/Profile")(sequelize, Sequelize);
db.lead = require("../models/Lead")(sequelize, Sequelize);
db.client = require("../models/Client")(sequelize, Sequelize);
db.call = require("../models/Call")(sequelize, Sequelize);

// Associstions

// User
db.user.belongsToMany( db.job, { 
  through: {
    model: db.appliedJob,
    unique: false
  },
  foreignKey: 'user_id',
  otherKey: 'job_id',
  constraints: false
})

db.user.hasMany(db.job, {
  foreignKey: "user_id"
});

db.user.hasMany(db.lead, {
  foreignKey: "assign_to"
});

// job
db.job.belongsToMany( db.user, { 
  through: {
    model: db.appliedJob,
    unique: false
  },
  foreignKey: 'job_id',
  otherKey: 'user_id',
  as:'appliedWithProfiles',
  constraints: false
})

db.job.belongsToMany( db.profile, { 
  through: {
    model: db.lead,
    unique: false
  },
  foreignKey: 'job_id',
  otherKey: 'profile_id',
  as:'jobLeads',
  constraints: false
})

db.job.belongsTo(db.user, {
  foreignKey: "user_id",
  targetKey: "registration_number",
  onDelete: "CASCADE"
});

db.job.belongsTo(db.client, {
  foreignKey: "client_id",
  targetKey: "id",
  onDelete: "CASCADE"
});

// db.job.belongsTo(db.profile, { foreignKey: "profile_id" });

// Profile
db.profile.belongsToMany( db.job, { 
  through: {
    model: db.lead,
    unique: false
  },
  foreignKey: 'profile_id',
  otherKey: 'job_id',
  constraints: false
})

db.profile.hasMany(db.appliedJob, {
  foreignKey: "profile_id"
});

// Lead
db.lead.belongsTo(db.call, {
  foreignKey: "call_id",
  targetKey: "id",
  onDelete: "CASCADE"
});

db.lead.belongsTo(db.user, {
  foreignKey: "assign_to",
  targetKey: "registration_number",
  onDelete: "CASCADE"
});

db.lead.belongsTo (db.job, {foreignKey: 'job_id'});
db.lead.belongsTo (db.profile , {foreignKey: 'profile_id'});

// Applied Job 
db.appliedJob.belongsTo (db.user, {foreignKey: 'user_id'});
db.appliedJob.belongsTo (db.job, {foreignKey: 'job_id'});
db.appliedJob.belongsTo (db.profile , {foreignKey: 'profile_id'});

// Client
db.client.hasOne(db.job, {
  foreignKey: "client_id"
})

// Call
db.call.hasOne(db.lead, {
  foreignKey: "call_id"
})

// to refresh the database and drop the already created tables
// and create the from the start use options `{force: true}`

// sequelize.sync({alter: true})
//   .then(() => {
//     console.log(`Database & tables created!`)
//     // db.profile.bulkCreate([
//     //   {name: 'Ali Muhammad'},
//     //   {name: 'Aamir khan'},
//     //   {name: 'Kevan Jay'},
//     // ])
// })

module.exports = db;
