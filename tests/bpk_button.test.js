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

import { customRules, cloneRegExp } from "../src";

describe("bpk_button rule tests", () => {
  let testRegex;

  beforeEach(() => {
    expect(customRules["bpk_button"]).toBeTruthy();

    testRegex = cloneRegExp(customRules["bpk_button"].regex);
  });

  it("UIButton variable is not violation", () => {
    const match = testRegex.exec("var button: UIButton");

    expect(match).toBeFalsy();
  });

  it("UIButton variable name is not violation", () => {
    const match = testRegex.exec("var button: UIButton");

    expect(match).toBeFalsy();
  });

  it("Multi-line example is not violation", () => {
    const match = testRegex.exec(
      "var button: UIButton\nbutton = BPKButton(style: .primary, size: .large)\nvar secondButton: BPKButton = BPKButton(style: .primary)"
    );

    expect(match).toBeFalsy();
  });

  it("UIButton initialiser call is violation", () => {
    const match = testRegex.exec(
      "var button: UIButton = UIButton(frame: .zero)"
    );

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("UIButton(");
    expect(match[1]).toBe("UIButton");
  });
});
