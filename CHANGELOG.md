# ask-user-question

## 0.1.6

### Patch Changes

- [`eb5c0d5`](https://github.com/acmelabs-15/ask-user-question/commit/eb5c0d5bce2bb51f82db1e55a3f37829811c2ec2) - Adds a release pipeline. Changesets versions the plugin, and the release workflow cuts a `v<version>` tag, a GitHub release carrying the changelog entry, and a moving `latest` tag that the Claude Code, Codex and Gemini marketplaces follow.
  
  Adds `gemini-extension.json` so Gemini CLI can install the plugin.
