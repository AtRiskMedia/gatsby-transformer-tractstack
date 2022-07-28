"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DrupalMarkdownNodes = ["paragraph__markdown"];

exports.onCreateNode = function (_ref) {
  var node = _ref.node,
      createNodeId = _ref.createNodeId,
      createContentDigest = _ref.createContentDigest,
      actions = _ref.actions;

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

exports.createSchemaCustomization = function (_ref2) {
  var actions = _ref2.actions;
  var createTypes = actions.createTypes;
  var typeDefs = "\n  type node__story_fragment implements Node {\n    title: String\n    field_slug: String\n    relationships: node__story_fragmentRelationships\n    field_menu: node__story_fragmentField_menu\n    field_panes: [node__story_fragmentField_panes]\n    field_tract_stack: node__story_fragmentField_tract_stack\n  }\n  type node__story_fragmentField_menu {\n    drupal_internal__target_id: Int\n  }\n  type node__story_fragmentField_panes {\n    drupal_internal__target_id: Int\n  }\n  type node__story_fragmentField_tract_stack {\n    drupal_internal__target_id: Int\n  }\n\n  type node__story_fragmentRelationships {\n    field_menu: node__menu @link(by: \"id\", from: \"field_menu___NODE\")\n    field_panes: [node__pane] @link(by: \"id\", from: \"field_panes___NODE\")\n    field_tract_stack: node__tractstack @link(by: \"id\", from: \"field_tract_stack___NODE\")\n    node__tractstack: [node__tractstack] @link(by: \"id\", from: \"node__tractstack___NODE\")\n  }\n\n  type node__tractstack implements Node {\n    field_slug: String\n    relationships: node__tractstackRelationships\n    field_story_fragments: [node__tractstackField_story_fragments]\n  }\n\n  type node__pane implements Node {\n    title: String\n    field_height_offset_desktop: Int\n    field_height_offset_mobile: Int\n    field_height_offset_tablet: Int\n    field_height_ratio_desktop: String\n    field_height_ratio_mobile: String\n    field_height_ratio_tablet: String\n    field_options: String\n    field_slug: String\n    relationships: node__paneRelationships\n    field_pane_fragments: [node__paneField_pane_fragments]\n  }\n\n  type node__menu implements Node {\n    field_image_logo: node__menuField_image_logo\n    field_svg_logo: node__menuField_svg_logo\n    field_options: String\n    field_pixel_height_desktop: Int\n    field_pixel_height_mobile: Int\n    field_pixel_height_tablet: Int\n    field_theme: String\n    relationships: node__menuRelationships\n    field_menu_items: [node__menuField_menu_items]\n }\n  type node__menuRelationships {\n    field_image_logo: file__file @link(by: \"id\", from: \"field_image_logo___NODE\")\n    field_svg_logo: file__file @link(by: \"id\", from: \"field_svg_logo___NODE\")\n    field_menu_items: [paragraph__menu_item] @link(by: \"id\", from: \"field_menu_items___NODE\")\n    node__story_fragment: [node__story_fragment] @link(by: \"id\", from: \"node__story_fragment___NODE\")\n  }\n  type node__menuField_image_logo {\n    display: Boolean\n    description: String\n    drupal_internal__target_id: Int\n  }\n  type node__menuField_svg_logo {\n    display: Boolean\n    description: String\n    drupal_internal__target_id: Int\n  }\n  type paragraph__menu_item implements Node {\n    field_level: Int\n    field_options: String\n    field_slug: String\n    field_title: String\n    relationships: paragraph__menu_itemRelationships\n  }\n  type paragraph__menu_itemRelationships {\n    node__menu: [node__menu] @link(by: \"id\", from: \"node__menu___NODE\")\n  }\n  type node__menuField_menu_items {\n    target_revision_id: Int\n    drupal_internal__target_id: Int\n  }\n\n  type node__tractstackRelationships {\n    field_story_fragments: [node__story_fragment] @link(by: \"id\", from: \"field_story_fragments___NODE\")\n    node__story_fragment: [node__story_fragment] @link(by: \"id\", from: \"node__story_fragment___NODE\")\n  }\n \n  type node__paneRelationships {\n    field_pane_fragments: [paragraph__background_colourparagraph__background_imageparagraph__background_paneparagraph__background_videoparagraph__markdownparagraph__svgUnion] @link(by: \"id\", from: \"field_pane_fragments___NODE\")\n    node__story_fragment: [node__story_fragment] @link(by: \"id\", from: \"node__story_fragment___NODE\")\n  }\n\n  type node__paneField_pane_fragments {\n    drupal_internal__target_id: Int\n  }\n  type node__tractstackField_story_fragments {\n    drupal_internal__target_id: Int\n  }\n\n  union paragraph__background_colourparagraph__background_imageparagraph__background_paneparagraph__background_videoparagraph__markdownparagraph__svgUnion = paragraph__background_colour | paragraph__background_image | paragraph__background_pane | paragraph__background_video | paragraph__markdown | paragraph__svg\n\n  type paragraph__svg implements Node {\n    field_css_styles_parent_desktop: String\n    field_css_styles_parent_mobile: String\n    field_css_styles_parent_tablet: String\n    field_hidden_viewports: String\n    field_image_mask_shape_desktop: String\n    field_image_mask_shape_mobile: String\n    field_image_mask_shape_tablet: String\n    field_options: String\n    field_zindex: Int\n    relationships: paragraph__svgRelationships\n    field_svg_file: paragraph__svgField_svg_file\n  }\n\n  type paragraph__svgRelationships {\n    field_svg_file: file__file @link(by: \"id\", from: \"field_svg_file___NODE\")\n    node__pane: [node__pane] @link(by: \"id\", from: \"node__pane___NODE\")\n  }\n\n  type paragraph__svgField_svg_file {\n    description: String\n    drupal_internal__target_id: Int\n  }\n \n  type file__file implements Node {\n    relationships: file__fileRelationships\n    localFile: File @link(by: \"id\", from: \"localFile___NODE\")\n  }\n\n  type file__fileRelationships {\n    paragraph__markdown: [paragraph__markdown] @link(by: \"id\", from: \"paragraph__markdown___NODE\")\n    paragraph__background_image: [paragraph__background_image] @link(by: \"id\", from: \"paragraph__background_image___NODE\")\n    node__menu: [node__menu] @link(by: \"id\", from: \"node__menu___NODE\")\n    paragraph__svg: [paragraph__svg] @link(by: \"id\", from: \"paragraph__svg___NODE\")\n  }\n\n  type paragraph__markdown implements Node {\n    field_css_styles_desktop: String\n    field_css_styles_mobile: String\n    field_css_styles_parent_desktop: String\n    field_css_styles_parent_mobile: String\n    field_css_styles_parent_tablet: String\n    field_css_styles_tablet: String\n    field_hidden_viewports: String\n    field_image_mask_shape_desktop: String\n    field_image_mask_shape_mobile: String\n    field_image_mask_shape_tablet: String\n    field_markdown_body: String\n    field_modal: Boolean\n    field_options: String\n    field_text_shape_outside_desktop: String\n    field_text_shape_outside_mobile: String\n    field_text_shape_outside_tablet: String\n    field_zindex: Int\n    relationships: paragraph__markdownRelationships\n    field_image: [paragraph__markdownField_image]\n  }\n  type paragraph__markdownRelationships {\n    field_image: [file__file] @link(by: \"id\", from: \"field_image___NODE\")\n    node__pane: [node__pane] @link(by: \"id\", from: \"node__pane___NODE\")\n  }\n  type paragraph__markdownField_image {\n    description: String\n    drupal_internal__target_id: Int\n  }\n\n  type paragraph__background_image implements Node {\n    field_alt_text: String\n    field_background_position: String\n    field_css_styles_parent_desktop: String\n    field_css_styles_parent_mobile: String\n    field_css_styles_parent_tablet: String\n    field_hidden_viewports: String\n    field_image_mask_shape_desktop: String\n    field_image_mask_shape_mobile: String\n    field_image_mask_shape_tablet: String\n    field_options: String\n    field_zindex: Int\n    relationships: paragraph__background_imageRelationships\n    field_image: [paragraph__background_imageField_image]\n  }\n  type paragraph__background_imageRelationships {\n    field_image: [file__file] @link(by: \"id\", from: \"field_image___NODE\")\n    node__pane: [node__pane] @link(by: \"id\", from: \"node__pane___NODE\")\n  }\n  type paragraph__background_imageField_image {\n    description: String\n    drupal_internal__target_id: Int\n  }\n\n  type paragraph__background_video implements Node {\n    field_alt_text: String\n    field_cdn_url: String\n    field_css_styles_parent_desktop: String\n    field_css_styles_parent_mobile: String\n    field_css_styles_parent_tablet: String\n    field_hidden_viewports: String\n    field_image_mask_shape_desktop: String\n    field_image_mask_shape_mobile: String\n    field_image_mask_shape_tablet: String\n    field_options: String\n    field_zindex: Int\n    relationships: paragraph__background_videoRelationships\n  }\n  type paragraph__background_videoRelationships {\n    node__pane: [node__pane] @link(by: \"id\", from: \"node__pane___NODE\")\n  }\n\n  type paragraph__background_pane implements Node {\n    field_css_styles_parent_desktop: String\n    field_css_styles_parent_mobile: String\n    field_css_styles_parent_tablet: String\n    field_hidden_viewports: String\n    field_options: String\n    field_shape_desktop: String\n    field_shape_mobile: String\n    field_shape_tablet: String\n    field_zindex: Int\n    relationships: paragraph__background_paneRelationships\n  }\n  type paragraph__background_paneRelationships {\n    node__pane: [node__pane] @link(by: \"id\", from: \"node__pane___NODE\")\n  }\n\n  type paragraph__background_colour implements Node {\n    field_background_colour: String\n    field_hidden_viewports: String\n    relationships: paragraph__background_colourRelationships\n  }\n  type paragraph__background_colourRelationships {\n    node__pane: [node__pane] @link(by: \"id\", from: \"node__pane___NODE\")\n  }\n\n  type PaneFragment implements Node @childOf(types: [\"paragraph__markdown\"]) {\n    frontmatter: PaneFragmentFrontmatter\n  }\n  type PaneFragmentFrontmatter {\n    id: String\n  }\n  ";
  createTypes(typeDefs);
};
/*
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    PaneFragment: {
      childMarkdownRemark: {
        type: ["PaneFragment"],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({
            query: {
              filter: {
                htmlAst: { eq: true },
              },
            },
            type: "PaneFragment",
          });
          return entries;
        },
      },
    },
  };
  createResolvers(resolvers);
};
*/
//# sourceMappingURL=gatsby-node.js.map