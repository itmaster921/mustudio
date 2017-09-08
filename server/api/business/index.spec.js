'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var businessCtrlStub = {
  index: 'businessCtrl.index',
  show: 'businessCtrl.show',
  create: 'businessCtrl.create',
  upsert: 'businessCtrl.upsert',
  patch: 'businessCtrl.patch',
  destroy: 'businessCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var businessIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './business.controller': businessCtrlStub
});

describe('Business API Router:', function() {
  it('should return an express router instance', function() {
    businessIndex.should.equal(routerStub);
  });

  describe('GET /api/business', function() {
    it('should route to business.controller.index', function() {
      routerStub.get
        .withArgs('/', 'businessCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/business/:id', function() {
    it('should route to business.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'businessCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/business', function() {
    it('should route to business.controller.create', function() {
      routerStub.post
        .withArgs('/', 'businessCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/business/:id', function() {
    it('should route to business.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'businessCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/business/:id', function() {
    it('should route to business.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'businessCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/business/:id', function() {
    it('should route to business.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'businessCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
