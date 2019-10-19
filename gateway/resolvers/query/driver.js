var request = require('request-promise');
const paginate = require("paginate-array");

module.exports = {
    drivers: (_,{name, lastName, birthDate, pagination})=>{
        return request.get({
            uri: process.env.DRIVER_URL,
            qs: {name, lastName, birthDate},
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
    driver:(_,{id})=>{
        return request.get({
            uri:  process.env.DRIVER_URL,
            qs: {_id:id},
            json: true
        }).then(res=>res[0]);
    }
}