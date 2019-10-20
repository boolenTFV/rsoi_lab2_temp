var express = require('express');
var router = express.Router();
var Bus = require('../models/bus');

/* GET home page. */
router.get('/', function(req, res) {
  if(req.query.startDate){
    console.log(req.query.startDate, new Date(req.query.startDate))
    req.query.startDate = new Date(req.query.startDate);
  }
  Bus.find(req.query,function(err, result){
    result = result||[];
    console.log("Список автобусов ",result);
    res.json(result);
  });
});

router.post('/', function(req, res) {
  console.log("Добавляем автобус");
  if(req.body.startDate!=null){
    req.body.startDate= new Date(req.body.startDate);
  }
  var bus = new Bus(req.body);
  bus.save(
    (err)=>{
      if(err){
        console.log("\t- не удалось добавить автобус", err.message);
        res.statusCode = 403;
        res.send();
      }else{
        console.log("\t- автобус был добавлен", bus);
        res.json(bus);
      }
    }
  );
});

router.delete('/:id', function(req, res, next) {
  console.log('Удаляем автобус автобуса из базы');
  Bus.remove({_id: req.params.id},
    (err)=>{
      if(err){
        console.log('\t- '+err.message);
        res.statusCode = 403;
        res.send();
      }else{
        console.log('\t- автобус удален', bus);
        res.json({id: req.params.id});
      }
    }
  );
});

router.patch('/:id', function(req, res, next) {
  id = req.params.id;
  console.log('Изменяем автобус id = ' + id);
  Bus.findByIdAndUpdate(id, req.body, {upsert: true, new:true}, (err,doc)=>{
    if(err){
      console.log('\t- '+err.message);
      res.statusCode = 403;
      res.send();
    }else{
      console.log('\t- автобус изменен id = ' + doc.id);
      res.json(doc);
    }
  });
});

module.exports = router;