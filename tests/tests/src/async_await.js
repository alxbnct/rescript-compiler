// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


function next(n) {
  return n + 1 | 0;
}

async function useNext() {
  return 4;
}

function Make(I) {
  let get = async key => await I.get(key);
  return {
    get: get
  };
}

async function topFoo() {
  return 1;
}

let arr = [
  1,
  2,
  3
];

let toplevelAwait = await topFoo();

let toplevelAwait2 = arr[await topFoo()];

async function f(value) {
  return await Promise.resolve(1);
}

exports.next = next;
exports.useNext = useNext;
exports.Make = Make;
exports.topFoo = topFoo;
exports.arr = arr;
exports.toplevelAwait = toplevelAwait;
exports.toplevelAwait2 = toplevelAwait2;
exports.f = f;
/* toplevelAwait Not a pure module */
