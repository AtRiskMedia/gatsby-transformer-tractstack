// in pre-processing markdown from Drupal
// parse for non-gatsby image, svg, links and tractstack actions

const DomParser = require("dom-parser");
const tagParser = new DomParser();

const tagExtractor = (content) => {
  const imageTagsParsed = tagParser.parseFromString(content)
  const imageTags = imageTagsParsed.getElementsByTagName("img")
  const imageTagsProcessed = [];
  imageTagsProcessed.forEach(imageTag => {
      imageTag.attributes.forEach(async (imageTagAttrs) => {
      if (inlineImageAttrs.name === 'src') {
        const imageUrl = `https://${imageTagAttrs.value}`;
        imageTags.push({
          relativePath: imageTagAttrs.value,
          remotePath: imageUrl
        });
      }
    })
  });

  return {
    contentProcessed: content,
    imageTagsProcessed: imageTagsProcessed
  };
}

module.exports = {
  tagExtractor
}
