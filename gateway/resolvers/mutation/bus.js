var request = require('request-promise');  
module.exports = {
  addBus: (_,args)=>{
    return request.post({
      uri: process.env.BUS_URL,
      body: args.input,
      json: true
    });
  },
  setBus: (_,args)=>{
    return request.patch({
      uri: process.env.BUS_URL+'/'+args.id,
      body: args.input,
      json: true
    });
  },
  deleteBus:(_,args)=>{
    return request.get({
        uri: process.env.SCHEDULE_URL,
        qs: {bus:args.id},
        json: true
      }
    ).then(res=>{
        console.log("Начинаем удаление автобуса", args)
        return res;  
    }).then(res=>{
      return Promise.all(
        res.map(schedule => {
          console.log("-- удаляем расписание для указанного автобуса", {schedule})
          return request({
            method: 'DELETE',
            uri: process.env.BUS_URL+'/'+schedule.id,
            json: true
          })
        })
      )
    }).then(()=> request.delete({
        uri: process.env.BUS_URL+'/'+args.id,
        json: true
      }).then((res)=>{
        console.log("Удаление завершено, результат:", res);
        return res.id;
      })
    ); 
  }
}