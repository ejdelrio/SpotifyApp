"use strict";

class CommonWorkItems {
  static ValidateIsNotNull(obj, objName) {
    if (obj === null || obj === undefined) {
      throw new ReferenceError(objName);
    }
  }

  static ValidateIsNotNullOrWhiteSpace(str, strName) {
    if (CommonWorkItems.StringIsNotNullOrWhiteSpace(str)) {
      throw new Error(strName);
    }
  }

  static StringIsNotNullOrWhiteSpace(str) {
    CommonWorkItems.ValidateIsNotNull(str, "string");

    if (str.length === 0) {
      return true;
    }

    for (let i = 0; i < str.length; i++) {
      if (str[i] != " ") {
        return false
      }
    }

    return true;
  }
}

module.exports = CommonWorkItems;