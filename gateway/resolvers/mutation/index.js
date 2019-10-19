const bus = require("./bus");
const driver = require("./driver");
const schedule = require("./schedule");

var mutation={};

module.exports = Object.assign(mutation, bus, driver, schedule);