var request = require('request-promise');
const paginate = require("paginate-array");

module.exports = {
    schedule: (_,{
        route, 
        driverId, 
        busId, 
        day, 
        time, 
        pagination
    })=>{
        return request.get({
            uri:  process.env.SCHEDULE_URL,
            qs: {
                route, 
                driverId, 
                busId, 
                day, 
                time
            },
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
    scheduleOne:(_,{id})=>{
        return request.get({
            uri: process.env.SCHEDULE_URL,
            qs: {_id:id},
            json: true
        }).then(res=>res[0]);
    }
}