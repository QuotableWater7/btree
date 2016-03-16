'use strict';

module.exports = function (number) {
  var spaces = '';
  for (var i = 0; i < number; i++) { spaces += ' '; }
  return spaces;
};
