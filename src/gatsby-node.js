import * as React from "react";

const DrupalMarkdownNodes = ["paragraph__markdown"];

exports.onCreateNode = ({
  node,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  if (
    node.internal.owner !== "gatsby-source-drupal" ||
    !DrupalMarkdownNodes.includes(node.internal.type)
  ) {
    return {};
  }
  const { createNode, createNodeField, createParentChildLink } = actions;
  switch (node.internal.type) {
    case "paragraph__markdown":
      // generate MarkdownRemark and PaneFragment
      const markdownNode = {
        id: createNodeId(`${node.id} MarkdownRemark`),
        parent: node?.id,
        children: [],
        internal: {
          type: `PaneFragment`,
          mediaType: `text/markdown`,
          content: node?.field_markdown_body,
        },
      };
      markdownNode.frontmatter = {
        title: node?.field_alt_description,
        id: node?.id,
      };
      markdownNode.internal.contentDigest = createContentDigest(markdownNode);
      createNode(markdownNode);
      createParentChildLink({ parent: node, child: markdownNode });
      return markdownNode;
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
  type node__story_fragment implements Node {
    title: String
    field_slug: String
    relationships: node__story_fragmentRelationships
    field_menu: node__story_fragmentField_menu
    field_panes: [node__story_fragmentField_panes]
    field_tract_stack: node__story_fragmentField_tract_stack
  }
  type node__story_fragmentField_menu {
    drupal_internal__target_id: Int
  }
  type node__story_fragmentField_panes {
    drupal_internal__target_id: Int
  }
  type node__story_fragmentField_tract_stack {
    drupal_internal__target_id: Int
  }

  type node__story_fragmentRelationships {
    field_menu: node__menu @link(by: "id", from: "field_menu___NODE")
    field_panes: [node__pane] @link(by: "id", from: "field_panes___NODE")
    field_tract_stack: node__tractstack @link(by: "id", from: "field_tract_stack___NODE")
    node__tractstack: [node__tractstack] @link(by: "id", from: "node__tractstack___NODE")
  }

  type node__tractstack implements Node {
    field_slug: String
    relationships: node__tractstackRelationships
    field_story_fragments: [node__tractstackField_story_fragments]
  }

  type node__pane implements Node {
    title: String
    field_height_offset_desktop: Int
    field_height_offset_mobile: Int
    field_height_offset_tablet: Int
    field_height_ratio_desktop: String
    field_height_ratio_mobile: String
    field_height_ratio_tablet: String
    field_options: String
    field_slug: String
    relationships: node__paneRelationships
    field_pane_fragments: [node__paneField_pane_fragments]
  }

  type node__menu implements Node {
    field_image_logo: node__menuField_image_logo
    field_svg_logo: node__menuField_svg_logo
    field_options: String
    field_pixel_height_desktop: Int
    field_pixel_height_mobile: Int
    field_pixel_height_tablet: Int
    field_theme: String
    relationships: node__menuRelationships
    field_menu_items: [node__menuField_menu_items]
 }
  type node__menuRelationships {
    field_image_logo: file__file @link(by: "id", from: "field_image_logo___NODE")
    field_svg_logo: file__file @link(by: "id", from: "field_svg_logo___NODE")
    field_menu_items: [paragraph__menu_item] @link(by: "id", from: "field_menu_items___NODE")
    node__story_fragment: [node__story_fragment] @link(by: "id", from: "node__story_fragment___NODE")
  }
  type node__menuField_image_logo {
    display: Boolean
    description: String
    drupal_internal__target_id: Int
  }
  type node__menuField_svg_logo {
    display: Boolean
    description: String
    drupal_internal__target_id: Int
  }
  type paragraph__menu_item implements Node {
    field_level: Int
    field_options: String
    field_slug: String
    field_title: String
    relationships: paragraph__menu_itemRelationships
  }
  type paragraph__menu_itemRelationships {
    node__menu: [node__menu] @link(by: "id", from: "node__menu___NODE")
  }
  type node__menuField_menu_items {
    target_revision_id: Int
    drupal_internal__target_id: Int
  }

  type node__tractstackRelationships {
    field_story_fragments: [node__story_fragment] @link(by: "id", from: "field_story_fragments___NODE")
    node__story_fragment: [node__story_fragment] @link(by: "id", from: "node__story_fragment___NODE")
  }
 
  type node__paneRelationships {
    field_pane_fragments: [paragraph__background_colourparagraph__background_imageparagraph__background_paneparagraph__background_videoparagraph__markdownparagraph__svgUnion] @link(by: "id", from: "field_pane_fragments___NODE")
    node__story_fragment: [node__story_fragment] @link(by: "id", from: "node__story_fragment___NODE")
  }

  type node__paneField_pane_fragments {
    drupal_internal__target_id: Int
  }
  type node__tractstackField_story_fragments {
    drupal_internal__target_id: Int
  }

  union paragraph__background_colourparagraph__background_imageparagraph__background_paneparagraph__background_videoparagraph__markdownparagraph__svgUnion = paragraph__background_colour | paragraph__background_image | paragraph__background_pane | paragraph__background_video | paragraph__markdown | paragraph__svg

  type paragraph__svg implements Node {
    field_css_styles_parent_desktop: String
    field_css_styles_parent_mobile: String
    field_css_styles_parent_tablet: String
    field_hidden_viewports: String
    field_image_mask_shape_desktop: String
    field_image_mask_shape_mobile: String
    field_image_mask_shape_tablet: String
    field_options: String
    field_zindex: Int
    relationships: paragraph__svgRelationships
    field_svg_file: paragraph__svgField_svg_file
  }

  type paragraph__svgRelationships {
    field_svg_file: file__file @link(by: "id", from: "field_svg_file___NODE")
    node__pane: [node__pane] @link(by: "id", from: "node__pane___NODE")
  }

  type paragraph__svgField_svg_file {
    description: String
    drupal_internal__target_id: Int
  }
 
  type file__file implements Node {
    relationships: file__fileRelationships
    localFile: File @link(by: "id", from: "localFile___NODE")
  }

  type file__fileRelationships {
    paragraph__markdown: [paragraph__markdown] @link(by: "id", from: "paragraph__markdown___NODE")
    paragraph__background_image: [paragraph__background_image] @link(by: "id", from: "paragraph__background_image___NODE")
    node__menu: [node__menu] @link(by: "id", from: "node__menu___NODE")
    paragraph__svg: [paragraph__svg] @link(by: "id", from: "paragraph__svg___NODE")
  }

  type paragraph__markdown implements Node {
    field_css_styles_desktop: String
    field_css_styles_mobile: String
    field_css_styles_parent_desktop: String
    field_css_styles_parent_mobile: String
    field_css_styles_parent_tablet: String
    field_css_styles_tablet: String
    field_hidden_viewports: String
    field_image_mask_shape_desktop: String
    field_image_mask_shape_mobile: String
    field_image_mask_shape_tablet: String
    field_markdown_body: String
    field_modal: Boolean
    field_options: String
    field_text_shape_outside_desktop: String
    field_text_shape_outside_mobile: String
    field_text_shape_outside_tablet: String
    field_zindex: Int
    relationships: paragraph__markdownRelationships
    field_image: [paragraph__markdownField_image]
  }
  type paragraph__markdownRelationships {
    field_image: [file__file] @link(by: "id", from: "field_image___NODE")
    node__pane: [node__pane] @link(by: "id", from: "node__pane___NODE")
  }
  type paragraph__markdownField_image {
    description: String
    drupal_internal__target_id: Int
  }

  type paragraph__background_image implements Node {
    field_alt_text: String
    field_background_position: String
    field_css_styles_parent_desktop: String
    field_css_styles_parent_mobile: String
    field_css_styles_parent_tablet: String
    field_hidden_viewports: String
    field_image_mask_shape_desktop: String
    field_image_mask_shape_mobile: String
    field_image_mask_shape_tablet: String
    field_options: String
    field_zindex: Int
    relationships: paragraph__background_imageRelationships
    field_image: [paragraph__background_imageField_image]
  }
  type paragraph__background_imageRelationships {
    field_image: [file__file] @link(by: "id", from: "field_image___NODE")
    node__pane: [node__pane] @link(by: "id", from: "node__pane___NODE")
  }
  type paragraph__background_imageField_image {
    description: String
    drupal_internal__target_id: Int
  }

  type paragraph__background_video implements Node {
    field_alt_text: String
    field_cdn_url: String
    field_css_styles_parent_desktop: String
    field_css_styles_parent_mobile: String
    field_css_styles_parent_tablet: String
    field_hidden_viewports: String
    field_image_mask_shape_desktop: String
    field_image_mask_shape_mobile: String
    field_image_mask_shape_tablet: String
    field_options: String
    field_zindex: Int
    relationships: paragraph__background_videoRelationships
  }
  type paragraph__background_videoRelationships {
    node__pane: [node__pane] @link(by: "id", from: "node__pane___NODE")
  }

  type paragraph__background_pane implements Node {
    field_css_styles_parent_desktop: String
    field_css_styles_parent_mobile: String
    field_css_styles_parent_tablet: String
    field_hidden_viewports: String
    field_options: String
    field_shape_desktop: String
    field_shape_mobile: String
    field_shape_tablet: String
    field_zindex: Int
    relationships: paragraph__background_paneRelationships
  }
  type paragraph__background_paneRelationships {
    node__pane: [node__pane] @link(by: "id", from: "node__pane___NODE")
  }

  type paragraph__background_colour implements Node {
    field_background_colour: String
    field_hidden_viewports: String
    relationships: paragraph__background_colourRelationships
  }
  type paragraph__background_colourRelationships {
    node__pane: [node__pane] @link(by: "id", from: "node__pane___NODE")
  }

  type PaneFragment implements Node @childOf(types: ["paragraph__markdown"]) {
    frontmatter: PaneFragmentFrontmatter
  }
  type PaneFragmentFrontmatter {
    id: String
  }
  `;
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
