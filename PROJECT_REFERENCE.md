# n8n Community Node Project Reference

This document maps the official n8n community node guidelines to this repository (`@btafoya/n8n-nodes-rocketchat`). Use it as a quick reference when maintaining or extending the node.

Source: [Building Community Nodes — n8n Docs](https://docs.n8n.io/integrations/community-nodes/building-community-nodes)

## Package conventions

| Requirement | Project status | Notes |
|-------------|----------------|-------|
| Package name must begin with `n8n-nodes-` or `@<scope>/n8n-nodes-` | ✅ | `@btafoya/n8n-nodes-rocketchat` |
| Include keyword `n8n-community-node-package` | ✅ | Listed in `package.json` |
| Provide a public README | ✅ | `README.md` |
| No runtime dependencies (required for verification) | ✅ | Only `peerDependencies` and `devDependencies` |

## n8n-node CLI

This project uses the official `@n8n/node-cli` toolchain.

```bash
npm run lint       # ESLint checks via the n8n-node preset
npm run lint:fix   # Auto-fix ESLint issues
npm run build      # Production build
npm run build:watch # TypeScript watch mode
npm run dev        # Link package for local n8n testing
npm run release    # Bump version, commit, tag, and push (triggers publish workflow)
npm run prepublishOnly  # Pre-publish validation
```

## Build and distribution

- TypeScript compiles to `dist/`.
- `package.json` `"files"` is set to `["dist"]` so only the build output is published.
- `tsconfig.json` includes `credentials/**/*`, `nodes/**/*`, `nodes/**/*.json`, and `package.json`.

## Publishing

n8n requires verified community nodes to be published via GitHub Actions with an npm provenance statement (effective May 1, 2026).

- Use `npm run release` to create versions; it is intended to trigger the publish workflow.
- Configure npm trusted publishing or store an `NPM_TOKEN` repository secret.

## Verification readiness

To qualify as a verified community node, ensure:

1. No runtime dependencies are added.
2. `npm run lint` passes.
3. `npm run build` succeeds.
4. The `n8n` block in `package.json` correctly registers the node and credential.
5. README and credential documentation links are public and up to date.
6. Publishing happens exclusively through the GitHub Actions `publish.yml` workflow with provenance.

## Useful links

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Building Community Nodes](https://docs.n8n.io/integrations/community-nodes/building-community-nodes)
- [n8n Nodes Starter](https://github.com/n8n-io/n8n-nodes-starter)
- [Rocketchat API Docs](https://developer.rocket.chat/apidocs#rocketchat-rest-api/)
