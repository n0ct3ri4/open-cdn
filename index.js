// index.js

const express = require("express");
const colors = require("colors/safe");
const fs = require("fs");

const app = express();

var server = null;

function info(msg) {
  console.info(
    colors.grey("[") + colors.green("INFO") + colors.grey("]"),
    msg.toString()
  );
}

function error(msg) {
  console.error(
    colors.grey("[") + colors.red("INFO") + colors.grey("]"),
    msg.toString()
  );
}

function warning(msg) {
  console.warn(
    colors.grey("[") + colors.yellow("INFO") + colors.grey("]"),
    msg.toString()
  );
}

module.exports = {
  name: "OpenCDN",
  version: "1.0.0",

  /**
   * Open the CDN.
   * @param {string} hostname Default : `localhost`. Turn it into `0.0.0.0` for a public CDN.
   * @param {number} port Default : `8080`. Turn it into another port if you need.
   */
  open(hostname, port) {
    server = app.listen(port || 8080, hostname || "localhost", () => {
      info("Your CDN is now opened!");
    });

    app.use((req, res, next) => {
      info(
        `${colors.blue("CLASSIC REQUEST")} | "${colors.yellow(
          req.url
        )}" > ${colors.cyan(req.socket.remoteAddress)}:${colors.cyan(
          req.socket.remotePort
        )} (${colors.magenta(req.socket.remoteFamily)})`
      );
      next();
    });
  },

  /**
   * Add a folder to CDN.
   * @param {fs.PathLike} folderPath Default : `www`. Turn it into another folder path if you need.
   */
  addFolder(folderPath) {
    if (folderPath) {
      app.use(express.static(folderPath));
    } else {
      app.use(express.static(`${__dirname}/www`));
    }
  },

  /**
   * Close the CDN.
   */
  close() {
    if (server !== null) {
      server.close();
    } else {
      error("The CDN is not opened!");
    }
  },
};
