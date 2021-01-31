import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

const config = require("./config/db");
const app = express();

app.use(cors());

var options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let db;
// mongoose instance connection url connection
if (mongoose.connection.readyState != 1) {
  mongoose.Promise = global.Promise;
  console.log("DB URL ", config.db);
  mongoose.connect(config.db, options);
  db = mongoose.connection;
  db.on("error", (err) => {
    throw new Error(
      `Unable to connect to database at ${config.db} err, ${err}`
    );
  });

  db.once("open", function () {
    console.log("Database is connected");
  });
}

// Bring in our dependencies
require("./config/express")(app, config);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.listen(8000, () => {
  console.log("Server Started at Port, 8000");
});
