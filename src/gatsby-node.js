/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.onCreateNode = ({ node, actions }) => {
  const DrupalNodes = ['file__file','node__tractstack', 'node__story_fragment', 'node__pane'];
  if( node.internal.owner === "gatsby-source-drupal" && DrupalNodes.includes(node.internal.type) ) {
    console.log( "parent node added: ", node.internal.type );
    console.log( node );
    // need to preprocess tractstack nodes from drupal
  }
}
