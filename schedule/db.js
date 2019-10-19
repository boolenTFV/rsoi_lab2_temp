const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
