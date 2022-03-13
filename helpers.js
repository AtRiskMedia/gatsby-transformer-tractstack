"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tagExtractor = function tagExtractor(content) {
  var DomParser = require("dom-parser");

  var tagParser = new DomParser(); // in pre-processing markdown from Drupal
  // parse for non-gatsby image, svg, links and tractstack actions

  var imageTagsParsed = tagParser.parseFromString(content);
  var imageTags = imageTagsParsed.getElementsByTagName("img");
  var imageTagsProcessed = [];
  imageTagsProcessed.forEach(function (imageTag) {
    imageTag.attributes.forEach( /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(imageTagAttrs) {
        var imageUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (inlineImageAttrs.name === 'src') {
                  imageUrl = "https://".concat(imageTagAttrs.value);
                  imageTags.push({
                    relativePath: imageTagAttrs.value,
                    remotePath: imageUrl
                  });
                }

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
  return {
    contentProcessed: content,
    imageTagsProcessed: imageTagsProcessed
  };
};

var processMarkdown = function processMarkdown(contentRaw) {
  var SimpleMarkdown = require("simple-markdown");

  var mdParse = SimpleMarkdown.defaultBlockParse;
  var mdOutput = SimpleMarkdown.defaultOutput;
  var syntaxTree = mdParse(contentRaw);
  console.log(JSON.stringify(syntaxTree, null, 4));
  return mdOutput(syntaxTree);
};

module.exports = {
  tagExtractor: tagExtractor,
  processMarkdown: processMarkdown
};
//# sourceMappingURL=helpers.js.map