import Foundation
import Yaml

final class BPKSwiftLintRules: NSObject {

    var text = "Hello world!"

    // In Swift tools 5.3, we should be able to make the `yml` file a Resource in the package, and then load it at runtime instead of re-defining it here.
    // See https://useyourloaf.com/blog/add-resources-to-swift-packages/
    var rules = "custom_rules:\n\n  # Component rules\n\n  bpk_button:\n    name: \"Prefer BPKButton to UIButton\"\n    regex: \"(UIButton)\\(\"\n    message: \"Use BPKButton instead of UIButton.\"\n    severity: warning # default is warning\n    # Try it out at https://regex101.com/r/ZPASYH/2\n \n  bpk_label:\n    name: \"Prefer BPKLabel to UILabel\"\n    regex: \"(UILabel)\\(\"\n    message: \"Use BPKLabel instead of UILabel.\"\n    severity: warning # default is warning\n \n  bpk_progress:\n    name: \"Prefer BPKProgressBar to UIProgressView\"\n    regex: \"(UIProgressView)\\(\"\n    message: \"Use BPKProgressBar instead of UIProgressView.\"\n    severity: warning # default is warning\n \n  bpk_spinner:\n    name: \"Prefer BPKSpinner to UIActivityIndicatorView\"\n    regex: \"(UIActivityIndicatorView)\\(\"\n    message: \"Use BPKSpinner instead of UIActivityIndicatorView.\"\n    severity: warning # default is warning\n \n  bpk_switch:\n    name: \"Prefer BPKSwitch to UISwitch\"\n    regex: \"(UISwitch)\\(\"\n    message: \"Use BPKSwitch instead of UISwitch.\"\n    severity: warning # default is warning\n \n  bpk_text_field:\n    name: \"Prefer BPKTextField to UITextField\"\n    regex: \"(UITextField)\\(\"\n    message: \"Use BPKTextField instead of UITextField.\"\n    severity: warning # default is warning\n \n  bpk_text_view:\n    name: \"Prefer BPKTextView to UITextView\"\n    regex: \"(UITextView)\\(\"\n    message: \"Use BPKTextView instead of UITextView.\"\n    severity: warning # default is warning\n    # Try it out at https://regex101.com/r/F8sAgX/1\n\n  # Size token rules\n\n  bpk_use_size_token:\n    name: \"Prefer Backpack tokens to hard-coded numbers\"\n    regex: \"(?:(?:cornerRadius|spacing)\\s*=\\s*|constrain.*constant\\s*:\\s*)([0-9]+)\"\n    message: \"Use a size or radius token from Backpack instead of a hard-coded number.\"\n    severity: warning # default is warning\n    # Try it out at https://regex101.com/r/a2znCq/2\n\n  # Colour token rules\n\n  bpk_use_colour_token:\n    name: \"Prefer Backpack colour tokens to UIColors\"\n    regex: \"(?:Color|color)\\s+=.*(UIColor)\"\n    message: \"Use a colour token from Backpack instead of a UIColor.\"\n    severity: warning # default is warning\n    # Try it out at https://regex101.com/r/3NOwYr/4\n\n"

    var parsedYaml: [Yaml: Yaml]?

    override init() {
        do {
            parsedYaml = try Yaml.load(rules).dictionary
        } catch {
            print("Oooops! \(error)")
        }

        let rules = parsedYaml?["custom_rules"]
        let iterator = rules.getIter
        print(rules?.dictionary?.keys)
        //        for key in rules?.dictionary?.keys {
        //                print(key)
        //        }
    }

    func parseRule(name: String, dict: [String: Any]) {

    }
}




