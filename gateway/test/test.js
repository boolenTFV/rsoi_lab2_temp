require('dotenv').config();

//подключаем тесты
describe('Bus service test',()=>{
    require('./resolvers/bus_query_test');
    require('./resolvers/bus_mutation_test');
});
describe('Driver service test',()=>{
    require('./resolvers/driver_query_test');
    require('./resolvers/driver_mutation_test');
});
describe('Schedule service test',()=>{
    require('./resolvers/schedule_query_test');
    require('./resolvers/schedule_mutation_test');
    require('./resolvers/schedule_test');
});
