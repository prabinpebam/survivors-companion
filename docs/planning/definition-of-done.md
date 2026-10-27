# Definitions of Done

> **TL;DR:** The documentation phase can be complete while the product is unbuilt and its
> desirability remains unvalidated. The tables below deliberately keep those states separate.
> Targets for future stages are proposals, not measured results.

## Stage gates

| Gate | Reader can do | What it does not mean |
|---|---|---|
| D0: current documentation | Review evidence, challenge the spec, choose the next experiment | Users tested a product; rights cleared; coding authorized |
| S1: validation and scope | Judge whether the proposed tasks and content slice merit implementation | A production site exists |
| S2: authorized thin slice | Try a small, source-correct task end to end | Full archive migration or public release readiness |
| S3: release candidate | Use the agreed coverage with correctness, accessibility and provenance | Every DLC/platform/version is supported |

## D0: research, specification and documentation (this task)

Try it: start at the [documentation index](../README.md), open the user evidence and competitor
matrix, follow a recommendation into the spec, then follow it to its proposed test and stage.
There should be no need to ask what is real, inferred, missing or not authorized.

| ID | Done when | Evidence required | Result authority |
|---|---|---|---|
| D0-01 | All three kits are local at the stack pins; 14 skills, 3 reviewer definitions, filled project facts and a Slate host exist | Pin checks, clean upstream sources, skill discovery/frontmatter, runtime drift check | [kit setup](kit-setup.md), [validation](validation.md) |
| D0-02 | Actual public user questions/reviews support a thematic synthesis; search-only material cannot carry requirements | At least 12 distinct directly inspected user-discussion/review source pages across at least two platforms; per-item provenance, dates/access and sample limitations | [evidence ledger](../research/user-evidence.md), [synthesis](../research/user-research.md) |
| D0-03 | At least six relevant alternatives/baselines are considered, with at least four directly inspected, and unknowns remain unknown | Source-linked matrix, inspection-depth labels, task walkthroughs; no invented popularity or performance rankings | [benchmark](../research/competitor-benchmark.md) |
| D0-04 | Product intent follows promise -> job -> capability -> flow/view, with MVP/non-goals explicit | No orphan core capability; requirements traced to evidence or explicitly to a hypothesis | [brief](../brief.md), [spec](../spec.md), [experience](../experience.md) |
| D0-05 | Archive/rights constraints and high-risk assumptions have criteria, cheap checks and decision consequences | Distinguish archive completeness from semantic readiness; keep untested beliefs open | [readiness](../research/data-readiness.md), [assumptions](assumptions.md) |
| D0-06 | A future team can sequence the work without mistaking proposals for completed tests | Dependency-aware stages/backlog, acceptance criteria, proposed owners, measurable gates and decision log | [roadmap](roadmap.md), [decisions](decisions.md) |
| D0-07 | Every authored page is navigable, its local links resolve, and generated Slate assets match the pin | Manifest/config checks, local link and ID review, runtime digest check and a bounded documentation-reader smoke test | [validation](validation.md) |
| D0-08 | No application code, prototype, importer, deployment or archive modifications were introduced | Changed-surface inventory, clean upstream kits, no unintended helper; preserve the explicitly requested ongoing Slate docs server; honest handoff | [handoff](handoff.md), [validation](validation.md) |
| D0-09 | Owner-player input OP01-OP07 is recorded as its own evidence class and traced through promise, job, capability, flow/view, requirement, decision, assumption, future DoD and backlog | Every OP ID reaches a U, R, F/V, A and B/S2 row; deferred items stay deferred; no code, schema file or prototype | [spec 2.1](../spec.md#21-owner-player-input), [validation](validation.md) |
| D0-10 | The build lab (OP08-OP11) rests on documented mechanics research and is traced like D0-09 | Mechanics page states base, stacking, caps, PowerUp formula, weapon fields and coverage with archive paths and confidence labels; contradictions, golden cases and an in-game check protocol exist; every OP08-OP11 ID reaches U, R, F/V, A and B/S rows; no calculator, extracted data or prototype | [build mechanics](../research/build-mechanics.md), [spec 2.1](../spec.md#21-owner-player-input), [validation](validation.md) |
| D0-11 | The app experience (OP12-OP16) is specified as an app, not a wiki, with a strict design system and UI text rules, and traced like D0-09 | Scenarios, job cards and user-can criteria; F13-F17 step tables; screen plans for V1-V17, with wireframes for the shell, Home, Codex, Peek, Pairings, Explainer, Build lab, Run companion, What's new and Settings; a token proposal with computed contrast for every role in light, dark and more-contrast; tiers, layouts and components; a UI text catalogue and lint; every OP12-OP16 ID reaches U, R, F/V, A and B/S rows; no tokens, components or prototype built | [app UX plan](../design/app-ux-plan.md), [design system](../design/design-system.md), [UI text](../design/ui-text.md), [validation](validation.md) |

D0-02 is a floor for a useful desk-research pack, not a saturation claim, representative sample,
or demand estimate. A document that explicitly reports an unavailable source is useful but
does not count it as directly inspected.

## Project-level outcomes (not yet achieved)

The promises and capability IDs are defined in the [spec](../spec.md).

| ID | Promise | Proposed measurable result | Evidence / dependency |
|---|---|---|---|
| PD1 | P1: understand the next valid evolution step | At least 8/10 recruited players correctly identify the next step and relevant level/chest condition within 20 seconds, unaided, on a covered recipe | Timed moderated tasks; protocol and recruitment approval in S1 |
| PD2 | P2: stay within chosen content/spoiler scope | Zero unintended spoiler reveals in the defined audit; all out-of-scope results labeled or hidden with an explicit reveal | Predefined spoiler fixtures, participant observation and negative-case tests |
| PD3 | P3: understand prerequisites and limitations | At least 8/10 players find the next prerequisite and distinguish source-snapshot age from verified game compatibility | Moderated prerequisite and freshness tasks; no coached success |
| PD4 | P4: trust and inspect the answer | Every published recipe has source/revision, content scope, change note and attribution; all golden mechanics fixtures pass review | Data/content review, provenance contract, rights gate |
| PD5 | Non-negotiables | WCAG 2.2 AA target, agreed performance budgets, no unintended remote tracking, rights-reviewed publication | Actual implementation checks and legal/content approval before release |
| PD6 | P5: recognize and compare visually | At least 8/10 players find a target they can describe only by appearance within 15 seconds using the grid, and find a weapon's passive pairing within 5 seconds of selecting it | Timed moderated tasks against an alphabetical-list baseline; icon rights or text-tile fallback settled |
| PD7 | P6: remember progress and plan a run | Zero progress loss across mark, reload, export and import fixtures; every generated plan passes reviewer compatibility checks; at least 4/5 unlock-chasing players would use a generated plan for their next session | Storage/import fixtures, reviewed plan fixtures and moderated plan-card tasks |
| PD8 | P7: try, save and compare builds with trustworthy math | Every shown player stat matches the in-game stat panel for the golden builds at the labeled game version; every modeled weapon's rate falls inside its Results-screen band; zero numbers shown for unreviewed weapons; at least 4/5 build-interested players can say what a modeled rate excludes and compare two builds within 60 seconds | GC01-GC15 and BM-V captures, weapon-record audit, moderated build and compare tasks |
| PD9 | P8: get to what I need with a glance and a few taps | At least 8/10 players reach a weapon's pairing within 3 actions from Home or a cold link, and name each destination's purpose from its icon and label; zero lost places (scroll, filters, selection) when closing a peek or going Back in the defined fixtures; every screen usable at 320 CSS px | Moderated first-click and navigation tasks; R31-R33 fixtures |

Twenty, fifteen, five and sixty seconds, three actions and 8/10 are working targets. Establish baseline timings and
pilot the tasks in S1; record a decision before changing targets, not after a failing result.
These small studies are formative, not statistically representative.

## S1: validate the concept and content slice (before product coding)

**Delivers:** evidence about J1/J2/J3 and A1/A2/A3, plus the owner-added jobs J6-J12 and
A11, A13-A27, not a product implementation.

**Try it:** use printed/static task cards and existing alternatives to describe what you would
need to decide. No clickable prototype is necessary for this stage.

| ID | Done when | Evidence | Owner / dependency |
|---|---|---|---|
| S1-01 | Owner approves or narrows the task-first scope and named non-goals | Decision recorded in O1, including what was rejected | Product owner; not implied by D0 completion |
| S1-02 | Five consenting participants spanning new/returning/DLC-playing situations discuss recent real tasks | De-identified notes, consent record, disconfirming cases, tasks not hypothetical feature voting | Researcher; recruitment/contact authorization first |
| S1-03 | Three candidates per priority job are compared against existing alternatives | Same task script and starting conditions; baseline time/errors, not self-reported preference alone | Researcher; accessible alternatives |
| S1-04 | A representative recipe/content set and provenance fields are manually audited | At least 20 cases including zero-passive chain, union, max-passive, chest exception and DLC scope; unknowns labeled | Content reviewer; [DS07](../research/data-readiness.md) and related sources |
| S1-05 | Separate code/content/asset rights and hosting assumptions have a documented safe path | Written clearance/review or explicit text-only/private fallback; no blanket MIT claim | Owner and qualified rights reviewer |
| S1-06 | Go/change/stop decision recorded against assumptions | A1/A2/A3, A11 and A13-A23 updated honestly, revised spec if contradicted; explicit authorization required before S2 | Product owner |
| S1-07 | A stratified sample of at least 40 unlocks/secrets is modeled as R21 records | Two-reviewer agreement, sources, modeled vs "Read the condition" counts per type; A14 updated; R19/R20 scope set from the result | Content reviewer; DS12 |
| S1-08 | Static grid, view-mode, pairing, progress and plan cards are tried by players beyond the owner | Notes against A13/A15/A16/A17/A18 including people who prefer names or do not chase unlocks | Researcher; participant approval (same as S1-02) |
| S1-09 | A stratified sample of 30 weapons is audited as R30 records and the golden cases are checked in game | Two-reviewer records with sources and status counts (modeled / partial / stats-only / not modeled); GC01-GC15 results with stat-panel and Results-screen captures and the game version (BM-V); A19/A20/A22 updated; R27/R30 scope set from the result | Content reviewer + a player with the game; DS13-DS15 |
| S1-10 | Static build-lab and compare cards are tried by build-interested players beyond the owner | Notes against A11/A21, including people who prefer the in-game panel or existing planners, and anyone who reads the modeled rate as a prediction | Researcher; participant approval (same as S1-02) |
| S1-11 | Static frames of Home, Codex grid, Peek and Build lab are understood without explanation, with and without sprites | Five-second and first-click results against A24/A25, including people who rely on names; wording and label changes recorded | Researcher; participant approval (same as S1-02) |
| S1-12 | The proposed tokens, tiers and UI text rules are reviewed before any component is built | Contrast recomputed for every role in light, dark and more-contrast; a contributor dry run against the rules (A26); kind colours checked for colour-blind confusion with their shape twins | Design reviewer; no token file before coding authorization |

## S2: authorized thin slice (future, not started)

**Delivers:** U1-U5 and U7 on the reviewed slice. U6 is an inspectable, source-linked prerequisite
path for that slice, not a generated complete progression graph. U8-U12 on the reviewed
collections; U13/U14 on the modeled unlock subset set by S1-07, with that coverage stated.
U15-U20 on the weapon records reviewed in S1-09, with modeled coverage stated. U21-U26 on
the same slice, inside the app shell and design system.

**Try it:** find Bracelet, explain the two-step chain without inventing a passive requirement,
then test a max-passive recipe, one early-chest exception, an unowned-content item, and a
not-yet-covered item. The response must say what is known and what is not.
Then find a weapon by its icon using two filters, switch to table and back without losing
the filter, open a passive and see every weapon it pairs with, mark a few unlocks, export,
import into a clean browser, and generate a session plan whose every attempt shows its reason.
Then build Antonio with Whip 8, King Bible 8, Spinach 5 and Spellbinder 5, set Might PowerUp to 5,
check Whip's 70 damage per hit and King Bible's 9.0 s cycle against their breakdowns, add an
unmodeled weapon and see the total disappear, save, change one level, save a copy and compare.

| ID | Done when | Evidence | Owner / dependency |
|---|---|---|---|
| S2-01 | U1/U2 resolve named/alias lookup and correctly explain the next step for all audited fixtures | Focused logic tests and a reviewed end-to-end task set | Engineering + content; S1-04, coding authorization |
| S2-02 | U3 scope selection never silently changes ownership or claims automatic save detection | Owned/unowned/unknown DLC and missing-data tests | Engineering; reviewed content-pack map |
| S2-03 | U4 defaults protect unrequested secrets and always provide an accessible reveal route | Spoiler fixtures, keyboard and screen-reader review; a link shared by a person who revealed everything shows no secret name in the address | Design + content; agreed spoiler policy |
| S2-04 | U5/U7 show provenance and a useful correction/failure route | Broken source, unknown recipe, missing image, no-results and failed-update cases | Engineering + content |
| S2-05 | U6 paths distinguish alternatives, missing nodes and cycles | Reviewed prerequisite examples, no invented traversal results | Content + engineering |
| S2-06 | Pilot tasks can be completed at 320 CSS px and 200% zoom with keyboard access | Reviewed captures and task recordings; light/dark, focus and error states | Design + QA |
| S2-07 | Every wait/failure state is truthful and stale data does not look current | Offline/stale/cancel/retry checks appropriate to the implemented slice | Engineering; no fake success fallback |
| S2-08 | U8/U9: grid with sorts, combinable filters and grid/list/table/detail modes over the reviewed collections | R13/R14 fixtures; zero icon-only tiles; compact default; state kept across mode switches; 320 CSS px | Design + engineering; icon mapping and rights path |
| S2-09 | U10: two-way pairing lookup and pairing view match the reviewed recipes | R15 fixtures incl. Bracelet, union, multi-partner passive, max-passive recipe | Content + engineering; S1-04 |
| S2-10 | U11: manual, bulk and linked marking with undo, persisted only after confirmed writes | R16/R17 fixtures incl. storage disabled, quota, two tabs, clear all; no network request carries progress | Engineering |
| S2-11 | U12: JSON export/import round trip with preview, merge/replace and refusal of invalid files | R18 fixtures incl. malformed, oversized, newer schema, unknown IDs and conflicts | Engineering |
| S2-12 | U13: next-unlock suggestions are deterministic, explained, scope- and spoiler-aware | R19 fixtures; uncodified conditions never ranked; zero unrequested reveals | Content + engineering; S1-07 |
| S2-13 | U14: session plans cover the hand-computed best set for each fixture and respect locks/excludes | R20/R21 fixtures, modeled-coverage note shown, no "optimal" or success claims | Content + engineering; S1-07 |
| S2-14 | U15/U16: slot editor and level steppers follow R23/R24 | Slot-limit, Mindbender, evolution, union, duplicate and level-sum fixtures (GC07, GC12) | Engineering + content; S1-09 |
| S2-15 | U17/U18 T1: player stats and PowerUps match the golden cases | GC01-GC05, GC08, GC09, GC11, GC13, GC15 as logic tests, plus in-game captures for the same version | Engineering + content; S1-09 |
| S2-16 | U18 T2-T4: weapon output appears only per record status, with assumptions and breakdowns | GC06; unmodeled and partly modeled fixtures show no total; screen-reader breakdown walkthrough; no "best" wording | Engineering + design; R27/R30 |
| S2-17 | U19/U20: saved builds and compare follow R28/R29 | Round trip through export/import; storage failure; version-mismatch and removed-ID builds; 320 CSS px compare | Engineering + design |
| S2-18 | R36: the design-system enforcement suite runs from the first commit and is green | The 18 checks on the [design system](../design/design-system.md#enforcement-suite) page fail on seeded violations and pass on the library; generated design library matches source | Engineering + design; S1-12 |
| S2-19 | U22/U26, R31-R34: shell, navigation, peek, adaptive layout and preferences | Navigation fixtures at 320, 390, 768 and 1280 CSS px; cold links to items, views and peeks, including links made with Show all that still use opaque secret references; Back restores scroll, filters, selection and focus; preferences apply on every screen and survive reload; reduced motion and more contrast | Engineering + design |
| S2-20 | U23, R37: run companion | One-hand reach check at 390 px; pinned run survives reload; slot limits; screen-awake only on opt-in; keyboard use on desktop; first-use note shown once | Engineering + design |
| S2-21 | U21, R39: mechanics explainers use the build lab's rules | Explainer values equal build-lab values for GC01-GC15; unverified rules labeled; figure has a text twin for screen readers | Engineering + content; S2-15 |
| S2-22 | U24/U25, R38: home and what's new | Snapshot-diff fixtures; removed IDs flagged, not dropped; first visit shows starting points; no empty module; spoiler rules applied inside changes | Engineering + content |
| S2-23 | R35: UI text lint | The 10 rules on the [UI text](../design/ui-text.md#lint) page pass; zero literal strings in views; every icon-only control named; every content block carries its source | Engineering + design |

## S3: release candidate (future, not started)

**Delivers:** the agreed, explicitly named coverage and PD1-PD9. Coverage is not "all 19,376 pages."

| ID | Done when | Evidence | Owner / dependency |
|---|---|---|---|
| S3-01 | Coverage statement exactly matches the reviewed dataset, including omitted DLC/versions | Coverage manifest, unresolved-conflict list, recipe golden set | Content lead; S2 |
| S3-02 | PD1-PD3 task targets met, or owner chooses a documented rescope before release | Moderated 10-participant study with individual results and failures retained | Researcher; approved protocol |
| S3-03 | Proposed budgets in the spec are measured under defined device/network conditions | Baseline and candidate runs; no "faster" claim without comparison | Engineering/QA |
| S3-04 | Rights, attribution, privacy, accessibility, maintenance and rollback gates pass | Release checklist and named responsible maintainer | Owner, content, engineering |
| S3-05 | Docs describe actual behavior and unresolved limitations | Updated as-built section, scope, support/correction route | Product owner |

## Against the promise

Today the person can review the evidence and a proposed approach; they cannot use a new companion.
The blocking gaps, in order, are: confirm the priority tasks, approve scope/rights (including
icons), verify the recipe projection, model a sample of unlock conditions, audit a sample of
weapon records and check the golden builds in game, authorize implementation, then observe
actual use. None is silently marked
done because this documentation task completes.
