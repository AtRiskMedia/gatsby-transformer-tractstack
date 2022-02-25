"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TractStackProvider = exports.TractStackContext = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultValue = {};
var TractStackContext = /*#__PURE__*/(0, _react.createContext)(defaultValue);
exports.TractStackContext = TractStackContext;

var TractStackProvider = function TractStackProvider(_ref) {
  var children = _ref.children,
      queries = _ref.queries;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      queryMatch = _useState2[0],
      setQueryMatch = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      storystep = _useState4[0],
      setStorystep = _useState4[1];

  var gotoStorystep = function gotoStorystep(storystep_goto) {
    localStorage.setItem('storystep', JSON.stringify(storystep_goto));
    setStorystep(storystep_goto);
  };

  var nextStorystep = function nextStorystep() {
    var num_storysteps = JSON.parse(localStorage.getItem('num_storysteps'));

    if (storystep < num_storysteps) {
      localStorage.setItem('storystep', JSON.stringify(storystep + 1));
      setStorystep(storystep + 1);
    }
  };

  var prevStorystep = function prevStorystep() {
    localStorage.setItem('storystep', JSON.stringify(Math.min(1, storystep - 1)));
    setStorystep(Math.min(storystep - 1));
  };

  if (typeof window !== 'undefined' && document) {
    // set scrollbar offset variable
    var _document = document,
        body = _document.body;
    var scrollDiv = document.createElement('div'); // Append element with defined styling

    scrollDiv.setAttribute('style', 'width: 1337px; height: 1337px; position: absolute; left: -9999px; overflow: scroll;');
    body.appendChild(scrollDiv); // Collect width & height of scrollbar
    // from https://tobbelindstrom.com/blog/measure-scrollbar-width-and-height/

    var calculateValue = function calculateValue(type) {
      return scrollDiv["offset".concat(type)] - scrollDiv["client".concat(type)];
    };

    var scrollbarWidth = calculateValue('Width');
    document.documentElement.style.setProperty('--offset', scrollbarWidth); // Remove element

    body.removeChild(scrollDiv);
  }

  (0, _react.useEffect)(function () {
    var mediaQueryLists = {};
    var keys = Object.keys(queries);
    var isAttached = false;
    var local_storystep = JSON.parse(localStorage.getItem('storystep'));

    if (local_storystep && storystep !== local_storystep) {
      setStorystep(local_storystep);
    }

    var handleQueryListener = function handleQueryListener() {
      var updatedMatches = keys.reduce(function (acc, media) {
        acc[media] = !!(mediaQueryLists[media] && mediaQueryLists[media].matches);
        return acc;
      }, {});
      setQueryMatch(updatedMatches);
    };

    if (window && window.matchMedia) {
      var matches = {};
      keys.forEach(function (media) {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });
      setQueryMatch(matches);
      isAttached = true;
      keys.forEach(function (media) {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }

    return function () {
      if (isAttached) {
        keys.forEach(function (media) {
          if (typeof queries[media] === 'string') {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);

  if (typeof localStorage !== 'undefined') {
    var pixelWidth = 0;
    if (queryMatch[360]) pixelWidth = 360;else if (queryMatch[1080]) pixelWidth = 1080;else if (queryMatch[1920]) pixelWidth = 1920;
    var num_storysteps = JSON.parse(localStorage.getItem('num_storysteps'));
    var context = {
      storystep: storystep,
      num_storysteps: num_storysteps,
      pixelWidth: pixelWidth,
      actions: {
        nextStorystep: nextStorystep,
        prevStorystep: prevStorystep,
        gotoStorystep: gotoStorystep
      }
    };
    return /*#__PURE__*/_react["default"].createElement(TractStackContext.Provider, {
      value: context
    }, children);
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
};

exports.TractStackProvider = TractStackProvider;
TractStackProvider.propTypes = {
  children: _propTypes["default"].element.isRequired,
  queries: _propTypes["default"].object.isRequired
};
//# sourceMappingURL=provider.js.map