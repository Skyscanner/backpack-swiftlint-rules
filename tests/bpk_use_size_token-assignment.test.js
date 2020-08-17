import { customRules, cloneRegExp } from "../src";

describe("bpk_use_size_token assignment rule tests", () => {
  let testRegex;

  beforeEach(() => {
    expect(customRules["bpk_use_size_token"]).toBeTruthy();

    testRegex = cloneRegExp(customRules["bpk_use_size_token"].regex);
  });

  it("UIProgressBar.progress value assignment is not violation", () => {
    const match = testRegex.exec(
      "progressBar.progress = 42\nprogressBar.progress=42"
    );

    expect(match).toBeFalsy();
  });

  it("spacing value assignment is not violation if it uses backpack", () => {
    const match = testRegex.exec(
      "grid.spacing = BPKSpacingSm\ngrid.spacing=BPKSpacingBase"
    );

    expect(match).toBeFalsy();
  });

  it("spacing value assignment is not violation if it uses multiple of Backpack", () => {
    const match = testRegex.exec(
      "grid.spacing = 2 * BPKSpacingSm\ngrid.spacing=2*BPKSpacingLg"
    );

    expect(match).toBeFalsy();
  });

  it("spacing value assignment is not violation if it uses 0", () => {
    const match = testRegex.exec("grid.spacing = 0\ngrid.spacing=0");

    expect(match).toBeFalsy();
  });

  it("Multi-line example is not violation", () => {
    const match = testRegex.exec(
      "grid.spacing = BPKSpacingSm\nprogressBar.progress = 3"
    );

    expect(match).toBeFalsy();
  });

  it("spacing value assignment is violation if it uses float", () => {
    const match = testRegex.exec("grid.spacing = 44");

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("spacing = 44");
    expect(match[1]).toBe("44");
  });

  it("spacing value assignment is violation if it uses float with decimal", () => {
    const match = testRegex.exec("grid.spacing = 44.0");

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("spacing = 44.0");
    expect(match[1]).toBe("44.0");
  });

  it("spacing value assignment is violation if it uses product of floats", () => {
    const match = testRegex.exec("grid.spacing = 4 * 5");

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("spacing = 4 * 5");
    expect(match[1]).toBe("5");
  });

  it("spacing value assignment is violation if it uses product of floats with decimals", () => {
    const match = testRegex.exec("grid.spacing = 4.9 * 5.0");

    expect(match).toBeTruthy();
    expect(match.length > 1).toBeTruthy();
    expect(match[0]).toBe("spacing = 4.9 * 5.0");
    expect(match[1]).toBe("5.0");
  });
});
