// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Primitive_object = require("rescript/lib/js/Primitive_object.js");
let Primitive_option = require("rescript/lib/js/Primitive_option.js");

function eq_A(x, y) {
  if (x.TAG === "A" && y.TAG === "A") {
    return x._0 === y._0;
  } else {
    return false;
  }
}

function Test($star) {
  console.log("no inline");
  let u = {
    TAG: "A",
    _0: 3
  };
  let Block = {};
  let b = eq_A({
    TAG: "A",
    _0: 3
  }, u);
  return {
    u: u,
    Block: Block,
    y: 32,
    b: b
  };
}

function Test2($star) {
  console.log("no inline");
  let Block = {};
  let b = eq_A({
    TAG: "A",
    _0: 3
  }, {
    TAG: "A",
    _0: 3
  });
  return {
    Block: Block,
    y: 32,
    b: b
  };
}

function f(i, y) {
  let x = {
    TAG: "A",
    _0: i
  };
  return eq_A(x, y);
}

function Test3($star) {
  let f = Primitive_object.equal;
  let Caml_obj = {};
  return {
    f: f,
    Caml_obj: Caml_obj
  };
}

function Test4($star) {
  let Caml_obj = {};
  let f = Primitive_object.equal;
  return {
    Caml_obj: Caml_obj,
    f: f
  };
}

function Test5($star) {
  let f = x => Primitive_option.some(x);
  let Caml_option = {};
  return {
    f: f,
    Caml_option: Caml_option
  };
}

function Test6($star) {
  let Caml_option = {};
  let f = x => Primitive_option.some(x);
  return {
    Caml_option: Caml_option,
    f: f
  };
}

function Test7($star) {
  let Caml_option = {};
  return {
    Caml_option: Caml_option
  };
}

function Test8($star) {
  let Curry = {};
  let f = x => x(1);
  return {
    Curry: Curry,
    f: f
  };
}

function Test9($star) {
  let f = x => x(1);
  let Curry = {};
  return {
    f: f,
    Curry: Curry
  };
}

function Test10($star) {
  let Curry = {};
  return {
    Curry: Curry
  };
}

let x = 3;

exports.eq_A = eq_A;
exports.Test = Test;
exports.Test2 = Test2;
exports.x = x;
exports.f = f;
exports.Test3 = Test3;
exports.Test4 = Test4;
exports.Test5 = Test5;
exports.Test6 = Test6;
exports.Test7 = Test7;
exports.Test8 = Test8;
exports.Test9 = Test9;
exports.Test10 = Test10;
/* No side effect */
