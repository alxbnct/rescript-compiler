'use strict';


function construct(b) {
  if (b) {
    return {
            n: 0
          };
  } else {
    return {};
  }
}

var er = {};

exports.construct = construct;
exports.er = er;
/* No side effect */
