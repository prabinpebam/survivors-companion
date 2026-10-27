# Documentation-phase validation record

> **TL;DR:** Validation is scoped to the three-kit setup and the authored research/specification
> pack. Product behavior, participant outcomes and release rights cannot pass merely because
> documentation is complete. This page records only checks actually executed.

## Changed-surface assessment

| Surface | What changed | Appropriate check |
|---|---|---|
| Project instructions | New AGENTS.md facts and no-code boundary | Discovery locations, frontmatter, linked authorities |
| Third-party tooling | Pinned local Craft, Orchestration and Slate source plus installed copies | Exact revisions, clean upstream worktrees, copied skill parity |
| Generated docs runtime | Unmodified Slate runtime copied by its initializer | Upstream SHA-256 runtime drift checker |
| Authored content | Research, brief, spec, experience, risks, decisions, plan and handoff | Original-source verification, status/traceability review, local links and navigation |
| Host configuration | Markdown landing route and manifest | Parse, uniqueness, file existence and reader smoke test |
| Archive / scraper | No intentional changes | Confirm scope and unchanged source surfaces; do not rerun unrelated scraper jobs |
| Product | No implementation | Confirm no product source, importer, app dependencies or product server was added |

## Checks completed during setup

| Check | Result | Evidence |
|---|---|---|
| Craft revision | Pass | `git -C agentic-craft rev-parse HEAD` -> `299dbaeebfb1c8fc392ba919a85e5a6529bc6d60` |
| Orchestration revision | Pass | `git -C agent-orchestration rev-parse HEAD` -> `2064b11be2b4b327dbb1527c75a23eecb11e2b17` |
| Slate revision | Pass | `git -C slate rev-parse HEAD` -> `d594742a1a6582c5cb890fcb18e63bc798ced99e` |
| Upstream source changes | Pass | All three `git status --porcelain` results empty |
| Installed discovery | Pass | 14 SKILL.md files have frontmatter, name and description; 3 reviewer agent definitions |
| Copied Craft/Orchestration SKILL.md parity | Pass | Built-in Node SHA-256 comparison matched all 13 upstream skill definitions |
| Slate generated runtime | Pass | `node slate\scripts\runtime-host.mjs check --repo . --host docs` -> `Slate runtime check passed.` |
| Package installation / global changes | None | No npm/npx/pip dependency install, registry change or user-profile customization needed |
| No-code / source-preservation boundary | Pass | File timestamp inventory found 0 files under `resources/` or `tools/archive/` modified since this phase began (2026-10-26 09:40:23 +05:30); no `tools/preview/` or root application package manifest exists |
| Interim reader smoke test | Pass for 14 ready routes; 2 research routes pending | Fresh headless Edge rendered every then-existing manifest page with one H1 and nonempty content; 0 browser runtime errors. At 390 CSS px in dark mode, document body width was 390px. The temporary loopback docs server stopped in the check's cleanup |

## Evidence standard

- Player claims cite original public comments/questions/reviews; secondary summaries and
  search-only discoveries do not become observed behavior.
- Competitor features distinguish direct content inspection, publisher documentation,
  unknowns and unavailable pages. No installed-app or timed comparative usability test is claimed.
- Archived game-mechanics examples cite the source files actually inspected.
- Rights constraints cite the CC license deed and Open Source Definition; this is not legal clearance.
- No verbatim large forum/review/article copies are needed; the research ledger uses paraphrases.

The interim check also observed expected 404s from the two unfinished research pages when
Slate prefetched its search corpus. These must disappear in the final complete-host check;
an interim smoke test is not the D0-07 result.

Reader-boundary review found that archive links outside `docs/` would not be served by the
documented docs-only static host. Those authorities are now explicit workspace-root file paths
for VS Code inspection, not misleading reader routes. Registered documentation links stay
inside the host, and public research/source URLs remain ordinary external links. No runtime
patch or archive copy was introduced to work around the boundary.

## Final research and documentation checks (2026-10-26)

| Check | Result | Executed evidence |
|---|---|---|
| Primary user-feedback floor | Pass | 20 directly inspected primary pages across Reddit, Steam Community, Apple App Store and the source wiki; exceeds 12 pages / 2 platforms without metadata or mirrors |
| Source-count reconciliation | Pass | Built-in Node check deduplicated the ledger's 30 inspected-source URLs into 20 primary, 8 context and 2 mirror pages; 34 stable E01-E34 units remain individually qualified |
| Competitor breadth and provenance | Pass | 10 alternative/baseline entries, 9 directly inspected at the stated page/documentation depth; 26 S IDs include 22 fetched-content, 3 unavailable and 1 search-only source; unavailable/search-only entries do not establish features |
| Evidence quality review | Pass | Corrected archive lineage, source arithmetic, missing permalinks and unsupported popularity/demand/staleness interpretations. Game reviews, guide authors, player comments and secondary mirrors remain distinct |
| Product traceability | Pass | 4 promises, 5 jobs, 7 capabilities, 5 flows, 5 conceptual views and 12 requirements; capability-level evidence/assumption table and canonical ID checks. DLC-ownership, prerequisite, reveal-policy and switching-value hypotheses remain open |
| Navigation and Markdown | Pass | 16 unique registered pages exist, each with one H1 and a TL;DR; all checked internal Markdown destinations resolve inside the host; all authored host pages registered |
| Configuration | Pass | JSON parsing, required field/type, uniqueness and landing-route contract checks; these are not a full JSON Schema validation |
| Complete reader | Pass | Fresh independent headless Edge matched every one of the 16 rendered H1s to its Markdown authority; no browser runtime errors or HTTP errors, including research prefetch |
| Reader navigation and responsive layout | Pass | Brief-to-spec evidence-anchor navigation resolves to the actual heading ID. At 390 CSS px, body/root widths are 390px in both light and dark modes; representative desktop/mobile screenshots inspected |
| Kit/source boundary | Pass | Final runtime digest and all three exact pin/clean-worktree checks passed; archive/scraper modified-file inventory remains zero; removed preview and root application manifest absent |

Two validation assertions needed correction, not product changes: an initial heading-role
assertion ignored Slate's accessible collapse-button label, and an initial identifier assertion
expected `R1` rather than the documented `R01`. The DOM/ID diagnosis and canonical-ID reruns
passed. No reader runtime was patched to make these checks pass.

Source inspection verifies what those pages reported, not population prevalence, current game
mechanics, installed-app usability or a new product's effectiveness. The ledger's primary-page
count includes game reviews and contributor discussion, not 20 independent complaints about
the current wiki. The semantic review therefore uses specific qualified E IDs, not the aggregate
count, to support requirements.

## Final D0 decision

| Criterion | Result | Completion evidence |
|---|---|---|
| D0-01 | Pass | Three exact kit pins, 14 discoverable skills, 3 reviewer definitions, filled project facts and unchanged Slate runtime |
| D0-02 | Pass | 20 primary-feedback pages / 4 primary platforms, qualified synthesis, reproducible citations and future-study protocol |
| D0-03 | Pass | 10 alternatives/baselines, source-linked comparison, individual inspection labels and explicit unknowns |
| D0-04 | Pass | Brief/spec/experience connect promise -> job -> capability -> flow/view -> future acceptance; unsupported choices explicitly remain hypotheses |
| D0-05 | Pass | DS01-DS10, open A1-A12, source-semantic limits and separate text/asset/Slate publication-rights gates |
| D0-06 | Pass | Staged DoD, O1-O14 decisions, dependency-aware B01-B17 backlog, proposed owners and measurable future criteria |
| D0-07 | Pass | Complete 16-page navigation/link/reader checks, valid host contracts and runtime digest parity |
| D0-08 | Pass | Documentation/tooling changes only; archive unchanged; validation browsers/helpers cleaned up; explicitly requested ongoing Slate docs server preserved |

**D0 is complete: 8/8 criteria passed.** This is a completed documentation phase, not owner
approval, a validated product, a normalized content dataset, cleared redistribution rights,
or authorization to start S1 contact or S2 implementation.

The table above is the historical D0 result. The ID ranges it cites (A1-A12, O1-O14, B01-B17)
were later extended by the owner-player revision below.

## Owner-player spec revision checks (2026-10-26)

The owner, as a player, supplied OP01-OP07: visual grid, pairing lookup, view modes, manual
progress, JSON export/import, next-secret suggestions and single-session unlock plans. The
pack was revised without code, and D0-09 was added.

| Check | Result | Evidence |
|---|---|---|
| D0-09 owner input traced | Pass | OP01-OP07 in [spec §2.1](../spec.md#21-owner-player-input), each carried through J6-J9, U8-U14, F6-F10, V6-V9, R13-R22, A13-A18, O15, B18-B22, PD6-PD7, S1-07/08 and S2-08 to S2-13; each OP ID appears on at least two pages |
| Docs consistency | Pass | 16 registered pages, one H1 and a TL;DR each; 106 local links (8 with anchors) resolve; every new ID is defined as a table row; no reference beyond a defined range; 0 problems |
| Reader rendering | Pass | Microsoft Edge, headless, against the running reader: all routes render; the spec §2.1 deep link and the brief-to-spec anchor reach the heading; F6-F10 heading IDs present; spec and experience at 390px dark have 390px scroll width; 0 page or HTTP errors |
| Archive sizing (DS11/DS12) | Read-only | Counts of achievements, secrets, characters, stages, weapon sprites and pairings are approximate sizing for A14/B22, not an audit |
| Change boundary | Pass | Only `docs/` Markdown changed; no `resources/` file modified in this revision (last archive write predates it); no application code, schema file, importer or storage implementation |

Owner input is authoritative for product intent (O15), but it is one player's experience. It does
not count toward the D0-02 public-evidence floor, and it does not validate A13-A18.

## Build-lab spec revision checks (2026-10-26)

The owner asked for a build lab: assign weapons and passives to the limited slots, set their
levels, add PowerUps, see the effect on DPS and other player stats, and save builds to compare.
The owner also asked for deep mechanics research. The pack was revised without code, and D0-10 was
added.

| Check | Result | Evidence |
|---|---|---|
| D0-10 build lab traced | Pass | OP08-OP11 in [spec §2.1](../spec.md#21-owner-player-input), each carried through P7, J10-J12, U15-U20, F11/F12, V10/V11, R23-R30, O16, A19-A23, DS13-DS15, PD8, S1-09/S1-10, S2-14 to S2-17 and B15/B23-B26; each OP ID appears on at least two pages |
| Mechanics research | Pass (documented, not game-verified) | [Build mechanics](../research/build-mechanics.md): every rule carries a confidence label and source; contradictions BM-C1-BM-C11 and golden cases GC01-GC15 recorded; values read from the archive, the wiki and Steam threads E35/E36 (re-fetched 2026-10-26) |
| Competitor and evidence additions | Pass | S27-S30 fetched on 2026-10-26 with inspection depth stated; S13/S15-S17/S19 updated from Edge renders; E35/E36 kept outside the D0-02 counts |
| Docs consistency | Pass | 17 registered pages, one H1 and a TL;DR each; every local link and anchor resolves; every new ID is defined as a table row (including GC and BM-C rows); no reference beyond a defined range; 0 problems. A temporary checker copy that required an undefined DoD row reported it, confirming the check works |
| Reader rendering | Pass | Microsoft Edge, headless, against the running reader: all 17 routes render; F6-F12 heading IDs present; new anchors (golden cases, build-lab comparison, build-lab evidence) present; spec and build mechanics at 390px dark have 390px scroll width; 0 page or HTTP errors |
| Change boundary | Pass | Only `docs/` Markdown and the manifest changed; no `resources/` file modified (last archive write predates this revision); no calculator, formula code, extracted data, schema file or prototype |

The golden cases are hand-computed from sourced rules. They are not yet checked in the game; that
is S1-09 and B24. Nothing here validates A19-A23.

## App UX/UI and design-system spec checks (2026-10-26)

The owner asked for an app that helps people understand, plan and play (not a wiki of
articles), with a modern visual-first UI, UI text separate from content, much more detailed
scenarios, jobs, user-can statements and flows, a UI design plan and a strict design system.
The pack was revised without code, and D0-11 was added.

| Check | Result | Evidence |
|---|---|---|
| D0-11 app experience traced | Pass | OP12-OP16 in [spec §2.1](../spec.md#21-owner-player-input), carried through P8, J13-J16, U21-U26, F13-F17, V12-V17, R31-R39, O17-O23, A24-A27, PD9, S1-11/S1-12, S2-18 to S2-23 and B27-B33; each OP ID appears on at least two pages |
| Design pages complete | Pass | Six pages in a new Design group: SC01-SC16 and U1-U26 criteria in [scenarios and jobs](../design/scenarios-and-jobs.md); F1-F17 step tables in [task flows](../design/task-flows.md); V1-V17 covered by screen plans in the [app UX plan](../design/app-ux-plan.md), with wireframes for the shell, Home, Codex, Peek, Pairings, Explainer, Build lab, Run companion, What's new and Settings (the other screens are planned as tables); every text key used in the task flows exists in the [UI text catalogue](../design/ui-text.md#catalogue) |
| Contrast of proposed colours | Pass (computed, not reviewed by a person) | WCAG 2.x contrast ratios computed for every text role (at least 4.5:1) and every non-text role (at least 3:1) on canvas, raised, sunken and selected surfaces, in light, dark and more-contrast; values recorded on the [design system](../design/design-system.md#colour) page. S1-12 repeats this as a review |
| Tier rules | Pass (desk review) | No compound contains another compound; overlays are layouts placed by the shell's overlay host; regions hold one compound, a fixed list or one repeated compound ([components](../design/components.md#layouts)) |
| Grounding review | Pass after fixes | An independent grounding critic found 12 defects; all were fixed. The fixes: opaque references for every secret-class item in addresses; one keyhole hidden tile; named spoiler values with a confirmation; no stored plans or build links; neutral difference colour (O22); curated starting points (O23); one default scope; wireframes for What's new and Settings; a Global entry text type; 320 CSS px everywhere; and a data-version note in What's new tied to A10/A22 |
| Docs consistency | Pass | 23 registered pages, one H1 and a TL;DR each; every local link and anchor resolves; every new ID is defined as a table row; no reference beyond a defined range; 0 problems. Seeded faults (an undefined DoD row, a missing scenario, an uncatalogued text key, an out-of-range ID) were each reported, confirming the checks work |
| Reader rendering | Pass | Microsoft Edge, headless, against the running reader: 23 routes render; F6-F17 heading IDs on the experience page and 17 flow headings on the task-flows page; design anchors present; all six design pages, the spec and build mechanics at 390px dark have 390px scroll width; 0 page or HTTP errors |
| Change boundary | Pass | Only `docs/` Markdown, the manifest and the project facts in `AGENTS.md` changed; no `resources/` file modified; tokens and component specs are Markdown proposals (JSON appears only inside code blocks); no token file, component, mockup or prototype |

Nothing here validates A24-A27. The screen plans are written wireframes, not tested designs.

## Ongoing documentation reader

On 2026-10-26 the owner explicitly requested keeping Slate running. The docs-only server was
started as an independent background process at `http://127.0.0.1:8080/`, bound to loopback and
serving only `docs/`. Repeated HTTP checks returned 200 for the reader, manifest and landing
Markdown; a TCP connection succeeded and the dedicated Python process was identified.
The server remains running intentionally and is not a leftover temporary validation helper.
It is not a product application, public deployment or reboot-persistent service.

## Deliberately not run

- No application unit tests, build, type check or end-to-end product suite: no product exists.
- No new archive scrape or full 2.74 GB re-hash: this phase does not change the source archive.
  The previous archive report is historical evidence, not a new verification run.
- No full Slate package test suite or dependency installation: the generic runtime is unchanged;
  validation is limited to this host's changed behavior and runtime digest parity.
- No Slate excerpt-attribution validator: no `slate-xref` excerpts or generated claim previews
  were authored; ordinary citations were reviewed as ordinary links.
- No participant interviews, recruitment, usability tests, legal review or game-save import.
