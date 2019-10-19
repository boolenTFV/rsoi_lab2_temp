var request = require('request-promise'); 

module.exports = {
    addSchedule: (_,args)=>{
      return request.post({
        uri: process.env.SCHEDULE_URL,
        body: args.input,
        json: true
      });
    },
    setSchedule: (_,args)=>{
        return request.patch({
          uri:  process.env.SCHEDULE_URL+'/'+args.id,
          body: args.input,
          json: true
        });
      },
    deleteSchedule:(_,args)=>{
    return request.delete({
        uri:  process.env.SCHEDULE_URL+'/'+args.id,
        json: true
    }).then(res=>res.id);
    }
  };