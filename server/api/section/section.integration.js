'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newSection;

describe('Section API:', function() {
  describe('GET /api/sections', function() {
    var sections;
    beforeEach(function(done) {
      request(app)
        .get('/api/sections')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sections = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      sections.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/sections', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sections')
        .send({
          name: 'New Section',
          info: 'This is the brand new section!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSection = res.body;
          done();
        });
    });

    it('should respond with the newly created section', function() {
      newSection.name.should.equal('New Section');
      newSection.info.should.equal('This is the brand new section!!!');
    });
  });

  describe('GET /api/sections/:id', function() {
    var section;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sections/${newSection._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          section = res.body;
          done();
        });
    });

    afterEach(function() {
      section = {};
    });

    it('should respond with the requested section', function() {
      section.name.should.equal('New Section');
      section.info.should.equal('This is the brand new section!!!');
    });
  });

  describe('PUT /api/sections/:id', function() {
    var updatedSection;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sections/${newSection._id}`)
        .send({
          name: 'Updated Section',
          info: 'This is the updated section!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSection = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSection = {};
    });

    it('should respond with the updated section', function() {
      updatedSection.name.should.equal('Updated Section');
      updatedSection.info.should.equal('This is the updated section!!!');
    });

    it('should respond with the updated section on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sections/${newSection._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let section = res.body;

          section.name.should.equal('Updated Section');
          section.info.should.equal('This is the updated section!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sections/:id', function() {
    var patchedSection;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sections/${newSection._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Section' },
          { op: 'replace', path: '/info', value: 'This is the patched section!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSection = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSection = {};
    });

    it('should respond with the patched section', function() {
      patchedSection.name.should.equal('Patched Section');
      patchedSection.info.should.equal('This is the patched section!!!');
    });
  });

  describe('DELETE /api/sections/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sections/${newSection._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when section does not exist', function(done) {
      request(app)
        .delete(`/api/sections/${newSection._id}`)
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
