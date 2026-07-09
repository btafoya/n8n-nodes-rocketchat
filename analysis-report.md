# Code Analysis Report — `@btafoya/n8n-nodes-rocketchat`

**Scope:** Full project static analysis following `CLAUDE.md` and the `/sc:analyze` skill contract.  
**Date:** 2026-07-09  
**Package version:** 0.1.1  
**Confidence:** High for build/lint/test/audit results; moderate for architectural risk judgments.

---

## Executive Summary

| Domain | Result |
|--------|--------|
| **Tests** | 31 pass / 0 fail |
| **Lint** | 8 errors, 0 warnings — **fails** |
| **Build** | **fails** with 2 TypeScript errors |
| **Security audit** | 8 npm vulnerabilities (6 moderate, 2 high) — all transitive via dev/tooling deps |
| **Architecture** | Functional but has a structural redundancy: declarative routing coexists with a manual `execute()` method, which silently overrides it |

The node is small, well-scoped, and the test suite is healthy, but it is **not currently releasable** because `npm run build` and `npm run lint` both fail. The most important non-mechanical issue is the routing/execute duality, which creates a maintenance trap where future edits to resource descriptions will not change runtime behavior.

---

## Metrics

| Metric | Value |
|--------|-------|
| TypeScript source files (credentials + nodes) | 9 |
| Test files | 3 |
| Total lines of TypeScript source + tests | ~1,338 |
| Distinct node resources | 5 (channel, group, message, room, user) |
| Credential types | 2 (personal access token, OAuth2) |
| ESLint errors | 8 |
| TypeScript build errors | 2 |
| npm audit findings | 8 (6 moderate, 2 high) |

---

## Findings

### 1. Build failure — release blocker **[Severity: Critical]**

`npm run build` fails in `nodes/Rocketchat/Rocketchat.node.ts`:

- **Line 345** — `TS2684`: `this.helpers.httpRequestWithAuthentication` cannot be called because the `this` context (`IExecuteFunctions`) is not assignable to the method's required `IAllExecuteFunctions` context.
- **Line 346** — `TS2322`: `json: response as object` is not assignable to `IDataObject`; `object` lacks the required string index signature.

**Impact:** The package cannot be built or published.

**Recommendation:** Cast `response` to `IDataObject` (imported from `n8n-workflow`). For the `this` issue, verify the n8n-workflow version and helper typing; the current pattern usually works with the correct peer-dependency version, so this may also signal a version mismatch from `*` dependencies.

---

### 2. Lint errors in execute block — n8n community-node rule violations **[Severity: High]**

`npm run lint` reports 8 errors, all in `nodes/Rocketchat/Rocketchat.node.ts`:

| Line | Rule | Issue |
|------|------|-------|
| 58, 104, 150, 180, 231, 342 | `n8n-nodes-base/node-execute-block-wrong-error-thrown` | `throw new Error(...)` instead of `NodeOperationError` / `NodeApiError` / etc. |
| 318 | `@n8n/community-nodes/require-continue-on-fail` | `execute()` does not check `this.continueOnFail()` |
| 346 | `@n8n/community-nodes/missing-paired-item` | Output items lack `pairedItem: { item: index }` |

**Impact:** These are non-autofixable community-node lint rules. The node will not pass n8n validation or publish checks.

**Recommendation:** Wrap the per-item loop in `try/catch`, use `NodeOperationError` for unsupported resource/operation cases, return `{ json: ..., pairedItem: { item: i } }`, and branch on `this.continueOnFail()`.

---

### 3. Routing/execute duality — architectural redundancy **[Severity: High]**

The node defines **both** declarative routing inside `INodeProperties` (e.g. `nodes/Rocketchat/resources/message.ts:24-49`) **and** a manual `execute()` method that rebuilds the same requests imperatively (`Rocketchat.node.ts:318-349`). In n8n, `execute()` overrides declarative routing, so the routing definitions are dead code at runtime.

Concrete symptoms:

- `message.ts:48` has a malformed expression string with an extra `}}`: `'={{ { roomId: ..., msgId: ..., text: ... } } }}'`. It never executes.
- Any future edit to the resource descriptions will not change actual behavior unless the corresponding `build*Request` helper is also updated.
- The two implementations already diverge in details (e.g. `requestDefaults` sets `Content-Type: application/json`, but each `build*Request` repeats it).

**Impact:** High maintenance risk and silent inconsistency.

**Recommendation:** Pick one approach:

1. **Preferred for this scope:** Remove the manual `execute()` and `build*Request` functions, keep the declarative routing, and let n8n handle credentials, errors, paired items, and `continueOnFail` automatically. This also resolves most of the lint/build errors.
2. Alternative: Remove routing from the resource descriptions and keep only `execute()`, then fix the lint/build issues manually.

---

### 4. Channel and group request builders are near-duplicates **[Severity: Medium]**

`buildChannelRequest` (`Rocketchat.node.ts:61-105`) and `buildGroupRequest` (`Rocketchat.node.ts:107-151`) differ only by the API path prefix (`channels` vs `groups`). The same pattern appears in the resource descriptions (`channel.ts` vs `group.ts`).

**Impact:** Any bug fix or endpoint change must be applied twice.

**Recommendation:** If keeping `execute()`, refactor into a single helper parameterized by room type. If moving to declarative routing, consider whether the channel/group split is necessary or whether a single `room` resource with a type selector is simpler.

---

### 5. README badge URLs are malformed **[Severity: Low / Quality]**

`README.md:5-6` uses URLs like `https://github.com/btafoya/@btafoya/n8n-nodes-rocketchat/blob/main/LICENSE` and `https://github.com/btafoya/@btafoya/n8n-nodes-rocketchat/actions/workflows/publish.yml`. The repository name is duplicated with the npm scope prefix.

**Impact:** Broken links in published documentation.

**Recommendation:** Remove the extra `@btafoya/` segment from the GitHub paths.

---

### 6. Wildcard dependency versions **[Severity: Medium / Maintenance]**

`package.json` pins `eslint`, `typescript`, and `prettier` but leaves critical n8n tooling as wildcards:

- `@n8n/node-cli: "*"`
- `n8n-workflow: "*"` (peer dependency)

**Impact:** Builds are non-deterministic. A future `@n8n/node-cli` release can introduce new lint rules that break CI, or a newer `n8n-workflow` can change types and break the build. The current build failure may already be caused by a version mismatch.

**Recommendation:** Pin to known-good versions (e.g. the currently installed `@n8n/node-cli@0.38.7`) and use a compatible `n8n-workflow` version range.

---

### 7. `CLAUDE.md` is ignored by git but present **[Severity: Low / Config]**

`.gitignore:7` lists `CLAUDE.md`, yet the file exists in the working tree and is referenced as a project contract. `git ls-files` confirms `CLAUDE.md` is **not** tracked.

**Impact:** The project contract file is not version-controlled. If it is intended to be shared, it can be accidentally lost; if it is intended to be private, it should not live in the repo root alongside published code.

**Recommendation:** Either remove the `.gitignore` line and track `CLAUDE.md`, or move it to a location that matches the intended privacy model.

---

### 8. Security audit findings in transitive dependencies **[Severity: High / Supply Chain]**

`npm audit` reports 8 vulnerabilities. The high-severity findings are in `undici` (7.0.0 – 7.27.2):

- TLS certificate validation bypass via SOCKS5 proxy (`GHSA-vmh5-mc38-953g`)
- HTTP header injection via `Set-Cookie` decoding (`GHSA-p88m-4jfj-68fv`)
- WebSocket fragment-count DoS (`GHSA-vxpw-j846-p89q`)
- Cross-origin request routing via SOCKS5 proxy pool reuse (`GHSA-hm92-r4w5-c3mj`)

Moderate findings flow through `@langchain/classic`, `@langchain/community`, `@n8n/ai-node-sdk`, `@n8n/ai-utilities`, and `uuid`.

**Impact:** These are dev/tooling dependencies, but they participate in build, lint, and release. Some vulnerabilities could affect CI or local dev environments.

**Recommendation:** Run `npm audit fix` after pinning `@n8n/node-cli` and `n8n-workflow` to compatible versions. Verify that `npm run build` and `npm test` still pass after the update. Do not run `npm audit fix --force` without review.

---

### 9. No input validation or URL sanitization **[Severity: Medium / Security-Adjacent]**

`baseUrl` comes from credentials and is used directly as `baseURL`. There is no validation that it is a valid HTTPS URL, no trailing-slash normalization, and no guard against newline or control characters in user-provided `roomId`, `userId`, or `text`.

**Impact:** Credential misconfiguration can produce malformed requests. Malicious input could theoretically be used for header injection if the values reach headers, although current code places them in the body/query.

**Recommendation:** Add minimal validation in credential fields (e.g. `placeholder` and `description` already ask for no trailing slash, but no enforcement). For production robustness, trim and validate `baseUrl` before use. This is lower priority than the build/lint blockers.

---

### 10. OAuth2 credential requires manual `userId` **[Severity: Low / UX]**

`RocketchatOAuth2Api.credentials.ts:34-39` requires the user to supply a `userId` even though the OAuth2 flow already authenticates a specific user.

**Impact:** Extra manual step for OAuth2 users.

**Recommendation:** Verify whether Rocket.Chat's `/api/v1/me` endpoint can provide the `userId` after token exchange. If so, the credential can derive `X-User-Id` automatically instead of requiring manual entry.

---

## Recommendation Priority List

| # | Action | Blocks Release | Effort |
|---|--------|----------------|--------|
| 1 | Resolve the 2 TypeScript build errors | Yes | Small |
| 2 | Fix the 8 ESLint errors (errors, continueOnFail, pairedItem) | Yes | Small–Medium |
| 3 | Decide on declarative routing vs `execute()` and remove the unused path | No, but high ROI | Medium |
| 4 | Pin `@n8n/node-cli` and `n8n-workflow` versions | Indirectly | Small |
| 5 | Run `npm audit fix` and re-verify build/test | No | Small |
| 6 | Fix README badge URLs | No | Tiny |
| 7 | Resolve `CLAUDE.md` / `.gitignore` mismatch | No | Tiny |
| 8 | Deduplicate channel/group helpers if `execute()` is kept | No | Small |
| 9 | Add lightweight `baseUrl`/input validation | No | Small |

---

## Improvement Roadmap

### Phase 1 — Unblock release
- Fix TypeScript build errors.
- Fix all ESLint errors.
- Re-run `npm run lint`, `npm run build`, `npm test`, `npm audit`.

### Phase 2 — Structural cleanup
- Choose declarative routing or imperative `execute()`.
- Remove dead routing expressions or dead `build*Request` helpers.
- Deduplicate channel/group logic if the imperative path is kept.

### Phase 3 — Dependency and security hygiene
- Pin wildcard dependencies.
- Update transitive deps to resolve audit findings.
- Add CI step that fails on `npm audit --audit-level=moderate`.

### Phase 4 — Documentation polish
- Fix README badge URLs.
- Decide on `CLAUDE.md` tracking.
- Expand tests to cover error paths and paired items once lint rules are satisfied.

---

## Methodology Notes

- Started with `recall_memories` per memory protocol.
- Used CodeGraph to map symbol dependencies and verify resource wiring.
- Ran `npm test`, `npm run lint`, `npm run build`, and `npm audit` as ground-truth checks.
- Read `package.json`, `tsconfig.json`, source files, test files, `README.md`, `.gitignore`, and `eslint.config.mjs` directly.
- Did not modify source code; this report is intended as input to `/sc:improve` or manual remediation.
