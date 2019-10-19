const Schedule = require('../../models/schedule');
const testEntities = [
  new Schedule({
    route:"1a", 
    driverId:"xxx",
    busId:"xxx",
    time:"7:00", 
    day:"mon" 
  }), 
  new Schedule({
    route:"2a", 
    driver:"yyy",
    bus:"yyy",
    time:"8:00", 
    day:"mon"
  })
];
module.exports = testEntities;