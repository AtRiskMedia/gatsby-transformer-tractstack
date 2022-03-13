import * as React from "react"
const { tagExtractor, processMarkdown } = require(`./helpers`)
const DrupalNodes = ['paragraph__markdown','paragraph__background','paragraph__video','paragraph__d3','paragraph__h5p'];
const _camelCase = require('lodash/camelCase');

exports.onCreateNode = ({
  node,
  createNodeId,
  createContentDigest,
  actions
}) => {
  if( node.internal.owner !== "gatsby-source-drupal" || !DrupalNodes.includes(node.internal.type) ) {
    return {}
  }
  const { createNode, createNodeField, createParentChildLink } = actions
  let content = node.field_markdown_body;
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
      content: content
    },
  }
  markdownNode.frontmatter = {
    title: node.field_alt_description,
  }
  console.log(node, markdownNode)
  markdownNode.rawMarkdownBody = content
  markdownNode.internal.contentDigest = createContentDigest(markdownNode)
  createNode(markdownNode)
  createParentChildLink({ parent: node, child: markdownNode })
  return markdownNode
}
