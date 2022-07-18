import * as React from "react";

const DrupalMarkdownNodes = ["paragraph__markdown"];

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

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

  const typeDefs = `
type node__menu implements Node {
  field_image_logo: node__menuField_image_logo
}

type node__menuRelationships {
  field_image_logo: file__file @link(by: "id", from: "field_image_logo___NODE")
}

type node__menuField_image_logo {
  display: Boolean
  description: String
  drupal_internal__target_id: Int
}

`;
  createTypes(typeDefs);
};

exports.onCreateNode = ({
  node,
  createNodeId,
  createContentDigest,
  actions,
}) => {
  if (
    node.internal.owner !== "gatsby-source-drupal" ||
    !DrupalMarkdownNodes.includes(node.internal.type)
  ) {
    return {};
  }
  const { createNode, createNodeField, createParentChildLink } = actions;
  switch (node.internal.type) {
    case "paragraph__markdown":
      // generate MarkdownRemark and PaneFragment
      const markdownNode = {
        id: createNodeId(`${node.id} MarkdownRemark`),
        parent: node?.id,
        children: [],
        internal: {
          type: `PaneFragment`,
          mediaType: `text/markdown`,
          content: node?.field_markdown_body,
        },
      };
      markdownNode.frontmatter = {
        title: node?.field_alt_description,
        id: node?.id,
      };
      markdownNode.internal.contentDigest = createContentDigest(markdownNode);
      createNode(markdownNode);
      createParentChildLink({ parent: node, child: markdownNode });
      return markdownNode;
  }
};
