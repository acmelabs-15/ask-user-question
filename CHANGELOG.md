# ask-user-question

## 0.2.0

### Minor Changes

- [`6e9d8a7`](https://github.com/acmelabs-15/ask-user-question/commit/6e9d8a7994d5fb717bb0c294e908f442ff52484b) - Replace the question skill with an evidence-based preparation, reply, and repair cycle. Add distinct Claude Code, Codex, and Gemini CLI tool guidance, explicit waiting rules, and new evaluation cases. Remove the old references, examples, and evaluation scaffolding.

## 0.1.6

### Patch Changes

- [`eb5c0d5`](https://github.com/acmelabs-15/ask-user-question/commit/eb5c0d5bce2bb51f82db1e55a3f37829811c2ec2) - Adds a release pipeline. Changesets versions the plugin, and the release workflow cuts a `v<version>` tag, a GitHub release carrying the changelog entry, and a moving `latest` tag that the Claude Code, Codex and Gemini marketplaces follow.
  
  Adds `gemini-extension.json` so Gemini CLI can install the plugin.
