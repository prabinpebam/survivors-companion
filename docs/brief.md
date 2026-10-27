# Product brief: a task-first Vampire Survivors companion

> **TL;DR:** Propose a focused companion: recognize items in a visual grid, see the next valid
> evolution step and weapon-passive pairing at a glance, mark your own progress locally, and get
> explainable suggestions for the next unlocks and a single run that attempts several at once.
> A build lab lets you fill the weapon and passive slots, set levels and PowerUps, and see
> explained, capped stats and modeled weapon output, then save and compare builds. It is an app
> for understanding, planning and playing (not a wiki of articles): visual first, few words,
> one strict design system. Everything uses source-backed records and explicit spoiler controls;
> whole-wiki replacement comes later, if ever.
> Working direction only: no product has been built, tested with players, or authorized for release.

## The opportunity

We have a broad archived source pool. We do **not** yet have a clean product dataset, rights
clearance for all assets, or proof that players want another general-purpose wiki.
The opportunity is a better task path through knowledge, not more copied articles.
The wider ambition is still a new presentation over the knowledge base. The proposal below is
the first validation slice, not a decision to abandon broader reference coverage.

Existing reference and planning tools already cover substantial ground. The
[competitor benchmark](research/competitor-benchmark.md) records the official wiki, build
planners, mobile companion, Steam guides and in-game reference. A defensible new experience
must beat or complement these on an observed task, not claim that evolution lookup is new.

## What the player evidence changes

- **Input-first answers:** guide readers explicitly ask for ingredients before the result
  (E19). This is a concrete presentation requirement, not an inference from guide ratings.
- **Freshness and honest coverage:** an evolution-chart comment calls it outdated (E18), and
  a companion reviewer asks for missing weapons/evolutions and an update (E30). Show what was
  reviewed; a recent source download is not proof of current game compatibility.
- **Discovery with an escape hatch:** a player requests tips without spoilers and a reply
  offers the wiki if stuck (E03). The proposed secret classification/default still needs testing.
- **Mobile and no ads are a baseline:** players already praise the official successor wiki
  for these attributes (E14). They do not establish that the current wiki needs replacing.
- **Planning is a real adjacent task:** E01/E02 show build questions, and E35/E36 show players
  asking how stats turn into damage and which weapons a stat affects. The owner added a build
  lab (O16); its numbers are only as good as the reviewed records behind them (A19-A23,
  [build mechanics](research/build-mechanics.md)).
- **DLC and prerequisite emphasis remain partly hypotheses:** pack-based discussion exists
  (E02/E05), but this pass did not verify first-person ownership confusion. Evolution confusion
  (E07/E08) supports clearer conditions, not a complete personalized progression graph.

## What the owner, as a player, added

The owner's first-person input (OP01-OP07 in [spec 2.1](spec.md#21-owner-player-input)) is
recorded as owner intent, separate from public evidence, and adopted into scope by O15:

- **Recognize, don't recall:** a labeled icon grid with several sorts and filters, instead of
  long name lists (OP01). E21/E22 show icon-based guides exist; preference for others is A13.
- **Pairings at a glance:** which passive goes with which weapon, both ways, without reading a
  full page (OP02). E12 independently reports having to memorize these accessories.
- **Detail on demand:** a compact default with grid, list, table and detail views; exhaustive
  data one deliberate step away (OP03).
- **My progress, my browser:** manual marks for secrets, stages, weapons and other unlocks, saved
  locally and moved by simple JSON export/import; no automatic sync (OP04/OP05).
- **What next, and in one run:** suggested next secrets/unlocks from declared progress, and an
  automatic plan of hero, weapons and stage that attempts the most compatible unlocks in a single
  session (OP06/OP07). This depends on modeling free-text unlock conditions (A14).

E IDs resolve in the [evidence ledger](research/user-evidence.md); see the
[spec's traceability table](spec.md#2-evidence-and-positioning) for capability-level support
and remaining assumptions. Historical comments establish reported tasks, not current mechanics.

## Proposed positioning

| For | When | Proposed outcome | Not a promise |
|---|---|---|---|
| A player who knows an item name but not its next step | During a run or planning a choice | Find the next valid evolution and the relevant conditions | Automatic diagnosis of the live game |
| A player returning after new content | Sorting base-game, owned DLC and changed mechanics | See what applies and what remains uncertain | Every platform/patch always current |
| A progression-focused player | An evolution or unlock depends on earlier steps | Follow a bounded, source-linked prerequisite path | A complete personalized save-aware roadmap |
| A discovery-oriented player | Wants help without exposing every secret | Deliberately reveal only what is needed | Perfect knowledge of what they have already discovered |
| A player who remembers icons better than names | Browsing weapons, passives or characters | Spot it in a sortable, filterable grid and see its pairing immediately | A recreation of every wiki table |
| An unlock-chasing player | Planning the next session | Mark progress, see what to attempt next, and get one run that covers several unlocks | Knowledge of the real save, or a guaranteed success |

Segments are task contexts, not fabricated demographic personas. Real supporting comments,
counterexamples and sample limits are in [user research](research/user-research.md) and the
[evidence ledger](research/user-evidence.md).

## Customer promise (proposal)

**"Help me recognize what I'm looking for, find my next valid step and what it pairs with,
remember what I've done, and plan my next run, without spoiling more than I asked for and with
sources I can check."**

Read the [specification](spec.md) for P1-P6, jobs, capabilities and acceptance criteria.
The important tradeoff is compact answers **without** erasing exceptions.
For example, the archived Bracelet chain needs no passive item; the general mechanics have
max-passive requirements, unions and stage-specific chest rules. See
[archive readiness](research/data-readiness.md).

## First product slice

| Include in proposed MVP | Defer until need is validated |
|---|---|
| Known-name/alias lookup over reviewed coverage | Build optimization, "best build" ranking or exact real-run damage claims |
| Evolution steps, required levels and relevant conditions | Whole-wiki article/theme recreation |
| Explicit owned-content scope and protected-secret reveal | Accounts, game-save upload/import, cloud or automatic sync |
| Linked prerequisites for the supported slice | Complete generated progression graph |
| Snapshot, source/revision, attribution and correction route | Music/video library, all media, Crawlers/franchise content |
| Small-screen, keyboard-accessible answers | Offline packs, broad localization and automatic patch compatibility |
| Labeled icon grids with sort/filter and grid/list/table/detail views (owner) | Icons shipped publicly before rights review (text tiles instead) |
| Weapon-passive pairing lookup and pairing view (owner) | |
| Build lab: slots, levels, PowerUps, explained capped stats, modeled output for reviewed weapons, saved builds and compare (owner, O16) | Arcana, Golden Egg and Limit Break modeling; modeled output for weapons not yet reviewed |
| Manual browser-local progress with JSON export/import (owner) | |
| Next-unlock suggestions and single-run session plans on reviewed conditions (owner) | Suggestions from unreviewed or AI-interpreted conditions |

Content coverage must be chosen and audited before coding: a representative source-correct
slice first, then the named base-game/DLC scope that can actually be maintained.
Do not expose the entire raw archive as MVP search.

## Success and uncertainty

Proposed value gate: in a later moderated study, at least 8/10 participants identify the next
valid step and relevant condition within 20 seconds without help. Establish the existing-tool
baseline first; this is a target, not a measured improvement.

The riskiest assumptions are [A1-A5](planning/assumptions.md): switching value, comprehension,
publication rights, recipe projection and prerequisites, plus A14 (whether unlock conditions can
be modeled honestly enough to plan sessions). S1 tests them cheaply before S2 code.

## Business, community and rights boundaries

- Independent fan project, not an official poncle or wiki replacement.
- Prefer open-source application code with separately attributed, appropriately licensed content.
  No blanket MIT relicense of the archive and no monetization model assumed.
- Do not publish art/audio or all archived content simply because it downloaded successfully.
- Preserve and link to community sources; make incorrect facts easier to inspect and correct.
- No accounts, visitor tracking or player-save collection are required to prove the initial task.

## Decision requested after this phase

Review the evidence, accept/change/drop the proposed first task, and authorize S1 research/content
review if worthwhile. Product coding requires a separate explicit authorization after the scope
and rights path are clear. See [handoff](planning/handoff.md).
