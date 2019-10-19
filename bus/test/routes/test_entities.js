const Bus = require('../../models/bus');
const testEntities = [
    new Bus({
        model:"Type 1", 
        startDate:new Date("1999-12-12").toISOString(), 
        licensePlate:"А882ЕУ" 
    }), 
    new Bus({
        model:"Type 2", 
        startDate:new Date("1999-12-14").toISOString(), 
        licensePlate:"А911НУ" 
    }), 
];
module.exports = testEntities;