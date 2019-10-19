process.env.NODE_ENV = 'test';
const {scheduleBody} = require('./stubs/schedule_stubs');
const scheduleMutationResolver = require('../../resolvers/mutation/schedule');
const sinon = require('sinon');
const request = require('request-promise');
const chai = require('chai');
var Bluebird = require('bluebird');

const expect = chai.expect;
describe('mutation buses test', () => {
	it('add schedule', (done)=>{
        var post = sinon.stub(request, 'post')
            .returns(Bluebird.resolve(scheduleBody));
		var params = {
            input:{scheduleBody}
		}
		scheduleMutationResolver.addSchedule(null,params).then(res=>{
			expect(res).to.deep.equal(scheduleBody);
		}).then(()=>done()).finally(()=>post.restore());
    });

    it('set schedule', (done)=>{
        var patch = sinon.stub(request, 'patch')
            .returns(Bluebird.resolve(scheduleBody));
		var params = {
            id:1,
            input:{scheduleBody}
		}
		scheduleMutationResolver.setSchedule(null,params).then(res=>{
			expect(res).to.deep.equal(scheduleBody);
		}).then(()=>done()).finally(()=>patch.restore());
	});
    
    it('delete schedule', (done)=>{
		var params = {
            id:1
		}
    var del = sinon.stub(request, 'delete')
        .returns(Bluebird.resolve(params));
		scheduleMutationResolver.deleteSchedule(null,params).then(res=>{
            console.log(res,params.id)
			expect(res).to.equal(params.id);
        }).then(()=>{
            del.restore();   
            done();
        })
	});
});

