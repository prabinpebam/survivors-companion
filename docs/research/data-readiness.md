# Archive readiness and publication constraints

> **TL;DR:** The archive is useful evidence and a source pool, not a normalized game API.
> Recipe rules, variants, DLC aliases, provenance, and rights need explicit handling before a
> public product. Do not publish the 2.74 GB archive wholesale.

## Evidence inspected

This is a read-only assessment on 2026-10-26, not a new scrape or exhaustive semantic audit.
Local authorities below are workspace-root-relative paths. Open them in VS Code; the Slate
host intentionally serves only `docs/`, not the full archive. Public source pages are linked
in the competitor register and the license references below.

| ID | Authority | Observed |
|---|---|---|
| DS01 | `resources/README.md`; `resources/inventory/verification_report.json` | Existing archive reports all 24 archival checks passing; does not certify a new product |
| DS02 | `resources/inventory/pages.jsonl`; `resources/inventory/html_index.jsonl` | 19,376 page records, 7,103 redirects, 3,444 rendered body records |
| DS03 | `resources/inventory/media.jsonl` | 7,428 current files, totaling 2,247,107,897 reported original bytes; 1,158 audio, 15 video, 4 UNKNOWN media-type records |
| DS04 | `resources/inventory/bucket_tables.json` | 38 schemas and 7,857 rows; zero-row dependency_list is not a working progression graph |
| DS05 | `resources/data/bucket/schemas/infobox_weapon.json`; `resources/data/bucket/rows/infobox_weapon.jsonl` | Identity, display, DLC and type fields, but no complete evolution/level/stats contract |
| DS06 | `resources/data/bucket/schemas/passive_evolutions.json`; `resources/data/bucket/rows/passive_evolutions.jsonl` | 128 passive-centered rows; not every recipe needs a passive, so not an exhaustive recipe index |
| DS07 | `resources/pages/Main/Bracelet.wikitext`; `resources/pages/Main/Evolution.wikitext` | Multi-step, passive-free evolutions and nonuniform chest/passive requirements exist |
| DS08 | `resources/data/bucket/schemas/infobox_character.json`; `resources/data/bucket/schemas/infobox_stage.json`; `resources/data/bucket/rows/update.jsonl` | Variants, nested stats strings, game scopes, and stage conditions need preservation |
| DS09 | `resources/inventory/snapshot.json` | Collection began 2026-10-25T18:12:34Z; later incremental refresh occurred. This is a collection interval, not a transactionally consistent instant |
| DS10 | `resources/LICENSE-NOTICE.md`; `resources/inventory/known_unavailable.json` | Wiki text is CC BY-NC-SA 3.0; two superseded media versions return 404; game asset rights are separate |
| DS11 | `resources/inventory/media.jsonl`; `resources/data/bucket/rows/infobox_weapon.jsonl` | 1,859 `Sprite-*` media files. A name heuristic matches `Sprite-<name>.png` for 374 of 383 weapon rows; only 63 weapon rows carry an `image` field and none an `icon`. Grid icons are feasible to map, but need reviewed ID-to-file mapping and rights clearance (DS10) |
| DS12 | `resources/pages/Main/Achievements.wikitext`; `resources/pages/Main/Secrets.wikitext`; `resources/data/bucket/rows/infobox_character.jsonl` | About 465 achievement rows in version-grouped wikitext tables (page states 489 with all DLC as of 1.16) with free-text conditions and a reward column; 81 secret-table rows (base game and DLC); 227 default character rows, 84 flagged secret, every row with free-text `unlocked_by`. No structured condition fields |

| DS13 | `resources/pages/Main/*.wikitext` (381 pages with `Infobox Weapon`) | Weapon stats live in wikitext, not the bucket: damage 364, cooldown 355, pool 346, interval 341, amount 304, area 278, duration 246, speed 244, max-level 243, crit 115-144, hitbox delay only 134 (blank on 247). Levels tables on about 205 pages in two layouts (134 multi-line, 71 inline); about 97 have only a Limit Break table; 78 have no Levels section. Steps are prose and sometimes rounded (Santa Water). See [build mechanics](build-mechanics.md#weapons) |
| DS14 | `resources/data/bucket/rows/infobox_powerup.jsonl`; `resources/pages/Main/PowerUps.wikitext`; `resources/pages/Module/DefaultStats.lua`; passive pages with `Infobox Passive item` (43); `resources/data/bucket/rows/infobox_character.jsonl`; stat pages (Might, Area, …) | 28 PowerUp rows with bonus, ranks, maximum, stacking and price, plus the price formula; passive per-level and maximum on 32 of 43 pages, stacking on 26, some non-uniform (Torrona's Box); 387 character rows with starting stats as JSON but level bonuses as free text; stat pages give base, stacking and caps. `Player_stats` is flagged outdated |
| DS15 | `resources/data/bucket/rows/stats_combos.jsonl` (355 rows); `resources/pages/Main/Combos/stats*` | Per weapon, which stats and passives affect it (flags; absent = not affected). Conditional notes exist only in the wikitext. Infobox `effects` text adds exceptions (Whip ignores Speed and Duration; Laurel and Gorgeous Moon ignore all but Cooldown) |

DS11/DS12 were added on 2026-10-26 for the owner-player revision; DS13-DS15 for the build-lab
revision. Counts come from bounded
read-only pattern matching and are approximate: they size the work and do not audit it.

These file paths are authorities, not promises that all records are current with the live game.
The old archival check compared counts and hashes; it did not resolve every factual ambiguity,
verify rights per asset, or prove that every historical edit on deleted pages was retrievable.

## Proposed source-to-product boundary

| Source pool | Future reviewed projection | User-facing capability |
|---|---|---|
| Article bodies + template/module sources | Curated recipe conditions with citations | Correct evolution answers, including exceptions |
| Bucket identity/variant fields | Stable entity and variant IDs | Search, aliases, linked context |
| DLC labels and game namespaces | Explicit content-pack/game scope map | Base game / owned-content filtering |
| Cross-reference + revision metadata | Attribution and change lineage | Source, freshness, and correction route |
| Media inventory + file descriptions | Rights-reviewed allowlist of small images | Recognizable icons without bundling music/video |
| Achievements/Secrets tables + character `unlocked_by` | Reviewed unlock-condition records (spec R21) | Progress checklist, next-unlock suggestions, session plans |
| Weapon/passive Bucket rows + sprite files | Reviewed entity-to-icon mapping and pairing projection | Visual grid and pairing views |

This table is a conceptual contract only. No importer or transformed dataset was created.

## Important normalization decisions

1. **Variant identity:** `page_name` alone is not a primary key. Preserve `page_name_sub`,
   `version_anchor`, `default_anchor`, `is_default`, page ID and revision. Stable product IDs must
   survive title changes and not conflate variants.
2. **DLC aliases:** samples use both `lm` and full names such as `Tides of the Foscari`.
   Mapping must be explicit, reviewable, and distinguish base game, unknown, and unclassified.
3. **Scope:** the archive includes Vampire Crawlers, franchise media, user pages and talk pages.
   MVP scope is Vampire Survivors game knowledge, not a raw all-namespace search corpus.
4. **Missing is not false:** absent Boolean or list properties are unknown until schema and
   page evidence resolve them. Do not infer no DLC, no prerequisite, or no spoiler.
5. **Relationships:** passive-centered rows cannot capture Bracelet's zero-passive chain alone.
   Recipe inputs must allow zero, one, or many passives and weapons, with required levels.
6. **Mechanics:** not every weapon has eight levels; not every chest evolves after ten minutes;
   not every passive only needs one level; unions, gifts and morphs have different slot effects.
7. **Structured strings:** `stats_json` requires validation before interpretation; raw
   wikitext/HTML is untrusted input, not trusted UI markup.
8. **Freshness:** source edited-at time is not a verified game-version compatibility label.
   Product must say "source snapshot" unless a compatibility audit supports a stronger statement.
9. **Attribution:** keep source URL, page/revision IDs, contributors/history reference,
   license, retrieval date, and transformation note with every published fact.
10. **Media:** original files and thumb URLs are different paths. Use inventory mappings and
    bounded image derivatives later; never assume an archived URL is a publishable local asset.

## Future domain model (logical, not a storage choice)

| Record | Minimum contract | Failure response |
|---|---|---|
| Entity | Stable ID, game, type, names/aliases, variants, content packs, spoiler classification | Quarantine unknown identity/scope |
| Recipe | Kind, inputs and levels, output(s), chest/context conditions, slot effects, source refs | Mark unverified; never fabricate a recipe |
| Prerequisite | Subject, condition, dependencies, cycle handling, optional alternatives | Show missing/cyclic dependency explicitly |
| Source reference | Page/revision, URL, retrieval interval, license, change note | Do not ship unattributed derived content |
| Asset | Local original, source file, hash, media type, rights status, intended use | Text fallback when rights are not cleared |
| User preference | Owned DLC selection and spoiler preference; no game-save claims | Usable defaults and clear reset |
| Weapon model record | Weapon ID, version target, base stats, structured level steps, stat applicability with notes, cycle rule, interval, pool, hitbox delay, crit, special-behavior note, sources, reviewer, status (modeled / partial / stats-only / not modeled), golden/in-game check results | Show identity and "Not modeled yet"; never guess a missing value |
| Stat rule and PowerUp | Stat, base, stacking kind, cap or floor and its scope, display convention (total vs bonus); PowerUp ranks, bonus, stacking, price inputs | Block the dependent numbers until the rule is verified |
| Saved build (browser only) | Build ID, name, character and level, slots with item IDs and levels, PowerUps or profile reference, mechanics version, saved time | Keep and flag unknown IDs; recalculate, never store results as truth |
| Unlock condition | Unlock ID, reward(s), constraints (hero, stage, mode, items, slots), target and threshold, single-run or cumulative, prerequisites, spoiler class, sources, review status | Excluded from suggestions/plans and listed as "Read the condition" |
| User progress (browser only) | Stable entity ID, state (done / skip; absent = not marked), marked time, linked-from note, schema version | Retain unknown IDs for review; never delete silently; never claim game state |

Dependencies are a graph with alternatives, not necessarily a tree. Conditional or circular
routes must be surfaced for review rather than resolved by arbitrary ordering.

## Unlock-condition modeling (sizing, not an audit)

A rough keyword pass over the about 465 achievement descriptions (overlapping categories) found:
"with" a named character in about 127, "in" a named stage in about 53, evolve/union in about 115,
defeat/kill in about 64, find/pick up/collect in about 102, survive N minutes in about 62,
reach a level in about 34 and running totals in about 22. Implications for the planner:

- Many conditions are single-run combinations of hero, stage and a target; these are good
  candidates for structured constraints and compatibility checks.
- About 22 are cumulative across runs and must not be counted as one-run attempts.
- Secret conditions are often event sequences ("follow the trail after pillaging..."). Model them
  as stage plus a reviewed step list, or leave them as "Read the condition".
- Unlocking stages, characters and weapons gates other unlocks, so declared progress decides
  eligibility. Model the gating edges explicitly; `dependency_list` is empty (DS04).
- Reward columns link an unlock to an item, which enables the offered linked mark (spec R16).
- Free text needs human review; a parser may draft records, but only reviewed records drive
  suggestions. The coverage note reports how many in scope are modeled.

## Golden cases for a later data audit

| Case | What it falsifies | Source basis |
|---|---|---|
| Whip -> Bloody Tear | "Every passive must be max level" | Evolution base-game table (DS07) |
| Bracelet -> Bi-Bracelet -> Tri-Bracelet | "Every evolution requires a passive" and one-hop-only models | Bracelet / Evolution (DS07) |
| Infinite Corridor / Crimson Shroud | "Any passive level is enough" | Evolution mechanics (DS07) |
| Vandalier | One-weapon-only recipe assumptions | Union mechanics (DS07); verify exact input levels per entity before shipping |
| Gyorunton / early-chest stages | Universal ten-minute chest rule | Evolution mechanics (DS07) |
| DLC variant / adventure stage | Page title uniquely identifies a recipe/context | DS05, DS08 |
| Morph and gift | "An evolution always replaces one weapon in one slot" | Evolution mechanics (DS07) |
| A passive that pairs with several weapons | "One passive maps to one weapon" in the pairing view | `passive_evolutions` rows (DS06); verify against source pages |
| "Reach Level 20 in Mad Forest" and "Reach Level 40 in Inlaid Library" | Prerequisite gating: the second needs a stage unlocked by the first | Achievements table (DS12) |
| A cumulative "defeat a total of" unlock | Cumulative goals counted as one-run attempts | Achievements table (DS12) |
| A character-bound unlock plus a stage-bound unlock | Compatibility: same run only if hero and stage constraints agree | Achievements table (DS12) |
| A secret character with an event-sequence hint | Free-text secrets treated as modeled conditions | Secrets table (DS12) |

Build-lab golden cases GC01-GC15 (stacking, caps, ignored stats, cycle rule, rounding, PowerUp
price, negative totals) are in [build mechanics](build-mechanics.md#golden-cases-hand-computed-to-be-verified-in-game).

These are proposed test fixtures with source paths, not executed importer tests.

## Rights and sustainable open-source scope

Read directly on 2026-10-26:
[Creative Commons license deed](https://creativecommons.org/licenses/by-nc-sa/3.0/) and
[Open Source Definition](https://opensource.org/osd).

- The wiki license permits sharing/adaptation subject to attribution, noncommercial, share-alike,
  and change-notice obligations. It does **not** automatically grant every asset's rights.
- An NC content restriction is not equivalent to an OSI-compliant software license. A future
  open-source application can have separately licensed content; do not describe the whole
  archive as MIT or unrestricted open data.
- Recommend separate code, documentation, imported content, and asset license inventories.
  Choosing the project's code license remains an owner decision; none was imposed here.
- Ship only a reviewed, minimal content slice under appropriate terms. Exclude audio/video,
  archive user/talk pages, and legacy theme bundles from the proposed product.
- Public distribution requires an attribution plan, rights allowlist, trademark/non-affiliation
  wording, and a hosting/monetization compatibility decision. Until reviewed, keep it local.
- This is a release constraint and planning recommendation, not legal advice or permission.
- Tooling has its own boundary too: the pinned Slate package includes vendor notices but no
  top-level LICENSE file was found. Confirm its own redistribution terms before publishing
  the reader/runtime; do not infer them from bundled third-party licenses.

## Readiness verdict

| Ready now | Not proven |
|---|---|
| Source-grounded specification and manual fixture selection | Complete normalized recipe/condition graph |
| Exploring identity, variants, categories and provenance | Patch/platform parity and current-game correctness |
| Comparing information architecture options | Public asset redistribution rights |
| Planning a bounded MVP | Legal/maintenance feasibility of full-wiki replacement |
| Sizing the unlock/secret condition audit and mapping weapon icons (DS11/DS12) | That enough unlock conditions can be modeled to make session plans useful |
| Stating player-stat, stacking, cap and PowerUp rules from the archive (DS14) | That those rules match the current game (A19) |
| Sizing the weapon-record audit (DS13/DS15) | That enough weapons have complete timing and level data for modeled output (A20) |

Next gate: manually audit a small, representative recipe set, a representative unlock-condition
sample, a 30-weapon record sample with in-game golden checks and the proposed rights/attribution
model before authorizing a data importer. Do not repeat
the full archive scrape just to write a spec.
