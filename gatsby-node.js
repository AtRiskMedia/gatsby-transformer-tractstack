"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DrupalMarkdownNodes = ["paragraph__markdown"];

exports.createSchemaCustomization = function (_ref) {
  var actions = _ref.actions;
  var createTypes = actions.createTypes;
  var typeDefs = "\n  type node__story_fragmentRelationships {\n    field_menu: node__menu @link(by: \"id\", from: \"field_menu___NODE\")\n  }\n\n  type node__menu implements Node {\n    field_image_logo: node__menuField_image_logo\n    field_svg_logo: node__menuField_svg_logo\n    field_options: String\n    field_pixel_height_desktop: Int\n    field_pixel_height_mobile: Int\n    field_pixel_height_tablet: Int\n    field_theme: String\n }\n  type node__menuRelationships {\n    field_image_logo: file__file @link(by: \"id\", from: \"field_image_logo___NODE\")\n    field_svg_logo: file__file @link(by: \"id\", from: \"field_svg_logo___NODE\")\n  }\n  type node__menuField_image_logo {\n    display: Boolean\n    description: String\n    drupal_internal__target_id: Int\n  }\n  type node__menuField_svg_logo {\n    display: Boolean\n    description: String\n    drupal_internal__target_id: Int\n  }\n\n";
  createTypes(typeDefs);
};

exports.onCreateNode = function (_ref2) {
  var node = _ref2.node,
      createNodeId = _ref2.createNodeId,
      createContentDigest = _ref2.createContentDigest,
      actions = _ref2.actions;

  if (node.internal.owner !== "gatsby-source-drupal" || !DrupalMarkdownNodes.includes(node.internal.type)) {
    return {};
  }

  var createNode = actions.createNode,
      createNodeField = actions.createNodeField,
      createParentChildLink = actions.createParentChildLink;

  switch (node.internal.type) {
    case "paragraph__markdown":
      // generate MarkdownRemark and PaneFragment
      var markdownNode = {
        id: createNodeId("".concat(node.id, " MarkdownRemark")),
        parent: node === null || node === void 0 ? void 0 : node.id,
        children: [],
        internal: {
          type: "PaneFragment",
          mediaType: "text/markdown",
          content: node === null || node === void 0 ? void 0 : node.field_markdown_body
        }
      };
      markdownNode.frontmatter = {
        title: node === null || node === void 0 ? void 0 : node.field_alt_description,
        id: node === null || node === void 0 ? void 0 : node.id
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