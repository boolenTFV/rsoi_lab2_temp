const httpMocks = require("node-mocks-http");
const dbman = require('../testDb');
const Bus = require('../../models/bus');
const Index = require('../../routes/index');
const expect = require('chai').expect;
function buildResponce(){
  return httpMocks.createResponse(
    {eventEmitter: require('events').EventEmitter}
  );
}

describe('IndexController tests', function() {
  const testEntities = require("./test_entities");
  beforeEach(function(){
      return dbman.saveTestEnities(testEntities);
    }
  );
  afterEach(function(){
      return dbman.clear(Bus);
    }
  );

  it('/get bus test', (done) =>{
    var mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/",
      query: {_id:testEntities[0]._id}
    });
    var mockResponse = buildResponce();
    mockResponse.on('end',()=>{
      expect(mockResponse).to.include({statusCode:200});
      expect(mockResponse._getJSONData()).to.be.an('array')
      .to.have.lengthOf(1);
    });
    Index.handle(mockRequest, mockResponse);
    setTimeout(done, 100*testEntities.length);
  });


  it('/add bus test', (done) =>{
    this.timeout(1000);
    var data ={
      model:"TEST3", 
      startDate:new Date("2009-12-12").toISOString(), 
      licensePlate:"А222AA" 
    };
    var mockRequest = httpMocks.createRequest({
      method: "POST",
      url: "/",
      body: data
    });
    var mockResponse = buildResponce();
    mockResponse.on('end',()=>{
      expect(mockResponse._getJSONData()).to.include(data);
      done();
    });
    Index.handle(mockRequest, mockResponse);
  });

  it('/delete bus test', (done) =>{
    this.timeout(1000);
    testEntities.forEach(testEntity => {
      var mockRequest = httpMocks.createRequest({
        method: "DELETE",
        url: "/"+testEntities[0].id
      });
      var mockResponse = buildResponce();
      mockResponse.on('end',()=>{
        expect(mockResponse).to.include({statusCode:200});
      });
      Index.handle(mockRequest, mockResponse);
    });
    setTimeout(done, 100*testEntities.length);
  });

  it('/delete 403 bus test', (done) =>{
    this.timeout(1000);
    var mockRequest = httpMocks.createRequest({
      method: "DELETE",
      url: "/"+testEntities[0].id+"err"
    });
    var mockResponse = buildResponce();
    mockResponse.on('end',()=>{
      expect(mockResponse).to.include({statusCode:403});
    });
    Index.handle(mockRequest, mockResponse);
    setTimeout(done, 100*testEntities.length);
  });

  it('/update bus test', (done) =>{
    this.timeout(1000);
    var data ={
      model:"TEST2", 
      startDate:new Date("2009-12-12").toISOString(), 
      licensePlate:"А222AA" 
    };
    var mockRequest = httpMocks.createRequest({
      method: "PATCH",
      url: "/"+testEntities[0].id,
      body: data 
    });
    var mockResponse = buildResponce();
    mockResponse.on('end', function() {
      var res = mockResponse._getJSONData();
      expect(res).include(data);
    });
    Index.handle(mockRequest, mockResponse);
    setTimeout(done, 100*testEntities.length);
  });
});
