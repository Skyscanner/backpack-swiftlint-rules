/*
 * backpack-swiftline-rules
 *
 * Copyright 2018-2021 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

const cloneRegExp = (regex) => new RegExp(regex.source, regex.flags);

export default doc;
export { doc, customRules, cloneRegExp };
