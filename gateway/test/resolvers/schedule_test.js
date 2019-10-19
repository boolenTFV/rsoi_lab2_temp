process.env.NODE_ENV = 'test';
const {scheduleOneBody} = require('./stubs/schedule_stubs');
const {busBody} = require('./stubs/bus_stubs');
const {driverBody} = require('./stubs/driver_stubs');
const scheduleResolver = require('../../resolvers/schedule');
const sinon = require('sinon');
const request = require('request-promise');
const chai = require('chai');
var Bluebird = require('bluebird');

const expect = chai.expect;
describe('schedule query test', () => {
	beforeEach(() => {
		this.get = sinon.stub(request, 'get');
	});
	afterEach(() => {
		this.get.restore();
	});
	it('get schedule.bus', (done)=>{
		this.get.returns(Bluebird.resolve([busBody]));
		scheduleResolver.bus(scheduleOneBody).then(res=>{
            console.log(res);
			expect(res).to.equal(busBody);
		}).then(()=>done());
	});

	it('get schedule.driver', (done)=>{
		this.get.returns(Bluebird.resolve([driverBody]));
		scheduleResolver.driver(scheduleOneBody).then(res=>{
            console.log(res);
			expect(res).to.equal(driverBody);
		}).then(()=>done());
	});
});