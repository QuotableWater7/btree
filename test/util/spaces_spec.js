'use strict';

var chai = require('chai');
var expect = chai.expect;
var spaces = require('../../src/util/spaces');

describe('#spaces', function () {
  it('returns the number of spaces passed in as first argument', function () {
    var generated = spaces(22);
    expect(generated.length).to.eq(22);

    for (var i=0, len=generated.length; i<len; i++) {
      expect(generated.charAt(i)).to.eq(' ');
    }
  });
});
