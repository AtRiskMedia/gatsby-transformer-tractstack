"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DrupalNodes = ["paragraph__markdown" // none require any further preprocessing
//"paragraph__background_image",
//"paragraph__svg",
//"paragraph__video",
//"paragraph__d3",
//"paragraph__h5p", ** maybe h5p will
];

exports.onCreateNode = function (_ref) {
  var node = _ref.node,
      createNodeId = _ref.createNodeId,
      createContentDigest = _ref.createContentDigest,
      actions = _ref.actions;

  if (node.internal.owner !== "gatsby-source-drupal" || !DrupalNodes.includes(node.internal.type)) {
    return {};
  }

  var createNode = actions.createNode,
      createNodeField = actions.createNodeField,
      createParentChildLink = actions.createParentChildLink;

  switch (node.internal.type) {
    case "paragraph__markdown":
      var markdownNode = {
        id: createNodeId("".concat(node.id, " MarkdownRemark")),
        parent: node.id,
        children: [],
        internal: {
          type: "PaneFragment",
          mediaType: "text/markdown",
          content: node === null || node === void 0 ? void 0 : node.field_markdown_body
        }
      };
      markdownNode.frontmatter = {
        title: node.field_alt_description
      };
      markdownNode.internal.contentDigest = createContentDigest(markdownNode);
      createNode(markdownNode);
      createParentChildLink({
        parent: node,
        child: markdownNode
      });
      return markdownNode;
  }
};
//# sourceMappingURL=gatsby-node.js.map