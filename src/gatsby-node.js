import * as React from "react"

exports.onCreateNode = async ({
  createNodeId,
  node,
  actions
}) => {
  const { createNode, createNodeField } = actions
  const DrupalNodes = ['paragraph__markdown','paragraph__background','paragraph__video','paragraph__d3','paragraph__h5p'];

  if( node.internal.owner !== "gatsby-source-drupal" || !DrupalNodes.includes(node.internal.type) ) {
    return;
  }
  console.log( "paragraph found: ", node.internal.type );
  console.log( node );
  createNodeField({
    node, name: `rendered_component`,
    value: <><p>test</p></>
  });
  // need to preprocess tractstack nodes from drupal
}
