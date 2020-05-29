const Sequelize = require("sequelize");

//live db connection
const sequelize = new Sequelize("sales-crm", "postgres", "Sql1server2!", {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false, //set to true if you want to see postress query logging
  host: "sales-crm.ccgqx43uwom0.us-east-2.rds.amazonaws.com",
  dialect: "postgres"
});

//local db connection
// const sequelize = new Sequelize("cloudtek", "test", 5432, {
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
//   host: "localhost",
//   dialect: "postgres"
// });


sequelize.authenticate().then(() => {
    console.log("Postgres Connection has been established successfully.");
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
db.agenda = require("../models/Agenda")(sequelize, Sequelize);
db.note = require("../models/Note")(sequelize, Sequelize);
db.test = require("../models/Test")(sequelize, Sequelize);

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

db.lead.hasOne(db.test, {
  foreignKey: "lead_id"
})
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

db.call.hasOne(db.agenda, {
  foreignKey: "call_id"
})

// Agenda
db.agenda.belongsTo(db.call, {
  foreignKey: "call_id",
  targetKey: "id",
  onDelete: "CASCADE"
});

db.agenda.hasMany(db.note, {
  foreignKey: "agenda_id"
});

// note
db.note.belongsTo(db.agenda, {
  foreignKey: "agenda_id",
  targetKey: "call_id",
  onDelete: "CASCADE"
});

// test
db.test.belongsTo(db.lead, {
  foreignKey: "lead_id",
  targetKey: "id"
});

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
