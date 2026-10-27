# Competitor benchmark: alternatives to a wiki-derived Vampire Survivors companion

> **TL;DR:** `survivors.wiki` **is** the current official Vampire Survivors wiki today - the
> direct successor to (and migration target of) the earlier Fandom-hosted wiki this project's
> archive traces back to, not a separate third site. Alongside it, a sample of independently
> built tools already cover build planning, evolution lookup, and mobile reference. A new
> product's case rests on combining DLC-aware conditional-recipe correctness, provenance, and
> mobile-first readability in one place, not on any single capability being unavailable elsewhere.

## Status vocabulary used below

- **Verified live** - fetched directly and the claimed content/feature was observed.
- **Documented** - a primary source (the site/app itself, its store listing, or its own about/changelog
  page) states the fact, even if a specific UI flow was not exercised.
- **Unknown/not observed** - not contradicted, simply not checked; never treated as "absent."
- **Unavailable** - fetch failed (dead link, blocked, or removed); noted with the blocker.

All source-register fetches below were made on **2026-10-26**; this access date is stated once
here and not repeated per row. Per-row dates in the table are the source's own stated
publication/update dates where one was visible in the fetched content.

## Public source register

| ID | URL | What was verified | Published/updated (observed) | Inspection depth | Access blockers |
|---|---|---|---|---|---|
| S01 | [vampire.survivors.wiki/w/Vampire_Survivors_Wiki:About](https://vampire.survivors.wiki/w/Vampire_Survivors_Wiki:About) | Official wiki: host, article/file/edit counts, founding and migration dates | Founded 21 Oct 2021 (original); forked/official version 13 Mar 2025, per the page's own infobox | Direct fetch (About + Updates page) | None |
| S02 | [vampire.survivors.wiki/w/Updates/Official_Vampire_Survivors_Wiki_now_live](https://vampire.survivors.wiki/w/Updates/Official_Vampire_Survivors_Wiki_now_live) | Developer-authored announcement of the migration | Posted 13 Mar 2025 | Direct fetch | None |
| S03 | [vampire.survivors.wiki/w/Grim_Grimoire](https://vampire.survivors.wiki/w/Grim_Grimoire) | In-game Grimoire relic: unlock condition, location, patch reference | Describes an in-game patch dated 23 Jun 2022 (Patch 0.7.3); the wiki page's own last-edit date was not shown in the fetched content | Direct fetch | None |
| S04 | [vampire.survivors.wiki/w/Ars_Gouda](https://vampire.survivors.wiki/w/Ars_Gouda) | In-game Bestiary relic: unlock condition, patch reference, DLC-aware max count | Describes an in-game patch dated 7 Jul 2022 (Patch 0.8.0); wiki page's own last-edit date not shown | Direct fetch | None |
| S05 | [vampire.survivors.wiki/w/Bracelet](https://vampire.survivors.wiki/w/Bracelet) | Bracelet weapon: no-passive evolution chain, DLC-gated starting-weapon unlock (Fake Sypha) | References Patch 0.9.0; no calendar date visible in fetched content | Direct fetch | None |
| S06 | [vampire.survivors.wiki/w/SpellStrom](https://vampire.survivors.wiki/w/SpellStrom) | DLC-gated 3-weapon union, level-6 prerequisite, character unlock side effect | References the Tides of the Foscari DLC; no calendar date visible in fetched content | Direct fetch | None |
| S07 | [vampire.survivors.wiki/w/Union](https://vampire.survivors.wiki/w/Union) | General evolution/union/gift/morph mechanics and chest-timing exceptions | No calendar date visible in fetched content | Direct fetch | None |
| S08 | `vampiresurvivors.fandom.com` (legacy wiki, predecessor site) | Existence and founding date, per S01's own history section | Founding date per S01: 21 Oct 2021 | Not directly fetchable; corroborated by primary source S01/S02 and third-party search snippets | Blocked: repeated HTTP 403 (anti-bot), both hyphenated and non-hyphenated hostnames tried |
| S09 | [weirdgloop.org/terms](https://weirdgloop.org/terms/) | Hosting entity (Weird Gloop USA, Inc.), terms, licensing-policy link | Updated 31 Jan 2025 | Direct fetch | None |
| S10 | [vampiresurvivors.tools](http://www.vampiresurvivors.tools/) (jerek's tool, linked from its GitHub repo) | Live client-rendered build tool; JS modules reference DLC, Arcana, Character, Passive, Stage, Weapon, Item, Build | No date visible in fetched content | Direct fetch (raw HTML/JS manifest) | Content is JS-rendered; feature-level UI not exercised |
| S11 | [github.com/jerek/vampire-survivors-tools](https://github.com/jerek/vampire-survivors-tools) | Repo README: purpose, author attribution, credit to ArrowVulcan's build tool as inspiration | No date visible in fetched content | Direct fetch | An alternate URL seen in search (`jerek.github.io/vampire-survivors-tools/`) returned 404; the live tool is at vampiresurvivors.tools |
| S12 | [github.com/ArrowVulcan/Vampire-Survivors](https://github.com/ArrowVulcan/Vampire-Survivors) | Repo README: "fansite with tool(s)", live link, request to keep author credit if forked | No date visible in fetched content | Direct fetch | None |
| S13 | [arrowvulcan.github.io/Vampire-Survivors](https://arrowvulcan.github.io/Vampire-Survivors/) | Live build planner: character/item/arcana selection UI present. 2026-10-26 Edge render: slot picker without per-level stats, PowerUps or computed output; roster looked stale against recent DLC (not counted item by item) | No date visible in fetched content | Direct fetch + Edge render (2026-10-26) | Roster freshness not checked item by item |
| S14 | [dood.gg/en/vampire-survivors](https://dood.gg/en/vampire-survivors/) | Live site: 862-entry database, evolution checker with DLC filter, 233 characters, 17 guides, glossary search | No date visible in fetched content | Direct fetch (home + build-planner tool page) | None |
| S15 | [dood.gg build planner](https://dood.gg/en/vampire-survivors/tools/build-planner/) | States data source as "game-internal WEAPON_DATA.json (Poncle)"; explains slot-limit and union mechanics. 2026-10-26 Edge render: weapon-to-passive feasibility within the slot limits; no player-stat totals or damage output observed | No date visible in fetched content | Direct fetch | None |
| S16 | [dragoonapps.com build planner](https://dragoonapps.com/tool/video-games/vampire-survivors-build-planner) | Live planner; page states its own data freshness. 2026-10-26 Edge render: a stat tracker with "compounding totals" from chosen items; no PowerUps, no per-weapon output and no build compare observed | Page states "Game data updated 2026-07-22" (self-reported, not independently re-verified) | Direct fetch + Edge render (2026-10-26) | Stacking rules and caps behind its totals not checked against the game |
| S17 | [vampidex.fyi](https://vampidex.fyi/) | Live weapon/evolution reference with per-weapon numbers, level-up bonuses, "Best with" stat hints | No date visible in fetched content | Direct fetch | None |
| S18 | [vampidex.fyi/characters](https://vampidex.fyi/characters) | States it can import a save file to show only the account's actual unlocked roster | No date visible in fetched content | Direct fetch | Import flow itself not exercised |
| S19 | [vampidex.fyi/planner](https://vampidex.fyi/planner) | Domain resolves. 2026-10-26 Edge render: weapon and passive slots, a PowerUps grid with a cost explanation, and saved builds; no DPS or per-weapon damage output seen | No date visible in fetched content | Direct fetch + Edge render (2026-10-26) | Whether PowerUps change any shown totals was not exercised |
| S20 | [steamcommunity.com/sharedfiles/filedetails/?id=2763945512](https://steamcommunity.com/sharedfiles/filedetails/?id=2763945512) ("DLC evolution tips" guide) | Live, lists specific weapon+passive -> evolution pairs including recent DLC items | No publish/update date visible in fetched content | Direct fetch | None |
| S21 | [steamcommunity.com/sharedfiles/filedetails/?id=2733816196](https://steamcommunity.com/sharedfiles/filedetails/?id=2733816196) | Not reachable | N/A | Fetch attempted | Unavailable: "There was a problem accessing the item" (item removed/private/renumbered - error does not distinguish which) |
| S22 | [steamcommunity.com/sharedfiles/filedetails/?id=2758379191](https://steamcommunity.com/sharedfiles/filedetails/?id=2758379191) | Not reachable | N/A | Fetch attempted | Unavailable: same error as S21 |
| S23 | [Vampire Survivors Companion - App Store (id1608872206)](https://apps.apple.com/us/app/vampire-survivors-companion/id1608872206) | Live unofficial iOS app listing: $2.99, seller Kevin Renella, explicit non-affiliation disclaimer | Listing shows "Version 2.4.0 Oct 1" (year not shown) and states an update to game patch v1.16 "Legacy of the Bloodmoon" | Direct fetch of store listing | Did not install/run the app; claims below are store-listing text, not hands-on use |
| S24 | [MWM app intelligence page for the same app](https://mwm.ai/apps/vampire-survivors-companion/1608872206) | Third-party aggregator corroborating the app's feature list | States "First Released Feb 8, 2022"; shows app version 2.2.0, older than the live App Store listing's 2.4.0 (aggregator lag, not a contradiction of the live listing) | Direct fetch | None |
| S25 | Google Play search for an Android companion equivalent | No Android-side unofficial companion app found in search results; only the official game listing appeared | N/A | Search only, no matching listing to fetch | Not observed - absence of a search hit is not proof none exists |
| S26 | [destructoid.com Legacy of the Bloodmoon evolutions article](https://www.destructoid.com/all-vampire-survivors-legacy-of-the-bloodmoon-weapon-evolutions-and-combos/) | Live editorial guide; DLC-specific weapon/union tables, explicit "DLC required" caveat | No publish/update date visible in fetched content | Direct fetch | Content reflects one DLC's launch window; no date to confirm currency against later patches |
| S27 | [github.com/lukeod/vampiresurvivors-modding](https://github.com/lukeod/vampiresurvivors-modding) | Modding reference documenting the game's weapon, stat and damage systems and data field names (used as a question source, not as data) | No date checked | Direct fetch (README; two docs read by the research agent) | Reverse-engineered; rights for reuse unknown (spec A23) |
| S28 | [vampire.survivors.wiki/w/Calculators](https://vampire.survivors.wiki/w/Calculators) and [PowerUp Cost](https://vampire.survivors.wiki/w/Calculators/PowerUp_Cost) | Wiki-hosted calculators: bestiary, character filter, XP, Pentagram timing, PowerUp cost, Golden Egg distribution, internal ID lookup. No weapon/build damage calculator listed | No date visible | Direct fetch (2026-10-26) | Calculators need JavaScript; results not exercised |
| S29 | [benediktwerner PowerUp calculator](https://benediktwerner.github.io/vampire-survivors-power-up-calculator/) ([repo](https://github.com/benediktwerner/vampire-survivors-power-up-calculator)) | PowerUp purchase cost totals; states "Since v0.7 the buy order doesn't matter anymore"; public-domain/MIT/CC0 code; versioned data in `data.js` | An earlier render in this session showed a data label of v0.11.107 (old); not re-confirmed by the text fetch | Direct fetch + earlier render | Treat its values as outdated until compared with the current game |
| S30 | [ychalier combo builder](https://ychalier.github.io/vampire-survivors-combo-builder/) ([repo](https://github.com/ychalier/vampire-survivors-combo-builder)) | Generates builds that maximize satisfied combos and evolutions with integer linear programming; README states it ignores DPS and player stats; data from the Fandom wiki | No date checked | Direct fetch of page text and README (interactive generation not exercised) | Fandom-era data; currency unknown |

S27-S30 were added on 2026-10-26 for the build-lab revision and are compared in
[Build lab comparison](#build-lab-comparison); they don't change the alternative counts below.

## Alternatives inspected: direct competitors vs. substitutes vs. baseline

This is a **sample** of alternatives surfaced by search, not a demonstrated ranking of the most
popular, widely used, or market-leading tools; no download/popularity data was collected.

| Alternative | Category | Status | Direct inspection |
|---|---|---|---|
| Vampire Survivors Wiki (`survivors.wiki`), the current official wiki | Direct competitor - canonical community wiki (one lineage) | Verified live | Yes (S01-S04, S05-S07) |
| Legacy Fandom wiki (`vampiresurvivors.fandom.com`), the predecessor site in the same lineage | Same lineage as above, not a second competitor | Documented (via primary-source history), direct fetch blocked | No (blocked; substantiated via S01/S02) |
| jerek's build tool (`vampiresurvivors.tools`) | Direct competitor - build/evolution planner | Verified live | Yes (S10, S11) |
| ArrowVulcan's build planner (GitHub Pages) | Direct competitor - build/evolution planner | Verified live | Yes (S12, S13) |
| dood.gg Vampire Survivors tools/database | Direct competitor - build planner + stat/glossary database | Verified live | Yes (S14, S15) |
| DragoonApps build planner | Direct competitor - build/evolution planner | Verified live | Yes (S16) |
| Survivalist's Vampidex (`vampidex.fyi`) | Direct competitor - evolution reference + build planner + save-aware collection view | Verified live | Yes (S17, S18); planner sub-page client rendering not fully observed (S19) |
| Steam Community guides (evolution cheat sheets) | Substitute - static/image-based reference hosted on the storefront, not a dedicated tool | Mixed: one verified live (S20), two unavailable (S21, S22) | Yes, for the live one |
| "Vampire Survivors Companion" (unofficial iOS app) | Direct competitor - mobile companion/reference app | Verified live | Yes (S23, S24) |
| Editorial guide sites (e.g. destructoid, and similarly-structured outlets referenced in search but not independently fetched) | Substitute - point-in-time articles, not living databases | Verified live for the one fetched (S26); others unknown/not observed | Partial (one fetched) |
| Official in-game Grimoire + Bestiary | Baseline, not a competitor - the game's own built-in reference | Documented (via wiki's description of relic mechanics; not independently played) | Documented only, not independently played |

**Counts, stated consistently:** this table lists **10 distinct alternative entries** - 7 direct
competitors (the wiki lineage counted once), 2 substitutes, and 1 official in-game baseline. **9
of these 10 were directly inspected** via fetch in this session (every entry except the blocked
Fandom predecessor); the baseline is documented via the wiki's own description rather than by
playing the game. This is separate from, and smaller than, the 26-row source register above:
of those 26 citations, 22 were fetched with content, 3 were attempted-but-blocked/unavailable
(S08, S21, S22), and 1 was search-only with no matching listing to fetch (S25). Both the
9-of-10 alternative count and the 4+ minimum requested are satisfied.

## Per-tool comparison: the 7 directly inspected tools

The grouped matrix further below folds multiple planners into one column; this table keeps them
separate so their differences are visible. Cell codes: **V** = verified live (directly observed),
**D** = documented (stated by the source, not independently exercised), **U** = unknown/not
observed in this session's inspection. Parenthetical IDs point back to the source register.

| Capability | Wiki (S01-S09) | jerek (S10-S11) | ArrowVulcan (S12-S13) | dood.gg (S14-S15) | DragoonApps (S16) | Vampidex (S17-S19) | iOS Companion (S23-S24) |
|---|---|---|---|---|---|---|---|
| Target jobs | D: reference browsing + community editing | D: README states a shareable build tool | V: character/item/arcana selection UI observed | V: evolution recipes, database, guides stated on home page | D: page title/stub implies a weapon evolution/synergy planner | V: per-weapon evolution reference observed | D: store listing describes a reference + planner |
| Evolution lookup | V (S05) | U (JS-rendered; not exercised) | U (selection UI seen, outputs not observed) | V (evolution checker + evolved-weapons pages) | U (only a character-pick stub was returned to fetch) | V (weapon -> evolution entries observed, e.g. Bracelet -> Bi-Bracelet) | D (listing claim; not run) |
| Prerequisites/conditional recipes | V (S07, in depth) | U | U | D (S15 explains slot-limit/union logic in prose) | U | D (shows evolution partner per weapon; general exception rules not observed) | U |
| DLC/version scope | V (explicit DLC badges, S06) | D (a `DLC.js` module is loaded; behavior not exercised) | U | V (evolution checker has an explicit DLC filter, S15) | U | U (not stated in fetched pages) | D (listing claims update to patch v1.16) |
| Character+weapon context | D (cross-linked entity pages) | D (`Character.js`/`Weapon.js`/`Passive.js` modules loaded) | V (character list observed directly) | V (233 characters stated, cross-linked) | D (character-seed step observed) | V (characters page observed) | D (listing lists characters/weapons/evolutions/stages) |
| Planning (pre-run build assembly) | U (wiki is reference, not a planner) | V (stated purpose; share-by-URL observed in README) | V (build/share/copy-to-clipboard flow observed) | V (dedicated build-planner tool, S15) | D (tool name/stub implies this; flow not exercised) | D (site self-describes as a "build planner"; `/planner` loads but content not observed, S19) | D (listing claim; not run) |
| Collection tracking | U | U | U | U | U | V (S18: states it can import a save to show actual unlocks) | U |
| Mobile/readability evidence | D (S01 states "fully functional on mobile"; self-reported, not independently tested) | U | U | U | U | U | V (is a native iOS app by definition); in-use readability unknown |
| Spoilers | U | U | U | U | U | U | U |
| Search | D (MediaWiki platform search; not independently re-tested in this session) | U | U | V (dedicated glossary search across 862 entries, S14) | U | U | U |
| Provenance/license/community contributions | V (Weird Gloop terms + open edit history, S09) | D (public repo; attribution request in README, not a confirmed OSI license) | D (public repo; attribution request in README, not a confirmed OSI license) | D (S15 states its data source file explicitly) | U (no license/data-source statement observed) | U (no license/data-source statement observed) | U (no data-source statement in listing; unofficial/unaffiliated disclaimer is present, which is not the same as a license statement) |

## Comparison matrix (grouped categories not covered above)

This covers the alternatives not already broken out in the per-tool table: Steam guides and the
official in-game baseline, alongside the wiki and mobile app for cross-reference. Cells cite
source IDs. "Unknown/not observed" means not contradicted, simply not checked.

| Capability | Wiki (S01-S09) | Steam guides (S20-S22) | Mobile companion app (S23-S24) | Official Grimoire/Bestiary (S03/S04/S07) |
|---|---|---|---|---|
| Target jobs | Browse/read any entity; community editing | Quick cheat-sheet lookup inside Steam overlay | Offline mobile lookup + planner while playing | In-run peek at *discovered* recipes/enemies only |
| Evolution lookup | Yes, per-item pages (S05) | Yes, as a static pair list (S20) | Documented in store listing (S23) | Yes, but only for already-discovered combos (S03) |
| Prerequisites/conditional recipes | Documented in depth: unions, gifts, morphs, chest-timing exceptions (S07) | Not observed beyond pair lists | Not observed beyond store-listing claims | Mechanically identical conditions apply in-game, but the UI only reveals what's been found (S07) |
| DLC/version scope | Explicit DLC badges on pages (S06); migration/version history documented (S01-S02) | S20 covers DLC items; S21/S22 unavailable | Listing claims "update to latest patch v1.16" (S23) | Bestiary header differentiates max count "from the DLCs the player owns" (S04) |
| Character + weapon context | Yes, cross-linked entity pages | Not observed (item-focused only) | Documented: characters, weapons, evolutions, accessories, stages (S23) | Not applicable (relic-gated views, not character browsing) |
| Planning (pre-run build assembly) | Not observed (wiki is reference, not a planner) | Not observed (format observed is a static pair list, not an interactive planner) | Documented planner feature (S23) | Not observed as a pre-run planner (only reviews discovered combos, not yet-undiscovered plans) |
| Collection tracking | Not observed as account-aware | Not observed | Not observed | Yes, by design - Bestiary/Grimoire are the save-aware unlock trackers (S03, S04) |
| Mobile/readability evidence | S01 states "fully functional on mobile" (documented, not tested) | Unknown/not observed (Steam Community guide pages were fetched via standard web request; in-overlay or mobile-browser rendering was not tested) | Is a native iOS app by definition (S23) | Mobile/console platforms exist per S02; in-run UI ergonomics not assessed |
| Spoilers | Not observed as a selectable preference anywhere in this set | Not observed | Not observed | Deliberately spoiler-gated: undiscovered recipes stay hidden until found (S07) |
| Search | MediaWiki full-text search (standard platform feature, not independently re-verified here) | Ctrl+F only, per guide text (not a built-in search feature) | Not observed | Not observed to have a search feature; the wiki's description of these menus (S03, S04, S07) does not mention one |
| Provenance/license/community contributions | Wiki licensing via Weird Gloop terms (S09); open edit history (S01) | Single-author guide; no license statement observed | No data-source or license statement observed in the store listing | N/A - built into the shipped game binary |

## Build lab comparison

Added 2026-10-26 for the build lab ([spec](../spec.md) U15-U20, R23-R30;
[build mechanics](build-mechanics.md)). Codes as above: **V** verified in a render or fetch,
**D** documented by the source, **U** not observed. "No" means looked for and not seen in the
inspected view; it is not proof the feature is absent.

| Capability | ArrowVulcan (S13) | dood.gg (S15) | DragoonApps (S16) | Vampidex (S17/S19) | Wiki calculators (S28) | PowerUp calculator (S29) | Combo builder (S30) |
|---|---|---|---|---|---|---|---|
| Weapon and passive slots | V | V | V | V | No | No | V |
| Per-level weapon/passive values | No | No | U | D (per-weapon level bonuses on S17 pages) | No | No | No |
| PowerUps in the build | No | No | No | V (grid with cost explanation) | V (cost only) | V (cost only) | No |
| Player-stat totals with stacking and caps | No | No | V (compounding totals; caps not observed) | U | No | No | No |
| Per-weapon modeled output (damage, rate) | No | No | No | No | No | No | No (README says it ignores DPS) |
| Explains why a number is what it is | No | D (prose on slot and union rules) | No | D (PowerUp cost text) | D (links to cost section) | Partly (order note) | D (combo/evolution trade-off text) |
| Save and compare builds | D (share/copy) | U | No | V (saved builds; compare not seen) | No | No | D (load/save controls) |
| States data source or version | U | V (names `WEAPON_DATA.json` as source) | V (self-reported date) | U | V (wiki pages) | V (versioned data file) | V (Fandom wiki) |

**Gap (bounded):** no inspected tool was observed combining per-level weapon and passive values,
PowerUps, capped player-stat totals, per-weapon modeled output with its explanation, and
side-by-side compare. That is the opening for spec P7; it is an observation about seven inspected
tools, not proof that no such tool exists.

**What to borrow:** Vampidex's PowerUp grid and saved builds (familiar layout); DragoonApps'
running totals; dood.gg's slot-feasibility warnings; S29's versioned data file pattern; S30's
honesty that "optimal" means only what it measures.

**What to avoid:** unlabeled single damage numbers, totals with no stacking rule or cap shown,
silent stale data (S13, S29), and "optimal" claims (spec non-goals).

## Task walkthroughs (documented, not a hands-on user test)

### 1. Bracelet evolution chain

Per S05 and S07: Bracelet is a base-game weapon (added Patch 0.9.0) with a **passive-free**
evolution path - Bracelet -> Bi-Bracelet -> Tri-Bracelet - explicitly called out on the Union
page (S07) as one of a small set of exceptions to the "needs a passive item" rule. A wiki reader
would open the Bracelet page, see the evolution link to Bi-Bracelet, and the page's prose ("both
of which do not require any passive item") answers the question directly. A build planner that
assumes every evolution needs a passive slot would mis-model this chain unless it special-cases it,
which is exactly the kind of conditional logic S07 documents and the per-tool/comparison tables
above track as "prerequisites/conditional recipes."

### 2. DLC-gated lookup

Per S06: SpellStrom is a **union of three weapons** (SpellString, SpellStream, SpellStrike), each
needing level 6, and it is gated behind the Tides of the Foscari DLC (shown via an explicit DLC
badge on the page). A reader without that DLC would not have these weapons available at all; a
reader with it needs all three at the stated level before a chest can trigger the union, and
uniting it has a side effect (unlocking a new playable character, Maruto Cuts) beyond the weapon
itself. Dood.gg's build-planner page (S15) is the only third-party tool in this set observed to
document an explicit DLC filter for this kind of scoping; most other tools inspected here were
not observed to state how they handle DLC-gated content at all (see the per-tool table's
"DLC/version scope" row).

### 3. Conditional evolution (general case)

Per S07 (Union page): the "needs a maxed passive" rule has multiple documented exceptions beyond
Bracelet - Infinite Corridor, Crimson Shroud, Sole Solution, Ashes of Muspell, and "most weapons
after Version 1.0 and from the DLCs" require **all** related passives maxed (not just one), while
unions require **all** base weapons maxed. Chest timing is also conditional: most stages require
a post-10:00 boss chest, but Mad Forest's first chest (from the 1:00-wave Glowing Bat) can evolve
a weapon early. S07 also lists several further stages whose chests can evolve a weapon regardless
of time - Dairy Plant, Il Molise, Cappella Magna, Boss Rash, and Laborratory are base-game stages
with this exception (not DLC-gated), while Abyss Foscari carries the Tides of the Foscari DLC
badge and Hectic Highway carries the Operation Guns DLC badge on the source page. This is a
genuinely branchy rule set spanning both base-game and DLC content; a tool's correctness depends
on encoding every documented exception, not just the common case.

### 4. Why someone would use a wiki instead of a planner

The wiki (S01-S07) carries prose context a planner typically does not surface: patch/version
history per entity (S03's "Patch 0.7.3" note), narrative/flavor and cross-links to related
mechanics pages, and exception-level documentation of general rules (S07's exception list above).
Build planners (S10-S19) are optimized for a different job - picking a concrete set of items and
getting a result plus required slots back quickly - and none of the ones inspected here were
observed to explain *why* an exception exists or to carry update/patch history per entity (see
the per-tool table's "prerequisites/conditional recipes" and "provenance" rows, mostly U/D). A
player debugging "why didn't my evolution trigger" or wanting the general rule rather than one
instance is plausibly better served by the wiki's exception-documenting prose; a player who
already knows the rules and just wants to check slot math is plausibly better served by a
planner. Neither of these preferences was tested with real users in this session.

## Opportunities (hypotheses, not claims)

- **H1 - Conditional-recipe correctness as the wedge.** S07's own exception list (no-passive
  chains, all-passives-maxed unions, non-standard chest timing) suggests many third-party tools
  may encode only the common 1-weapon+1-passive case. Evidence for this is limited to what was
  directly observed in two tools (S07 wiki prose vs. S15 dood.gg's filter-and-slot explanation);
  it is not evidence that every other planner gets this wrong - most planners' handling of these
  exceptions is simply unknown/not observed here. Validating this requires directly testing
  specific exception cases against each tool's output, which was out of scope here (no fabricated
  UI testing was performed).
- **H2 - DLC-scope filtering is inconsistently surfaced.** Only S15 (dood.gg) and S04/S06 (wiki)
  explicitly discuss DLC-aware scoping in what was fetched; this is weak evidence of a possible
  gap, not proof, since most other tools' DLC handling is simply "not observed" here rather than
  confirmed absent.
- **H3 - Provenance/attribution is uneven.** Wiki content (S09) and dood.gg (S15) state
  licensing/data-source information; two planner repos (S11, S12) are publicly viewable source
  with an attribution request in their README but no confirmed OSI-approved license was observed;
  the commercial mobile app (S23) and the Steam guide (S20) do not surface a data-source statement
  in what was inspected. A product that states its source snapshot date and license per fact (as
  the sibling [data-readiness](data-readiness.md) assessment requires) would differentiate on
  this axis specifically.
- **Not worth cloning:** the raw build-planner UX itself (weapon/passive multi-select with a
  share link) is already implemented by multiple live tools inspected here (S10-S19); re-building
  the same mechanic without a differentiated data or provenance story would duplicate existing,
  working products rather than fill an observed gap.

## Gaps and uncertainties

- The legacy Fandom wiki (S08) could not be fetched directly in this session (consistent HTTP 403
  across hostnames tried); its existence and migration timeline rest on the official wiki's own
  historical account (S01, S02), which is a primary but self-reported source.
- Two Steam Community guide IDs surfaced by search (S21, S22) returned an access error; this is
  recorded as unavailable, not as evidence the guides never existed - Steam's error page does not
  distinguish "removed," "private," or "wrong ID."
- No Android equivalent of the iOS "Vampire Survivors Companion" app was found in search (S25);
  absence of a search hit is treated as not observed, not as confirmed nonexistence.
- Several planner tools (S16, S19) only returned a minimal/loading shell to the fetch tool because
  their functional UI is client-rendered; their existence and stated purpose are confirmed, but
  specific in-app behavior (e.g., exact evolution results for a given pick) was not exercised.
- No popularity, download-count, rating-count, update-frequency, or performance comparisons are
  claimed anywhere above; where a tool states its own "last updated" date (S16: 2026-07-22) that
  date is reported as self-stated, not independently verified against current game content.
- Both "jerek" (S10-S11) and "ArrowVulcan" (S12-S13) repos are publicly viewable with an
  attribution request; neither was confirmed to carry an OSI-approved open-source license, so
  they are described here as source-available with attribution requests, not as "open-source"
  in the formal licensing sense.
- This document does not duplicate the separately owned player-research stream (forum/review
  evidence); any user-sentiment claims belong to that other report, not here.
