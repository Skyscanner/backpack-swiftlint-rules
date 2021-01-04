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

describe("bpk_use_colour_token constraint rule tests", () => {
  let testRegex;

  beforeEach(() => {
    expect(customRules["bpk_use_colour_token"]).toBeTruthy();

    testRegex = cloneRegExp(customRules["bpk_use_colour_token"].regex);
  });

  it("UIColor variable is not violation", () => {
    const match = testRegex.exec("var someColor: UIColor");

    expect(match).toBeFalsy();
  });

  it("Multi-line example is not violation", () => {
    const match = testRegex.exec(
      "var color: UIColor\ncolor = BPKColor.panjin\nUIColor.red"
    );

    expect(match).toBeFalsy();
  });

  it("Multi-line example is violation", () => {
    const match = testRegex.exec("label.textColor =\nUIColor.purple");

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("Color =\nUIColor");
    expect(match[1]).toBe("UIColor");
  });

  it("textColor assignment is violation", () => {
    const match = testRegex.exec("label.textColor = UIColor.purple");

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("Color = UIColor");
    expect(match[1]).toBe("UIColor");
  });

  it("backgroundColor assignment is violation", () => {
    const match = testRegex.exec("grid.backgroundColor = UIColor.redColor");

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("Color = UIColor");
    expect(match[1]).toBe("UIColor");
  });

  it("UIColor use within dynamic colour is violation", () => {
    const match = testRegex.exec(
      "label.textColor = BPKColor.dynamicColor(withLightVariant: UIColor.redColor, withDarkVariant: UIColor.whiteColor)"
    );

    expect(match).toBeTruthy();
    expect(match.length > 2).toBeTruthy();
    expect(match[0]).toBe("Variant: UIColor");
    expect(match[2]).toBe("UIColor");
  });
});
