const mongoose =  require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').default;
var mongoServer = null;

module.exports.start = async function(){
  mongoServer = new MongoMemoryServer();
  const url = await mongoServer.getConnectionString();

  mongoose.Promise = Promise;
  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  };

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(url, mongooseOpts);
    }
    console.log(e);
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${url}`);
  });

  await mongoose.connect(url, mongooseOpts);
};

module.exports.saveTestEnities = function(entities) {
  return Promise.all(
    entities.map((entity)=>{
      var promise = entity.save()
        .catch((err) => console.log(err));
      return promise;
    })
  );
};

module.exports.clear = function(model) {
  return model.collection.deleteMany({ })
          .catch((err) => console.log(err));;
};

module.exports.stop = async function() {
  if (mongoose.connection) await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
};
