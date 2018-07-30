"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _pandaSkyMixin = require("panda-sky-mixin");

var _pandaSkyMixin2 = _interopRequireDefault(_pandaSkyMixin);

var _fairmont = require("fairmont");

var _pandaSerialize = require("panda-serialize");

var _preprocessor = require("./preprocessor");

var _preprocessor2 = _interopRequireDefault(_preprocessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getFilePath, mixin;

//import cli from "./cli"
getFilePath = function (name) {
  return (0, _path.resolve)(__dirname, "..", "..", "..", "files", name);
};

mixin = _asyncToGenerator(function* () {
  var CuddleMonkey, schema, template;
  schema = (0, _pandaSerialize.yaml)((yield (0, _fairmont.read)(getFilePath("schema.yaml"))));
  template = yield (0, _fairmont.read)(getFilePath("template.yaml"));
  CuddleMonkey = new _pandaSkyMixin2.default({
    name: "cuddle-monkey",
    schema,
    template,
    preprocess: _preprocessor2.default
  });
  //cli
  //getPolicyStatements
  return CuddleMonkey;
})();

exports.default = mixin;