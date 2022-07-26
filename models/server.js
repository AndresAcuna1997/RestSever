const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      users: "/api/users",
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/upload",
    };

    //Connect to DB
    this.dbConnect();
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

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  async dbConnect() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.users, require("../routes/user.routes"));
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.categories, require("../routes/categories.routes"));
    this.app.use(this.paths.products, require("../routes/products.routes"));
    this.app.use(this.paths.search, require("../routes/search.routes"));
    this.app.use(this.paths.uploads, require("../routes/uploads.routes"));
  }

  listen() {
    this.app.listen(this.port, () => console.log("Server", this.port));
  }
}

module.exports = { Server };
