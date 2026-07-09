#!/usr/bin/env bash
set -euo pipefail

# Release script for @btafoya/n8n-nodes-rocketchat.
#
# In CI (GITHUB_ACTIONS set): lints, builds, and publishes to npm with provenance.
# Locally: runs release-it via n8n-node release to bump the version, regenerate
# CHANGELOG.md with auto-changelog, commit, tag, push, and create a GitHub release.
#
# Usage:
#   npm run release                 # local release
#   npm run release:publish         # local release + publish (no provenance)

cd "$(dirname "$0")/.."

if [ -n "${GITHUB_ACTIONS:-}" ]; then
	echo "Releasing in CI: linting, building, and publishing to npm with provenance."
	npx n8n-node release
else
	npx n8n-node release "$@"
fi
