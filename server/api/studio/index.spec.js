'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var studioCtrlStub = {
  index: 'studioCtrl.index',
  show: 'studioCtrl.show',
  create: 'studioCtrl.create',
  upsert: 'studioCtrl.upsert',
  patch: 'studioCtrl.patch',
  destroy: 'studioCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var studioIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './studio.controller': studioCtrlStub
});

describe('Studio API Router:', function() {
  it('should return an express router instance', function() {
    studioIndex.should.equal(routerStub);
  });

  describe('GET /api/studios', function() {
    it('should route to studio.controller.index', function() {
      routerStub.get
        .withArgs('/', 'studioCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/studios/:id', function() {
    it('should route to studio.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'studioCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/studios', function() {
    it('should route to studio.controller.create', function() {
      routerStub.post
        .withArgs('/', 'studioCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/studios/:id', function() {
    it('should route to studio.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'studioCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/studios/:id', function() {
    it('should route to studio.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'studioCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/studios/:id', function() {
    it('should route to studio.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'studioCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
