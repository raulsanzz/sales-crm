require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;
const cors = require("cors");

const reactBuildPath = path.join(__dirname, "../build");

app.use(express.static(reactBuildPath));
app.use(express.json({ extended: false }));
app.use(cors());

//Routes
app.use("/api", require("./routes/index"));

//for React routing
app.get('/*', function(req, res) {
  res.sendFile(path.join(reactBuildPath, 'index.html'));
});

// Server
app.listen(port, () => {
  console.log(`Node server started on port: ${port}`);
});
