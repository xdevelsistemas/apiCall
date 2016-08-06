/**
 * Created by david on 04/03/16.
 */

'use strict';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const api = require('../lib/apiCall')("", "http://httpbin.org", null);

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
            let body = {post: "apiCall"};

            api.apiCall('/post', api.method.POST, body)
                .then(function(data){
                    expect(data).to.have.ownProperty('data');
                    expect(data.data).to.be.a('object');
                    expect(data.status).to.equal(200);
                    done();
                });

        });
        it('PUT', function (done) {
            let body = {put: "apiCall"};

            api.apiCall('/put', api.method.PUT, body)
                .then(function(data){
                    expect(data).to.have.ownProperty('data');
                    expect(data.data).to.be.a('object');
                    expect(data.status).to.equal(200);
                    done();
                });

        });
        it('DELETE', function (done) {
            let body = {delete: "apiCall"};

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