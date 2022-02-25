"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRenderBody = onRenderBody;
exports.wrapRootElement = void 0;

var _react = _interopRequireDefault(require("react"));

var _config = require("./config");

var _provider = require("./provider");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-unused-vars
var wrapRootElement = function wrapRootElement(_ref, _ref2) {
  var element = _ref.element;
  var _ref2$queries = _ref2.queries,
      queries = _ref2$queries === void 0 ? null : _ref2$queries;
  return /*#__PURE__*/_react["default"].createElement(_provider.TractStackProvider, {
    queries: queries !== null ? queries : _config.defaultQueries
  }, element);
};

exports.wrapRootElement = wrapRootElement;

function onRenderBody(_ref3) {
  var setHeadComponents = _ref3.setHeadComponents;
  setHeadComponents([/*#__PURE__*/_react["default"].createElement("script", {
    src: "https://unpkg.com/scrollreveal"
  })]);
}
//# sourceMappingURL=gatsby-ssr.js.map