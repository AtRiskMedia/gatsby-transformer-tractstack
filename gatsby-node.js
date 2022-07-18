"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DrupalMarkdownNodes = ["paragraph__markdown"];

exports.createSchemaCustomization = function (_ref) {
  var actions = _ref.actions;
  var createTypes = actions.createTypes;
  /*
  schema to preset...
     nodeStoryFragment(id: { eq: $id }) {
      field_slug
      relationships {
        field_menu {
          field_options
          field_theme
          field_pixel_height_mobile
          field_pixel_height_tablet
          field_pixel_height_desktop
          relationships {
            field_svg_logo {
              localFile {
                publicURL
              }
            }
            field_image_logo {
              localFile {
                childImageSharp {
                  mobile: gatsbyImageData(width: 256, placeholder: BLURRED)
                  tablet: gatsbyImageData(width: 512, placeholder: BLURRED)
                  desktop: gatsbyImageData(width: 768, placeholder: BLURRED)
                }
              }
            }
            field_menu_items {
              field_title
              field_slug
              field_options
              field_level
            }
          }
        }
        field_tract_stack {
          relationships {
            field_story_fragments {
              relationships {
                field_panes {
                  field_slug
                  field_options
                }
              }
            }
          }
        }
        field_panes {
          field_slug
          field_height_ratio_mobile
          field_height_ratio_tablet
          field_height_ratio_desktop
          field_height_offset_mobile
          field_height_offset_tablet
          field_height_offset_desktop
          relationships {
            field_pane_fragments {
              ... on paragraph__background_colour {
                field_background_colour
                field_hidden_viewports
              }
               ... on paragraph__background_pane {
                field_zindex
                field_shape_mobile
                field_shape_tablet
                field_shape_desktop
                field_css_styles_parent_mobile
                field_css_styles_parent_tablet
                field_css_styles_parent_desktop
                field_hidden_viewports
                field_options
              }
               ... on paragraph__background_video {
                field_zindex
                field_alt_text
                field_css_styles_parent_mobile
                field_css_styles_parent_tablet
                field_css_styles_parent_desktop
                field_image_mask_shape_mobile
                field_image_mask_shape_tablet
                field_image_mask_shape_desktop
                field_hidden_viewports
                field_cdn_url
                field_options
              }
               ... on paragraph__background_image {
                field_zindex
                field_alt_text
                field_css_styles_parent_mobile
                field_css_styles_parent_tablet
                field_css_styles_parent_desktop
                field_image_mask_shape_mobile
                field_image_mask_shape_tablet
                field_image_mask_shape_desktop
                field_hidden_viewports
                field_options
                field_background_position
                relationships {
                  field_image {
                    filename
                    localFile {
                      childImageSharp {
                        gatsbyImageData(width: 768, placeholder: BLURRED)
                      }
                    }
                  }
                }
              }
               ... on paragraph__svg {
                field_zindex
                field_css_styles_parent_mobile
                field_css_styles_parent_tablet
                field_css_styles_parent_desktop
                field_image_mask_shape_mobile
                field_image_mask_shape_tablet
                field_image_mask_shape_desktop
                field_hidden_viewports
                field_options
                field_svg_file {
                  description
                }
                relationships {
                  field_svg_file {
                    filename
                    localFile {
                      publicURL
                    }
                  }
                }
              }
               ... on paragraph__markdown {
                field_markdown_body
                field_zindex
                field_css_styles_mobile
                field_css_styles_tablet
                field_css_styles_desktop
                field_css_styles_parent_mobile
                field_css_styles_parent_tablet
                field_css_styles_parent_desktop
                field_image_mask_shape_mobile
                field_image_mask_shape_tablet
                field_image_mask_shape_desktop
                field_text_shape_outside_mobile
                field_text_shape_outside_tablet
                field_text_shape_outside_desktop
                field_hidden_viewports
                field_options
                field_modal
                childPaneFragment {
                  childMarkdownRemark {
                    htmlAst
                  }
                }
                relationships {
                  field_image {
                    filename
                    localFile {
                      childImageSharp {
                        gatsbyImageData(width: 768, placeholder: BLURRED)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  */

  var typeDefs = "\ntype node__menu implements Node {\n  field_image_logo: node__menuField_image_logo\n}\n\ntype node__menuRelationships {\n  field_image_logo: file__file @link(by: \"id\", from: \"field_image_logo___NODE\")\n}\n\ntype node__menuField_image_logo {\n  display: Boolean\n  description: String\n  drupal_internal__target_id: Int\n}\n\n";
  createTypes(typeDefs);
};

exports.onCreateNode = function (_ref2) {
  var node = _ref2.node,
      createNodeId = _ref2.createNodeId,
      createContentDigest = _ref2.createContentDigest,
      actions = _ref2.actions;

  if (node.internal.owner !== "gatsby-source-drupal" || !DrupalMarkdownNodes.includes(node.internal.type)) {
    return {};
  }

  var createNode = actions.createNode,
      createNodeField = actions.createNodeField,
      createParentChildLink = actions.createParentChildLink;

  switch (node.internal.type) {
    case "paragraph__markdown":
      // generate MarkdownRemark and PaneFragment
      var markdownNode = {
        id: createNodeId("".concat(node.id, " MarkdownRemark")),
        parent: node === null || node === void 0 ? void 0 : node.id,
        children: [],
        internal: {
          type: "PaneFragment",
          mediaType: "text/markdown",
          content: node === null || node === void 0 ? void 0 : node.field_markdown_body
        }
      };
      markdownNode.frontmatter = {
        title: node === null || node === void 0 ? void 0 : node.field_alt_description,
        id: node === null || node === void 0 ? void 0 : node.id
      };
      markdownNode.internal.contentDigest = createContentDigest(markdownNode);
      createNode(markdownNode);
      createParentChildLink({
        parent: node,
        child: markdownNode
      });
      return markdownNode;
  }
};
//# sourceMappingURL=gatsby-node.js.map