const ServerApp = require("./models/ServerApp");
require("dotenv").config();

const Server = new ServerApp();

Server.execute();
