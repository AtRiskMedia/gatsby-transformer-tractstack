"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackStackController = TrackStackController;
exports.TractStack = TractStack;

var _react = _interopRequireWildcard(require("react"));

var _gatsbyPluginImage = require("gatsby-plugin-image");

var _dompurify = _interopRequireDefault(require("dompurify"));

var _svg = require("./svg");

var _provider = require("./provider");

var _ScrollRevealContainer = _interopRequireDefault(require("./ScrollRevealContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function TractStack(data) {
  //localStorage.clear();
  var context = (0, _react.useContext)(_provider.TractStackContext);
  var storystep = context.storystep,
      pixelWidth = context.pixelWidth;
  var local_storystep = JSON.parse(localStorage.getItem('storystep')); // if no context exists yet with storystep, use 1

  if (!storystep) {
    storystep = 1;
    localStorage.setItem('storystep', JSON.stringify(1));
    localStorage.setItem('num_storysteps', JSON.stringify(data.value.relationships.field_storysteps.length));
  } else if (local_storystep && storystep !== local_storystep) {
    // use localStorage storystep if available
    storystep = local_storystep;
  }

  var slidedeck = {
    360: SlideDeck(360, storystep, data),
    1080: SlideDeck(1080, storystep, data),
    1920: SlideDeck(1920, storystep, data),
    storystep: {
      storystep: storystep,
      name: data.value.relationships.field_storysteps.filter(function (e) {
        return e.field_storystep_order === storystep;
      })[0].field_storystep_name,
      num_storysteps: data.value.relationships.field_storysteps.length
    }
  };

  if (pixelWidth && typeof slidedeck !== 'undefined' && _typeof(slidedeck) == 'object' && Object.prototype.hasOwnProperty.call(slidedeck, 360) && Object.prototype.hasOwnProperty.call(slidedeck, 1080) && Object.prototype.hasOwnProperty.call(slidedeck, 1920) && Object.prototype.hasOwnProperty.call(slidedeck, 'storystep')) {
    var Contents = function Contents(_ref) {
      var children = _ref.children;
      return /*#__PURE__*/_react["default"].createElement("div", null, children);
    };

    var Revealed = (0, _ScrollRevealContainer["default"])(Contents);

    var rows = _toConsumableArray(new Set(slidedeck[pixelWidth].filter(function (e) {
      return e.storystep === storystep;
    }).sort(function (a, b) {
      return a.row - b.row;
    }).map(function (slide) {
      return slide.row;
    })));

    return /*#__PURE__*/_react["default"].createElement(_provider.TractStackContext.Consumer, null, function (tractstack) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: 'pixelWidth__' + pixelWidth
      }, /*#__PURE__*/_react["default"].createElement(TrackStackController, {
        value: {
          data: {
            slidedeck: slidedeck,
            context: tractstack
          }
        }
      }), rows.map(function (row) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: 'tractstack tractstack__container row' + row.toString(),
          key: row
        }, slidedeck[pixelWidth].filter(function (e) {
          return e.storystep === storystep;
        }).filter(function (e) {
          return e.row === row;
        }).map(function (slide) {
          // build slide
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "pane .load-hidden",
            key: slide.key
          }, /*#__PURE__*/_react["default"].createElement(Revealed, {
            options: slide.scrollRevealOptions,
            interval: 50,
            target: '.tractstack__container--' + slide.className + '-' + pixelWidth.toString()
          }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(TractStackSlide, {
            value: {
              key: slide.key,
              copy: slide.copy,
              svg_name: slide.svg_name,
              className: slide.className,
              pixelWidth: pixelWidth
            }
          }))));
        }));
      })));
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
}

function SlideDeck(width, storystep, data) {
  return data.value.relationships.field_storysteps.filter(function (e) {
    return e.field_storystep_order === storystep;
  })[0].relationships.field_storystep_slides.map(function (e) {
    var row, svg;

    if (width === 360) {
      row = e.field_row_360;
      svg = e.field_svg_360;
    } else if (width === 1080) {
      row = e.field_row_1080;
      svg = e.field_svg_1080;
    } else if (width === 1920) {
      row = e.field_row_1920;
      svg = e.field_svg_1920;
    } else return {};

    if (row === -1) return {};
    return {
      key: parseInt(width.toString() + '0' + e.drupal_internal__nid),
      storystep: storystep,
      row: row,
      copy: e.relationships.field_content,
      scrollRevealOptions: e.field_scroll_reveal_options,
      className: e.field_classname,
      svg_name: svg
    };
  });
}

function ActionLink(button_text, className, key, action) {
  var context = (0, _react.useContext)(_provider.TractStackContext);

  function handleClick(e) {
    e.preventDefault();

    switch (action) {
      case 'nextStorystep':
        context.actions.nextStorystep();
        break;

      case 'prevStorystep':
        context.actions.prevStorystep();
        break;
    }
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: 'pane pane__copy pane__copy--action pane__copy--action-' + className,
    key: key
  }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    href: "#",
    onClick: handleClick,
    className: "neon-button"
  }, button_text)));
}

function TractStackSlide(data) {
  if (typeof data !== 'undefined' && _typeof(data) == 'object' && typeof data.value !== 'undefined' && typeof data.value.copy !== 'undefined' && _typeof(data.value.copy) == 'object' && typeof data.value.svg_name !== 'undefined' && typeof data.value.svg_name == 'string' && typeof data.value.pixelWidth !== 'undefined' && typeof data.value.pixelWidth == 'number') {
    var allcopy = data.value.copy.map(function (copy) {
      switch (copy.internal.type) {
        case 'paragraph__text':
          var clean = _dompurify["default"].sanitize(copy.field_innerhtml);

          return /*#__PURE__*/_react["default"].createElement("div", {
            key: copy.drupal_internal__id,
            className: 'pane pane__copy pane__copy--' + copy.field_classname
          }, /*#__PURE__*/_react["default"].createElement("div", {
            dangerouslySetInnerHTML: {
              __html: clean
            }
          }));

        case 'paragraph__action':
          var button_text = _dompurify["default"].sanitize(copy.field_button_text);

          var actions_payload = JSON.parse(copy.field_actions_payload);
          return ActionLink(button_text, copy.field_classname, copy.drupal_internal__id, actions_payload['action']);

        case 'paragraph__image':
          return /*#__PURE__*/_react["default"].createElement("div", {
            key: copy.drupal_internal__id,
            className: 'pane pane__image pane__imagemask--' + copy.field_classname
          }, /*#__PURE__*/_react["default"].createElement(_gatsbyPluginImage.GatsbyImage, {
            image: (0, _gatsbyPluginImage.getImage)(copy.relationships.field_image.localFile.childImageSharp.gatsbyImageData),
            className: 'pane pane__image--' + copy.field_classname,
            alt: copy.field_alt_text
          }));
      }
    });
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: 'tractstack tractstack__container--' + data.value.svg_name + ' tractstack__container--' + data.value.className + '-' + data.value.pixelWidth.toString()
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: 'pane tractstack__svg tractstack__svg--' + data.value.className
    }, (0, _svg.SvgPane)(data.value.pixelWidth.toString(), data.value.svg_name, data.value.className)), allcopy);
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
}

function pad(num, size) {
  num = num.toString();

  while (num.length < size) {
    num = '0' + num;
  }

  return num;
}

function TrackStackController(data) {
  if (typeof data !== 'undefined' && _typeof(data) == 'object' && typeof data.value !== 'undefined' && typeof data.value.data !== 'undefined' && _typeof(data.value.data) == 'object' && Object.prototype.hasOwnProperty.call(data.value.data.slidedeck, 360) && Object.prototype.hasOwnProperty.call(data.value.data.slidedeck, 1080) && Object.prototype.hasOwnProperty.call(data.value.data.slidedeck, 1920) && Object.prototype.hasOwnProperty.call(data.value.data.slidedeck, 'storystep')) {
    var context = (0, _react.useContext)(_provider.TractStackContext);
    var pixelWidth = context.pixelWidth;
    var num_storysteps = JSON.parse(localStorage.getItem('num_storysteps'));
    var storystep = data.value.data.slidedeck.storystep.storystep;
    var storystep_name = data.value.data.slidedeck.storystep.name;
    var svg = (0, _svg.SvgPane)(pixelWidth.toString(), 'controller', 'controller');
    var svg__storystep = (0, _svg.SvgPane)(pixelWidth.toString(), 'controller', 'storystep', 'clip');

    var Controls = function Controls() {
      var play = false,
          rew = false;
      if (storystep < num_storysteps) play = true;
      if (storystep > 1) rew = true;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "pane"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "tractstack__controller--controls"
      }, play && /*#__PURE__*/_react["default"].createElement(_svg.SvgPlay, {
        value: context.actions.nextStorystep
      }), rew && /*#__PURE__*/_react["default"].createElement(_svg.SvgRewind, {
        value: context.actions.prevStorystep
      })));
    };

    if (storystep && storystep_name && svg && svg__storystep) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "tractstack tractstack__controller"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "pane tractstack__svg svg__controller"
      }, svg), /*#__PURE__*/_react["default"].createElement("div", {
        className: "pane tractstack__svg svg__storystep"
      }, svg__storystep), /*#__PURE__*/_react["default"].createElement("div", {
        className: "pane"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "tractstack__controller--storystep"
      }, /*#__PURE__*/_react["default"].createElement("p", null, "Story", /*#__PURE__*/_react["default"].createElement("br", null), "step"), /*#__PURE__*/_react["default"].createElement("div", null, pad(storystep, 2)))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "pane"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "tractstack__controller--name"
      }, /*#__PURE__*/_react["default"].createElement(_svg.SvgLogo, null), " ", /*#__PURE__*/_react["default"].createElement("h1", null, storystep_name))), /*#__PURE__*/_react["default"].createElement(Controls, null));
    }
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
}
//# sourceMappingURL=tractstack.js.map