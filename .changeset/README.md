# Changesets

This directory holds the pending changes for the next release.

A change that a user would notice needs a changeset. Run:

```
bunx changeset
```

Pick the bump — patch, minor or major — and write one or two lines saying what
changed. That text becomes the `CHANGELOG.md` entry, so write it for a reader
who did not see the diff.

A change nobody installing the plugin would notice needs no changeset. An eval
tweak, a note, a workflow fix.

## What happens next

The release workflow opens a pull request named `ci: Version Packages`. That
pull request applies every pending changeset: it bumps the version, rewrites
`CHANGELOG.md`, and deletes the changeset files it consumed.

Merging that pull request cuts the release.
