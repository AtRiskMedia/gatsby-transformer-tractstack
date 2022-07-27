import * as React from "react";

const DrupalMarkdownNodes = ["paragraph__markdown"];

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
  type node__story_fragmentRelationships {
    field_menu: node__menu @link(by: "id", from: "field_menu___NODE")
  }

  type node__menu implements Node {
    field_image_logo: node__menuField_image_logo
    field_svg_logo: node__menuField_svg_logo
    field_options: String
    field_pixel_height_desktop: Int
    field_pixel_height_mobile: Int
    field_pixel_height_tablet: Int
    field_theme: String
 }
  type node__menuRelationships {
    field_image_logo: file__file @link(by: "id", from: "field_image_logo___NODE")
    field_svg_logo: file__file @link(by: "id", from: "field_svg_logo___NODE")
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

`;
  createTypes(typeDefs);
};

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
