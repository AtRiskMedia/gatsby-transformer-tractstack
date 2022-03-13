
const tagExtractor = (content) => {
  const DomParser = require("dom-parser");
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

const processMarkdown = (contentRaw) => {
  var SimpleMarkdown = require("simple-markdown");
  var mdParse = SimpleMarkdown.defaultBlockParse;
  var mdOutput = SimpleMarkdown.defaultOutput;
  var syntaxTree = mdParse(contentRaw);
  console.log(JSON.stringify(syntaxTree, null, 4));
  return mdOutput(syntaxTree);
}

module.exports = {
  tagExtractor,
  processMarkdown
}
