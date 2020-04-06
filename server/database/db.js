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
db.appliedJobs = require("../models/AppliedJobs")(sequelize, Sequelize);
db.profiles = require("../models/Profile")(sequelize, Sequelize);

// Associstions

// User
db.user.belongsToMany( db.job, { 
  through: {
    model: db.appliedJobs,
    unique: false
  },
  foreignKey: 'user_id',
  otherKey: 'job_id',
  constraints: false
})

db.user.hasMany(db.job, {
  foreignKey: "user_id"
});

db.user.hasMany(db.job, {
  foreignKey: "assignTo"
});

// job
db.job.belongsToMany( db.user, { 
  through: {
    model: db.appliedJobs,
    unique: false
  },
  foreignKey: 'job_id',
  otherKey: 'user_id',
  as:'appliedWithProfiles',
  constraints: false
})

db.job.belongsTo(db.user, {
  as: "jobId",
  foreignKey: "user_id",
  targetKey: "registrationNumber",
  onDelete: "CASCADE"
});

db.job.belongsTo(db.user, {
  as: "leadId",
  foreignKey: "assignTo",
  targetKey: "registrationNumber",
  onDelete: "CASCADE"
});

db.job.belongsTo(db.profiles, { foreignKey: "profile_id" });

// profile
db.profiles.hasMany(db.job, {
  foreignKey: "profile_id"
});


//applied Job 
db.appliedJobs.belongsTo (db.user, {foreignKey: 'user_id'});
db.appliedJobs.belongsTo (db.job, {foreignKey: 'job_id'});
db.appliedJobs.belongsTo (db.profiles , {foreignKey: 'profile_id'});


// to refresh the database and drop the already created tables
// and create the from the start

// sequelize.sync({ force: true })
//   .then(() => {
//     console.log(`Database & tables created!`)
//     db.profiles.bulkCreate([
//       {name: 'Ali Muhammad'},
//       {name: 'Aamir khan'},
//       {name: 'Kevan Jay'},
//     ])
// })

module.exports = db;
