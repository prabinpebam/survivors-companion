# Product discovery and specification

> **TL;DR:** This is a research and planning pack for a new Vampire Survivors experience on top
> of the archived knowledge. Start with the evidence and proposed scope; do not treat the pack
> as approval to code or proof that a product has been tested. The spec now includes the
> owner's first-person player requirements (OP01-OP16): visual grids, pairing lookup, local
> progress with JSON export/import, unlock-session suggestions, a build lab, and an app (not a
> wiki) with a visual-first UI and a strict design system, planned in the Design section.

## Reading map

| Your question | Read | Status meaning |
|---|---|---|
| What should we build first, and why? | [Product brief](brief.md) | Proposed direction, not owner-approved scope |
| What do actual players ask for? | [User research](research/user-research.md), [evidence ledger](research/user-evidence.md), [owner-player input](spec.md#21-owner-player-input) | Public desk evidence, not interviews; owner input is recorded separately |
| What do existing alternatives already solve? | [Competitor benchmark](research/competitor-benchmark.md) | Verified/documented observations with unknowns retained |
| Can we use the archive safely and correctly? | [Archive readiness](research/data-readiness.md) | Read-only assessment, not an importer or legal clearance |
| How do stats, PowerUps and weapon levels really work? | [Build mechanics research](research/build-mechanics.md) | Sourced rules, contradictions and golden cases still to check in the game |
| What exactly is the proposed behavior? | [Spec](spec.md), [experience requirements](experience.md) | Testable capabilities, flows, states, and non-goals |
| How does the app work, screen by screen? | [App UX plan](design/app-ux-plan.md), [scenarios and jobs](design/scenarios-and-jobs.md), [task flows](design/task-flows.md) | Proposed structure, screens and wireframes; not built or tested |
| What is it made of, and what do its words say? | [Design system](design/design-system.md), [components](design/components.md), [UI text](design/ui-text.md) | Proposed tokens with computed contrast, tiers and a text catalogue; no token file or component exists |
| What might make this a bad idea? | [Assumptions](planning/assumptions.md), [decisions](planning/decisions.md) | Open beliefs and working defaults |
| How will we know a stage is done? | [Definitions of Done](planning/definition-of-done.md) | Current docs gate separated from future product gates |
| In what order, and who needs to act? | [Roadmap/backlog](planning/roadmap.md), [work plan](planning/work-plan.md) | Dependencies and proposed responsibilities |
| Are the three kits set up? | [Kit setup](planning/kit-setup.md) | Pinned local setup with provenance |
| What was actually checked? | [Validation record](planning/validation.md) | Executed checks, not promised future tests |
| What happens next? | [Handoff](planning/handoff.md) | Owner review and next authorization boundary |

## Evidence -> decision -> delivery

```text
Original player comments + inspected alternatives + archive/source constraints
   -> coded needs and counterexamples
   -> promise / jobs / user-can statements
   -> task flows and explicit scope
   -> assumptions with cheap checks
   -> staged DoD and backlog
   -> owner review before any product implementation
```

The arrows indicate traceability, not a completed validation pipeline. Forum frequency is not
population prevalence. A published feature description is not a measured usability result.
An archived recipe is not necessarily compatible with every current game patch.

## Tooling versus product

The three requested kits are installed. Craft supports product reasoning; Orchestration
supports bounded work and handoffs; Slate presents these same Markdown files in a reader.
The vendored kit/runtime files are unchanged third-party tooling. No application, importer,
database, deployment or product preview was written for this phase.

The source Markdown can be read directly in VS Code. At the owner's request, keep the
documentation reader running at **http://127.0.0.1:8080/** between sessions. It runs as an
independent background process. If it is no longer available, restart it from the workspace root:

```powershell
python -m http.server 8080 --bind 127.0.0.1 --directory docs
```

This serves documentation only, not the archived wiki or a new companion. Do not stop the
ongoing reader during routine task cleanup. Temporary validation servers still need cleanup.
The reader is local-only; this process does not provide automatic startup after a machine reboot.

## Content and rights boundary

The archive remains unchanged; open workspace-root `resources/README.md` in VS Code for its inventory.
Local archive authorities are named as workspace paths rather than broken reader routes:
the docs host deliberately does not serve the full dataset. Imported wiki text is CC BY-NC-SA 3.0;
game art/audio and site assets have separate rights. The proposed open-source code license is
not a relicense of the dataset. See [readiness and publication constraints](research/data-readiness.md)
before discussing a public release.
