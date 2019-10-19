process.env.NODE_ENV = 'test';
const {scheduleOneBody,scheduleBody} = require('./stubs/schedule_stubs');
const scheduleQueryResolver = require('../../resolvers/query/schedule');
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
	it('get schedule', (done)=>{
		this.get.returns(Bluebird.resolve(scheduleBody));
		var pagination = {page:1, size: scheduleBody.length}
		var params = {
			model:null,
			licensePlate:null,
			startDate:null,
			pagination:pagination
		}
		scheduleQueryResolver.schedule(null,params).then(res=>{
			expect(res).to.deep.equal({
				currentPage: pagination.page,
				perPage: pagination.size,
				total: scheduleBody.length,
				totalPages: 1,
				data: scheduleBody
			});
		}).then(()=>done());
	});

	it('get schedule one', (done)=>{
		this.get.returns(Bluebird.resolve([scheduleOneBody]));
		var params = {id:1};
		scheduleQueryResolver.scheduleOne(null,params).then(res=>{
			expect(res).to.deep.equal(scheduleOneBody);
		}).then(()=>done());
	});
});