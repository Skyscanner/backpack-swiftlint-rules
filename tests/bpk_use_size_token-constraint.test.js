import { customRules, cloneRegExp } from "../src";

describe("bpk_use_size_token constraint rule tests", () => {
  let testRegex;

  beforeEach(() => {
    expect(customRules["bpk_use_size_token"]).toBeTruthy();

    testRegex = cloneRegExp(customRules["bpk_use_size_token"].regex);
  });

  it("Constraint with no constant is not violation", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor)"
    );

    expect(match).toBeFalsy();
  });

  it("Constraint constant is not violation if it uses backpack", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: BPKSpacingBase)"
    );

    expect(match).toBeFalsy();
  });

  it("Constraint constant is not violation if it uses negative backpack", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: -BPKSpacingBase)"
    );

    expect(match).toBeFalsy();
  });

  it("Constraint constant is not violation if it uses multiple of Backpack", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 4 * BPKSpacingBase)"
    );

    expect(match).toBeFalsy();
  });

  it("Constraint constant is not violation if it uses 0", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 0)"
    );

    expect(match).toBeFalsy();
  });

  it("Multi-line example is not violation", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: BPKSpacingMd)\nprogressBar.progress = 3"
    );

    expect(match).toBeFalsy();
  });

  it("Multi-line example is violation if it uses float", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(\nequalTo: contentView.topAnchor,\nconstant: 45\n)"
    );

    expect(match).toBeTruthy();
    expect(match.length > 2).toBeTruthy();
    expect(match[0]).toBe(
      "constraint(\nequalTo: contentView.topAnchor,\nconstant: 45\n)"
    );
    expect(match[2]).toBe("45");
  });

  it("Constraint constant is violation if it uses float", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 45)"
    );

    expect(match).toBeTruthy();
    expect(match.length > 2).toBeTruthy();
    expect(match[0]).toBe(
      "constraint(equalTo: contentView.topAnchor, constant: 45)"
    );
    expect(match[2]).toBe("45");
  });

  it("Constraint constant is violation if it uses float across multiple lines", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: BPKSpacingBase),\nself.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 45)"
    );

    expect(match).toBeTruthy();
    expect(match.length > 2).toBeTruthy();
    expect(match[0]).toBe(
      "constraint(equalTo: contentView.topAnchor, constant: 45)"
    );
    expect(match[2]).toBe("45");
  });

  it("Constraint constant is violation if it uses non-integer float", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 45.0)"
    );

    expect(match).toBeTruthy();
    expect(match.length > 2).toBeTruthy();
    expect(match[0]).toBe(
      "constraint(equalTo: contentView.topAnchor, constant: 45.0)"
    );
    expect(match[2]).toBe("45.0");
  });

  it("Constraint constant is violation if it uses product of floats", () => {
    const match = testRegex.exec(
      "self.topAnchor.constraint(equalTo: contentView.topAnchor, constant: 4 * 5)"
    );

    expect(match).toBeTruthy();
    expect(match.length > 2).toBeTruthy();
    expect(match[0]).toBe(
      "constraint(equalTo: contentView.topAnchor, constant: 4 * 5)"
    );
    expect(match[2]).toBe("5");
  });
});
