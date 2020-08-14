const yaml = require("js-yaml");
const fs = require("fs");

// These flags best reflect the way in which code tested by SwiftLint
const REGEX_FLAGS = "mgs";

let doc = null;
let customRules = {};

try {
  doc = yaml.safeLoad(
    fs.readFileSync("./src/BackpackSwiftLintRules.yml", "utf8")
  );
} catch (e) {
  console.error(e);
}

const parseCustomRule = (object) => {
  return {
    regex: new RegExp(object.regex, REGEX_FLAGS),
  };
};

if (doc && doc["custom_rules"]) {
  Object.keys(doc["custom_rules"]).forEach((k) => {
    customRules[k] = parseCustomRule(doc["custom_rules"][k]);
  });
}

export default doc;
export { doc, customRules };
