"use strict";

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
exports.onCreateNode = function (_ref) {
  var node = _ref.node,
      actions = _ref.actions;
  var createNode = actions.createNode,
      createNodeField = actions.createNodeField;
  if (node && node.internal && node.internal.type) console.log("node added: ", node.internal.type);
};
//# sourceMappingURL=gatsby-node.js.map