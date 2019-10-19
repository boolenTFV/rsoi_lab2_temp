process.env.NODE_ENV = 'test';
const {driverBody,driversBody} = require('./stubs/driver_stubs');
const driverQueryResolver = require('../../resolvers/query/driver');
const sinon = require('sinon');
const request = require('request-promise');
const chai = require('chai');
var Bluebird = require('bluebird');

const expect = chai.expect;
describe('Drivers query test', () => {
	beforeEach(() => {
		this.get = sinon.stub(request, 'get');
	});
	afterEach(() => {
		this.get.restore();
	});
	it('get drivers', (done)=>{
		this.get.returns(Bluebird.resolve(driversBody));
		var pagination = {page:1, size: driversBody.length}
		var params = {
            id:1,
            name: "Name",
            lastName: "Lastname",
            birthDate: "2012-12-12",
			pagination:pagination
		}
		driverQueryResolver.drivers(null,params).then(res=>{
			expect(res).to.deep.equal({
				currentPage: pagination.page,
				perPage: pagination.size,
				total: driversBody.length,
				totalPages: 1,
				data: driversBody
			});
		}).then(()=>done());
	});

	it('get driver', (done)=>{
		this.get.returns(Bluebird.resolve([driverBody]));
		var params = {id:1};
		driverQueryResolver.driver(null,params).then(res=>{
			expect(res).to.deep.equal(driverBody);
		}).then(()=>done());
	});
});