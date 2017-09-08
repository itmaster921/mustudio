'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var sectionCtrlStub = {
  index: 'sectionCtrl.index',
  show: 'sectionCtrl.show',
  create: 'sectionCtrl.create',
  upsert: 'sectionCtrl.upsert',
  patch: 'sectionCtrl.patch',
  destroy: 'sectionCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sectionIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './section.controller': sectionCtrlStub
});

describe('Section API Router:', function() {
  it('should return an express router instance', function() {
    sectionIndex.should.equal(routerStub);
  });

  describe('GET /api/sections', function() {
    it('should route to section.controller.index', function() {
      routerStub.get
        .withArgs('/', 'sectionCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/sections/:id', function() {
    it('should route to section.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'sectionCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/sections', function() {
    it('should route to section.controller.create', function() {
      routerStub.post
        .withArgs('/', 'sectionCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/sections/:id', function() {
    it('should route to section.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'sectionCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sections/:id', function() {
    it('should route to section.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'sectionCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sections/:id', function() {
    it('should route to section.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'sectionCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
