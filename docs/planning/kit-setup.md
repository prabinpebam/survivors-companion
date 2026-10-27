# Workflow kit setup

> **TL;DR:** All three kits are installed locally at the revisions pinned by the linked
> Loushing stack. Only their research, specification, planning, and documentation workflows
> are being used. No product implementation is authorized.

## Installed handoff

| Kit | Role now | Produces | Hands to |
|---|---|---|---|
| agentic-craft | Ground product intent in observed tasks; make uncertainty explicit | Promise, jobs, user-can statements, flows, assumptions, DoD | Orchestration work plan and Slate docs |
| agent-orchestration | Bound and track the documentation work | Work plan, validation record, handoff | Craft when evidence changes intent; Slate for durable reading |
| Slate | Publish local, navigable documentation | Markdown pages, manifest, unchanged reader runtime | Owner and future contributors |

The workspace-root `AGENTS.md` contains project facts and the no-code boundary; open it in VS Code.
Installed discovery locations are `.github/skills/` and `.github/agents/`. New VS Code sessions
can discover them normally; in this session their canonical Markdown was read directly.
Installation does not prove that the editor has refreshed its skill picker.

## Provenance and pins

| Component | Exact revision | Local source | License authority |
|---|---|---|---|
| Loushing stack | `bc832471af19a7d180e2f406555a326aab2c2b9c` | [stack source](https://github.com/prabinpebam/loushing/blob/bc832471af19a7d180e2f406555a326aab2c2b9c/stacks/plan-build-document.md) | Catalog metadata, not the component license |
| agentic-craft | `299dbaeebfb1c8fc392ba919a85e5a6529bc6d60` | `agentic-craft/` | Upstream license included in the complete source |
| agent-orchestration | `2064b11be2b4b327dbb1527c75a23eecb11e2b17` | `agent-orchestration/` | Upstream license included in the complete source |
| Slate | `d594742a1a6582c5cb890fcb18e63bc798ced99e` | `slate/` (complete package) | Third-party notices/vendor licenses included; no package-level LICENSE file found at this pin |

Source: [Loushing install-plan JSON](https://prabinpebam.github.io/loushing/items/plan-build-document.json),
inspected 2026-10-26. Slate package identity is `@slate/docs` version `0.11.1`;
its embedded skill frontmatter says `0.5.0`. The package manifest is the version authority.
No kit source or generated reader file has been customized.

Slate's vendor notices are not a substitute for a license on Slate's own code. Local setup is
the explicitly requested use here; confirm package redistribution terms before publishing a
host/runtime or bundling it in a public project.

## Setup performed

The three public repositories were cloned to the paths above, checked out at their exact
stack pins, and their installers inspected before execution. From the workspace root:

```powershell
node agentic-craft\tools\install.mjs . --for copilot
node agent-orchestration\tools\install.mjs . --for copilot
node slate\scripts\init-project.mjs --repo . --host docs --project "Vampire Survivors Companion - Discovery and Specification"
```

Result: 8 Craft skills + 5 Orchestration skills + 1 Slate adapter, three reviewer agent
definitions, two filled project-fact sections, and 18 generated Slate runtime files.
The nested upstream clones are not the product repository. Since 2026-10-26 the workspace root
is a local Git repository that tracks them as submodules at the pins above (see the
[repository notes](../../README.md#repository)). The two kits were first cloned under
`tools/kits/`; on 2026-10-26 they were moved to the workspace root, next to `slate/`, at the
same pins so they are visible as top-level submodules.
No `npm`, `npx`, Python dependency installation, global configuration, or authentication was needed.

## What is active and what is deferred

| Active for this phase | Installed but deferred |
|---|---|
| craft, ground, assumptions, definition-of-done | Product design-system implementation |
| orchestrate, execution-modes, coordinate, progress-review, stage-validation | Performance benchmarking against a product |
| Slate Markdown authoring and navigation | UI components, token generation, live prototypes, application tests |
| Desk research and direct-source checks | Automated imports, database selection, deployment, participant recruitment |

The reviewer definitions are available; installing them is not a claim that they were invoked.
Research was delegated only where each stream needed substantial independent source context.
See the [validation record](validation.md) for the checks actually run.

## Ownership and repeatability

- Host-owned: documentation Markdown, `docs-manifest.json`, `slate.config.json`, project facts.
- Upstream-owned: `slate/`, `agentic-craft/`, `agent-orchestration/`, copied skill/agent definitions, generated `docs/shell/`.
- Preserved read-only: `resources/`, `tools/archive/`, and the user-attached server snapshot.
- Update kits only through an explicit pin change and recorded review; never edit generated runtime.
- Do not run upstream sample app/prototype instructions in the documentation phase.

Runtime integrity check (no dependencies required):

```powershell
node slate\scripts\runtime-host.mjs check --repo . --host docs
```

Markdown remains readable without a server. If the owner later wants the Slate reader, its
documented loopback static-server command is in the [documentation index](../README.md).
There is no product site or deployment to start.
