// Generated by ReScript, PLEASE EDIT WITH CARE

import * as ErrorHandler from "./ErrorHandler.js";

function notification(n) {
  return [
          String(n),
          ""
        ];
}

var Error2 = {
  notification: notification
};

var MyErrorHandler = ErrorHandler.Make(Error2);

export {
  Error2 ,
  MyErrorHandler ,
  
}
/* MyErrorHandler Not a pure module */
