'use strict';

describe('Service: business', function() {
  // load the service's module
  beforeEach(module('mustudioApp.api'));

  // instantiate service
  var business;
  beforeEach(inject(function(_business_) {
    business = _business_;
  }));

  it('should do something', function() {
    expect(!!business).toBe(true);
  });
});
