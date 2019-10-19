process.env.NODE_ENV = 'test';
const {busBody} = require('./stubs/bus_stubs');
const busMutationResolver = require('../../resolvers/mutation/bus');
const sinon = require('sinon');
const request = require('request-promise');
const chai = require('chai');
var Bluebird = require('bluebird');

const expect = chai.expect;
describe('mutation buses test', () => {
	it('add bus', (done)=>{
        var post = sinon.stub(request, 'post')
            .returns(Bluebird.resolve(busBody));
		var params = {
            input:{busBody}
		}
		busMutationResolver.addBus(null,params).then(res=>{
			expect(res).to.deep.equal(busBody);
		}).then(()=>done()).finally(()=>post.restore());
    });

    it('set bus', (done)=>{
        var patch = sinon.stub(request, 'patch')
            .returns(Bluebird.resolve(busBody));
		var params = {
            id:1,
            input:{busBody}
		}
		busMutationResolver.setBus(null,params).then(res=>{
			expect(res).to.deep.equal(busBody);
		}).then(()=>done()).finally(()=>patch.restore());
	});
    
    it('delete bus', (done)=>{
		var params = {
            id:1
		}
        var del = sinon.stub(request, 'delete')
            .returns(Bluebird.resolve(params));
        var get = sinon.stub(request, 'get')
            .returns(Bluebird.resolve([]));
        console.log("Что-то")
		busMutationResolver.deleteBus(null,params).then(res=>{
            console.log(res,params.id)
			expect(res).to.deep.equal(params.id);
        }).then(()=>{
            del.restore();
            get.restore();    
            done();
        })
	});
});

