const bus = require("./bus");
const driver = require("./driver");
const schedule = require("./schedule");

var query = {};

module.exports = Object.assign(query, bus, driver, schedule);