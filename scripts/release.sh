#!/usr/bin/env bash
set -euo pipefail

# Release script for @btafoya/n8n-nodes-rocketchat.
#
# One-command release flow. Locally: lints, builds, bumps version, regenerates
# CHANGELOG.md, commits, tags, pushes, and creates a GitHub release. The tag push
# triggers .github/workflows/publish.yml to publish to npm with provenance.
#
# In CI (GITHUB_ACTIONS set): lints, builds, and publishes to npm with provenance.
#
# Usage:
#   npm run release                 # bump patch, non-interactive
#   npm run release -- minor        # bump minor
#   npm run release -- major        # bump major
#   npm run release -- 0.1.3        # explicit version
#   npm run release -- --publish    # also publish locally (no provenance)

cd "$(dirname "$0")/.."

PM="npm"
INCREMENT="patch"
PUBLISH="false"

# Parse arguments: first non-option argument is the increment; --publish toggles publish.
for arg in "$@"; do
	case "$arg" in
		--publish)
			PUBLISH="true"
			;;
		minor|major|patch|pre*|[0-9]*.[0-9]*.[0-9]*)
			INCREMENT="$arg"
			;;
	esac
done

if [ -n "${GITHUB_ACTIONS:-}" ]; then
	echo "Releasing in CI: linting, building, and publishing to npm with provenance."
	$PM run lint
	$PM run build
	NPM_CONFIG_PROVENANCE=true npm publish
	exit 0
fi

if [ "$PUBLISH" = "true" ]; then
	echo "Warning: --publish bypasses npm provenance."
fi

echo "Releasing increment: $INCREMENT"

# Run release-it non-interactively with the same guardrails n8n-node release uses.
npx release-it \
	--ci \
	--increment="$INCREMENT" \
	--git.requireBranch=main \
	--git.requireCleanWorkingDir \
	--git.requireUpstream \
	--git.requireCommits \
	--git.commit \
	--git.tag \
	--git.push \
	--git.tagName='v${version}' \
	--git.commitMessage='Release v${version}' \
	--github.release \
	--hooks.before:init="$PM run lint && $PM run build" \
	--hooks.after:bump="npx auto-changelog -p" \
	--npm.publish="$PUBLISH"
