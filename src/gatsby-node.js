import * as React from "react"
const { tagExtractor, processMarkdown } = require(`./helpers`)
const DrupalNodes = ['paragraph__markdown','paragraph__background','paragraph__video','paragraph__d3','paragraph__h5p'];
const _camelCase = require('lodash/camelCase');

exports.onCreateNode = async ({
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
  // todo:
  // preprocess raw markdown and inject tractstack goodies
  //
  const paneFragment = {
    id: createNodeId(`${node.id}Unprocessed`),
    parent: node.id,
    children: [],
    internal: {
      type: _camelCase(`${node.internal.type}`),
      mediaType: `text/markdown`,
      content: content
    },
  }
  paneFragment.rawMarkdownBody = content
  paneFragment.internal.contentDigest = createContentDigest(paneFragment)
  createNode(paneFragment)
  createParentChildLink({ parent: node, child: paneFragment })
  return paneFragment
}
