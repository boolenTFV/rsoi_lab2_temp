require('dotenv').config();
var dbMan = require('./testDb');
before(()=>dbMan.start());
after(()=>dbMan.stop());
require('./routes/index_test.js');

