var express = require('express');
var router = express.Router();
var Schedule = require('../models/schedule');

/* GET home page. */
router.get('/', function(req, res) {
  Schedule.find(req.query,function(err, result){
    result= result||[];
    res.json(result);
  });
});
router.post('/', function(req, res) {
  console.log("Удаляем расписание");
  var schedule = new Schedule(req.body);
  schedule.save(
    (err)=>{
      if(err){
        console.log("\t-не удалось добавить расписание", err.message);
        console.log(req.body);
        res.statusCode = 403;
        res.send();
      }else{
        console.log("\t-расписание добавлено");
        res.json(schedule);
      }
    }
  );
});
router.delete('/:id', function(req, res, next) {
  console.log('Удаляем расписание из базы');
  Schedule.remove({_id: req.params.id},
    (err)=>{
      if(err){
        console.log('\t-'+err.message);
        res.statusCode = 403;
        res.send();
      }else{
        console.log('\t-расписание удалено');
        res.json({id: req.params.id});
      }
    }
  );
});

router.patch('/:id', function(req, res, next) {
  id = req.params.id;
  console.log('Изменяем расписание id = ' + id);
  Schedule.findByIdAndUpdate(id, req.body, {upsert: true, new:true}, (err,doc)=>{
    if(err){
      console.log('\t- '+err.message);
      res.statusCode = 403;
      res.send();
    }else{
      console.log('\t- расписание изменено'+id);
      res.json(doc);
    }
  });
});

module.exports = router;