---
"ask-user-question": patch
---

Adds a release pipeline. Changesets versions the plugin, and the release workflow cuts a `v<version>` tag, a GitHub release carrying the changelog entry, and a moving `latest` tag that the Claude Code, Codex and Gemini marketplaces follow.

Adds `gemini-extension.json` so Gemini CLI can install the plugin.
