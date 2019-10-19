process.env.NODE_ENV = 'test';
const {busBody,busesBody} = require('./stubs/bus_stubs');
const busQueryResolver = require('../../resolvers/query/bus');
const sinon = require('sinon');
const request = require('request-promise');
const chai = require('chai');
var Bluebird = require('bluebird');

const expect = chai.expect;
describe('buses query test', () => {
	beforeEach(() => {
		this.get = sinon.stub(request, 'get');
	});
	afterEach(() => {
		this.get.restore();
	});
	it('get buses', (done)=>{
		this.get.returns(Bluebird.resolve(busesBody));
		var pagination = {page:1, size: busesBody.length}
		var params = {
			model:null,
			licensePlate:null,
			startDate:null,
			pagination:pagination
		}
		busQueryResolver.buses(null,params).then(res=>{
			expect(res).to.deep.equal({
				currentPage: pagination.page,
				perPage: pagination.size,
				total: busesBody.length,
				totalPages: 1,
				data: busesBody
			});
		}).then(()=>done());
	});

	it('get bus', (done)=>{
		this.get.returns(Bluebird.resolve([busBody]));
		var params = {id:1};
		busQueryResolver.bus(null,params).then(res=>{
			expect(res).to.deep.equal(busBody);
		}).then(()=>done());
	});
});