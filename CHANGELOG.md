# ask-user-question

## 0.2.1

### Patch Changes

- [#4](https://github.com/acmelabs-15/ask-user-question/pull/4) [`79b9173`](https://github.com/acmelabs-15/ask-user-question/commit/79b9173e0fb13ac27317b44ba4e9141063d0b821) - Deprecates the plugin. Its skill ships in brain from v0.7.0, under the same name. The README says how to move to brain and how to remove this plugin, and both manifest descriptions start with "Deprecated:". The acmelabs marketplace drops the plugin, and the repository is archived after this release.

## 0.2.0

### Minor Changes

- [`6e9d8a7`](https://github.com/acmelabs-15/ask-user-question/commit/6e9d8a7994d5fb717bb0c294e908f442ff52484b) - Replace the question skill with an evidence-based preparation, reply, and repair cycle. Add distinct Claude Code, Codex, and Gemini CLI tool guidance, explicit waiting rules, and new evaluation cases. Remove the old references, examples, and evaluation scaffolding.

## 0.1.6

### Patch Changes

- [`eb5c0d5`](https://github.com/acmelabs-15/ask-user-question/commit/eb5c0d5bce2bb51f82db1e55a3f37829811c2ec2) - Adds a release pipeline. Changesets versions the plugin, and the release workflow cuts a `v<version>` tag, a GitHub release carrying the changelog entry, and a moving `latest` tag that the Claude Code, Codex and Gemini marketplaces follow.
  
  Adds `gemini-extension.json` so Gemini CLI can install the plugin.
