const Driver = require('../../models/driver');
const testEntities = [
    new Driver({ 
        name:"John", 
        lastName:"Doe",
        birthDate:new Date("1975-12-12").toISOString() 
    }), 
    new Driver({ 
        name:"Ivan", 
        lastName:"Ivanov",
        birthDate: new Date("1982-12-12").toISOString()
    })
  ];
  module.exports = testEntities;