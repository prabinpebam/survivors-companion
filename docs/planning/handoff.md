# Discovery handoff

> **TL;DR:** Review the evidence and proposed first task before authorizing anything to build.
> This phase creates a decision-ready research/specification pack and installs the requested kits.
> It does not validate demand, clear content rights, or authorize implementation.

## Completion state

**D0 completed on 2026-10-26: all 8 documentation criteria passed.** The evidence pack contains
20 primary-feedback pages across 4 primary platforms, 34 qualified evidence units and a
10-entry competitor/baseline benchmark. The 16-page Slate host passed navigation, source-ID,
link, runtime-integrity and bounded browser checks. See the [validation record](validation.md)
for the actual limits and results, not a claim of tested product outcomes.

The key recommendation is to test input-first, source-backed evolution explanations with
honest coverage/freshness and deliberate secret reveal. Existing tools already offer lookup
and planning. DLC ownership confusion, prerequisite depth, switching value and exact reveal
defaults still need validation. All A1-A27 remain open; no participant or product stage has been completed.

**Owner-player revision (2026-10-26):** the owner's first-person input OP01-OP07 is recorded in
[spec 2.1](../spec.md#21-owner-player-input) and adopted into scope by O15: labeled icon grids
with sort/filter, several view modes with a compact default, weapon-passive pairing lookup,
manual browser-local progress with JSON export/import, next-unlock suggestions and automatic
single-run unlock plans. Read-only archive sizing (DS11/DS12) shows icons are mappable but need
rights review, and unlock conditions are free text that needs a reviewed model (A14, S1-07).
D0-09 records this revision. Nothing was coded.

**Build-lab revision (2026-10-26):** the owner asked for a build lab: weapon and passive slots
with levels, PowerUps, effects on DPS and player stats, and saved builds to compare (OP08-OP11).
O16 reverses the earlier deferral. [Build mechanics research](../research/build-mechanics.md)
sets out stat stacking, caps, PowerUp prices, weapon level data, contradictions (BM-C1-BM-C11)
and golden cases GC01-GC15. It also shows why one honest DPS number is hard: hitbox delay is
missing on most weapon pages and some level text is rounded. The spec answers with tiered output
(R27), a model status per weapon (R30) and a 30-weapon audit plus in-game checks before any
importer (S1-09, B23/B24). D0-10 records this revision. Nothing was coded.

**App experience revision (2026-10-26):** the owner asked for an app that helps people
understand, plan and play, not a wiki of articles; a modern, visual-first UI with UI text kept
apart from content; much more detailed scenarios, jobs, user-can statements and flows; and a
strict design system (OP12-OP16). The spec adds P8, J13-J16, U21-U26, F13-F17, V12-V17,
R31-R39 and O17-O23. A new Design section holds the
[app UX plan](../design/app-ux-plan.md) (structure, navigation, disclosure ladder and 14 screen
plans with wireframes), [scenarios and jobs](../design/scenarios-and-jobs.md),
[task flows](../design/task-flows.md), the [design system](../design/design-system.md) (token
proposal with contrast computed for every role), [components](../design/components.md) and
[UI text](../design/ui-text.md). D0-11 records this revision. No token file, component or
prototype was built.

## Start here

1. [Product brief](../brief.md): proposed value, first slice and what is deliberately deferred.
2. [User research](../research/user-research.md) and [evidence ledger](../research/user-evidence.md):
   actual comments, needs, counterexamples and sampling limits.
3. [Competitor benchmark](../research/competitor-benchmark.md): existing parity and remaining unknowns.
4. [Spec](../spec.md) and [experience requirements](../experience.md): behaviors, states and traceability.
   The [app UX plan](../design/app-ux-plan.md) shows how it fits together as an app.
5. [DoD](definition-of-done.md), [assumptions](assumptions.md) and [roadmap](roadmap.md):
   what would prove value and what happens next.

## Delivered versus not delivered

| Delivered in this phase | Not delivered / not claimed |
|---|---|
| Three pinned kits, local skill discovery and navigable Markdown docs | New companion/wiki application |
| Public-source desk research and competitor documentation review | Interviews, live user tests or representative survey |
| Proposed promise, jobs, capabilities, flows and requirements | Owner-approved final scope or tested interface |
| Archive/schema/rights readiness assessment | Complete normalized recipe graph or legal clearance |
| Risk register, decisions, phased backlog and future acceptance gates | Product performance numbers or public release |

For executed checks and the final D0 result, use the [validation record](validation.md), not a
kit install message or the previous archival report.

## Owner decisions next

These are recorded gates, not unanswered questions that prevent finishing the documentation.
Working defaults and the requested ongoing docs server are stated in [O1-O23](decisions.md).

| Decision | Recommendation | Safe default until authorized |
|---|---|---|
| First task and content scope | Focus on trustworthy evolution explanations and bounded prerequisites, plus the owner-added browse, pairing, progress and unlock-planning capabilities (O15) | Treat spec as a proposal; no code |
| Participant/contact work | Authorize the protocol in user research and recruit a mixed task sample | No messages, postings or interviews |
| Rights and license strategy | Separate future code license from imported text/assets and choose a minimal reviewable slice; confirm Slate's own redistribution terms as well | Keep content/runtime local; no blanket relicensing or publication |
| Data readiness | Audit 20 representative recipe cases and provenance, and a 40-unlock condition sample (S1-07), before an importer | Source inspection only |
| Icon rights | Decide whether game icons can be shown publicly; the grid must work with text tiles if not | Local/private only; text fallback |
| Visual direction | Review the token proposal and screen plans; test static frames with and without sprites (S1-11, S1-12) | Proposals in Markdown only; no token file or component |
| Implementation | Decide go/change/stop after S1 evidence, then explicitly authorize S2 | No product source, database, app server or deployment |

## What another session should do first

Read this handoff, the work plan, latest validation, and A1-A5. If the owner only asks to review
or revise documents, stay in this phase. If they authorize S1, execute the approved research/content
checks without silently starting S2. If they explicitly authorize coding, first record approved
coverage, unresolved assumptions, rights constraints and the applicable stage DoD.

The owner subsequently requested keeping the Slate documentation reader running at
**http://127.0.0.1:8080/**. Preserve this independent background process during routine cleanup
and restart it using the command in the [index](../README.md) if unavailable. This is docs-only,
not authorization to recreate the previously removed preview server. Temporary validation
servers must still be stopped.

On 2026-10-26 the owner asked for a local Git repository and a commit of all work so far. The
root is now a Git repository on `main` with no remote: kits are submodules at their pins, archive
media uses Git LFS, and the archive is stored byte-exact. Local commits are authorized. Publishing
the archive would also need the rights decision above.

**Publishing (2026-10-27).** The owner asked for a public repository on their personal GitHub
and a GitHub Pages deployment. The repository is
[prabinpebam/survivors-companion](https://github.com/prabinpebam/survivors-companion) and the
site is <https://prabinpebam.github.io/survivors-companion/>, with the docs at `/docs/`.
- `node tools/publish.mjs` builds the app for that path and records a commit on the local
  `public` branch, then pushes it to the remote `public` as `main`. The commit is main's tree
  without `resources/` and `app/.npmrc`, with the lockfile pointed at the public registry and
  the built site in `site/`.
- The [Pages workflow](../../.github/workflows/pages.yml) then deploys `site/` and `docs/`. It
  builds nothing; the data comes from the archive. Pages is set to build from GitHub Actions
  (turned on 2026-10-27 after the first run failed with "Get Pages site failed"); the first
  publish is live and checked: home, data, docs and a deep link.
- `main` and the 2.8 GB archive are never pushed.
- Publish only when the owner asks.
- Still open:
  - the project is dual licensed at the owner's request (2026-10-27): code under MIT
    (`LICENSE`), and text, data and docs under CC BY-NC-SA 3.0, the wiki's own licence
    (`LICENSES/CC-BY-NC-SA-3.0.txt`). Home and Settings → About show the credit and both licences;
  - the game art ("Icon rights" above) is published at the owner's request, and the
    monogram fallback can replace it.

The two local servers are kept up by `tools/serve.ps1 -Watch`, which a Windows sign-in entry
starts and which restarts either server within 30 seconds.

**Prototype update (2026-10-26).** The owner authorized coding in "show me the UX sooner / work
with me" mode. Increment I10 of the [work plan](work-plan.md) is ready to try at
**http://127.0.0.1:5173/**, which the owner asked to keep running at all times next to the docs
reader. If it's down, restart it with `cd app; npm run dev`; after a fresh clone, run
`npm install` and `npm run data` first (generated data and sprites are not committed). Next:
collect the owner's I10 verdict, then I11 (build lab).

I10 iteration 1 adds the owner's feedback: a docked, resizable inspector; independent scrolling;
light and dark modes; and file-manager Sort by and Group by with sortable, resizable table
columns (W14, W15). Collect the verdict on these before I11.

I10 iteration 2 makes the Codex two columns: a resizable item list and a wide detail column (W16).
The detail column shows the glance, then every part of the archived wiki page in closed sections
that open on demand; its All stats section is a grid of stat tiles. `npm run data` now also writes one detail file per item and copies about
217 MB of wiki media into `app/public/media/` (ignored by Git), trimming the clear margin from
sprites that sit in a mostly empty canvas (the source files are never written). Its shortcuts are listed in the
work plan. Collect the owner's verdict on the two-column layout and the reveal pattern before I11.

## Intent changes to preserve

- The archive is a source pool, not a product-ready database or blanket redistribution grant.
- Existing tools already cover substantial lookup/planning functionality; differentiation is a
  hypothesis to test, not a claim that no alternatives exist.
- Prerequisite correctness and source exceptions matter more than reproducing every wiki layout.
- Offline packs, accounts/cloud sync and broad content expansion remain separate discovery bets.
  Manual local progress and the unlock-session planner are in scope (O15), gated by reviewed
  unlock conditions; the system only knows what the player declares.
- The build lab is in scope (O16), but its numbers come only from reviewed records and are
  labeled as modeled, never as real-run damage or a best-build ranking (R27, non-goals).
- The product is an app organized by intent, with full pages behind every peek so links and
  search still work (O17, A25). UI words come from a catalogue; content keeps its source (O19).
- Every visual value is a token from one design system, separate from Slate's theme (O18).
- No product or study outcome is marked done by this handoff.
