const path = require("path"),
  glob = require("glob"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  methodOverride = require("method-override"),
  cors = require("cors"),
  rootDir = `${__dirname}/../`;

import express, { Request, Response } from "express";

const router = express.Router();

module.exports = function (app: any, config: any) {
  app.disable("x-powered-by");
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(cookieParser());
  app.use(methodOverride());
  app.use(
    cors({
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Access-Control-Allow-Origin",
        "Accept",
        "x-access-token",
      ],
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      preflightContinue: false,
    })
  );
  // example socket testing index.html
  app.get("/", function (req: Request, res: Response) {
    res.sendfile("public/index.html");
  });

  const routes = glob.sync(config.root + "/app/routes/*.js");
  routes.forEach(function (route: any) {
    require(route)(app);
  });
};
