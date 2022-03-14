import * as React from "react";
const { tagExtractor, processMarkdown } = require(`./helpers`);
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
  let content = node.field_markdown_body;
  let images = node.relationships.field_image___NODE;
  for (const [key, value] of Object.entries(images)) {
    console.log(`${key}: ${value}`);
  }
  // process images

  // todo:
  // preprocess raw markdown and inject tractstack goodies
  //
  const markdownNode = {
    id: createNodeId(`${node.id} MarkdownRemark`),
    parent: node.id,
    children: [],
    internal: {
      type: `PaneFragment`,
      mediaType: `text/markdown`,
      content: content,
    },
  };
  markdownNode.frontmatter = {
    title: node.field_alt_description,
  };
  markdownNode.rawMarkdownBody = content;
  markdownNode.internal.contentDigest = createContentDigest(markdownNode);
  createNode(markdownNode);
  createParentChildLink({ parent: node, child: markdownNode });
  //console.log(node, markdownNode);
  /*
  createNodeField({
    markdownNode, name: "images",
    value: images
  });*/
  return markdownNode;
};
