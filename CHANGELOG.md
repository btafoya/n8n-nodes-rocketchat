# Changelog

All notable changes to this project will be documented in this file.

## [0.1.2] - 2026-07-09

### Fixed
- Removed the manual `execute()` method so the declarative routing definitions drive runtime behavior.
- Fixed the malformed expression in the message `update` operation payload.
- Corrected all ESLint errors (`throw new Error`, `continueOnFail`, `pairedItem`).
- Resolved TypeScript build errors (`httpRequestWithAuthentication` context and `IDataObject` cast).
- Pinned `@n8n/node-cli` and `n8n-workflow` devDependencies for reproducible builds.
- Updated `release-it` to 20.2.1 to resolve high-severity `undici` advisories.
- Fixed malformed GitHub badge URLs in `README.md`.

## [0.1.1] - 2026-07-09

### Fixed
- Corrected `chat.sendMessage` payload field from `text` to `msg` inside `message`.

## [0.1.0] - 2026-07-09

### Added
- Initial n8n community node for RocketChat.
- Project planning and design documentation (`PROJECT_REFERENCE.md`).

### Changed
- Set up project workflow and scaffolding.
- Added `.gitignore` and project reference configuration.
