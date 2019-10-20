var express = require('express');
var router = express.Router();
var Driver = require('../models/driver');

/* GET list of drivers */
router.get('/', function(req, res) {
  Driver.find(req.query,function(err, result){
    result= result||[];
    console.log("Список водителей", result);
    res.json(result);
  });
});

router.post('/', function(req, res) {
  console.log("Добавляем водителя");
  var driver = new Driver(req.body);
  driver.save(
    (err)=>{
      if(err){
        console.log("\t-не удалось добавить водителя", err.message);
        console.log(req.body);
        res.statusCode = 403;
        res.send();
      }else{
        console.log("\t-водитель добавлен",driver);
        res.json(driver);
      }
    }
  );
});
router.delete('/:id', function(req, res) {
  console.log('Удаляем водителя автобуса из базы');
  Driver.remove({_id: req.params.id},
    (err)=>{
      if(err){
        console.log('\t-'+err.message);
        res.statusCode = 403;
        res.send();
      }else{
        console.log('\t-водитель удален', req.params.id);
        res.json({id: req.params.id});
      }
    }
  );
});

router.patch('/:id', function(req, res) {
  id = req.params.id;
  console.log('Изменяем водителя, id = ' + id);
  Driver.findByIdAndUpdate(id, req.body, {upsert: true, new:true}, (err,doc)=>{
    if(err){
      console.log('\t- '+err.message);
      res.statusCode = 403;
      res.send();
    }else{
      console.log('\t- водитель изменен изменен', doc.id);
      res.json(doc);
    }
  });
});

module.exports = router;