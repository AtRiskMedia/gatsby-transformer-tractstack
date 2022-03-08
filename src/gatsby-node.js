/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.onCreateNode = ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  if( node && node.internal && node.internal.type )
    console.log( "node added: ", node.internal.type );
}
