/**
 * Created by david on 04/03/16.
 */
/**
 * Created by david on 25/11/15.
 */
(function() {
    'use strict';

    var chai = require('chai');
    var should = chai.should();
    var expect = chai.expect;
    var api = require('../lib/apiCall')("", "http://httpbin.org", "");

    describe('ApiCall', function () {

        describe('CRUD', function () {

            it('GET', function (done) {

                api.apiCall('/get', api.method.GET, null)
                    .then(function(data){
                        expect(data).to.have.ownProperty('data');
                        expect(data.data).to.be.a('object');
                        expect(data.status).to.equal(200);
                        done();
                });

            });
            it('POST', function (done) {
                var body = {post: "apiCall"};

                api.apiCall('/post', api.method.POST, body)
                    .then(function(data){
                        expect(data).to.have.ownProperty('data');
                        expect(data.data).to.be.a('object');
                        expect(data.status).to.equal(200);
                        done();
                });

            });
            it('PUT', function (done) {
                var body = {put: "apiCall"};

                api.apiCall('/put', api.method.PUT, body)
                    .then(function(data){
                        expect(data).to.have.ownProperty('data');
                        expect(data.data).to.be.a('object');
                        expect(data.status).to.equal(200);
                        done();
                });

            });
            it('DELETE', function (done) {
                var body = {delete: "apiCall"};

                api.apiCall('/delete', api.method.DELETE, body)
                    .then(function(data){
                        expect(data).to.have.ownProperty('data');
                        expect(data.data).to.be.a('object');
                        expect(data.status).to.equal(200);
                        done();
                });

            });
        });

    });
})();