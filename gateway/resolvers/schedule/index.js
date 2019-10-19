var request = require('request-promise');

module.exports = {
    bus:(parent)=>{
        return request.get({
            uri: process.env.BUS_URL,
            qs: {_id:parent.busId},
            json: true
        }).then(res=>res[0]);
    },
    driver:(parent)=>{
        console.log(parent.driverId);
        return request.get({
            uri: process.env.DRIVER_URL,
            qs: {_id:parent.driverId},
            json: true
        }).then(res=>res[0]);
    }
}