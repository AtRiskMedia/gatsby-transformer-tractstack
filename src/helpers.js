//const DomParser = require("dom-parser");

const imageTagExtractor = (html) => {
  const regExImageTag = /\(\/sites[^)]+\)/gi; // from Drupal
  const imageTags = content.match(regExImageTag);
  if (imageTags) {
    const nodes = getNodes();
    imageTags.forEach((element) => {
      const imageTag = element.slice(1, -1);
      const imageTagCached = imageTags.find(
        (file) =>
          file.internal.type === "File" &&
          file.internal.description.includes(imageTag)
      );
      if (imageTagCached) {
        console.log(`replace ${imageTag}`);
        content = content.replace(
          new RegExp(imageTag, "g"),
          imageTagCached.relativePath
        );
      }
    });
  }
};

/*
const tagExtractor = (content) => {
  const tagParser = new DomParser();
  // in pre-processing markdown from Drupal
  // parse for non-gatsby image, svg, links and tractstack actions
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
*/

module.exports = {
  //  tagExtractor,
  imageTagExtractor,
};
