var request = require('request-promise'); 

module.exports = {
    addDriver: (_,args)=>{
      return request.post({
        uri: process.env.DRIVER_URL,
        body: args.input,
        json: true
      });
    },
    setDriver: (_,args)=>{
        return request.patch({
          uri: process.env.DRIVER_URL+'/'+args.id,
          body: args.input,
          json: true
        })
      },
    deleteDriver:(_,args)=>{
      return request.get({
          uri: process.env.SCHEDULE_URL,
          qs: {driver:args.id},
          json: true
        }
      ).then(res=>{
          console.log("Начинаем удаление водителя автобуса", args)
          return res;  
      }).then(res=>{
        return Promise.all(
          res.map(schedule => {
            console.log("-- удаляем расписание для указанного водителя", {schedule})
            return request.delete({
              uri: process.env.SCHEDULE_URL+'/'+schedule.id,
              json: true
            })
          })
        )
      }).then(()=> request.delete({
          uri: process.env.DRIVER_URL+'/'+args.id,
          json: true
        }).then((res)=>{
          console.log("Удаление завершено, результат:", res);
          return res.id;
        })
      ); 
    }
  };