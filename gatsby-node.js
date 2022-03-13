"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require("./helpers"),
    tagExtractor = _require.tagExtractor,
    processMarkdown = _require.processMarkdown;

var DrupalNodes = ['paragraph__markdown', 'paragraph__background', 'paragraph__video', 'paragraph__d3', 'paragraph__h5p'];

var _camelCase = require('lodash/camelCase');

exports.onCreateNode = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var node, createNodeId, createContentDigest, actions, createNode, createNodeField, createParentChildLink, content, paneFragment;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            node = _ref.node, createNodeId = _ref.createNodeId, createContentDigest = _ref.createContentDigest, actions = _ref.actions;

            if (!(node.internal.owner !== "gatsby-source-drupal" || !DrupalNodes.includes(node.internal.type))) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", {});

          case 3:
            createNode = actions.createNode, createNodeField = actions.createNodeField, createParentChildLink = actions.createParentChildLink;
            content = node.field_markdown_body; // todo:
            // preprocess raw markdown and inject tractstack goodies
            //

            paneFragment = {
              id: createNodeId("".concat(node.id, "Unprocessed")),
              parent: node.id,
              children: [],
              internal: {
                type: _camelCase("".concat(node.internal.type)),
                mediaType: "text/markdown",
                content: content
              }
            };
            paneFragment.rawMarkdownBody = content;
            paneFragment.internal.contentDigest = createContentDigest(paneFragment);
            createNode(paneFragment);
            createParentChildLink({
              parent: node,
              child: paneFragment
            });
            return _context.abrupt("return", paneFragment);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();
//# sourceMappingURL=gatsby-node.js.map