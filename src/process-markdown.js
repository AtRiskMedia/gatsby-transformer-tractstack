
const processMarkdown = (contentRaw) => {
  var SimpleMarkdown = require("simple-markdown");
  var mdParse = SimpleMarkdown.defaultBlockParse;
  var mdOutput = SimpleMarkdown.defaultOutput;
  var syntaxTree = mdParse(contentRaw);
  console.log(JSON.stringify(syntaxTree, null, 4));
  return mdOutput(syntaxTree);
}

module.exports = {
  processMarkdown
}
