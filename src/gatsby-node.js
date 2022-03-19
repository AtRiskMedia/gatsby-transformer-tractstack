import * as React from "react";

const DrupalNodes = [
  "paragraph__markdown",
  "paragraph__background",
  "paragraph__video",
  "paragraph__d3",
  "paragraph__h5p",
];

exports.onCreateNode = ({
  node,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  if (
    node.internal.owner !== "gatsby-source-drupal" ||
    !DrupalNodes.includes(node.internal.type)
  ) {
    return {};
  }
  const { createNode, createNodeField, createParentChildLink } = actions;

  const markdownNode = {
    id: createNodeId(`${node.id} MarkdownRemark`),
    parent: node.id,
    children: [],
    internal: {
      type: `PaneFragment`,
      mediaType: `text/markdown`,
      content: node?.field_markdown_body,
    },
  };
  markdownNode.frontmatter = {
    title: node.field_alt_description,
  };
  markdownNode.internal.contentDigest = createContentDigest(markdownNode);
  createNode(markdownNode);
  createParentChildLink({ parent: node, child: markdownNode });

  return markdownNode;
};
