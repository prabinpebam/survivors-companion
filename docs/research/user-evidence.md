# User evidence ledger — Vampire Survivors companion/knowledge research

> **TL;DR (corrected 2026-10-26):** **30 distinct pages** were directly inspected across **5
> platform types**. Of those, **20 pages are primary user-feedback pages** (real end-user
> questions/comments/reviews, directly fetched or — for Reddit — a reproducible Wayback Machine
> snapshot of the original page) spanning **4 platform types with primary coverage**: Reddit,
> Steam Community, Apple App Store, and the official Vampire Survivors wiki
> (`vampire.survivors.wiki`). This **20-page, 4-platform figure is the conservative D0-02 count**
> (excludes guide-body/listing/metadata-only pages and aggregator mirrors). A further 8 pages are
> directly-inspected guide/listing/metadata **context** pages (not primary sentiment), and 2 pages
> are **aggregator mirrors** (WorldsApps, AppBrain) — mirrors are never counted as "original"
> sources here; Google Play's own review UI was inaccessible and is represented only via a mirror,
> so Google Play is **not** one of the 4 primary-coverage platforms. **34 coded evidence units
> (E01-E34)** are drawn from these pages. Two supplementary units (E35-E36) were added later for the
> build lab and are counted separately. This remains a **purposive sample, not a prevalence
> study**. All fetches/re-verifications were performed and accessed on **2026-10-26**.

## Correction note (this revision)

This revision fixes defects found in a reconciliation pass: (1) the prior coverage table summed
to 25 against a claimed 26, and its "Discussions" row said 5 while listing 6 IDs - both are now
corrected by rebuilding the count from unique URLs, split into primary/context/mirror tiers;
(2) E12/E13 and the supplementary Steam review now carry their actual permalinks, and E01-E06 now
cite exact, independently re-fetched Wayback snapshot URLs (re-verified 2026-10-26, see section A);
(3) the archive-lineage claim is corrected - this project's source archive is a snapshot of
`vampire.survivors.wiki`, the current official wiki (Weird Gloop-hosted, forked from Fandom in
March 2025), per `resources/README.md`, not a Fandom-era archive, so E34 is evidence about this
project's own source site, not a different one; (4) the former "nine units/three platforms"
staleness claim is withdrawn and replaced with sound, transparent sub-counts that no longer
include E13 (a game-design request, not a staleness complaint) or double-count the E31 mirror as
an independent platform; (5) E22, E28, E32 and E27 are relabeled to stop overclaiming preference,
demand, remedy-validity or onboarding prevalence from supply-side or single-review signals;
(6) "no Android app exists" is downgraded to an honest "not found in this bounded search," not a
proven absence; (7) bare file-name references are now proper Markdown links.

## Status / tier vocabulary

- **Tier A - Primary user-feedback (directly inspected):** a live page was fetched (or, for
  Reddit, a Wayback Machine snapshot of the original page was fetched) and real end-user
  question/comment/review text was read. This is the conservative tier counted toward the D0-02
  floor.
- **Tier B - Guide/listing/context (directly inspected, not primary sentiment):** a live page was
  fetched and read, but the content is author/guide-body text with no verified reader comments, or
  is store/wiki metadata (price, rating aggregate, article counts) rather than individual user
  statements. Directly inspected, but excluded from the D0-02 primary-page count.
- **Tier C - Aggregator mirror:** the primary platform's own UI could not be fetched directly
  (Google Play's JS-rendered review list; a later page of Apple App Store reviews); a third-party
  site that mirrors that platform's content was fetched instead. **Never described as an
  "original" source** and never counted as an additional independent platform beyond the one it
  mirrors.
- **Discovery-only (snippet):** only a search-engine/AI summary was seen; the page could not be
  opened or had no archived snapshot. **Excluded from every count.**
- **Blocked/empty:** a fetch was attempted and returned 403, a JS-only shell, or an empty/dead
  page. **Excluded from every count.**

No usernames are discussed in any paraphrase. Two Steam review URLs necessarily embed a public
Steam vanity ID because that is how Steam constructs review permalinks; they are included only so
the source can be independently re-opened, and the person is referred to as "a reviewer"/"a
commenter" throughout the prose. No quote below exceeds ~10 words.

## Coverage summary (reconciled by unique URL, 2026-10-26)

| Platform type | Tier A (primary) | Tier B (context) | Tier C (mirror) | Pages, this platform | Evidence units |
|---|---|---|---|---|---|
| Reddit (via Wayback Machine; live reddit.com 403-blocked) | 6 | 0 | 0 | 6 | E01-E06 |
| Steam Community - Discussions | 6 | 0 | 0 | 6 | E07-E11, E24 |
| Steam Community - User reviews | 3 | 0 | 0 | 3 | E12, E13, + 1 supplementary |
| Steam Community - Event comments | 1 | 0 | 0 | 1 | E14-E17 |
| Steam Community - Guides (1 w/ verified reader comments; 4 guide-body-only) | 1 | 4 | 0 | 5 | E18-E23 |
| Apple App Store - official game + companion reviews | 2 | 0 | 0 | 2 | E25-E27, E29-E30 |
| Apple App Store - listings (metadata only) | 0 | 2 | 0 | 2 | E28 (supply context only) |
| Google Play - official listing (reviews blocked, description only) | 0 | 1 | 0 | 1 | none (blocker) |
| App Store aggregator (WorldsApps, mirrors Apple reviews) | 0 | 0 | 1 | 1 | E31 |
| Google Play aggregator (AppBrain, mirrors Google Play reviews) | 0 | 0 | 1 | 1 | E32-E33 |
| Official wiki (`vampire.survivors.wiki`) - contributor talk page | 1 | 0 | 0 | 1 | E34 |
| Official wiki - About page (metadata) | 0 | 1 | 0 | 1 | context only |
| **Total** | **20** | **8** | **2** | **30** | **34 (E01-E34)** |

**Conservative D0-02 count: 20 primary pages across 4 primary-coverage platform types**
(Reddit, Steam Community, Apple App Store, official wiki) - clears the >=12-page/>=2-platform
floor. Google Play contributes only a blocked listing (Tier B) and a mirror (Tier C); it is
**not** counted as a fifth primary-coverage platform. Counting Tier B and Tier C in, 30 pages
were directly inspected in total across 5 platform types contacted.

Theme codes used below: `ONBOARD` new-player onboarding - `EVOLUTION` evolution/synergy lookup -
`SPOILER` spoiler-avoidance vs. discovery - `DLC` DLC ownership/content attribution -
`STALE` update trust / content staleness (reader-sourced unless marked author-sourced) -
`ADS_MOBILE` ad-load & mobile usability - `VISUAL` iconographic presentation (supply/popularity
signal unless marked preference) - `NOTATION` ordering/notation convention preference -
`PLANNER` pre-run build planning (deferred/exploratory, see spec's "Deferred planner") -
`COMPLETE` completeness expectations (esp. paid tools) - `MULTITASK` mobile app-switching cost
(hypothesis, not a confirmed remedy) - `COMMUNITY` contributor/Discord dynamics.

---

## A. Reddit - r/VampireSurvivors (Tier A; verified via Wayback Machine; live reddit.com returned 403 on every direct-fetch attempt)

Each snapshot URL below was independently re-fetched and its content re-confirmed against the
paraphrase on **2026-10-26** as part of this correction pass (not merely cited from memory).

| ID | Exact reproducible source (accessed/re-verified 2026-10-26) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|
| E01 | ["Best Build? What changes should I make to what I already run?"](http://web.archive.org/web/20230730213252/https://www.reddit.com/r/VampireSurvivors/comments/15dx1mu/best_build_what_changes_should_i_make_to_what_i/) - Wayback snapshot `20230730213252` | Direct user question (game) | OP describes an end-game loadout (~1,400 "eggs") and asks which weapons to swap and what to fill empty passive slots with. | Curated, synergy-aware build guidance/validation, not solo trial-and-error. | PLANNER, EVOLUTION | Comments not retrievable at this snapshot; OP post body only. |
| E02 | ["Best build per version"](http://web.archive.org/web/20250802111036/https://www.reddit.com/r/VampireSurvivors/comments/1i8fvgd/best_build_per_version/) - Wayback snapshot `20250802111036` | Direct question + crowd answers (game) | OP asks the strongest build per game version/DLC; commenters list era-specific combos (base game, Legacy, Guns, Castlevania DLCs). | A maintained, version/DLC-aware "best build" reference instead of scattered opinions. | DLC, PLANNER, STALE | Informal opinions, not authoritative; no wiki/tool named. |
| E03 | ["Tips wanted not spoilers"](http://web.archive.org/web/20250207032407/https://www.reddit.com/r/VampireSurvivors/comments/1ibk3w6/tips_wanted_not_spoilers/) - Wayback snapshot `20250207032407` | Direct question + commenter response bridging to wiki | Self-described newer player asks about map/minimap/secrets mechanics while explicitly avoiding spoilers; a reply gives riddle-style hints and says "use the wiki if you get stumped." | Progressive disclosure: hints first, full wiki answer only on demand. | SPOILER | Re-verified in full this pass; only part of the comment tree renders at this snapshot. |
| E04 | ["How do I unlock weapon slots?"](http://web.archive.org/web/20250401144736/https://www.reddit.com/r/VampireSurvivors/comments/1b7p5ee/how_do_i_unlock_weapon_slots/) - Wayback snapshot `20250401144736`, marked "Archived post" by Reddit | Direct troubleshooting question (game) | OP finds all weapon slots locked with no visible unlock option; commenters trace the cause to a previously-used mod. | A clear expected-vs-actual unlock-state reference to self-diagnose game state. | ONBOARD | Root cause was a third-party mod, not an official mechanic - tangential. |
| E05 | ["DLC tier list IMO."](http://web.archive.org/web/20250321150003/https://www.reddit.com/r/VampireSurvivors/comments/1h9xa0i/dlc_tier_list_imo/) - Wayback snapshot `20250321150003` | Author review/ranking (game) | OP, having played all DLC, ranks all 5 packs with reasons (map size, character/weapon variety, story integration). | Structured, comparative "what does each DLC add / is it worth it" reference. | DLC | Opinion ranking; no wiki/tool mentioned in retrieved text. |
| E06 | ["Any tips for starting out?"](http://web.archive.org/web/20230716184218/https://www.reddit.com/r/VampireSurvivors/comments/151dx16/any_tips_for_starting_out/) - Wayback snapshot `20230716184218` | Direct user question (onboarding) | OP, just past stage two, says they don't know which power-ups to prioritize and keeps dying before reaching evolution thresholds. | Accessible, non-overwhelming "getting started" reference with evolution-requirement visibility. | ONBOARD | Short post; verbatim-matched on re-fetch; no comments retrieved. |

## B. Steam Community - Discussions (Tier A; app 1794680; 6 pages, not 5)

| ID | Source (accessed 2026-10-26) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|
| E07 | [Discussion 3418811628258888960](https://steamcommunity.com/app/1794680/discussions/0/3418811628258888960/) - "what do i need to unlock to see items for evolutions", 8 Jul 2022 | Direct question + reply recommending wiki use | A reply explains the in-game Grimoire only reveals already-discovered evolutions and tells the OP to "keep working your way down the achievement list and using the wiki." | External, authoritative reference for undiscovered evolution recipes (spoiler-optional lookup). | EVOLUTION, SPOILER | Very short thread (2 replies); no detail on which wiki. |
| E08 | [Discussion 3367027031775804645](https://steamcommunity.com/app/1794680/discussions/0/3367027031775804645/) - "How to open question marks in Grimoire to unlock evolved weapons?", 21-22 Sep 2022 | Direct question, clarified by commenters | Commenters explain the max-level-weapon + correct-passive + post-10-minute-chest evolution rule and correct a misconception that the Grimoire itself unlocks evolutions. | A clear, repeatable rule-explainer for the evolution-timing mechanic. | EVOLUTION, ONBOARD | Pure game-mechanics thread; no wiki/tool named. |
| E09 | [Discussion 4631482745020804957](https://steamcommunity.com/app/1794680/discussions/0/4631482745020804957/) - "[Spoilers] The final secret character is pure chaos.", date not shown | Self-tagged spoiler discussion | OP self-tags the thread "[Spoilers]" before discussing a secret character and asking for build ideas. | Evidence of a community self-tagging norm around secret content; supports opt-in spoiler-gating UI. | SPOILER | No replies rendered; no date visible. |
| E10 | [Discussion 3549427890062886722](https://steamcommunity.com/app/1794680/discussions/0/3549427890062886722/) - "How to kill Death?", date not shown | Advanced-strategy Q&A, reply headed "SPOILERS" | A commenter's reply, headed "SPOILERS," gives a multi-step superboss strategy (arcana timing, item combo, ~50 upgrade levels). | Structured, spoiler-gated advanced-strategy reference for superbosses. | SPOILER, PLANNER | Only one quoted reply visible; full thread/date not shown. |
| E11 | [Discussion 3600093929970804929](https://steamcommunity.com/app/1794680/discussions/0/3600093929970804929/) - "Makes review, game gets an update, review no longer relevant... Such is life", relative date "2 days ago" only | Light complaint (game; player's own experience, not a guide/wiki complaint) | OP jokes their own "140/140 achievements" review became outdated within days because an update added more achievements. | Illustrates how fast content updates make static snapshots stale - used here only as an **analogy** for reference-content staleness. | STALE (analogy) | Does not itself discuss guides/wikis; relevance is by analogy only. |
| E24 | [Discussion 3418810907937782771](https://steamcommunity.com/app/1794680/discussions/0/3418810907937782771/) - "Modding guides?", 1 Jul 2022 with a follow-up reply 20 Mar 2023 | Direct complaint/troubleshooting across a 9-month gap | A commenter shares a modding guide, calling re-applying it after every update "a bit annoying"; 9 months later a **different** commenter reports it no longer works and the original author is unsure why. | Dated, concrete evidence that community guides silently go stale with no systematic versioning signal to readers. | STALE (reader-sourced, second commenter) | This is a mod/cheat-editing guide, not a stats/wiki reference guide - included for the patch-staleness pattern only. |

## C. Steam Community - User reviews (Tier A, GAME reviews only - do not use to support wiki/companion-tool conclusions)

| ID | Source (accessed 2026-10-26; permalink retained only for verifiability, person not otherwise discussed) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|
| E12 | [steamcommunity.com/id/Clara_Waffles/recommended/1794680](https://steamcommunity.com/id/Clara_Waffles/recommended/1794680/) - "Recommended," posted 18 Mar 2022, 50.2 hrs at review time | **GAME review** | States the "only downside" is "having to memorize the weapon evolution requirement accessories," and wishes weapons could evolve via multiple accessories. | Reduce reliance on personal memorization of evolution pairs - supports a lookup-tool job-to-be-done *by inference only*; the reviewer never requests a wiki. | EVOLUTION (game-only) | Early Access-era (2022); game has changed substantially since. |
| E13 | [steamcommunity.com/id/rohdey/recommended/1794680](https://steamcommunity.com/id/rohdey/recommended/1794680/) - "Recommended," posted 9 May 2022, 74 hrs at review time | **GAME review** / feature request | Asks for "multiple/branching evolutions" so runs stop converging on the same 1-2 builds. | **This is a pure game-design request about evolution branching, not a staleness or wiki complaint** - kept out of the STALE theme and out of every wiki/companion-tool conclusion. | (game-only, build diversity) | Explicitly excluded from wiki/companion-tool and from staleness conclusions per the separation rule. |

**Supplementary Tier A page (directly inspected; counted in the Tier A total; no distinct
coded finding):** [steamcommunity.com/id/BAEuro/recommended/1794680](https://steamcommunity.com/id/BAEuro/recommended/1794680/) -
"Recommended," posted 23 Nov 2022 @ 1:23am, updated 24 Nov 2022. A one-line "where my 142/142
[achievements]" completionist remark. Real, directly-fetched primary page; retained with its
permalink per this correction pass rather than excluded, but it carries no actionable need beyond
cross-referencing E11's staleness-after-patch pattern.

## D. Steam Community - Event comments on the official wiki's launch announcement (Tier A)

Single page, multiple distinct commenters - source:
[steamcommunity.com/app/1794680/eventcomments/828204634466200224](https://steamcommunity.com/app/1794680/eventcomments/828204634466200224/) -
"Official Vampire Survivors Wiki now live," comments dated 13 Mar 2025 (accessed 2026-10-26; first
~25 of the thread read, remainder truncated by the fetch tool).

| ID | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|
| E14 | Direct praise | A commenter praises the new wiki as ad-free, "user friendly," and "fully functional on mobile." | Ad-free, fast, mobile-friendly reference is a valued, named attribute. | ADS_MOBILE | Reaction to the developer's own official wiki, not a third-party fan tool. |
| E15 | Direct complaint/praise | A commenter calls Fandom-hosted wikis "an absolute cancer" and welcomes the move away from Fandom. | Distrust/dislike of ad-heavy aggregator-hosted wikis is a baseline to beat. | ADS_MOBILE | Informal, strongly-worded personal characterization, not an objective claim. |
| E16 | Direct statement of recurring need | A commenter (writing in Chinese; translated/paraphrased) describes searching online every time a new weapon appears, to learn its evolution combo. | Just-in-time, per-weapon evolution lookup is a recurring behavior, not one-off. | EVOLUTION | Based on a translation; not independently re-verified by a second translation pass. |
| E17 | Direct mention of community tooling | A commenter notes an issue was opened on the "Indie Wiki Buddy" browser-extension repo to redirect Fandom-wiki traffic to the new official wiki. | Organized community effort to steer traffic/trust toward one canonical source. | COMMUNITY, ADS_MOBILE | The referenced repo/issue itself was not independently fetched to confirm. |

## E. Steam Community - Guides & guide comments

Only one guide's **comments** were actually read (Tier A, reader-sourced); the other four are
guide-**body**-only fetches with no reader comments verified (Tier B, author/supply-side).

| ID | Tier | Source (accessed 2026-10-26) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|---|
| E18 | A | [Guide 2752994183](https://steamcommunity.com/sharedfiles/filedetails/?id=2752994183) - "Evolution Chart with Names v0.2.13," posted 13 Feb 2022, updated 21 Feb 2022, 32,157 visitors | Direct reader comment complaint | One commenter flags the chart "OUTDATED." | Signal for when community reference content has drifted stale (reader-sourced). | STALE (reader-sourced) | From Feb 2022, predating most DLC. |
| E19 | A | Same guide (2752994183) - reader comments | Repeated direct feature/format request | At least four independent commenters ask for input-first notation ("A + B = X") instead of the guide's result-first notation, reasoning "we won't be unlocking the result first." | Present crafting/evolution data input-first, not result-first - **this comment thread is the actual, directly-evidenced source of the notation-order preference used elsewhere in this research** (not E22's rating count). | NOTATION, VISUAL | Format preference likely generalizes; the specific DLC content is stale. |
| E20 | B | [Guide 2845350036](https://steamcommunity.com/sharedfiles/filedetails/?id=2845350036) - "[OUTDATED] All Cheat Code, Secrets & Spells" | Author self-report (not a reader complaint) | Author states content is "quoted straight from the Vampire Survivors Wiki" (Fandom) and self-labels the guide outdated, pledging frequent updates. | Shows guide authors mirror wiki content onto Steam and pre-emptively flag staleness risk. | STALE (author-sourced) | No reader comments verified for this guide; framing is the author's own. |
| E21 | B | [Guide 2805893777](https://steamcommunity.com/sharedfiles/filedetails/?id=2805893777) - "[v0.7.230] ULTIMATE Item Evolution Cheat Sheet \| UPDATED," 766 ratings | Guide content + changelog (supply-side) | A "2nd monitor" image cheat sheet; changelog (v1.3 to v1.5) adds new evolutions/icons across patches; author cross-promotes an external fan "power-up calculator" web tool. | A persistent, glanceable reference usable during active play; the existence of a calculator tool is a supply signal, not independently-confirmed demand. | PLANNER, VISUAL, STALE (author-sourced) | No reader comments visible in the fetched portion. |
| E22 | B | [Guide 2759023033](https://steamcommunity.com/sharedfiles/filedetails/?id=2759023033) - "Weapon Evolution, Collection, and Characters (1.6.1 & DLC)," 1,333 ratings (highest of the guides sampled) | Guide content (supply-side) | Long, icon-based evolution/collection tables (weapon icon + passive icon = evolved-weapon icon). | **Rating count is an observed-supply/popularity signal only - it does not prove a validated visual-layout preference.** The directly-evidenced preference statement is E19, not this item. | VISUAL (supply signal, not preference-proof) | Popularity signal, not direct reader quotes; comments not reached. |
| E23 | B | [Guide 2772095195](https://steamcommunity.com/sharedfiles/filedetails/?id=2772095195) - "[OUTDATED] Mods & Making Your Own Character" | Author self-report (not a reader complaint) | Author repeatedly warns edits are wiped by every game update and self-labels the guide outdated. | Reinforces "content goes stale every patch," independent of evolution charts - author-sourced, not reader-sourced. | STALE (author-sourced) | Save/mod-editing guide, tangential to reference-wiki scope. |

## F. Apple App Store - official game reviews (Tier A, GAME reviews only)

Source: [apps.apple.com .../vampire-survivors/id6444525702?see-all=reviews](https://apps.apple.com/us/app/vampire-survivors/id6444525702?see-all=reviews) (accessed 2026-10-26; ~4 of "5.1K Ratings" rendered - not representative).

| ID | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|
| E25 | **GAME review**, direct complaint/question | A reviewer got stuck on a coffin not opening on the Dairy Plant stage, stated they'd "been trying to look up answers with no luck," and asked if coffins open in a specific order. | One reported external-search failure motivates testing progression explanations; it does not prove the current wiki fails this task. | ONBOARD | No date shown for this specific review; tiny, non-representative sample. A coffin is not an evolution reward chest. |
| E26 | **GAME review**, direct complaint | A different reviewer described dying repeatedly from not knowing which permanent (meta-progression) upgrades to prioritize. | Clear upgrade-priority guidance for new players. | ONBOARD | Same small-sample caveat as E25. |
| E27 | **GAME review**, praise with implicit need | A reviewer described self-teaching evolution/build mastery over many hours, sharing a specific build learned this way. | **This one reviewer's own account** describes using trial-and-error; it illustrates one possible learning path and does not establish that onboarding "relies entirely" on trial-and-error across the player base. | EVOLUTION, ONBOARD | Need is inferred from a single positive review, not explicitly requested; do not generalize. |

## G. Apple App Store - third-party "Vampire Survivors Companion" app

| ID | Tier | Source (accessed 2026-10-26) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|---|
| E28 | B | [App listing, id1608872206](https://apps.apple.com/us/app/vampire-survivors-companion/id1608872206) - $2.99, 4.4/5 from 37 ratings | Market/context evidence (listing metadata, not an individual user statement) | An unofficial, paid companion app lets users pick weapons/accessories to preview evolutions, with character/weapon/stage reference; explicitly disclaims any affiliation with poncle. | **Observed supply only**: documents that a paid evolution/build-lookup app exists at this price and rating. It does **not** prove validated demand or broader willingness-to-pay - the rating pool (37) is too small and this is listing metadata, not a demand study. | PLANNER, COMPLETE (supply signal) | Store metadata/aggregate rating, not an individual quote; very small rating pool. |
| E29 | A | [Reviews, id1608872206?see-all=reviews](https://apps.apple.com/us/app/vampire-survivors-companion/id1608872206?see-all=reviews) - review "Nice app," dated 03/02/2022 as shown | Direct user review + developer response | Reviewer notes "minor UI glitches now but much better without so many ads"; the developer replied ads were removed in v1.3. | Ad-load is a first-order satisfaction driver even for a paid companion app; shows a responsive dev feedback loop. | ADS_MOBILE | Date format as displayed, not independently disambiguated. |
| E30 | A | Same reviews page - review "Missing information," dated 09/10/2024 as shown | Direct complaint/feature request | Reviewer: paying for the app means expecting "a complete guide. Not missing weapons and evolutions," requesting an update. | Paid companion tools are held to a "complete and current" bar; incompleteness is treated as trust-breaking (reader-sourced). | COMPLETE, STALE (reader-sourced) | Single review; date format ambiguous as above. |

## H. Third-party aggregators - Tier C, mirrors only, never "original" sources

| ID | Source (accessed 2026-10-26) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|
| E31 | [worldsapps.com/reviews-vampire-survivors-companion](https://worldsapps.com/reviews-vampire-survivors-companion) - **aggregator mirror of the same Apple App Store companion-app review pool as E29/E30**, review "Updates" | Direct complaint (mirrored) | Reviewer wished update turnaround "to be a bit quicker," explaining that on the day of a game update they "can't use my vs companion because it's not as updated." | A second statement of patch-lag - but **this is a secondary mirrored review of the same app's review pool, not an additional independent platform**; it corroborates E30 rather than standing alone. | STALE (reader-sourced, mirrored), COMPLETE | Third-party aggregator, not Apple's own UI; content overlaps with independently-found items (E29/E30). |
| E32 | [appbrain.com/app/vampire-survivors/com.poncle.vampiresurvivors](https://www.appbrain.com/app/vampire-survivors/com.poncle.vampiresurvivors) - **aggregator mirror of Google Play reviews (Android)**; Google Play's own review UI was inaccessible to direct fetch | **GAME review**, direct complaint | A 1-star reviewer reports the app "doesn't stay active" when switching to other apps mid-run, interrupting/restarting the run. | A concrete, isolated signal that tabbing away mid-run carries a cost on this platform. **The reviewer does not mention wikis, guides, or looking anything up - any connection to an overlay/offline companion remedy is this project's own hypothesis, not something the review proves.** | MULTITASK (hypothesis, not a confirmed remedy) | No reviewer explicitly mentions wikis/guides; single review, aggregator-mirrored, not Google's own UI. |
| E33 | Same AppBrain page | **GAME review**, praise | 5-star Android reviews praise "no forced ads/no microtransactions," "actually good dlc," and the game's Discord community. | Discord is already a trusted community hub (cross-references E34's finding that the wiki itself directs newcomers to Discord). | COMMUNITY | Game review, not wiki-specific, aggregator-mirrored; included for the Discord cross-reference only. |

## I. Official Vampire Survivors wiki (vampire.survivors.wiki) - this project's own source site, contributor/editor discussion (Tier A)

| ID | Source (accessed 2026-10-26) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|
| E34 | [vampire.survivors.wiki/w/Talk:Vampire_Survivors_Wiki](https://vampire.survivors.wiki/w/Talk:Vampire_Survivors_Wiki) | Direct contributor question + maintainer response | An editor asked whether an asset-extraction process or "Welcome Editors" onboarding guide exists; another editor pointed to an external GitHub tool and admitted "we don't have specific editing guide pages on our own yet," directing newcomers to the game's Discord instead. | This is **this project's own source wiki** admitting a contributor-onboarding gap - directly relevant to this project's own contributor onboarding design, not about a different, unrelated site. | COMMUNITY | **Contributor/editor-side feedback, not general reader/player sentiment** - do not generalize to end-reader needs. |

---

## Build-lab supplementary evidence

Added 2026-10-26 for the build lab ([spec](../spec.md) J10-J12, U15-U20;
[build mechanics](build-mechanics.md)). Both are Tier A Steam Community discussion threads,
re-fetched and read on 2026-10-26. They are **supplementary**: they don't change the D0-02 page
or platform counts, the 34-unit total above, or any theme tally.

| ID | Source (accessed 2026-10-26) | Type | Paraphrase | Observed need | Theme(s) | Caveat |
|---|---|---|---|---|---|---|
| E35 | [Steam discussion 3418811628271223278](https://steamcommunity.com/app/1794680/discussions/0/3418811628271223278/) | Direct question + player answer (mechanics) | A player asks how damage is calculated; a reply explains damage as base damage times (1 + Might), notes that shown damage varies by about ±5, and that a Limit Break "Might" bonus raises base damage. | A trustworthy, explained account of how stats turn into damage, rather than folklore. | PLANNER | One player's explanation, not an official source; the build lab treats it as a hypothesis checked by golden cases (A19). |
| E36 | [Steam discussion 3418811628270057909](https://steamcommunity.com/app/1794680/discussions/0/3418811628270057909/) (11 Jul 2022) | Direct question + crowd answers (mechanics) | A player asks which weapons use Duration and says there is no apparent list online; one reply lists weapons from the Fandom Combos page, another says the wiki seems wrong for some (Garlic and Soul Eater debuffs, also Clock Lancet). | A clear per-weapon list of which stats apply, with exceptions, that players can trust. | PLANNER, STALE | 2022 thread (old game version); shows the need and the trust problem, not current values. |

---

## Supplementary pages (Tier B, directly inspected; not primary sentiment, retained for context)

- [Apple App Store - official game listing](https://apps.apple.com/us/app/vampire-survivors/id6444525702) -
  store metadata only (price, 7 separately-itemized paid DLC SKUs, "Contains Advertising"); no
  user sentiment, included only as background for the DLC-attribution theme.
- [Google Play - official listing, direct fetch](https://play.google.com/store/apps/details?id=com.poncle.vampiresurvivors&hl=en-US) -
  static description only; the review list is JS-rendered and did not resolve to static text even
  with `&showAllReviews=true`. Logged as a direct access blocker, not a content finding. This is
  why Google Play is not counted among the 4 primary-coverage platforms.
- [Official wiki - "Vampire Survivors Wiki:About"](https://vampire.survivors.wiki/w/Vampire_Survivors_Wiki:About) -
  factual/meta page (founded 21 Oct 2021 on Fandom; forked to the current Weird Gloop-hosted
  version 13 Mar 2025 - this is **this project's own source site's** own history, confirmed
  against `resources/README.md`; 3,014 articles at fetch time). No visible user-feedback mechanism
  on the page itself, so it is background context, not a sentiment data point.
- Apple App Store review (same page as E25-E27): a reviewer described a disorienting
  motion/visual effect on the "Moonglow" stage and asked for an additional accessibility warning.
  Real accessibility signal, but outside this project's companion/wiki scope - noted, not coded.

## Discovery-only and blocked items (excluded from every count above)

Listed for transparency only - **none of these support any claim in
[user-research.md](./user-research.md)**:

- Reddit `1i9majr` ("My unlocked characters become locked again") - apparent topic (DLC-gated
  character re-locking) only seen via an AI search summary; no Wayback snapshot found on CDX
  lookup; could not be verified. This is the closest candidate to a direct "DLC ownership
  confusion" complaint and its absence from the verified set is flagged explicitly in
  [user-research.md](./user-research.md)'s limitations.
- Reddit `1jtbb8s` ("How to evolve?") and `1en0hmx` ("Any fixes in 2024 for mobile lost runs?") -
  snippet-only, no archived snapshot found.
- An unconfirmed Reddit thread reacting to the official wiki's March 2025 launch - no permalink
  could be found or verified despite multiple targeted searches, even though a Steam-side reaction
  thread (E14-E17) was verified.
- Steam discussion `3830916907600289806` ("a guide for the foscari DLC") - page rendered only
  "Posts: 0," no retrievable text (likely deleted or requires auth/JS).
- Six additional Steam guide IDs surfaced only via AI-search summaries and were not independently
  fetched (`2795904137`, `2805705196`, `2738976026`, `2740706616`, `3155021546`, `3170537836`) -
  not verified, not counted.
- A claimed Steam review mentioning "the music, the lore, the wiki, the community" - seen only in
  an AI search summary; the underlying review URL could not be located after two targeted
  searches. Explicitly not treated as confirmed evidence.
- `vampire-survivors.fandom.com/wiki/Talk:...`, `/f` (forum index), and a specific `/f/p/...`
  discussion thread - all returned **HTTP 403** on direct fetch; no Fandom-side talk/forum content
  could be independently verified. Fandom is the **predecessor** site this project's source wiki
  (`vampire.survivors.wiki`) forked away from in March 2025 - it is not what this project's
  archive is built from, so this blocker affects general historical context only, not the
  provenance of this project's own data.
- `appfollow.io/apps/vampire-survivors/reviews` - 404, page does not exist at that path.
- `appbrain.com`'s iOS companion-app page - **HTTP 403**.
- No standalone Android companion/wiki/build-planner app for Vampire Survivors was found in the
  targeted searches run this pass (`site:play.google.com`, "Guide for Vampire Survivors," "VS Wiki
  app," etc.). **This reflects unknown/limited search coverage within a bounded pass, not a
  proven absence** - a more exhaustive Google Play catalogue search was not performed.
- No "wiki.gg"-hosted Vampire Survivors wiki exists; confirmed via the official wiki's About page
  that the current site is hosted by **Weird Gloop**, not wiki.gg.

## Exact totals (reconciled, for cross-reference with [user-research.md](./user-research.md))

- **30 distinct pages directly inspected**, across **5 platform types contacted**.
- **Conservative D0-02 count: 20 primary (Tier A) pages across 4 primary-coverage platform
  types** (Reddit, Steam Community, Apple App Store, official wiki) - this is the number to cite
  against the >=12-page/>=2-platform floor, not the 30-page all-tiers total.
- 8 Tier B (context/guide-body/listing) pages and 2 Tier C (aggregator-mirror) pages are tracked
  separately and are **not** counted toward the primary floor.
- **34 coded evidence units (E01-E34)** include primary feedback, author/supply context from
  **5 Tier B pages** (E20-E23, E28), and mirrored reviews from **2 Tier C pages** (E31-E33).
  Context and mirrors retain their labels; not every inspected supplementary page produces a
  coded unit.
- **E35-E36** are [build-lab supplementary evidence](#build-lab-supplementary-evidence) added
  2026-10-26; they are outside the 34-unit total and the D0-02 counts.
- **Game-review-only units** (must not be used to argue wiki/companion dissatisfaction): E12, E13,
  E25, E26, E27, E32, E33.
- **Companion/wiki-tool-specific units**: E14-E24 (Steam wiki/guide-side), E28-E31, E34.
- **Reader-sourced staleness/update-trust complaints specifically** (the narrowest, soundest
  count): **3 directly-verified pages** - Steam guide 2752994183 (E18), Steam discussion
  3418810907937782771 (E24), Apple App Store companion review page (E30) - across **2 platforms**
  (Steam Community, Apple App Store), corroborated by one same-app mirrored review (E31, not an
  additional platform), one analogous (not guide-specific) player experience (E11), and three
  author-only self-reported risk admissions with no verified reader complaint (E20, E21, E23).
  **E13 is explicitly excluded from this count** - it is a game-design request, not a staleness
  complaint.
- **Direct questions**: E01, E03, E04, E06, E07, E08, E09, E10, E25, E26, E34.
- **Direct replies/answers**, kept distinct from the questions they answer: the reply content
  embedded within E03, E07, E08, E10, E34's own rows above (each row's paraphrase separates
  question from reply where both were retrievable).
- **Author/developer responses**: E29 (developer reply), E20/E21/E23/E24 (guide-author
  self-reports, explicitly marked author-sourced, not reader complaints).
- Every unit states its own tier, access/verification status, and caveat; none relies on a search
  snippet alone.
