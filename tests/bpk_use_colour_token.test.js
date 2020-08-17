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
