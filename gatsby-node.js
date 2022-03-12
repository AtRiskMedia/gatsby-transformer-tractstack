"use strict";

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
exports.onCreateNode = function (_ref) {
  var node = _ref.node,
      actions = _ref.actions;
  var DrupalNodes = ['file__file', 'node__tractstack', 'node__story_fragment', 'node__pane'];

  if (node.internal.owner === "gatsby-source-drupal" && DrupalNodes.includes(node.internal.type)) {
    console.log("parent node added: ", node.internal.type);
    console.log(node); // need to preprocess tractstack nodes from drupal
  }
};
//# sourceMappingURL=gatsby-node.js.map