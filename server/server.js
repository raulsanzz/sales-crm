const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const db = require("./database/db");
var cors = require("cors");
const reactBuildPath = path.join(__dirname, "../build")
app.use(express.static(reactBuildPath));
app.use(express.json({ extended: false }));
app.use(cors());

var ip = require("ip");

app.get('/', function(req, res) {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});
app.use("/api/user", require("./routes/user"));
app.use("/api/job", require("./routes/job"));
app.use("/api/auth", require("./routes/auth"));
// app.listen(port, ip.address(), () => {
//   console.log("Server is up");
//   console.log(ip.address());
// });

// test comment
app.listen(port, () => {
  console.log("Server is up on port:"+port);
});
