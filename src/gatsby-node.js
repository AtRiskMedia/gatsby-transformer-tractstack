import * as React from "react";

const DrupalMarkdownNodes = ["paragraph__markdown", "paragraph__modal"];

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
    case "paragraph__modal":
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
