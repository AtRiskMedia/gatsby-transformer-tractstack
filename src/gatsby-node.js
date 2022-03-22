import * as React from "react";

const DrupalNodes = [
  "paragraph__markdown",
  //"paragraph__background_image", // does not need any preprocessing
  //"paragraph__svg",
  //"paragraph__video",
  //"paragraph__d3",
  //"paragraph__h5p",
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

  switch (node.internal.type) {
    case "paragraph__markdown":
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
    /*
    case "paragraph__svg":
      //
      break;

    case "paragraph__video":
      //
      break;

    case "paragraph__d3":
      //
      break;

    case "paragraph__h5p":
      //
      break;
    */
  }
};
