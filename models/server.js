const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userEndPoints = "/api/users";

    // Midleware
    this.middlewares();
    //Routes
    this.routes();
  }

  middlewares() {
    //Public folder
    this.app.use(express.static("public"));

    //Cors
    this.app.use(cors());

    //JSON read and parse
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.userEndPoints, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => console.log("Server", this.port));
  }
}

module.exports = { Server };
