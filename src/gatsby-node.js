import * as React from "react";

const DrupalMarkdownNodes = ["paragraph__markdown"];

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `

type node__menu implements Node {
  field_image_logo: node__menuField_image_logo
}

type node__menuRelationships {
  field_image_logo: file__file @link(by: "id", from: "field_image_logo___NODE")
}

type node__menuField_image_logo {
  display: Boolean
  description: String
  drupal_internal__target_id: Int
}

`;
  createTypes(typeDefs);
};

//exports.createSchemaCustomization = ({ actions }) => {
//  actions.printTypeDefinitions({ path: "./typeDefs.txt" });
//};

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
