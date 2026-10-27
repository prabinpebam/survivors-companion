# Project operating rules

## Current phase: prototype, "show me the UX sooner" (owner, 2026-10-26)

- The owner authorized implementing the local prototype in `app/` per the spec and plan, iterating
  the UX and UI with the owner. No importer or database beyond browser-local storage.
- Publishing (owner, 2026-10-27): the public repository
  [prabinpebam/survivors-companion](https://github.com/prabinpebam/survivors-companion) deploys
  the app and the documentation to GitHub Pages
  (<https://prabinpebam.github.io/survivors-companion/>). Publish only with
  `node tools/publish.mjs`, and only when the owner asks. It pushes the local `public` branch
  (no `resources/`, no internal feed URLs) to the remote `public`. Never push `main`.
- Installing the three pinned documentation/workflow kits and editing Markdown, navigation JSON,
  and project instructions is in scope. Their upstream runtime is tooling, not the product.
- The owner explicitly requested two always-on local servers. Keep both running at all times
  and restart either if unavailable. `tools/serve.ps1 -Watch` runs from a Windows sign-in entry
  and restarts either one within 30 seconds:
  - Slate documentation reader: `http://127.0.0.1:8080/`
    (`python -m http.server 8080 --bind 127.0.0.1 --directory docs`).
  - Prototype app (Vite dev server, hot reload): `http://127.0.0.1:5173/` (`cd app; npm run dev`).
  Clean up temporary test servers only.
- Preserve `resources/` and `tools/archive/` unchanged. The archived wiki is evidence, not a
  ready-to-publish product dataset or a grant of asset rights.
- Desk research is not an interview or usability test. Label observations, inferences, proposals,
  unverified search results, and future validation distinctly. Never invent participants or results.
- Do not contact players, post in communities, publish, push, or deploy without authorization
  (publishing through `tools/publish.mjs` is authorized, see above).
  Local commits to the root repository on `main` are authorized (owner, 2026-10-26).
- Kit source, versions, setup commands, and boundaries: [kit setup](docs/planning/kit-setup.md).
- Public documentation must not imply official affiliation with poncle or the community wiki.

<!-- agentic-craft:start -->
## Craft (agentic-craft harness)

This project uses the [agentic-craft](https://github.com/prabinpebam/agentic-craft) skills for product reasoning: what is worth building and what success means. Start with the `craft` skill; it routes to the rest: `ground` (promise → jobs → user-can → flows → UI), `assumptions`, `definition-of-done`, `design-system`, `ui-copy`, `perceived-performance`, `performance`. Agents: `grounding-critic`, `design-system-auditor`. These skills define product intent and success criteria; they don't prescribe how the work is carried out.

### Project facts

- **Product artifacts:** [spec](docs/spec.md), [assumptions](docs/planning/assumptions.md),
  [decisions](docs/planning/decisions.md), [Definitions of Done](docs/planning/definition-of-done.md).
- **Design system:** proposed, not built: [design system](docs/design/design-system.md) (DTCG
  token proposal, tiers, enforcement suite), [components](docs/design/components.md) and the
  [app UX plan](docs/design/app-ux-plan.md). No token file, build command, components or library
  exist yet. Copy rules, catalogue and app glossary: [UI text](docs/design/ui-text.md), with the
  base glossary in [experience](docs/experience.md). Do not mistake Slate's theme for the
  product design system.
- **Performance:** no product benchmark or baseline exists. Proposed budgets are in the spec;
  measurement belongs to a separately authorized implementation phase.
<!-- agentic-craft:end -->

<!-- agent-orchestration:start -->
## Orchestration (agent-orchestration harness)

This project uses the [agent-orchestration](https://github.com/prabinpebam/agent-orchestration) skills to carry out work. Start with the `orchestrate` skill: it picks the mode (show me the UX sooner, prove the risky assumption, make this production-ready; work with me or keep going unattended) and routes to `execution-modes`, `stage-validation`, `progress-review` and `coordinate`. Agent: `throughput-reviewer` (about every 30 minutes of running work). These skills decide how work is run, not what to build; product intent comes from the files named below when there are any.

### Project facts

- **Product intent:** [spec](docs/spec.md) and [Definitions of Done](docs/planning/definition-of-done.md).
- **Work plan:** [current discovery work plan](docs/planning/work-plan.md).
- **Commands by validation tier:** documentation uses source verification, cross-reference checks,
  JSON parsing, kit pin/skill checks, and
  `node slate\scripts\runtime-host.mjs check --repo . --host docs`. The prototype uses
  `cd app; npm run check` (tokens, style/copy/design lints, type check) and `npm run build`.
  See [validation record](docs/planning/validation.md).
- **Progress log:** `.agent-orchestration/progress.log` (ignored); durable outcomes are in the
  work plan and [handoff](docs/planning/handoff.md).
- **Branches and merges:** the workspace root is a Git repository (branch `main`), initialized at
  the owner's request on 2026-10-26. Commit locally with descriptive messages. `main` has no
  remote and is never pushed. The only remote, `public`, receives the generated `public` branch
  from `tools/publish.mjs` as its `main` (owner, 2026-10-27). `slate/`, `agentic-craft/` and
  `agent-orchestration/` are top-level submodules pinned to the recorded kit revisions; do not move a pin
  without recording it in [kit setup](docs/planning/kit-setup.md). Archive media is stored with
  Git LFS and `resources/` and `tools/archive/` are stored byte-exact (`-text`; see
  `.gitattributes`). Must never break or rewrite the archive or its history.
- **Reviews and escalation:** review at stage boundaries and approximately every 30 minutes.
  Escalate rights/redistribution clearance, spending, participant contact, scope approval,
  or permission to implement; continue safe documentation work without inventing approval.
<!-- agent-orchestration:end -->
