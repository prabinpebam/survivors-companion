# User research — Vampire Survivors companion/knowledge experience

> **TL;DR (corrected 2026-10-26):** **30 distinct pages** were directly inspected across **5
> platform types contacted**. The conservative, D0-02-relevant count is **20 primary (Tier A)
> pages across 4 primary-coverage platform types** — Reddit (via Wayback Machine snapshot), Steam
> Community (discussions/reviews/guide comments), Apple App Store (game + companion-app reviews),
> and the official wiki's (`vampire.survivors.wiki`) own contributor talk page — clearing the
> >=12-page/>=2-platform documentation floor with room to spare. A further 8 directly-inspected
> pages are guide-body/listing/metadata **context** (not primary sentiment), and 2 are
> **aggregator mirrors**, never treated as original sources. Google Play contributed only a
> blocked listing and a mirror, so it is **not** counted as a primary-coverage platform. 34 coded
> evidence units (E01-E34, full detail in [user-evidence.md](./user-evidence.md)) emerge from
> these pages. Evidence supports testing fast, ad-free, mobile-usable, input-first evolution
> lookup, optional spoiler reveal and visible freshness cues. Pack-based discussion motivates
> testing DLC labels, not claiming verified ownership confusion. **Reader-sourced update-staleness
> complaints occur on 3 directly verified pages on 2 platforms**, including one modding-guide
> discussion, in this sample — a repeated signal, but this document
> does **not** claim it is the single dominant failure mode across the wider player base, since
> that would overstate a purposive sample as prevalence. This is a **purposive sample, not a
> prevalence study**; no interviews or usability tests were conducted — §8 proposes, but does not
> execute, a protocol aligned to this project's own staged Definition of Done. Game-review
> evidence and companion/wiki-tool evidence are kept in separate buckets throughout, per the
> requirement not to let game complaints stand in for wiki complaints.

## 1. Objective and scope

Inform the design of a new, open-source Vampire Survivors knowledge/companion site built on an
archived wiki's content (not a new game). This document synthesizes **actual user comments,
questions, and feature requests** found on public forums and review platforms — not generic UX
assumptions — into jobs-to-be-done, segments, contradictions/tradeoffs, and recommendations, and
proposes (but does not execute) a future interview/usability-test protocol aligned to this
project's existing staged Definition of Done.

## 2. Methodology and access notes

- Discovery via web search; every evidence-worthy item was then independently opened with a
  direct page fetch (or, for Reddit, a reproducible Wayback Machine snapshot) and read as real
  text — search snippets alone were never treated as evidence (see
  [user-evidence.md](./user-evidence.md)'s "discovery-only" list for what was excluded on this
  basis, and its tier vocabulary for how pages are classified Tier A/B/C).
- **Reddit**: live `reddit.com`/`old.reddit.com`/`api.reddit.com` all returned HTTP 403 on every
  attempt. The workaround was discovering candidate threads via search, confirming a snapshot
  existed via the Wayback Machine CDX API, then reading the archived page; all six retained
  snapshot URLs were independently re-fetched and re-confirmed during this correction pass. Many
  2024-2025 threads had no snapshot and could not be verified, which skews the retrievable Reddit
  sample toward whatever happened to be archived, not toward the highest-engagement or most
  representative threads.
- **Steam Community** was the most reliably fetchable platform for discussions, reviews, and
  guide bodies, with two caveats: the Reviews *tab* and the Steam reviews JSON API are
  JS-rendered/blocked, so individual reviews were only reachable via already-known permalinks
  (now recorded exactly for E12, E13, and the supplementary review), and several guides' comment
  sections did not render within the fetch tool's content cutoff — those guides are recorded as
  Tier B (guide-body-only, author-sourced) rather than treated as reader sentiment.
- **Apple App Store** pages rendered as static, directly readable text for both the official game
  and a third-party companion app, but only ~2-6 of thousands of total ratings were ever rendered
  per page — not a representative sample of all reviews.
- **Google Play**'s review list is JS-rendered and never resolved to static text, even with
  `&showAllReviews=true`; this is logged as a direct access blocker. The only Android-side review
  content came from a third-party aggregator (AppBrain) — Tier C, mirrored-not-primary evidence,
  which is why Google Play does not count as one of the 4 primary-coverage platforms.
- **Archive lineage (corrected):** this project's own archive (see `resources/README.md`) is a
  complete offline snapshot of `vampire.survivors.wiki`, the **current official** Vampire
  Survivors wiki (Weird Gloop-hosted, MediaWiki 1.45), which forked away from the old
  Fandom-hosted wiki in March 2025. **Fandom** (`vampire-survivors.fandom.com`) is therefore the
  wiki's **predecessor**, not the site this project is built from. Every Fandom-side
  talk-page/forum fetch attempted in this research returned HTTP 403, so no Fandom-side community
  sentiment could be independently verified — a real gap for general historical context, but a
  lower-stakes one than previously framed, since Fandom is not this project's data source. The
  wiki-side evidence that was obtained (E34, the current official wiki's own contributor talk
  page) **is evidence about this project's own source site**, not about a separate, unrelated
  wiki.
- All fetches/re-verifications were performed and accessed on **2026-10-26**.

## 3. Exact source totals (documentation DoD floor check)

| Requirement (per [Definition of Done](../planning/definition-of-done.md), D0-02) | Floor | Achieved |
|---|---|---|
| Directly inspected primary (Tier A) user-discussion/review source pages | >=12 | **20** |
| Primary-coverage platform types | >=2 | **4** — Reddit, Steam Community, Apple App Store, official wiki |
| Coded evidence units | (not a D0 floor; originating brief asked >=20) | **34** (E01-E34) |
| All directly inspected pages, incl. Tier B context + Tier C mirrors | — | **30**, across **5** platform types contacted |

The **20-page/4-platform row is the number that clears D0-02** — it excludes 8 Tier B
(guide-body/listing/metadata-only) pages and 2 Tier C (aggregator-mirror) pages, which are
directly inspected but are not primary user-feedback pages. Google Play is counted among the 5
platform types *contacted* but not among the 4 *primary-coverage* platforms, since its own review
UI never resolved to static text (Tier B listing + Tier C mirror only). See
[user-evidence.md](./user-evidence.md)'s coverage-summary table for the full per-platform,
per-tier breakdown reconciled by unique URL.

## 4. Jobs-to-be-done (grounded in evidence)

1. **"When I don't recognize a weapon/passive pairing, I want to look up its exact evolution
   requirement so I can plan without dying first."** — E07, E08, E18, E19, E25 (game review,
   onboarding-context only).
2. **"When I hit something new mid-run, I want a fast, ad-free, mobile-usable lookup that
   doesn't cost me the run if I switch away to check it."** — E14, E16; E32 is retained only as a
   **hypothesis-level** cross-reference (it shows app-switching has a run cost on Android, but the
   reviewer never mentions wikis/guides — see caveat on E32).
3. **"When I'm new, I want hints, not full spoilers, with a safety-net fallback if I get truly
   stuck."** — E03, E09, E10.
4. **"When I own only some DLC, I want to know what pack a thing belongs to and whether a pack is
   worth buying."** — E02, E05 (direct); DLC-attribution confusion in players' own words was
   actively sought but could not be independently verified — see §7.
5. **"When the game patches, I want confidence my reference still matches the current version."**
   — the soundest, narrowest support is **E18, E24, E30** (reader-sourced, 3 pages/2 platforms),
   corroborated by **E31** (a mirrored, not independent, duplicate of the same review pool as
   E30), one analogous player experience **E11**, and three author-only self-reported risk
   admissions with no verified reader complaint (**E20, E21, E23**). **E13 is excluded** — it is a
   pure game-design request for branching evolutions, not a staleness complaint (see
   [user-evidence.md](./user-evidence.md) E13).
6. **"When I'm optimizing end-game, I want synergy/build-planning help, not just raw lists."** —
   E01, E02, E10, E21 (guide author's own "2nd monitor" pattern); E28 is supply-side context only
   (a paid app exists at this price/rating) and does not independently establish demand for this
   job beyond what E01/E02/E10 already show.
7. **"When I'm scanning quickly, I want icon-based, input-first tables, not dense result-first
   text."** — the directly-evidenced preference statement is **E19** (repeated, explicit reader
   requests for input-first notation). E18 supplies the staleness angle on the same guide. **E22
   is observed supply/popularity only** (1,333 ratings on an icon-based guide) and is not used
   here to independently prove the notation preference — that is E19's finding alone.
8. **"When I want to contribute to the wiki itself, I want on-wiki onboarding docs, not only a
   Discord pointer."** — E34 (this project's own source wiki).

## 5. Segments

**By game familiarity:**

| Segment | Representative evidence | Primary task |
|---|---|---|
| New/onboarding players | E06, E04, E26 | Getting-started guidance, basic unlock troubleshooting |
| Intermediate optimizers | E01, E02, E07, E08, E27 (single review, illustrative not generalized) | Evolution-rule lookup, build iteration |
| Completionist/achievement hunters | E11 (and the supplementary BAEuro "142/142" item) | Tracking unlocks that shift after patches |
| Advanced/meta players | E05, E09, E10 | DLC comparison, superboss strategy, secret-content discussion |
| Paying companion-app users | E29, E30 (direct reviews); E28 (supply/listing context only) | Expect an authoritative, complete, current reference |

**By task mode:** quick in-run lookup (E07, E14, E16) vs. pre-run/between-run planning (E01, E02,
E10, E21) vs. post-run completion tracking (E11) vs. spoiler-averse browsing/discovery (E03, E09)
vs. wiki contribution/maintenance (E18, E20, E24, E34).

## 6. Contradictions and tradeoffs (explicit, per brief)

- **Spoilers vs. discovery.** E03 contains a player's request for spoiler-light tips and a
  reply offering the wiki if stuck; these are different speakers, not proof of one person's
  preferred fallback. E09/E10 mark spoiler-bearing discussion. Together they motivate testing
  progressive disclosure with an explicit full-answer escape hatch, not assuming a universal
  spoiler policy.
- **DLC ownership and value.** E02 and E05 show rich discussion organized *by* DLC pack, but no
  independently verified instance of a player saying "I'm confused which DLC this needs" was
  found (the one candidate thread, listed in [user-evidence.md](./user-evidence.md), had no
  archived snapshot and is excluded) — a genuine, honestly-flagged gap, not a confirmed non-issue.
- **Visual chart vs. deep stats.** E22 shows a popular (1,333-rating) icon-table guide exists —
  **an observed-supply signal only, not proof of a validated layout preference** — while E02's
  "best build per version" discussion is inherently stat/text-heavy meta discussion, and E19 is
  the directly-evidenced notation-order preference. Read together, this sample shows appetite for
  both a quick visual glance and deep comparative data as plausibly different views of the same
  underlying data — but the icon-vs-stats *preference itself* is better evidenced by E19 than by
  E22's popularity count.
- **Update trust.** The narrowest, soundest count in this sample is **E18, E24, E30** — three
  directly-verified reader-sourced staleness complaints across two platforms (Steam Community,
  Apple App Store) — corroborated by one mirrored duplicate (E31, not an independent platform),
  one analogous player experience (E11), and three author-only self-admissions with no verified
  reader complaint (E20, E21, E23). **E13 is a game-design request, not a staleness complaint, and
  is excluded from this count.** For a **paid** companion app specifically, incompleteness/lag is
  described as trust-breaking rather than a minor inconvenience (E30, and the mirrored E31).
- **Mobile ergonomics.** E32 (Android, aggregator-mirrored) shows that switching apps mid-run can
  interrupt or restart a run on that platform — a concrete, isolated cost signal. **The reviewer
  does not mention wikis, guides, or looking anything up**, so any inference that an
  overlay/offline companion would specifically remedy this is **this project's own hypothesis**,
  not something the review itself establishes. E21's desktop "2nd monitor" pattern, by contrast,
  carries no such interruption cost — the same lookup need plausibly has a materially different
  cost depending on platform, but the mobile-specific remedy remains unproven and should be
  tested, not assumed.
- **Planners vs. quick lookup.** The same evidence base shows appetite for both a deep synergy
  planner (E01, E02, E10, E21) and instant single-fact, in-run lookups (E07, E08, E16) — a single
  generic "search" affordance may under-serve one mode; that is a design hypothesis. Per the [spec](../spec.md)'s
  existing "Deferred planner" framing, a separately evaluated planning mode should stay **out of
  the committed MVP task set** even if it remains a worthwhile later exploration (see §9).
- **Ads/monetization sentiment vs. tolerance.** E14/E15/E29 value ad-free experiences; E30
  explicitly expects completeness after paying. E28 establishes that a paid product is offered,
  not market-wide willingness to pay or a finding that price is otherwise acceptable. Ad-free
  delivery is a proposed baseline; neither open-source positioning nor a monetization model is
  validated by these comments.
- **Community support channel vs. on-site docs.** E34 shows the current official wiki already
  defers contributor onboarding to Discord rather than documenting it on-wiki — a low-maintenance
  but less discoverable/persistent choice this project should weigh deliberately, not inherit by
  default.

## 7. Research limitations

- This is a **purposive convenience sample**, not a random or representative one. Counts above
  (e.g., "3 directly verified staleness pages") describe *this sample*, not prevalence among the
  broader Vampire Survivors player base — do not quote them as "most players think X," and do not
  read any count in this document as a claim of frequency dominance.
- **Reddit evidence is archive-dependent**: only threads with an existing Wayback snapshot could
  be verified, which is a function of what got archived, not what is most representative.
- **Small per-page samples**: Apple App Store pages rendered only ~2-6 of thousands of ratings
  per fetch; the companion app's total rating pool is itself only 37 ratings (E28).
- **Fandom-side evidence could not be independently verified** — every Fandom talk/forum URL
  returned HTTP 403. Fandom is the wiki's **predecessor** (pre-March-2025); it is **not** the site
  this project's archive is built from (that is `vampire.survivors.wiki`, confirmed via
  `resources/README.md`), so this blocker limits general historical/predecessor context only. The
  wiki-side evidence that was obtained (E34) is about this project's **own** source wiki, not a
  different one — it just happens to be contributor-side, not reader-side, feedback (see next
  point).
- **E34 is contributor/editor-side feedback**, not general reader/player sentiment about
  *consuming* the wiki's content — it must not be generalized to typical end-user needs, even
  though it is evidence about this project's own source site.
- **Android companion-app coverage is unknown, not proven absent.** No standalone Android
  companion/wiki/build-planner app for Vampire Survivors was found within this bounded search
  (a handful of targeted queries); a more exhaustive Google Play catalogue search was not
  performed, so this should be read as "not found in this pass," not as "does not exist."
- **E16 depends on a translation** of a non-English (Chinese) comment and was not independently
  re-verified by a second translation pass; nuance may be lost.
- **E31/E32/E33 are aggregator-mirrored**, not fetched from the originating platform's own UI
  (Apple's later review pages, Google Play's review list respectively); provenance is secondary
  and these are never treated as "original" sources — they corroborate, but do not substitute for,
  directly-fetched primary pages.
- **No verified, first-person "DLC ownership confusion" quote was found.** The closest candidate
  (an unverifiable Reddit thread title) is excluded rather than used, per this research's rule
  against treating unverified snippets as evidence. This is reported as an honest sampling gap,
  not as evidence the problem doesn't exist.
- **No interviews or moderated usability tests have been conducted.** Every finding above is
  desk research from existing public sources. §8 proposes a protocol for a future study aligned
  to this project's own staged Definition of Done; it has not been run, and no participants have
  been contacted.
- Additional valid evidence almost certainly exists beyond what time/tooling allowed to be
  sampled here (e.g., guide comment sections that did not render, deeper Reddit history if a
  non-blocked API were available, non-English-language forums not searched at all).

## 8. Proposed interview & moderated usability study protocol — NOT YET CONDUCTED

This section is a protocol for possible future primary research, **deliberately scoped to this
project's own staged [Definition of Done](../planning/definition-of-done.md)** (D0/S1/S2/S3 gates and PD1-PD5 outcomes) rather than an
independently invented set of numbers. **No recruitment, outreach, or sessions have occurred.**
Nothing in this section should be read as a claim that interviews or usability tests already took
place.

### 8.1 Objectives

Validate/refine the JTBD and contradictions in §4-§6 through the project's own S1 stage, then
pilot the project's own PD1/PD3 working-target outcomes ahead of their formal S2/S3 gates;
pressure-test specific decisions (spoiler-gating default, notation order, DLC labeling, mobile
offline/overlay behavior as a hypothesis per §6, update-freshness indicators) — without inventing
parallel pass/fail criteria that compete with the project's existing ones.

### 8.2 S1 interviews (per S1-02) — static cards and existing alternatives only

- **Five consenting participants** (per S1-02), spanning new/returning/DLC-playing situations,
  discussing **recent real tasks they actually did**, not hypothetical feature voting. Segment
  spread drawn from §5: aim for at least one new/onboarding player, one intermediate optimizer,
  one completionist/advanced player, and at least one mobile-primary player, within the five.
  De-identified notes, a consent record, and any disconfirming cases are retained per S1-02.
- Recruitment, if ever run, would be via passive opt-in channels only (e.g., a screener survey
  linked from the project's own future community spaces or, with moderator permission, a
  recruitment post in r/VampireSurvivors) — never cold outreach to individuals identified during
  this desk research. No one has been or will be contacted from this report's evidence sources.
- Screener questions: hours played, platform(s) used (PC/Steam Deck/mobile/console), DLC owned,
  current wiki/guide usage habits, self-rated spoiler sensitivity (1-5).

### 8.3 S1 comparative task session (per S1-03) — three candidates, static task cards, no prototype

- Per S1-03: for each priority job from §4, compare **three candidates** against **existing
  alternatives** (e.g., a printed/static card describing this project's planned page alongside the
  actual Steam guide used in E18/E19/E22, and another accessible existing tool),
  using the **same task script and starting conditions** for each candidate, recording **baseline
  time and errors** rather than self-reported preference alone. **No clickable prototype is
  necessary for this stage** — printed/static task cards and existing alternatives are sufficient.
  Keep existing-tool baseline timings separate from static-card comprehension observations;
  they do not establish a product speed advantage. Buying a paid app requires separate budget
  authorization; a store listing is not an interactive substitute.
- Candidate priority jobs to script first: the evolution-lookup job (JTBD 1/7), the DLC-origin
  job (JTBD 4), and the update-freshness-cue job (JTBD 5). These deliberately mix stronger
  lookup/freshness evidence with the weaker DLC-scope hypothesis (E02/E05); they are proposed
  experiments, not a demand ranking.
- **The synergy/build-planner job (JTBD 6) is explicitly excluded from this committed comparison
  set.** Per the [spec](../spec.md)'s existing "Deferred planner" framing, build-planning is evaluated
  separately, if at all, and must stay out of the committed MVP task set — it may be run later as
  its own exploratory task, not folded into the S1-03 comparison alongside the three priority jobs
  above.

### 8.4 Consent and privacy

- Written/typed informed consent before any session: purpose, voluntary participation, right to
  withdraw at any time without penalty, recording consent (audio/screen) requested separately
  from participation consent.
- No real names, handles, or account identifiers retained in any report; participants assigned a
  session code (e.g., P01) at intake.
- Data minimization: only session recordings/notes and screener answers are retained; stored in
  an access-controlled location; deletion timeline (e.g., recordings deleted <=90 days after
  analysis, de-identified notes may be retained longer for synthesis).
- No compensation details, payment info, or other personal data collected beyond what is
  necessary for scheduling.

### 8.5 Interview guide topics (semi-structured, for the S1-02 sessions)

1. Walk me through the last time you looked something up about Vampire Survivors mid-session or
   between runs. What did you look up, where, and why there (vs. somewhere else)?
2. How do you feel about spoilers for secret characters/endings? Has that changed as you've
   played more?
3. Which DLC do you own? Have you ever been unsure whether something you saw was from a DLC you
   don't own?
4. Tell me about a time a guide/wiki was wrong or out of date. How did you find out, and what did
   you do?
5. (Mobile players) What happens if you switch apps mid-run to check something?
6. When you look for a weapon or character you can picture but not name, how do you find it?
   (Probes A13 without suggesting a grid.)
7. How do you keep track of which unlocks or secrets you have done, if at all? Have you ever
   moved that record between devices or browsers? (Probes A16.)
8. Tell me about the last time you chose a character, stage or weapons in order to unlock
   something. Did you try for more than one unlock in that run? (Probes A15; include players
   who never do this.)

Topics 6-8 were added after the owner's first-person input (OP01-OP07 in the
[spec](../spec.md#21-owner-player-input)). They ask about recent behavior, not feature votes,
so other players can confirm or contradict the owner's needs.

### 8.6 Later-stage working targets to pilot, not to treat as S1 pass/fail bars

These are the project's **own** PD1/PD3 working targets (not new numbers invented here); S1 only
pilots/baselines them per the DoD's own text, they are formally gated at S2/S3:

| Outcome (project ID) | Working target | Formally gated at |
|---|---|---|
| PD1 | >=8/10 recruited players correctly identify the next step and relevant level/chest condition within 20 seconds, unaided, on a covered recipe | S2/S3 |
| PD3 | >=8/10 correctly find a prerequisite and distinguish snapshot age from verified compatibility | S2/S3 |
| S3-02 | Moderated 10-participant study, individual results and failures retained, at release-candidate stage | S3 |

S1's role is limited to **baselining and pilot observation** of evolution lookup, prerequisite
comprehension and freshness interpretation. PD1's 20-second threshold applies to next-step
identification, not automatically to DLC-origin tasks. S1 does not pass PD1/PD3/S3-02, and a
five-person interview sample cannot establish an 8-of-10 outcome.

### 8.7 Analysis and reporting plan

- S1-03 baseline time-on-task and error counts per candidate, per job, per segment.
- Affinity-mapped qualitative themes from S1-02 interviews, cross-checked against the JTBD/themes
  in §4 and §6 for confirmation or contradiction, including disconfirming cases.
- Findings would be written back into this `docs/research/` set with new evidence IDs in a
  distinct "primary research" ledger, kept separate from the desk-research
  [user-evidence.md](./user-evidence.md) IDs (E01-E34) to preserve the distinction between
  secondary and primary evidence.

## 9. Concrete recommendations

1. Make the evolution/synergy lookup the primary page type, in **input-first** notation
   (ingredient + ingredient = result), per the repeated, explicit format request in E19 (not E22,
   which is supply/popularity evidence only).
2. Add a spoiler toggle/progressive-disclosure pattern for secret characters, endings, and
   superbosses — hints before full reveal, matching the hint-then-wiki pattern seen in E03 and
   the self-tagging norm in E09/E10.
3. Tag every weapon/character/stage with its DLC-of-origin and provide a DLC
   comparison/"what's in each pack" page (E02, E05), while being explicit in release notes that
   first-person "DLC confusion" complaints were sought but not independently verified this round
   (§7) — treat this as an open question to validate in the S1-03 comparison (§8.3), not a settled
   finding.
4. Show an explicit "last verified against patch X" indicator (plus a changelog) on every
   page/section — addresses the soundest, directly-evidenced staleness complaints in this sample
   (E18, E24, E30, corroborated by E11 and the mirrored E31; E20/E21/E23 are author-sourced risk
   admissions, not reader complaints; E13 is excluded as a game-design request, not a staleness
   complaint).
5. Target zero ads and fast mobile load as a baseline, not an aspiration — this is the
   specific, named reason players were glad to leave the ad-heavy wiki host behind (E14, E15,
   E29), and aligns naturally with a non-commercial open-source project.
6. Ship a **Quick Lookup** experience (minimal taps, works offline/cached, safe to use without
   losing a run on mobile — informed by E07, E16, and the app-switching cost signal in E32, which
   remains a hypothesis about remedy, not a proven one per §6) as the committed MVP focus. Keep a
   separately-evaluated **Planner** mode (synergy/build planning, informed by E01, E02, E10, E21)
   explicitly **out of the committed MVP task set**, per the [spec](../spec.md)'s existing "Deferred
   planner" framing and per §8.3's exclusion of JTBD 6 from the S1-03 comparison set.
   *Update 2026-10-26:* the owner has since added an **unlock-session** planner and manual
   progress tracking to scope (spec O15, OP06/OP07). That is owner intent, not a finding of this
   desk research; the build/synergy planner described here remains deferred.
   *Update 2026-10-26 (build lab):* the owner then added a build lab (spec O16, OP08-OP11).
   E35/E36 (supplementary, [evidence ledger](user-evidence.md#build-lab-supplementary-evidence))
   show players asking how damage is calculated and which weapons a stat affects. Build
   planning is still kept out of the S1-03 lookup comparison; it gets its own static-card
   session (S1-10) with build-interested players: can they say what changed and why, and do
   they read the modeled rate as a real-run promise (A11, A21)?
7. If the project accepts community contributions, publish on-wiki contributor onboarding docs
   rather than relying solely on a Discord pointer, directly addressing the gap this project's
   **own** source wiki admits to in E34.
8. Treat content completeness as a monitored, visible metric (e.g., a coverage indicator for
   evolutions/weapons/achievements) rather than an invisible background task — a paid companion
   app's reviewer treated incompleteness as a dealbreaker (E30), and this project should not
   inherit that failure mode just because it is free. (Note: E28's rating/price alone documents
   that one such paid product exists — it is not independent proof of broad willingness-to-pay,
   so this recommendation rests on E30's complaint, not on E28's listing metadata.)
9. Prioritize wiki coverage of "I searched and found nothing" stuck-points named in real reviews
   (e.g., the Dairy Plant coffin question in E25) as candidates for task validation. A historical
   review reports that person's search failure, not a verified unresolved defect in today's wiki.
10. Treat E27's self-taught-mastery praise as **one account of one possible learning path**, not
    as proof that onboarding currently "relies entirely" on trial-and-error — use it alongside
    E25/E26 (direct onboarding complaints) rather than in place of them.
11. Before committing to the DLC-confusion and mobile-ergonomics-remedy points as load-bearing for
    the roadmap, run the S1-03 comparison (§8.3, specifically the DLC-origin job) and treat the
    mobile overlay/offline remedy as a hypothesis to test, not a confirmed requirement, since
    current support for those two points is comparatively thinner than for the update-trust and
    notation findings.

## 10. Cross-reference

Full per-item citations, tier labels (A/B/C), access/verification status, exact Wayback
snapshot URLs, real Steam review permalinks, and the complete discovery-only/blocked appendix are
in [user-evidence.md](./user-evidence.md) (E01-E34). The reconciled coverage-summary table and
exact totals in that document (20 primary pages / 4 primary platforms / 30 pages total / 5
platforms contacted / 34 evidence units) are the authoritative counts this document's §3 and TL;DR
summarize.
