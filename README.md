# Backpack SwiftLint rules

A collection of SwiftLint rules that can help increase Backpack adoption.

## Installation

Unfortunately we do not have a way to distribute these through any package-manager, so if you want to use these rule, simply copy the ones you want from [`BackpackSwiftLintRules.yml`](https://github.com/Skyscanner/backpack-swiftlint-rules/blob/main/src/BackpackSwiftLintRules.yml) and place them inside your own `.swiftlint.yml` file.

> Tip: You might want to add a comment saying where they're from so that it's easy to come and update them in the future.

## Usage

Any time you have a valid reason for ignoring a rule, simply use the [comment syntax for disabling SwiftLint rules](https://github.com/realm/SwiftLint#disable-rules-in-code).

### False-positives

If you experience any false-positives (or false-negatives) then let Backpack know, or raise an issue on the repo.

## Contributing

Feel free to fork and submit a PR.

### Set up

To install necessary dependencies, first ensure you have `Node` installed and run `npm ci`.

### Test

Run `npm test` to ensure that your changes haven't broken any existing use-cases.
