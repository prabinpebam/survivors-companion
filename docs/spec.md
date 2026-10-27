# Product specification: source-backed progression companion

> **TL;DR:** Proposed experience: recognize items in a sortable, filterable visual grid; find
> the next valid evolution step and its weapon-passive pairing at a glance; mark your own
> progress in this browser and move it as a simple JSON file; then get explainable suggestions
> for the next secrets and a single run that attempts as many unlocks as possible; and try a
> build in a build lab (slots, levels, PowerUps) that shows exactly how each choice changes your
> stats and each weapon's output, then save and compare builds. Everything stays within your
> chosen content/spoiler scope, with inspectable sources and the math shown.
> It is an **app for understanding, planning and playing**, not an article wiki: visual-first,
> adaptive from phone to desktop, with UI text kept short and separate from source content, and
> built on a strict token-based design system ([app UX plan](design/app-ux-plan.md)).
> The codebase does not exist. This spec is a hypothesis grounded in desk research, archive
> inspection and the owner's first-person player input. It is not a tested product, a stack
> commitment, or permission to implement.

**Revision 2026-10-26:** owner-player input OP01-OP07 ([section 2.1](#21-owner-player-input))
added P5/P6, J6-J9, U8-U14, F6-F10, R13-R22 and decision O15. Manual progress tracking and the
unlock-session planner moved from deferred bets into owner-requested scope; automatic game sync
remains out of scope.

**Revision 2026-10-26 (build lab):** owner-player input OP08-OP11 added P7, J10-J12, U15-U20,
F11/F12, V10/V11, R23-R30 and decision O16, backed by
[build mechanics research](research/build-mechanics.md). A build lab with explained stat and
weapon-output math moved into scope. Build *optimization* (recommending "the best build") and
claims of exact real-run damage remain out of scope.

**Revision 2026-10-26 (app experience):** owner input OP12-OP16 reframed the product as an app
that helps a player understand, plan and play, not a conventional wiki of plain articles. It
added P8, J13-J16, U21-U26, F13-F17, V12-V17, R31-R39 and decisions O17-O23. Scenario and job
detail, observable user-can criteria and step-level flows are in
[scenarios and jobs](design/scenarios-and-jobs.md) and [task flows](design/task-flows.md). The
UX and UI plan, design system, component inventory and UI text rules are in
[app UX plan](design/app-ux-plan.md), [design system](design/design-system.md),
[components and views](design/components.md) and [UI text](design/ui-text.md). Nothing was built.

## 1. Customer promise

"Help me recognize what I'm looking for, find my next valid step and what it pairs with, remember
what I've done, plan my next run and try out a build before I play it, without spoiling more than
I asked for and with sources and math I can check, in an app I can read at a glance."

| ID | Sub-promise | What breaks it |
|---|---|---|
| P1 | I can identify the next valid evolution step and the relevant condition quickly | Wrong levels/inputs, unreadable answer, or a generic recipe that erases exceptions |
| P2 | I can distinguish chosen content and deliberately reveal protected secrets | Undeclared DLC, hidden-filter confusion, spoilers in previews, or a shared link overriding my preference |
| P3 | I can understand what prerequisite or limitation stops progress | Unsupported complete-graph claims, assumed save state, or no explanation when conditions are unknown |
| P4 | I can inspect where an answer came from and report a possible error | No provenance, stale content labeled current, unsafe asset use, or a success message before a report is submitted |
| P5 | I can recognize, sort, filter and compare items visually and see only the detail I need right now | One long names-only list, endless scrolling, an exhaustive table forced as the default, icon-only tiles without labels, or a view that loses my sort/filter |
| P6 | I can record my own progress, carry it to another browser, and get explainable suggestions for what to unlock next and how to combine attempts in one run | Lost or silently overwritten progress, a claim to know my actual game, suggestions built on guessed conditions, unrequested spoilers, or an opaque "best" plan |
| P7 | I can assemble a build within the real slot rules, set item levels and my PowerUps, and see, with the math shown, how each choice changes my stats and each weapon's output; I can save builds and compare them | A confident "DPS" built on guessed or stale data, stacking or caps applied wrongly, a weapon's ignored stats silently applied, special weapons modeled as ordinary, unlabeled game version, or lost builds |
| P8 | I can get from opening the app to what I need with a glance and a few taps, on a phone or a desktop, with pictures and numbers doing most of the talking, and read longer text only when I choose to | An article wall as the first thing I see; navigation that loses my place; chrome full of words; icons without names; the same thing looking or behaving differently on different screens; layouts that break on a phone |

**MVP non-goals:** recreate every wiki page/theme; automatic game-state diagnosis or sync; import
game saves; recommend "optimal" builds or claim exact real-run damage; guarantee all
patches/platforms/DLC; build a music/video browser; require an account or cloud storage; add
AI-generated answers; replace community authorship; make article pages the primary way in
(entity pages exist, but are reached through tiles, search and peeks); copy the game's logo,
fonts or trade dress.
Owner-requested manual progress tracking, JSON portability and the unlock-session planner are in
scope (O15), with the data gates in R19-R21. The owner-requested build lab is in scope (O16),
with the weapon-model gate in R30 and the mechanics in
[build mechanics research](research/build-mechanics.md). Offline packs and localization remain
separate discovery bets, not hidden MVP requirements.
The longer-term ambition of a new presentation over the wider knowledge base is retained; this
proposal narrows the first validated slice, not the owner's ultimate product vision.

## 2. Evidence and positioning

Authority order: original user evidence -> coded needs and counterexamples -> product hypotheses;
primary competitor documentation -> observed parity and unknowns; archived source -> recipe/domain
constraints. See [user research](research/user-research.md),
[evidence ledger](research/user-evidence.md), [benchmark](research/competitor-benchmark.md), and
[readiness](research/data-readiness.md).

The current official wiki already explains mechanics and exceptions (benchmark S05-S07).
Planners and companion apps already offer overlapping lookup/planning features (S10-S19, S23).
Dood.gg documents scoped tools (S14-S15); Vampidex documents save-aware roster filtering (S18).
Therefore **"another evolution chart" is not a demonstrated gap**. Combining correctness,
source traceability, bounded prerequisites and a fast small-screen task path is an opportunity
to test, not a proven unique capability.

Evidence of game confusion does not establish dissatisfaction with the current official wiki.
Older Fandom complaints must not be attributed to its migrated successor without current evidence.
No market-share, retention or comparative speed claims are made.

### Player evidence -> proposed behavior

E IDs below are defined in the [evidence ledger](research/user-evidence.md); S IDs in the
[benchmark](research/competitor-benchmark.md); DS IDs in [readiness](research/data-readiness.md).
Different units from one thread are not independent source pages. Game questions establish
reported confusion, not the correctness of their replies or dissatisfaction with a wiki.

| Capability / job | Actual support | Proposed response / requirement | What remains a hypothesis |
|---|---|---|---|
| U1/U2; J1 | E07 asks about undiscovered evolutions; E16 describes repeated per-weapon lookup; E19 explicitly requests input-first notation | F1/V1/V2; R01/R02: named lookup and inputs/levels -> next result -> conditions | Alias behavior, switching value and task speed (A1/A2); no result inferred from ratings |
| U2/U6; J2 | E08 shows evolution/Grimoire confusion; E25 is a game review reporting an unsuccessful external search about a coffin | F2/V2/V3; R02/R03/R06: explain conditions and bounded, source-backed prerequisites | How broadly prerequisite navigation helps (A5); E25 is not proof of current wiki failure |
| U3; J3 | E02/E05 organize discussion by DLC; S14/S15/S18 show competing content treatments | F3/V1/V4; R04: explicit content scope | Ownership confusion and the base-game-first default (A6); no verified first-person complaint in this pass |
| U4; J4 | E03 requests tips without spoilers; E09/E10 visibly mark secret/strategy discussion | F4/V1/V4; R05: deliberate reveal of classified secrets | Exact taxonomy, default and reveal granularity (A7), not a mandate to hide all evolution facts |
| U5/U7; J3/J5 | E18 flags an outdated chart; E30 requests missing content and an update; E31 is a secondary mirrored review, not another verified primary platform | F5/V2/V5; R07/R08: visible coverage, truthful freshness and failure states | Source-card comprehension and correction-route usefulness (A8); provenance also follows DS09/DS10 governance |
| U1-U7; mobile delivery | E14 praises the current official wiki's ad-free mobile experience; E29 discusses ads removed from a companion | R09/R10/R11: accessible compact answers, no advertising or tracking | New-product usability and budgets (A2/A9); E32's game app-switching complaint does not prove an overlay/offline remedy |
| U15-U20; J10-J12 (build lab) | OP08-OP11 (owner). E01/E02 ask for build advice; E35 shows confusion about how Might stacks with base damage; E36 shows players cannot find which weapons use Duration and dispute the wiki's list. Planners S13/S15-S19 offer slots, pairings and (S16) stat totals; none inspected was observed combining per-level weapon stats, PowerUps, cap-applied totals, per-weapon modeled output and saved-build comparison (S27-S30) | F11/F12, V10/V11; R23-R30: slot editor, levels, PowerUps, tiered and explained output, saved builds and compare; numbers only from reviewed weapon records (O16) | Whether modeled numbers help more than mislead (A21), model accuracy (A19), data completeness (A20), patch drift (A22), data rights (A23); A11 now asks whether other players share the need |
| U8-U10; J6/J7 | OP01-OP03 (owner). E12 reports having to memorize evolution accessories; E21/E22 show icon-based guide supply, not a proven layout preference | F6/F7, V6/V7; R13-R15 | Whether icons beat names for other players (A13); icon rights (A3) |
| U11-U14; J8/J9 | OP04-OP07 (owner). E07 advises working down the achievement list with the wiki; S18 offers save-import unlock filtering; the game's Bestiary/Grimoire track some discoveries (S03/S04) | F8-F10, V8/V9; R16-R22 | Unlock-condition modeling (A14), recommendation usefulness (A15), storage durability (A16); no inspected alternative was observed offering a multi-unlock session planner, which is not proof that none exists |

These observations support testing the direction, not declaring it validated. Contributor
onboarding feedback (E34) informs a later contribution process, not the player-facing MVP.

### 2.1 Owner-player input

On 2026-10-26 the product owner, who plays the game, supplied first-person requirements. This is
a distinct evidence class: **authoritative for the owner's product intent and scope** (O15), but
one person's experience. It is not counted in the D0-02 public-evidence floor, not a participant
study, and not a population priority ranking. S1 tests it with other players (A11, A13-A18).
OP08-OP11 were added later the same day for the build lab (O16), and OP12-OP16 for the app
experience and design system (O17-O23).

| ID | Owner-player statement (condensed) | Product consequence |
|---|---|---|
| OP01 | Visual memory is stronger than recall of character or weapon names; endless scrolling through a long list is hard | Icon-first grid with text labels, several sorts and combinable filters (U8, R13) |
| OP02 | Often forgets which weapon pairs with which passive and wants that mapping quickly, not as a small detail inside a full page | Two-way pairing lookup and pairing grid as first-class views (U10, R15) |
| OP03 | An exhaustive grid/table with every detail at all times is not good; exhaustive detail is appreciated but should be available on demand | Multiple view modes with progressive disclosure; compact by default (U9, R14) |
| OP04 | Automatic progress sync is understood to be out of scope; wants to mark progress manually, for example secrets, unlocked maps and weapons | User-declared progress marks stored in this browser (U11, R16/R17) |
| OP05 | Progress should be exportable as simple JSON and importable in another browser | Versioned, human-readable export and validated import with preview (U12, R18) |
| OP06 | Based on progress, wants to see which secret to attempt next | Explainable next-unlock suggestions from user-declared progress (U13, R19) |
| OP07 | Wants to attempt the most unlocks in a single session, by choosing a specific hero, weapons and map, suggested automatically | Automatic, explainable single-run unlock plan (U14, R20) |
| OP08 | Weapon and passive slots are limited; wants to assign weapons and passives to the slots, set their levels and see how each affects DPS and other player attributes | Slot-based build editor with per-item levels and live stats and weapon output (U15/U16/U18, R23-R25, R27) |
| OP09 | The result also depends on the PowerUps bought, so they should be shown alongside | PowerUp ranks in the same view, each with its contribution shown (U17, R26) |
| OP10 | Wants to save different configurations and compare and analyze them | Saved builds in this browser, in the JSON export, and side-by-side compare (U19/U20, R28/R29) |
| OP11 | The utility must be accurate, useful and reliable, which needs deep research into the mechanics of weapons, passives and PowerUps | Mechanics research, reviewed weapon model records, tiered output with stated assumptions, golden cases and in-game checks, version labeling (U18, R25/R27/R30) |
| OP12 | Not a conventional wiki that documents everything as plain articles; an app that helps you understand, plan and play the game | App model with three modes (Understand, Plan, Play) and five destinations instead of an article tree (O17, P8, J13-J16, R31) |
| OP13 | The UX and UI should be modern and organized using the most modern approach | Adaptive navigation, search everywhere, peek-and-return, direct manipulation, instant local feedback, views from data ([app UX plan](design/app-ux-plan.md), R31-R34) |
| OP14 | Much more detailed spec of scenarios, jobs, user-can statements, task flows and UI design | [Scenarios and jobs](design/scenarios-and-jobs.md), [task flows](design/task-flows.md) and screen plans in the [app UX plan](design/app-ux-plan.md) |
| OP15 | The UI should be primarily visual and less verbose; UI text is not to be confused with content text | UI text budgets and a hard split between UI strings and source content (O19, R35, [UI text](design/ui-text.md)) |
| OP16 | Strict design system and token discipline | DTCG tokens, tiers, sealed fundamentals, views from data and an enforcement suite from the first commit (O18, R36, [design system](design/design-system.md)) |

The owner named IndexedDB and localStorage. This spec records **browser-local storage only** as
the binding constraint and leaves the exact API split to implementation, consistent with O7.

## 3. Scenarios and jobs to be done

| ID | When I... | I want to... | So I can... | Promise |
|---|---|---|---|---|
| J1 | Know the item but not the next evolution step during a run | Identify the actual required items/levels and eligible context | Make the next choice without searching several unrelated pages | P1 |
| J2 | Have the apparent inputs but cannot evolve or unlock something | Understand the missing prerequisite or special condition | Correct the plan instead of repeating the same failed attempt | P1, P3 |
| J3 | Own some content or return after an update | Distinguish available, unowned and unsupported content | Avoid following instructions that do not apply to my context | P2, P3 |
| J4 | Want a hint without exposing every secret | Control how much protected content I reveal | Preserve discovery while still getting useful help | P2 |
| J5 | See a surprising, stale or apparently wrong answer | Inspect its source and raise a specific correction | Decide what to trust and improve the information | P3, P4 |
| J6 | Remember what an item looks like but not its name | Scan a grid and narrow it by sort and filters, then open only the detail I need | Find it without endless scrolling or recalling the exact name | P5 |
| J7 | Have a weapon or passive and cannot remember its partner | See its pairing(s) immediately, in either direction | Choose the right level-up without reading a full page | P1, P5 |
| J8 | Have made progress in my own game | Mark what I have unlocked, keep it, and move it to another browser | Keep an accurate personal checklist without a save import or account | P6 |
| J9 | Plan my next session | Get a suggested hero, weapons and stage that let me attempt several compatible unlocks at once, with reasons | Make the most of one run instead of chasing one unlock at a time | P6, P2 |
| J10 | Choose which weapons and passives to take, at what levels, or how to spend gold on PowerUps | See how a slot assignment, item levels and PowerUp ranks change my stats and each weapon's output, with the math shown | Decide without spreadsheet work or trusting an unexplained number | P7 |
| J11 | Have two or more build ideas | Save them and compare them side by side, seeing what differs and why | Pick one for my next run and keep the others | P7 |
| J12 | See a number that surprises me | Trace it to its sources, caps, ignored stats and model limits | Trust it, or know it is not modeled, before acting on it | P7, P4 |
| J13 | Wonder how a stat, item or rule actually works (why more Cooldown stops helping, which weapons use Duration) | See it shown with my own numbers and the rule's limits, not a paragraph | Use it in my next build or run with confidence | P8, P7, P4 |
| J14 | Am in a run, with the game on one screen and the app on another (or the game paused) | Glance at my current weapons' next steps and pairings in a large, quiet, one-hand form | Choose the level-up and get back to the game in seconds | P8, P1 |
| J15 | Come back after a game update, a new content pack or a long break | See what is new or changed in my scope and what it means for my marks and builds | Pick up where I left off without rereading everything | P8, P3, P6, P7 |
| J16 | Am new to the game, or new to this app | Get oriented with a few spoiler-safe starting points and learn the app by using it | Start playing better without a tutorial wall or spoilers | P8, P2 |

J13-J16 come from the owner's app framing (OP12) and are grounded in public evidence as follows:
J13 in E35/E36, J14 in E16/E21 (with E32 as a caution about switching apps on one phone), J15 in
E02/E18/E30, J16 in E03/E04/E06. Detail per job is in [scenarios and jobs](design/scenarios-and-jobs.md).
These are task-based segments, not statistically established personas. Novices, returning
players, experienced completionists and contributors can each occupy several jobs.
An advanced player satisfied with the in-game reference is a valid non-adopter.

## 4. What a person can do

| ID | A person can... | Jobs | Flow / view | Future DoD |
|---|---|---|---|---|
| U1 | Find a covered item from its name or a reviewed alias and distinguish ambiguous matches | J1, J3 | F1 / V1 | S2-01 |
| U2 | Identify each next evolution step, its inputs/required levels and applicable special conditions | J1, J2 | F1/F2 / V2 | S2-01 |
| U3 | Choose their content scope and distinguish a filtered result from missing coverage | J3 | F3 / V1/V4 | S2-02 |
| U4 | Keep classified secret details hidden and deliberately reveal a bounded amount | J4 | F4 / V1/V4 | S2-03 |
| U5 | Inspect source/revision, snapshot age, coverage, attribution and transformation notes | J3, J5 | F5 / V2/V5 | S2-04 |
| U6 | Follow a source-backed prerequisite path in the supported slice and recognize unresolved branches | J2 | F2 / V3 | S2-05 |
| U7 | Recognize a failed/unverified answer and recover or start a specific correction without a false success | J2, J5 | F2/F5 / V5 | S2-04/07 |
| U8 | Browse a collection (weapons, passives, characters, stages, relics, arcanas) as a labeled icon grid and narrow it with sorts and combinable filters | J6 | F6 / V6 | S2-08 |
| U9 | Switch between grid, compact list, configurable table and detail views, seeing a compact summary by default and more detail on demand | J6 | F6 / V6 | S2-08 |
| U10 | From any weapon or passive, see its evolution pairing(s) at a glance, and browse all pairings in one view | J7 | F7 / V7 | S2-09 |
| U11 | Mark, unmark and bulk-mark their own progress for unlocks, secrets, stages, characters and items in this browser | J8 | F8 / V8 | S2-10 |
| U12 | Export progress as a simple JSON file and import it in another browser after previewing what will change | J8 | F9 / V8 | S2-11 |
| U13 | See which secrets/unlocks are suggested next given their declared progress, with the reason and the hidden/revealed state respected | J9 | F10 / V9 | S2-12 |
| U14 | Get an automatic single-run plan (hero, weapons, stage, any required items) that covers the most compatible unlock attempts, adjust it, and see why each attempt is included | J9 | F10 / V9 | S2-13 |
| U15 | Assemble a build: choose a character and player level, place weapons and passives into the slots allowed for that character and mode, and see pairings and slot conflicts | J10 | F11 / V10 | S2-14 |
| U16 | Set each weapon's and passive's level and see every affected number change at once | J10 | F11 / V10 | S2-14 |
| U17 | Set PowerUp ranks next to the build, or keep a reusable "My PowerUps" profile, and see each rank's effect and gold price | J10 | F11 / V10 | S2-15 |
| U18 | See derived player stats and per-weapon effective stats, and, only for reviewed weapons, damage per cycle and a labeled modeled damage rate; open any number to see its sources, caps, ignored stats and model status | J10, J12 | F11 / V10 | S2-15, S2-16 |
| U19 | Save, rename, duplicate and delete builds in this browser and carry them in the JSON export/import | J11 | F12 / V11 | S2-17 |
| U20 | Compare up to three saved builds side by side, with differences highlighted and each difference's cause explained | J11, J12 | F12 / V11 | S2-17 |
| U21 | Open a visual explainer for a player stat or rule that shows how it stacks, where it caps, which items change it and which weapons ignore it, and try their own values | J13, J12 | F13 / V14 | S2-21 |
| U22 | Check any item's key facts from wherever it appears and return to exactly where they were | J6, J7, J14 | F14 / V13 | S2-19 |
| U23 | Start a run companion: pin the run's character and items, then see each pinned item's next step, pairing and level target in a large, low-distraction layout, and update it in a tap | J14 | F15 / V15 | S2-20 |
| U24 | See what is new or changed since their last visit in their scope (content, coverage, mechanics version) and which of their marks and saved builds it affects | J15 | F16 / V16 | S2-22 |
| U25 | Start from a home that shows their own next steps (resume a build or the pinned run, next unlocks) or, on first use, a few spoiler-safe starting points | J15, J16 | F17 / V12 | S2-22 |
| U26 | Set preferences once (theme, density, motion, content scope, spoiler level) and have them apply on every screen, kept in this browser and exported only if they choose | J16, J3, J4 | F17 / V17 | S2-19 |

Protected negatives: a person cannot accidentally upload a save, submit a public correction,
expose all secrets merely by opening a shared link or a suggestion, or lose stored progress
through an import without a preview and a backup choice. The system knows only what the person
**declared**. It never claims to know actual ownership, unlocks or the running game. A suggestion
is a reviewed plan of attempts, not a guarantee of success. A build-lab number is a model of
the stated rules at a stated game version, not a measurement of a real run, and never a claim
that a build is "best". An icon, colour, sound or position never carries meaning on its own:
each has a text twin.

## 5. Task flows and views

Behavioral steps, branches, defaults, waits and view mapping are authoritative in
[experience requirements](experience.md); step-level tables with screen, components and UI text
keys are in [task flows](design/task-flows.md). The summary is:

| Flow | Start -> outcome | Critical branch |
|---|---|---|
| F1 | Known name -> next correct evolution step | Alias ambiguity, zero passive, multi-step chain, unsupported item |
| F2 | Failed progression -> checkable prerequisites | Stage/character exceptions, unknown state, alternative/cyclic paths |
| F3 | Choose content -> understandable scoped answers | Filtered vs unclassified vs unsupported |
| F4 | Protected information -> intentional bounded reveal | Search suggestions, thumbnails, deep links and accessible labels |
| F5 | Inspect claim -> source/correction route | Snapshot vs compatibility, source unavailable, external submission not completed |
| F6 | Visual browse -> recognized item with just enough detail | Name forgotten, no matches under filters, spoiler tiles, missing icon |
| F7 | Weapon or passive -> its pairing(s) | Zero-passive chain, several partners, unions, max-level passive, out-of-scope partner |
| F8 | Played a run -> progress marked | Bulk marking, linked reward marks, undo, storage unavailable |
| F9 | Export/import -> progress in another browser | Invalid/newer file, unknown IDs, conflicting marks, replace vs merge |
| F10 | Declared progress -> next unlocks and a single-run plan | Unknown/uncodified condition, cumulative goals, locked prerequisites, spoilers, no compatible plan |
| F11 | Build idea -> slotted build with levels and PowerUps -> explained stats and weapon output | Slots full, evolution or union changes slots, weapon ignores a stat, cap reached, weapon not modeled, PowerUps unknown |
| F12 | Saved builds -> side-by-side comparison with explained differences | Unsaved changes, storage unavailable, builds from different content snapshots, removed IDs, import conflicts |
| F13 | Question about a rule -> interactive explainer with my own values | Rule not verified, stat with exceptions, value past a cap, negative totals |
| F14 | Any item anywhere -> peek -> back to the same place | Hidden secret, item out of scope, deep link opened cold, peek from a peek |
| F15 | Run start -> pinned run -> next steps at a glance -> update in a tap | Item not modeled, slots full, screen sleep, game on the same phone, run ended |
| F16 | Returning visit -> what is new -> affected marks and builds | Removed or renamed IDs, mechanics version change, first visit, spoilers inside changes |
| F17 | First open -> starting points; returning -> personal home; preferences once | Storage unavailable, no progress yet, everything hidden by scope, reduced motion or more contrast |

No CLI or agent-facing product API is promised in MVP. Contributors/agents read durable source
and provenance documents; a machine-readable product API needs a separate consumer/job.

## 6. Requirements and acceptance

| ID | Priority | Requirement | Grounding | Acceptance (future, not run) |
|---|---|---|---|---|
| R01 | Must | Search only the declared reviewed game coverage; include reviewed aliases and explicit ambiguity | U1; E07/E16, DS02; alias interaction is A2 | Named/alias/ambiguous/unknown cases resolve without an invented exact match |
| R02 | Must | Present input-first steps and model zero/many required items, levels, transformations and conditions | U2; E19, DS05-07, benchmark S05-S07 | Input-first audited cases all match source, including Bracelet, union and max-passive cases; no fabricated passive slot |
| R03 | Must | Distinguish readiness to evolve from an unconditional promise about the player's run | U2/U6; E08 motivates explanation; DS07 supplies mechanics | Never assert universal ten-minute chest eligibility or known player state |
| R04 | Must | Apply visible, explicit content scope consistently to results and prerequisites | U3; E02/E05 indirect, benchmark S14-S15, A6 | Owned/unowned/unknown mapping tests; filtered-empty state explains recovery |
| R05 | Must | Apply reviewed spoiler classification across details, search suggestions, grids, pairing views, progress lists, unlock suggestions, build-lab pickers, assets and shared links | U4, U8-U15; E03/E09/E10; policy is A7 | Negative spoiler fixtures and deliberate per-item/global reveal behavior |
| R06 | Should, bounded | Explain prerequisites with source-backed edges and explicit alternatives/gaps | U6; E07/E08 game context, DS04/08, A5 | Every shown edge has evidence; unresolved cycles/gaps do not become fabricated steps |
| R07 | Must | Attach provenance and truthful snapshot/coverage labels to every published answer | U5; E18/E30, DS09-10; comprehension is A8 | Source URL/revision/license/change note complete; no unaudited "latest patch" label |
| R08 | Must | Distinguish no result, unsupported, filtered, stale, conflict and failed retrieval | U7; E18/E30 motivate trust; detailed states are P1/P4 design choices | Correct recoverable state and words for each negative fixture |
| R09 | Must | Core task works without an account, pointer or wide display | U1-U7; E14, accessibility commitment, A2/A9 | S2-06, WCAG 2.2 AA target and defined responsive checks |
| R10 | Must | Keep the compact lookup within proposed performance/payload budgets | P1/PD5; E14 context, A9 | Measured on a stated device/network after implementation; no current performance claim |
| R11 | Must | No advertising, visitor tracking, save upload, required identity, automatic external submission, or transmission of progress or build data in MVP | E14/E29 support ad-free baseline; privacy choices U3/U7/U11, O4/O9/O15 | Network/storage inspection: no ad/tracking requests, progress and builds never leave the browser except through a user-initiated export or share link; correction cancellation tests |
| R12 | Must | Publish only reviewed, attributed content/assets with exact coverage | P4; DS10, A3 | Rights/attribution gate and content audit before public release |
| R13 | Must | Collection grid: every tile shows an icon **and** a visible text label; sorts include name, in-game order, type, content pack, release/version and progress; filters combine (type, content pack, progress, has-evolution, pairs-with) with result counts, removable active-filter chips and one reset; sort/filter survive back navigation and can be shared by URL without carrying progress | U8; OP01; E21/E22 supply signal; DS05/DS11 | Fixture tasks find a target by appearance only; combined-filter counts match the reviewed data; zero icon-only tiles; missing or uncleared icon -> labeled text tile; protected tiles reveal nothing through label, alt text or tooltip |
| R14 | Must | View modes: grid, compact list, configurable table and detail. Default to a compact summary (proposed: at most five key fields); the full field set is opt-in by column chooser or "Show all details". Switching mode keeps query, sort, filter and selection; the last mode is remembered locally; on narrow screens the table falls back to a list without page-wide horizontal overflow | U9; OP03; R09 | Mode-switch fixtures preserve state; 320 CSS px check; no default view shows every field |
| R15 | Must | Pairing lookup: weapon -> partner passive(s)/weapon(s) with required levels and result; passive -> every weapon it pairs with; a pairing view of input-first cards ("weapon + passive -> evolution") filterable by scope and progress, with an optional matrix for a filtered subset. Pairing is the first content in an item's detail, reachable in one interaction from any tile. Zero-passive chains, multiple inputs, unions, gifts and morphs keep their own labels | U10; OP02; E12/E19; DS06/DS07 | Fixtures include Bracelet (no passive), a union, a passive with several partners and a max-level-passive recipe; pairings derive from the reviewed recipe projection, never from passive_evolutions alone |
| R16 | Must | Manual progress marks per stable entity ID: "Unlocked/done" or "Not marked" (never shown as "locked"), plus an optional "Skip in suggestions". Kinds: unlocks/achievements, secrets, stages, characters, weapons, passives, relics and arcanas within reviewed coverage. Bulk-mark by group (content pack, version, list section, visible results); one-step undo. Marking an unlock **offers** to mark its reviewed reward (and the reverse); linked marks are labeled and undoable, never a silent cascade | U11; OP04; R08 | Mark/unmark/bulk/undo fixtures; a declined linked mark changes nothing; "not marked" never appears as a claim about the game |
| R17 | Must | Progress persists only in this browser's local storage (owner-indicated: IndexedDB for progress, localStorage for small preferences). Show "Saved" only after a confirmed write; storage unavailable, private browsing, quota or eviction -> say progress is session-only and offer export; explain that clearing site data deletes progress; reflect changes across open tabs or detect the conflict; "Clear all" requires confirmation and offers an export first | U11; OP04; R11; perceived-performance rules | Storage-disabled, quota-exceeded, two-tab and clear-all tests; no network request contains progress |
| R18 | Must | JSON export/import: a pretty-printed, versioned file (format ID, schema version, export time, content snapshot, progress keyed by stable IDs, optional preferences; no personal data). Import from file or paste is parsed as data only, size-limited and schema-validated, then previews new/changed/unchanged/unknown/conflicting entries before an atomic merge (default) or replace (confirmed, export-first offered). Unknown IDs are retained, not dropped; a newer schema version is refused with an explanation | U12; OP05; R08 | Round trip into an empty browser yields identical progress; malformed, oversized, newer-version, unknown-ID and conflict fixtures leave existing progress untouched until confirmed |
| R19 | Must, gated by R21 | Next-unlock suggestions are deterministic and explainable: eligible = not marked, not skipped, in content scope, reviewed prerequisites declared. The visible ranking rule (proposed: prerequisites met, then number of other attempts compatible in the same run, then in-game list order) and per-item "why/what it needs" are shown. Uncodified or unknown conditions are listed separately as "Read the condition" with their source, never ranked as if understood. Protected secrets appear as hidden hints until revealed | U13; OP06; E07; R05/R21; A14/A15 | Same input -> same output; no suggestion with an undeclared prerequisite; uncodified fixtures never ranked; spoiler fixtures pass |
| R20 | Must, gated by R21 | Unlock-session plan: choose a hero, stage, weapons/passives within the reviewed slot limits and any required relic/arcana/item to cover the most compatible single-run attempts among eligible suggestions. The person can lock or exclude a hero, stage, weapon or unlock and regenerate, and compare up to three alternatives. Cumulative multi-run goals are shown as "progress toward", not counted as completable attempts. Wording says "covers the most reviewed attempts among the options checked", never "optimal" or a success probability | U14; OP07; R19/R21; A14/A15 | Hand-computed fixtures give the expected best coverage and tie-break; no plan contains conflicting constraints or an undeclared prerequisite; locks/excludes respected |
| R21 | Must | A reviewed unlock-condition record exists before any unlock is used for suggestions or plans: subject, reward, constraints (hero, stage, mode, required items, slots), target (survive, level, defeat, find, evolve, cumulative total), single-run vs cumulative, prerequisites, spoiler class, source references and review status. Display modeled coverage (for example "N of M unlocks in your scope can be planned") | U13/U14; DS11/DS12; A14 | Audit sample per R21 type with sources; unmodeled conditions excluded from automation and counted in the coverage note |
| R22 | Should | Progress-aware browsing: filter grids and pairings by marked state, highlight pairings whose inputs are both marked, and link from an item to the unlock that grants it | U8/U10/U11; OP01/OP02/OP04 | Filter fixtures agree with stored marks; locked/unknown inputs labeled, not hidden |
| R23 | Must | Slot rules: the build has the slot counts of the chosen character and mode (default 6 weapons + 6 passives; Mindbender weapon limit 1-6). An item takes one slot and cannot be added twice. An evolution replaces its base weapon in the same slot; a union merges into one slot and frees the other. Slot-changing exceptions (Survarot, Perkeo, Arma Dio, stage items, gifts, morphs) are listed as "Not modeled yet" until reviewed. Pairing badges show which slotted weapon and passive can evolve and at what levels, from the reviewed recipes (R15) | U15; OP08; [build mechanics: slots](research/build-mechanics.md#slots-and-what-fills-them) | A 7th weapon is refused with the reason; Mindbender limit 3 enforced; evolving keeps the slot; a union frees a slot; Bracelet chain shows no passive |
| R24 | Must | Levels: each item's level runs from 1 to its reviewed maximum. Level steps come from reviewed structured tables with real values; the game's displayed text stays beside them. Each table's sum must equal the stated maximum. A weapon without reviewed level steps shows level-1 values and "Level steps not reviewed" | U16; OP08; DS13; GC07, GC12 | Santa Water Duration steps sum to +1.0 s; Torrona's Box reaches +25%; no level beyond maximum |
| R25 | Must | Stat rules: totals use the archive-confirmed base, stacking (additive or multiplicative) and cap or floor per stat. Per-weapon applicability comes from reviewed DS15 records: an ignored stat leaves the weapon value unchanged and says "Not affected by Duration". Negative totals are allowed. Arcanas, Golden Eggs, Limit Break, stage and mode modifiers and temporary effects are not added to totals; they are listed as "Not modeled" | U18; OP11; [build mechanics: player stats](research/build-mechanics.md#player-stats-base-stacking-and-caps); E35/E36 | GC01-GC05, GC08, GC09, GC13 and GC15 pass as logic fixtures, then the in-game check (BM-V, S1-09) |
| R26 | Must | PowerUps: ranks 0 to maximum for every reviewed PowerUp row, switched-off state, and the quick choices "None" and "All maxed". The person enters ranks; nothing is read from a save. A reusable "My PowerUps" profile applies to every build unless a build overrides it. Each PowerUp's contribution appears in the breakdown. Total gold price uses the confirmed formula once GC11 passes; until then the price is hidden | U17; OP09; DS14; [build mechanics: PowerUps](research/build-mechanics.md#powerups) | GC11; switching profile updates totals; switching off a maxed PowerUp removes its effect |
| R27 | Must | Output tiers and honesty: T1 player stats always; T2 weapon effective stats for records at least "stats-only"; T3 damage per volley and cycle for "partial" or "modeled"; T4 modeled damage rate only for "modeled", labeled "one target, ideal conditions" with its assumptions. A build total appears only when every equipped weapon is "modeled", labeled "Sum of one-target modeled rates"; otherwise "3 of 5 weapons modeled" and no total. Every number opens a breakdown: base, character, each passive, each PowerUp, cap applied, ignored stats, model status, game version. No "best", "optimal", score or ranking | U18; OP08/OP11; E35/E36; A21 | GC06 (no damage ÷ cooldown shortcut); an unmodeled-weapon fixture shows no total; breakdown read correctly by a screen reader |
| R28 | Must | Saved builds: stored in this browser under the R17 rules, each with name, character, slots, levels, PowerUps or profile, content snapshot and game-version target. Rename, duplicate and delete with undo. Builds travel as an optional `builds` section in the R18 export/import (preview, merge by build ID, conflicts named, unknown IDs retained and flagged). A share link that encodes one build, never progress, is a Should | U19; OP10; R17/R18 | Round trip into an empty browser yields identical builds; storage-failure and unknown-ID fixtures; a file without `builds` imports progress unchanged |
| R29 | Must | Compare: two or three saved builds side by side, aligned by stat and by item ID; differences shown with sign and amount; "Why" names the source difference (for example "+50% Might from Spinach 5"). Builds from different content snapshots or game versions are flagged. On narrow screens, compare one build against a chosen baseline without page-wide horizontal scrolling | U20; OP10 | Fixtures: different characters, same weapons at different levels, PowerUps on vs off, snapshot mismatch; 320 CSS px |
| R30 | Must | Weapon model record gate (as R21 is for unlocks): before a weapon shows T2-T4 numbers, a reviewed record holds base stats, level steps, stat applicability with notes, cycle rule, interval, pool, hitbox delay, crit, special-behavior note, sources, reviewer and status (modeled / partial / stats-only / not modeled), plus its golden-case and in-game check results with the game version. The lab shows "N of M weapons in your scope fully modeled". A game update re-opens affected records; numbers always show their data version | U18/U20; OP11; DS13-DS15; A19/A20/A22 | Audit sample (S1-09); an unreviewed weapon shows identity and "Not modeled yet" only; a version-mismatch fixture shows the warning |
| R31 | Must | App shell and navigation: five destinations (Home, Codex, Unlocks, Builds, Progress) shown as a bottom bar (compact), a rail (medium) or a sidebar (expanded); search reachable from every screen in one action and by keyboard; every view, selection, sort and filter has a URL that carries no progress or hidden secret, and anything in the secret class is always addressed by an opaque reference, whatever the spoiler setting of the person who shared it; Back restores the previous state with scroll and selection; no screen is more than two levels below a destination | U22, U25, U26; OP12/OP13; P8 | Navigation fixtures at 320, 390, 768 and 1280 CSS px; back/forward restores state; a deep link reaches every view; keyboard-only reach of every destination |
| R32 | Must | Disclosure ladder: every entity appears as a Glance (tile, row or chip), opens a Peek (sheet or side panel) without leaving the current view, then a full Page, then Proof (sources and math); each level shows only the fields defined for it in the [app UX plan](design/app-ux-plan.md#disclosure-ladder) | U9, U22; OP03/OP15 | Field-per-level fixtures for each entity kind; opening and closing a peek keeps scroll, query and selection |
| R33 | Must | Adaptive layout: compact (<40rem), medium (40-72rem) and expanded (>=72rem) window classes from breakpoint tokens; components respond to their container, not the window; list-detail on expanded, sheets on compact; no page-wide horizontal scroll from 320 CSS px; touch targets at least 44 CSS px | U1-U26; R09 | Layout fixtures per class; container-query tests; 320 px overflow check; target-size audit |
| R34 | Must | Instant, honest feedback: local actions update in the same frame or show a responsive state; motion is used only as feedback (deltas, placement, where something went) and stops under reduced motion; reversible actions offer undo instead of a confirmation | U11, U16, U19; OP13 | Reduced-motion fixtures; undo for every reversible action; no confirmation dialog for reversible actions; no spinner for local work |
| R35 | Must | Visual-first UI text: UI strings come only from the message catalogue and follow the [UI text](design/ui-text.md) rules and budgets (destination 1 word, action at most 3 words, heading at most 4 words, no instructional paragraphs in chrome); every icon has a visible label or an accessible name and tooltip; source content is rendered only through content components, attributed, and never mixed into UI strings | All U; OP15; ui-copy | UI text lint passes (budgets, banned words, sentence case, glossary); no literal strings in views; every icon-only control named; every content block carries its source |
| R36 | Must | Strict design system: W3C DTCG tokens with light, dark and more-contrast contexts; tiers (tokens, fundamentals, compounds, layouts, views); sealed fundamentals; every view assembled from data; a design-system test suite runs from the first commit and fails on raw values, tier violations, undocumented components, unread tokens, stale generated output and contrast below thresholds; the product system is separate from the Slate documentation theme | All V; OP16 | Suite green in every context; design library generated from source; zero raw values in component styles |
| R37 | Should | Run companion: the pinned run (character and items within slot limits) persists in this browser; large type and targets, minimal chrome; keeps the screen awake only where the browser supports it and the person turns it on; never navigates away from the pinned run on its own; says once that switching away from the game on the same phone may interrupt it (E32) | U23; J14; A27 | One-hand reach check at 390 px; screen-awake opt-in; pinned run survives reload; full keyboard use on desktop |
| R38 | Should | Home and what is new: the app keeps, in this browser, the content snapshot and mechanics version seen at the last visit; on return it lists additions, changes and removals in scope with spoiler rules applied and flags affected marks and saved builds; home modules come from data and appear only when they have something to show; What's new always states the game version the data covers and says when a newer game version is known, because new snapshots depend on maintainers (A10/A22) | U24, U25; J15/J16; A10/A22 | Snapshot-diff fixtures; a newer known game version is shown, never "no changes" alone; removed IDs flagged, not dropped; first visit shows starting points; no empty module |
| R39 | Should | Mechanics explainers: each player stat and selected rules (stacking, caps, the Cooldown floor, ignored stats, PowerUp price) have an interactive figure driven by the same reviewed rules as the build lab, with the person's values, cap marks and confidence; never a separate copy of a formula | U21; J13; E35/E36 | Explainer values equal build-lab values for GC01-GC15; unverified rules labeled |

R06's priority is a deliberate scope valve: S2 may use a reviewed linked checklist rather than a
complete traversable graph. If prerequisites cannot be made truthful cheaply, narrow the slice
and revise U6/DoD before implementation, not after claiming delivery.
R19/R20 have the same valve: if the R21 audit shows that too few conditions can be modeled
honestly, ship progress marking and the pairing/grid views first and limit suggestions to the
modeled subset with its coverage stated. Do not fill the gap with guessed or AI-written rules.
R27/R30 are the build lab's valve: if the weapon audit (S1-09) shows that few weapons can be
modeled, ship the slot editor, levels, PowerUps, T1/T2 stats, saved builds and compare first, and
limit T3/T4 to the modeled subset. Never fill a missing hitbox delay or level step with a guess.

## 7. Content architecture (logical proposal only)

```text
Read-only archive + source lineage
   -> manually reviewed entity/variant/content-pack mapping
   -> reviewed recipes, pairings, unlock conditions, prerequisites and provenance
   -> bounded published projection with coverage/rights manifest
   -> grid/list/table/detail, pairing, lookup/explanation views and lightweight search
   -> app shell: view specs (data) -> layouts -> components -> tokens (design system)

Browser only (never sent anywhere):
   user-declared progress + preferences
   -> deterministic suggestion and session-plan rules over the reviewed unlock conditions
   -> explained suggestions / plans
   <-> user-initiated JSON export/import

Build lab (browser only):
   reviewed mechanics snapshot (stat rules, PowerUps, passives, weapon model records; versioned)
   + saved builds and "My PowerUps" profile
   -> deterministic stat and weapon-output calculation with per-source breakdown
   -> build view and compare (no network, no ranking)

Corrections -> reviewed source/record change -> new labeled content snapshot
```

Prefer precomputed read-only content with explicit update boundaries. Do not choose a framework,
database, hosting provider or import library before the content contract and task slice are tested.
No ETL, database, normalized dataset or new application has been created.
The owner's browser-storage direction (IndexedDB/localStorage) bounds where progress lives; it is
not a framework choice.

Progress references stable content IDs, never display names, so a renamed item keeps its mark.
When a newer content snapshot removes or merges an ID, keep the mark, flag it for review and
never silently delete it. Suggestions and plans are recomputed from local data; there is no
server-side personalization.

**User progress file (illustrative contract, not a final schema):**

```json
{
  "format": "vs-companion-progress",
  "schemaVersion": 1,
  "exportedAt": "2026-10-26T12:00:00Z",
  "contentSnapshot": "2026-10-26",
  "progress": {
    "unlock:inlaid-library": { "state": "done", "markedAt": "2026-10-20T19:02:00Z" },
    "stage:inlaid-library": { "state": "done", "markedAt": "2026-10-20T19:02:00Z", "linkedFrom": "unlock:inlaid-library" },
    "weapon:bracelet": { "state": "skip", "markedAt": "2026-10-21T08:15:00Z" }
  },
  "preferences": { "contentScope": ["base"], "revealScope": "hide-secrets", "collectionView": "grid", "theme": "system", "density": "comfortable", "motion": "system" },
  "pinnedRun": { "character": "character:antonio", "weapons": [ { "id": "weapon:whip", "level": 4 } ], "passives": [ { "id": "passive:hollow-heart", "level": 2 } ] },
  "lastSeen": { "contentSnapshot": "2026-10-26", "mechanicsVersion": "game 1.x / snapshot 2026-10-26" },
  "powerUpProfile": { "might": 5, "cooldown": 2, "area": 2, "duration": 0, "amount": 1, "disabled": ["curse"] },
  "builds": [
    {
      "id": "build:7f3c",
      "name": "Bible + Whip, max Might",
      "mechanicsVersion": "game 1.x / snapshot 2026-10-26",
      "character": { "id": "character:antonio", "level": 1 },
      "weaponSlots": [ { "id": "weapon:whip", "level": 8 }, { "id": "weapon:king-bible", "level": 8 } ],
      "passiveSlots": [ { "id": "passive:spinach", "level": 5 }, { "id": "passive:spellbinder", "level": 5 } ],
      "powerUps": "profile",
      "notes": "Try with Duration maxed",
      "savedAt": "2026-10-26T12:30:00Z"
    }
  ]
}
```

Absent entries mean "not marked". The illustrative IDs are placeholders; the real stable ID
scheme is decided with the reviewed entity mapping (data-readiness decision 1).
`powerUpProfile` and `builds` are optional, so a progress-only file stays valid. A build stores
only the person's choices, never computed numbers: results are recalculated from the current
mechanics snapshot, and a `mechanicsVersion` mismatch is shown, not hidden. `powerUps` is either
`"profile"` or an explicit rank map for that build. `pinnedRun` (the run companion) and
`lastSeen` (what is new) are optional too. Session plans are not stored: they are regenerated
from progress, and pinning one fills `pinnedRun`. An unsaved build-lab draft stays in this
browser only and is never exported; display preferences are exported only when the person
chooses to include preferences.

The logical record contracts, normalization pitfalls and fixtures are in
[archive readiness](research/data-readiness.md). In particular: `page_name` is not a universal
variant key, DLC spellings differ, the passive-evolution table is not exhaustive, and a missing
field is not a false value.

Content/source markup is untrusted. Later rendering must avoid executing archived scripts,
unsafe HTML or source-controlled navigation. A text explanation and source link are valid
fallbacks when an asset's rights or a fact's interpretation is unresolved.

## 8. Performance and waits (proposed, unmeasured)

| Action / surface | Class and behavior | Initial target | Measurement condition |
|---|---|---|---|
| Filter/reveal after data loaded | Responsive; visible local state, no fake spinner | <=100ms local response target | Repeated task on declared reference device |
| Search result update | Responsive; preserve query and prior context | <=200ms after input stabilization | Agreed reviewed corpus, mid-range mobile reference |
| Initial answer view | Loading with honest progress/failure | LCP <=2.5s; INP <=200ms; CLS <=0.1 | Defined mobile network/device; use p75 field data only when real traffic exists |
| Initial transfer | Minimal page + scoped lookup payload, not archive bundle | <=300 KiB compressed JS; <=1 MiB total initial transfer | Excludes user-requested deeper media; document exact cache/network state |
| Scope preference persistence | Explicit session/persistent state | No "saved" until write succeeds | Storage-disabled/quota/error checks |
| Grid sort/filter/mode switch | Responsive; keep scroll position and selection | <=100ms after data loaded | Full reviewed weapon set on the reference device |
| Grid icons | Lazy, bounded image loading; labels render first; no layout shift | Visible tiles labeled before images arrive; CLS <=0.1 | Throttled network; rights-cleared icon set only |
| Progress mark / undo | Instant; optimistic display only with a visible failure rollback | <=100ms to show; "Saved" only after write | Storage-throttled and failing-write checks |
| Export / import preview | Responsive for a typical file; progress shown for large files | Preview <=1s for a full-coverage file | Largest realistic progress file on the reference device |
| Suggestions / session plan | Responsive; keep the previous plan visible while recomputing; cancellable | <=500ms target; otherwise a "Planning..." state with cancel | All modeled unlocks in scope, no locks, reference device |
| Build edit (slot, level, PowerUp change) | Instant; all visible numbers update together, no partial results | <=100ms to updated numbers | Full 6+6 build with every weapon modeled, reference device |
| Build compare (3 builds) | Responsive; keep the previous comparison until the new one is ready | <=200ms | Three full builds, reference device |
| Save build | Instant display; "Saved" only after a confirmed write | <=100ms to show | Same storage checks as progress marks |
| Peek open / close | Instant; drawn from loaded data; the view behind keeps its state | <=100ms to content; no layout shift behind | Any entity from a full grid, reference device |
| Destination switch / Back | Responsive; restore scroll, selection and filters | <=200ms after first load | Reference device, warm cache |
| Run companion update | Instant; pinned items and next steps update together | <=100ms | Full 6+6 pinned run, reference device |

These are starting budgets, not competitor measurements or findings. Establish a baseline and
adjust by a recorded decision before evaluation. Do not ship the archive's audio/video or full
HTML/media collection as an initial client payload.

## 9. Copy and complete state coverage

The [experience glossary/state matrix](experience.md) defines working terms and failure wording.
At minimum cover rest, selected, hover, focus, active, disabled, loading, empty, stale,
conflict and error; light/dark, keyboard/screen-reader, small screens and reduced motion.
Proposed tokens, components, layouts and UI text rules are in the Design section
([design system](design/design-system.md), [components and views](design/components.md),
[UI text](design/ui-text.md)); none are implemented in this phase.

## 10. Assumptions, decisions and staged success

- [A1-A27](planning/assumptions.md) rank desirability, usability, feasibility and viability risks,
  state cheap checks and what a result changes. They remain open.
- [O1-O23](planning/decisions.md) distinguish owner decisions, proposals and operational defaults.
- [Definitions of Done](planning/definition-of-done.md) separate documentation completion from
  observed product outcomes. PD1-PD9 are not yet achieved.
- [Roadmap](planning/roadmap.md) orders validation, content work and a separately authorized build.
- [Build mechanics research](research/build-mechanics.md) holds the stat, PowerUp and weapon
  rules, golden cases GC01-GC15 and the in-game check protocol behind R23-R30.
- The Design section holds the app model, screen plans, design system, components and UI text
  rules behind R31-R39 ([app UX plan](design/app-ux-plan.md)).

## 11. As built

**No product implementation.** Only the three pinned kits, project instructions, documentation
host configuration and authored research/specification/planning material were added.
There are no application tests, user-study results, product performance baseline or deployment.
The archive and its scraper remain unchanged.
At the owner's subsequent request, the generic Slate documentation reader remains running
locally; it is not a companion application or permission to implement one.
The 2026-10-26 owner-player revision changed documentation only: no storage code, schema file,
importer, planner logic or prototype exists.
The build-lab revision (OP08-OP11) also changed documentation only: no calculator, formula code,
extracted weapon data, schema file or prototype exists. The mechanics research read the archive
and public pages without modifying either.
The app-experience revision (OP12-OP16) also changed documentation only: no token file, style
sheet, component, mockup, prototype or design-tool file exists. Token values and wireframes in
the Design section are written proposals.
