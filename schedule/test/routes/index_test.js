const assert = require('assert');
const httpMocks = require("node-mocks-http");
const dbman = require('../testDb');
const Schedule = require('../../models/schedule');
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
      return dbman.clear(Schedule);
    }
  );

  it('/get schedule test', (done) =>{
    var mockRequest = httpMocks.createRequest({
      method: "GET",
      url: "/",
      query:{_id:testEntities[0]._id}
    });
    var mockResponse = buildResponce();
    mockResponse.on('end',()=>{
      expect(mockResponse._getJSONData()).to.be.an('array')
      .to.have.lengthOf(1);
    });
    Index.handle(mockRequest, mockResponse);
    setTimeout(done, 100*testEntities.length);
  });


  it('/add schedule test', (done) =>{
    this.timeout(1000);
    var data ={
      route:"Test", 
      driverId:"yyx",
      busId:"xxy",
      time: "8:00",
      day:"mon"
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

  it('/delete schedule test', (done) =>{
    this.timeout(1000);
    testEntities.forEach(testEntity => {
      var mockRequest = httpMocks.createRequest({
        method: "DELETE",
        url: "/"+testEntities[0]._id
      });
      var mockResponse = buildResponce();
      mockResponse.on('end',()=>{
        expect(mockResponse).to.include({statusCode:200});
      });
      Index.handle(mockRequest, mockResponse);
    });
    setTimeout(done, 100*testEntities.length);
  });

  it('/delete 403 schedule test', (done) =>{
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
      route:"Test 2", 
      driverId:"yyx",
      busId:"xxy",
      time: "9:00",
      day:"tue"
    };
    var mockRequest = httpMocks.createRequest({
      method: "PATCH",
      url: "/"+testEntities[0]._id,
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
