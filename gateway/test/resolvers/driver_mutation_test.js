process.env.NODE_ENV = 'test';
const {driverBody} = require('./stubs/driver_stubs');
const driverMutationResolver = require('../../resolvers/mutation/driver');
const sinon = require('sinon');
const request = require('request-promise');
const chai = require('chai');
var Bluebird = require('bluebird');

const expect = chai.expect;
describe('mutation drivers test', () => {
	it('add bus', (done)=>{
        var post = sinon.stub(request, 'post')
            .returns(Bluebird.resolve(driverBody));
		var params = {
            input:{driverBody}
		}
		driverMutationResolver.addDriver(null,params).then(res=>{
			expect(res).to.deep.equal(driverBody);
		}).then(()=>done()).finally(()=>post.restore());
    });

    it('set driver', (done)=>{
        var patch = sinon.stub(request, 'patch')
            .returns(Bluebird.resolve(driverBody));
		var params = {
            id:1,
            input:{driverBody}
		}
		driverMutationResolver.setDriver(null,params).then(res=>{
			expect(res).to.deep.equal(driverBody);
		}).then(()=>done()).finally(()=>patch.restore());
	});
    
    it('delete driver', (done)=>{
		var params = {
            id:1
		}
        var del = sinon.stub(request, 'delete')
            .returns(Bluebird.resolve(params));
        var get = sinon.stub(request, 'get')
            .returns(Bluebird.resolve([]));
        console.log("Что-то")
		driverMutationResolver.deleteDriver(null,params).then(res=>{
            console.log(res,params.id)
			expect(res).to.deep.equal(params.id);
        }).then(()=>{
            del.restore();
            get.restore();    
            done();
        })
	});
});

