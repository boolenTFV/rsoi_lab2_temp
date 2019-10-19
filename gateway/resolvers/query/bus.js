var request = require('request-promise');
const paginate = require("paginate-array");

module.exports = {
    buses: (_,{model, startDate, licensePlate, pagination})=>{
        return request.get({
            uri: process.env.BUS_URL,
            qs: {model, startDate, licensePlate},
            json: true
        }).then(res=>{
            if(pagination){
                var collection = paginate(res, pagination.page, pagination.size );
            }else{
                var collection = paginate(res);
            }
            return collection;
        });
    },
    bus:(_,{id})=>{
        return request.get({
            uri: process.env.BUS_URL,
            qs: {_id:id},
            json: true
        }).then(res=>res[0]);
    }
}