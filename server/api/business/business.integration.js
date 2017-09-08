'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newBusiness;

describe('Business API:', function() {
  describe('GET /api/business', function() {
    var businesss;

    beforeEach(function(done) {
      request(app)
        .get('/api/business')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          businesss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      businesss.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/business', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/business')
        .send({
          name: 'New Business',
          info: 'This is the brand new business!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBusiness = res.body;
          done();
        });
    });

    it('should respond with the newly created business', function() {
      newBusiness.name.should.equal('New Business');
      newBusiness.info.should.equal('This is the brand new business!!!');
    });
  });

  describe('GET /api/business/:id', function() {
    var business;

    beforeEach(function(done) {
      request(app)
        .get(`/api/business/${newBusiness._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          business = res.body;
          done();
        });
    });

    afterEach(function() {
      business = {};
    });

    it('should respond with the requested business', function() {
      business.name.should.equal('New Business');
      business.info.should.equal('This is the brand new business!!!');
    });
  });

  describe('PUT /api/business/:id', function() {
    var updatedBusiness;

    beforeEach(function(done) {
      request(app)
        .put(`/api/business/${newBusiness._id}`)
        .send({
          name: 'Updated Business',
          info: 'This is the updated business!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBusiness = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBusiness = {};
    });

    it('should respond with the updated business', function() {
      updatedBusiness.name.should.equal('Updated Business');
      updatedBusiness.info.should.equal('This is the updated business!!!');
    });

    it('should respond with the updated business on a subsequent GET', function(done) {
      request(app)
        .get(`/api/business/${newBusiness._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let business = res.body;

          business.name.should.equal('Updated Business');
          business.info.should.equal('This is the updated business!!!');

          done();
        });
    });
  });

  describe('PATCH /api/business/:id', function() {
    var patchedBusiness;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/business/${newBusiness._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Business' },
          { op: 'replace', path: '/info', value: 'This is the patched business!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBusiness = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBusiness = {};
    });

    it('should respond with the patched business', function() {
      patchedBusiness.name.should.equal('Patched Business');
      patchedBusiness.info.should.equal('This is the patched business!!!');
    });
  });

  describe('DELETE /api/business/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/business/${newBusiness._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when business does not exist', function(done) {
      request(app)
        .delete(`/api/business/${newBusiness._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
