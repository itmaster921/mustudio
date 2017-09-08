'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newStudio;

describe('Studio API:', function() {
  describe('GET /api/studios', function() {
    var studios;

    beforeEach(function(done) {
      request(app)
        .get('/api/studios')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          studios = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      studios.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/studios', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/studios')
        .send({
          name: 'New Studio',
          info: 'This is the brand new studio!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newStudio = res.body;
          done();
        });
    });

    it('should respond with the newly created studio', function() {
      newStudio.name.should.equal('New Studio');
      newStudio.info.should.equal('This is the brand new studio!!!');
    });
  });

  describe('GET /api/studios/:id', function() {
    var studio;

    beforeEach(function(done) {
      request(app)
        .get(`/api/studios/${newStudio._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          studio = res.body;
          done();
        });
    });

    afterEach(function() {
      studio = {};
    });

    it('should respond with the requested studio', function() {
      studio.name.should.equal('New Studio');
      studio.info.should.equal('This is the brand new studio!!!');
    });
  });

  describe('PUT /api/studios/:id', function() {
    var updatedStudio;

    beforeEach(function(done) {
      request(app)
        .put(`/api/studios/${newStudio._id}`)
        .send({
          name: 'Updated Studio',
          info: 'This is the updated studio!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedStudio = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStudio = {};
    });

    it('should respond with the updated studio', function() {
      updatedStudio.name.should.equal('Updated Studio');
      updatedStudio.info.should.equal('This is the updated studio!!!');
    });

    it('should respond with the updated studio on a subsequent GET', function(done) {
      request(app)
        .get(`/api/studios/${newStudio._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let studio = res.body;

          studio.name.should.equal('Updated Studio');
          studio.info.should.equal('This is the updated studio!!!');

          done();
        });
    });
  });

  describe('PATCH /api/studios/:id', function() {
    var patchedStudio;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/studios/${newStudio._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Studio' },
          { op: 'replace', path: '/info', value: 'This is the patched studio!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedStudio = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedStudio = {};
    });

    it('should respond with the patched studio', function() {
      patchedStudio.name.should.equal('Patched Studio');
      patchedStudio.info.should.equal('This is the patched studio!!!');
    });
  });

  describe('DELETE /api/studios/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/studios/${newStudio._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when studio does not exist', function(done) {
      request(app)
        .delete(`/api/studios/${newStudio._id}`)
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
