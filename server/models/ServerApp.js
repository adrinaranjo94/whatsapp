const express = require("express");
const cors = require("cors");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const Sockets = require("./Sockets");
const { dbConnection } = require("../database/config");
const { validateJWT } = require("../middlewares/validateJWT");

class ServerApp {
  constructor() {
    this.app = express();
    this.port = 8080;

    // DB Connection
    dbConnection();

    // HTTP Server
    this.httpServer = createServer(this.app);

    // Config socket
    this.io = new Server(this.httpServer, {
      /* options */
    });
  }

  middleWares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    // BODY PARSER
    this.app.use(express.json());

    // API ENDOINTS
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/messages", validateJWT, require("../router/messages"));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Initialize Middlewares

    this.middleWares();

    // Initialize Sockets

    this.configureSockets();

    this.httpServer.listen(this.port, () => {
      console.log("servidor lanzado en el puerto " + this.port);
    });
  }
}

module.exports = ServerApp;
