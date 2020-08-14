import { customRules } from "../src";

describe("bpk_button rule tests", () => {
  let testRegex;

  beforeAll(() => {
    expect(customRules["bpk_button"]).toBeTruthy();

    testRegex = customRules["bpk_button"].regex;
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
