"use strict";

const next = require("next");
const express = require("express");
const dev = "production";
const loaded_next = next({ dev });
const handle = loaded_next.getRequestHandler();
const serverlessExpress = require("@vendia/serverless-express");

function load(event, context) {
  console.log(event);
  console.log(context);
  loaded_next.prepare().then(() => {
    console.log("A")
    const app = express();
    console.log("B")
    app.get("*", (req, res) => handle(req, res));
    console.log("C")

    const server = serverlessExpress.createServer(app);
    console.log("D")
    
    serverlessExpress.proxy(server, event, context);
    console.log("E")
  });
}

exports.handler = (event, context) => {
  console.log("start")
  load(event,context)
  console.log("completed")
};
