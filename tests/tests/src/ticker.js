// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

let Belt_List = require("rescript/lib/js/Belt_List.js");
let Belt_Float = require("rescript/lib/js/Belt_Float.js");
let Pervasives = require("rescript/lib/js/Pervasives.js");
let Belt_Option = require("rescript/lib/js/Belt_Option.js");
let Primitive_int = require("rescript/lib/js/Primitive_int.js");
let Belt_MapString = require("rescript/lib/js/Belt_MapString.js");
let Primitive_option = require("rescript/lib/js/Primitive_option.js");

function split(delim, s) {
  let len = s.length;
  if (len !== 0) {
    let _l = /* [] */0;
    let _x = len;
    while (true) {
      let x = _x;
      let l = _l;
      if (x === 0) {
        return l;
      }
      let i$p = s.lastIndexOf(delim, x - 1 | 0);
      if (i$p === -1) {
        return {
          hd: s.substr(0, x),
          tl: l
        };
      }
      let l_0 = s.substr(i$p + 1 | 0, (x - i$p | 0) - 1 | 0);
      let l$1 = {
        hd: l_0,
        tl: l
      };
      let l$2 = i$p === 0 ? ({
          hd: "",
          tl: l$1
        }) : l$1;
      _x = i$p;
      _l = l$2;
      continue;
    };
  } else {
    return /* [] */0;
  }
}

function string_of_float_option(x) {
  if (x !== undefined) {
    return x.toString();
  } else {
    return "nan";
  }
}

let Util = {
  split: split,
  string_of_float_option: string_of_float_option
};

function string_of_rank(x) {
  if (typeof x !== "object") {
    if (x === "Uninitialized") {
      return "Uninitialized";
    } else {
      return "Visited";
    }
  } else {
    return "Ranked(" + x._0 + ")";
  }
}

function find_ticker_by_name(all_tickers, ticker) {
  return Belt_Option.getExn(Belt_List.getBy(all_tickers, param => param.ticker_name === ticker));
}

function print_all_composite(all_tickers) {
  Belt_List.forEach(all_tickers, x => {
    let tmp = x.type_;
    if (typeof tmp !== "object") {
      return;
    }
    console.log(x.ticker_name);
  });
}

function compute_update_sequences(all_tickers) {
  Belt_List.reduceReverse(all_tickers, 0, (counter, ticker) => {
    let loop = (counter, ticker) => {
      let rank = ticker.rank;
      if (typeof rank === "object") {
        return counter;
      }
      if (rank !== "Uninitialized") {
        return counter;
      }
      ticker.rank = "Visited";
      let match = ticker.type_;
      if (typeof match !== "object") {
        let counter$1 = counter + 1 | 0;
        ticker.rank = {
          TAG: "Ranked",
          _0: counter$1
        };
        return counter$1;
      }
      let match$1 = match._0;
      let counter$2 = loop(counter, match$1.lhs);
      let counter$3 = loop(counter$2, match$1.rhs);
      let counter$4 = counter$3 + 1 | 0;
      ticker.rank = {
        TAG: "Ranked",
        _0: counter$4
      };
      return counter$4;
    };
    return loop(counter, ticker);
  });
  let map = Belt_List.reduceReverse(Belt_List.reverse(all_tickers), undefined, (map, ticker) => {
    let tmp = ticker.type_;
    if (typeof tmp !== "object") {
      return Belt_MapString.set(map, ticker.ticker_name, {
        hd: ticker,
        tl: /* [] */0
      });
    }
    let loop = (_up, _map, _ticker) => {
      while (true) {
        let ticker = _ticker;
        let map = _map;
        let up = _up;
        let type_ = ticker.type_;
        let ticker_name = ticker.ticker_name;
        if (typeof type_ !== "object") {
          let l = Belt_MapString.getExn(map, ticker_name);
          return Belt_MapString.set(map, ticker_name, Pervasives.$at(up, l));
        }
        let match = type_._0;
        let map$1 = loop({
          hd: ticker,
          tl: up
        }, map, match.lhs);
        _ticker = match.rhs;
        _map = map$1;
        _up = {
          hd: ticker,
          tl: up
        };
        continue;
      };
    };
    return loop(/* [] */0, map, ticker);
  });
  return Belt_MapString.reduce(map, map, (map, k, l) => {
    let l$1 = Belt_List.sort(l, (lhs, rhs) => {
      let x = lhs.rank;
      if (typeof x !== "object") {
        return Pervasives.failwith("All nodes should be ranked");
      }
      let y = rhs.rank;
      if (typeof y !== "object") {
        return Pervasives.failwith("All nodes should be ranked");
      } else {
        return Primitive_int.compare(x._0, y._0);
      }
    });
    return Belt_MapString.set(map, k, l$1);
  });
}

function process_quote(ticker_map, new_ticker, new_value) {
  let update_sequence = Belt_MapString.getExn(ticker_map, new_ticker);
  Belt_List.forEach(update_sequence, ticker => {
    let match = ticker.type_;
    if (typeof match !== "object") {
      if (ticker.ticker_name === new_ticker) {
        ticker.value = new_value;
        return;
      } else {
        return Pervasives.failwith("Only single Market ticker should be udpated upon a new quote");
      }
    }
    let match$1 = match._0;
    let match$2 = match$1.lhs.value;
    let match$3 = match$1.rhs.value;
    let value = match$2 !== undefined && match$3 !== undefined ? (
        match$1.op === "PLUS" ? match$2 + match$3 : match$2 - match$3
      ) : undefined;
    ticker.value = value;
  });
}

function process_input_line(ticker_map, all_tickers, line) {
  let make_binary_op = (ticker_name, lhs, rhs, op) => {
    let lhs$1 = find_ticker_by_name(all_tickers, lhs);
    let rhs$1 = find_ticker_by_name(all_tickers, rhs);
    return {
      value: undefined,
      rank: "Uninitialized",
      ticker_name: ticker_name,
      type_: {
        TAG: "Binary_op",
        _0: {
          op: op,
          rhs: rhs$1,
          lhs: lhs$1
        }
      }
    };
  };
  let tokens = split("|", line);
  if (!tokens) {
    return Pervasives.failwith("Invalid input line");
  }
  switch (tokens.hd) {
    case "Q" :
      let match = tokens.tl;
      if (!match) {
        return Pervasives.failwith("Invalid input line");
      }
      let match$1 = match.tl;
      if (!match$1) {
        return Pervasives.failwith("Invalid input line");
      }
      if (match$1.tl) {
        return Pervasives.failwith("Invalid input line");
      }
      let ticker_map$1 = ticker_map !== undefined ? Primitive_option.valFromOption(ticker_map) : compute_update_sequences(all_tickers);
      let value = Belt_Option.getExn(Belt_Float.fromString(match$1.hd));
      process_quote(ticker_map$1, match.hd, value);
      return [
        all_tickers,
        Primitive_option.some(ticker_map$1)
      ];
    case "R" :
      let match$2 = tokens.tl;
      if (!match$2) {
        return Pervasives.failwith("Invalid input line");
      }
      let match$3 = match$2.tl;
      if (!match$3) {
        return Pervasives.failwith("Invalid input line");
      }
      let ticker_name = match$2.hd;
      switch (match$3.hd) {
        case "+" :
          let match$4 = match$3.tl;
          if (!match$4) {
            return Pervasives.failwith("Invalid input line");
          }
          let match$5 = match$4.tl;
          if (match$5 && !match$5.tl) {
            return [
              {
                hd: make_binary_op(ticker_name, match$4.hd, match$5.hd, "PLUS"),
                tl: all_tickers
              },
              ticker_map
            ];
          } else {
            return Pervasives.failwith("Invalid input line");
          }
        case "-" :
          let match$6 = match$3.tl;
          if (!match$6) {
            return Pervasives.failwith("Invalid input line");
          }
          let match$7 = match$6.tl;
          if (match$7 && !match$7.tl) {
            return [
              {
                hd: make_binary_op(ticker_name, match$6.hd, match$7.hd, "MINUS"),
                tl: all_tickers
              },
              ticker_map
            ];
          } else {
            return Pervasives.failwith("Invalid input line");
          }
        case "S" :
          if (match$3.tl) {
            return Pervasives.failwith("Invalid input line");
          } else {
            return [
              {
                hd: {
                  value: undefined,
                  rank: "Uninitialized",
                  ticker_name: ticker_name,
                  type_: "Market"
                },
                tl: all_tickers
              },
              ticker_map
            ];
          }
        default:
          return Pervasives.failwith("Invalid input line");
      }
    default:
      return Pervasives.failwith("Invalid input line");
  }
}

function loop(_lines, _param) {
  while (true) {
    let param = _param;
    let lines = _lines;
    let all_tickers = param[0];
    if (!lines) {
      return print_all_composite(all_tickers);
    }
    _param = process_input_line(param[1], all_tickers, lines.hd);
    _lines = lines.tl;
    continue;
  };
}

let Ticker_map;

let lines = {
  hd: "R|MSFT|S",
  tl: {
    hd: "R|IBM|S",
    tl: {
      hd: "R|FB|S",
      tl: {
        hd: "R|CP1|+|MSFT|IBM",
        tl: {
          hd: "R|CP2|-|FB|IBM",
          tl: {
            hd: "R|CP12|+|CP1|CP2",
            tl: {
              hd: "Q|MSFT|120.",
              tl: {
                hd: "Q|IBM|130.",
                tl: {
                  hd: "Q|FB|80.",
                  tl: /* [] */0
                }
              }
            }
          }
        }
      }
    }
  }
};

exports.Util = Util;
exports.string_of_rank = string_of_rank;
exports.find_ticker_by_name = find_ticker_by_name;
exports.print_all_composite = print_all_composite;
exports.Ticker_map = Ticker_map;
exports.compute_update_sequences = compute_update_sequences;
exports.process_quote = process_quote;
exports.process_input_line = process_input_line;
exports.lines = lines;
exports.loop = loop;
/* No side effect */
