# Agent Instructions

Read `./CLAUDE.md` before making substantial changes in this repository.

If a parent directory also contains `AGENTS.md` or `CLAUDE.md`, follow the more local file when instructions conflict.


## Working Agreement

- Follow existing project conventions before introducing new patterns.
- Run the most relevant tests or checks for the files you change.
- Update docs when changing architecture, APIs, configuration, operational workflows, or deployment behavior.
- Do not overwrite unrelated local changes.

## Repo Notes

Replace this section with repo-specific instructions such as:

- preferred dev and test commands
- deployment steps
- code style constraints
- architectural guardrails
- directories that need extra care
- services or environment dependencies

## Suggested Minimal Overrides

Add only the rules that are specific enough to affect agent behavior, for example:

- `npm test` is required for backend changes
- `flutter analyze` and `flutter test` are required for app changes
- update `database/schema.sql` together with migrations
- avoid editing generated files under `dist/`

