const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/View/index.html");
});

app.use((req, res, next) => {
  const ipaddress = req.ip || req.connection.remoteAddress;

  const language = req.headers["accept-language"];

  const software = req.headers["user-agent"];

  req.clinetInfo = {
    ipaddress,
    language,
    software,
  };

  next();
});

app.get("/api/whoami", (req, res) => {
  const { ipaddress, language, software } = req.clinetInfo;

  res.json({ ipadress: ipaddress, language: language, software: software });
});
var Listner = app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
