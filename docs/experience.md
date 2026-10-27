# Experience requirements and task flows

> **TL;DR:** Proposed experience: recognize the item in a visual grid or find it by name,
> understand the next valid step and its pairing, mark your own progress, get an explained
> plan for the next run, and try builds in a build lab whose every number shows its math, then
> return to play. It is organized as an app (Home, Codex, Unlocks, Builds, Progress, plus search,
> a run companion and what's new), not as articles. This page is the behavioral specification;
> screen plans, wireframes, the design system and UI text are in the Design section, starting
> with the [app UX plan](design/app-ux-plan.md). Nothing is coded. U/J/P/OP IDs are defined in
> the [spec](spec.md).

## Information hierarchy

The app is organized by intent (Understand, Plan, Play) into five destinations, and every item
is shown at four levels: Glance (tile), Peek (sheet or inspector), Page, Proof
([disclosure ladder](design/app-ux-plan.md#disclosure-ladder)).

```text
Home: my next steps (continue / what's new / next unlocks) or, on first use, start here
Codex (understand): collections, pairings, rules and stats explainers, entity pages
Unlocks (plan): next unlocks, single-run session plan
Builds (plan): build lab, saved builds, compare
Progress (record): marks, import / export
Everywhere: search and commands, peek and return, run companion (play), settings

Recognize in a grid (sort / filter / view mode)  or  find by name/alias
  -> compact summary: icon + name + pairing at a glance
     -> answer: inputs / required levels / next result / conditions
        -> prerequisite path when needed
        -> deeper mechanics, full details and source on request

My progress (marked by me) -> next suggested unlocks -> single-run session plan

Build lab: slots + levels + PowerUps -> stats and weapon output (tiered, with breakdown)
  -> save -> compare up to three builds

Always available: content scope / spoiler setting / snapshot and coverage / my progress /
export-import / correction route
```

Do not force a tutorial, account, build wizard or marketing dashboard before the answer.
Do not replace source prose with a confidence-sounding summary when a condition is unknown.
Do not open with an exhaustive table; full detail is always one deliberate step away (OP03).

## Views (conceptual, not screen designs)

| View | Job / capability | Primary regions | Avoid |
|---|---|---|---|
| V1 Find | J1/J4; U1/U3/U4 | Search and alias results, coverage/content scope, safe no-results help | Dumping all namespaces, autoplaying media, secret thumbnails in suggestions |
| V2 Answer | J1/J2; U2/U3/U5 | Named recipe steps, level requirements, mechanics/slot effects, contextual caveats, source summary | Fixed "weapon + passive" layout; universal "after 10 minutes" rule |
| V3 Prerequisites | J2; U6 | Current target, required conditions, alternative branches, source for each edge, unresolved links, the person's own marks where present | A falsely complete graph or asserting unlocks the person has not marked |
| V4 Scope and reveal | J3/J4; U3/U4 | User-chosen owned content, reveal scope, clear active filter state/reset | Inferring save progress or ownership; silent global spoiler toggles |
| V5 Source and correction | J5; U5/U7 | Page/revision/date, attribution, transformation note, conflict/coverage status, outbound source/correction | "Live data" label for a snapshot; automatic posting or authentication |
| V6 Collection browser | J6; U8/U9 | Collection switcher, sort, filter chips with counts, view-mode switch (grid / list / table / detail), labeled icon tiles, progress badges, side or stacked detail | Endless names-only lists; all columns by default; icon-only tiles; spoiler art in tiles |
| V7 Pairings | J7; U10 | Selected weapon or passive with its partner(s), input-first pairing cards, scope/progress filters, optional matrix for a filtered subset | Burying the pairing inside a long article; a fixed one-weapon-one-passive grid that hides zero-passive or union recipes |
| V8 My progress | J8; U11/U12 | Progress by kind and content pack with counts, bulk marking, undo, storage status, export, import with preview | Calling unmarked items "locked"; "Saved" before the write; silent import overwrite |
| V9 Next unlocks and session plan | J9; U13/U14 | Suggested next unlocks with reasons, modeled-coverage note, generated plan (hero, stage, weapons, items, included attempts, why), locks/excludes, alternatives, "Read the condition" list | An unexplained "best" plan; ranking uncodified conditions; revealing protected secrets; success guarantees |
| V10 Build lab | J10/J12; U15-U18 | Character and level; weapon and passive slots (icon tiles with level steppers, pairing badges); PowerUps panel or "My PowerUps" profile; player stats with source breakdown and cap marks; per-weapon output cards by tier with model status; "Not modeled" list; mechanics version; save | One unexplained "DPS" headline; a build score or ranking; applying a stat a weapon ignores; hiding which weapons are not modeled; every stat and field at once |
| V11 Compare builds | J11/J12; U19/U20 | Saved builds list (rename, duplicate, delete, undo); two or three builds side by side or one against a baseline on narrow screens; differences with sign and amount; "Why" per difference; version mismatch warning | Declaring a winner; comparing builds from different versions silently; a wide table that scrolls the whole page |

No view is justified merely because the old wiki had it. Article-style detail remains a source
route, not a requirement to reconstruct every wiki template or theme.
V6 replaces long category lists as the default way to browse a collection. V13 (peek) is the
first thing any tile, row or pairing card opens; V2 is the full page behind it.

| View | Job / capability | Primary regions | Avoid |
|---|---|---|---|
| V12 Home | J15/J16; U24/U25 | Continue (last build or pinned run), what's new card, next unlocks, start here on first use, pairings entry | A dashboard of empty modules; a tour wall; marketing; news not in scope |
| V13 Peek | J6/J7/J14; U22 | Identity, answer first (pairing or next step), 3-5 key facts, my mark, actions, open page | Replacing the view behind it; long prose; losing scroll, filters or focus on close |
| V14 Mechanics explainer | J13; U21 | One-line rule, interactive figure with my value, caps and floors, sources of the stat, weapons that ignore it, open in lab, confidence | A paragraph instead of a figure; a separate formula from the build lab; hiding uncertainty |
| V15 Run companion | J14; U23 | Pinned character and items within slot limits, next step per weapon, partner status, add picked item, keep screen on, end run | Navigating away on its own; small targets; anything that competes with the game for attention |
| V16 What's new | J15; U24 | Since date, added / changed / removed in scope, affected marks and builds, mark as seen | Dropping marks for removed IDs; revealing secrets inside changes; patch notes as walls of text |
| V17 Settings | J3/J4/J16; U26 | Content, spoilers, appearance, density, motion, data, about | Settings that apply to one screen only; hidden defaults; account prompts |

## F1: identify the next evolution step (U1, U2, U5)

1. Person enters a known name/alias or starts from a covered item. No setup required.
2. Results distinguish the requested item, variants, owned-content matches and unavailable coverage.
   Show text labels alongside recognizable icons where rights permit.
3. Person selects the item. The answer states the **next step** in input-first order, not an
   unlabeled final-form icon: required weapon(s), required level(s), required passive(s), then
   output(s) and the relevant context. This follows the explicit format requests in E19;
   it must not force every recipe into a weapon-plus-passive template.
4. A multi-step chain can be followed one step at a time; each step retains its own conditions.
5. Person can inspect mechanics and the source without losing the current target.

**Branches:** alias collision -> named choices, no automatic guess; variant -> explain the
scope difference; no passive required -> explicitly say so; unknown condition -> mark unverified
and link the source; result outside coverage -> say not covered, not "doesn't exist."
Unknown image -> text fallback, not a broken control.

**Waits:** local result update is responsive; a network fetch has an inline loading state.
Failed retrieval gives retry/source alternatives. Never display stale content as an updated answer.

**Defaults:** base-game scope until changed, standard nonsensitive recipe facts visible,
explicitly classified secrets hidden. Base-game-only is a filter, not an assumption about ownership.

## F2: explain why a recipe did not trigger (U2, U6, U7)

1. Person starts from the answer and chooses the relevant mechanics/prerequisite explanation.
2. The explanation distinguishes required levels, required inventory, chest reward eligibility,
   special stage/character conditions and banned/unavailable outputs when source-backed.
3. Person can follow a linked prerequisite and return to the original target.

**Branches:** state is not supplied -> show a checklist, never claim to diagnose the actual run;
several alternatives -> label alternatives, do not imply all are required; missing/cyclic dependency
-> show unresolved source information and stop traversal; conflicting sources -> flag the fact
for review, do not choose a convenient version silently.

**Waits:** the checklist is instant once the record is loaded. Any expanded path retrieval is
responsive with an inline indicator and an explicit failure message.

**Defaults:** no game-save access, no automatic unlock detection, no assumed level or current stage.

## F3: scope to owned content (U3, U1)

1. Person sees the active content scope before interpreting a result.
2. They select owned packs or the all-reviewed-content view; base game remains clearly identified.
3. Results and prerequisites update together. Out-of-scope requirements explain the content
   restriction without implying the person already owns, can unlock or has unlocked the item.

**Branches:** hidden match -> show that filters exclude matches with a clear widen-scope action;
unknown pack mapping -> label unclassified instead of treating it as base game; no supported
owned pack -> show coverage and source options. Preference storage unavailable -> keep a
session-only choice and say it will not persist, rather than claiming "saved."

**Waits:** filter updates are responsive; persistence failure is explicit at the control.
Cancel leaves the prior scope; reset shows exactly what changes.

## F4: protect and deliberately reveal spoilers (U4)

1. Person starts with ordinary mechanics readable and explicitly classified secrets hidden.
2. A protected result says why information is hidden without disclosing secret names, art,
   unlock text or next-stage outcomes in suggestions, previews or accessible labels.
3. Person may reveal just this item/path, or choose a clearly labeled broader reveal.
4. Returning to ordinary browsing respects the selected reveal scope, not an accidental global toggle.

**Branches:** exact secret-name query -> acknowledge the requested query but require deliberate
reveal for protected details; deep/shared link -> apply the viewer's policy, not the sender's;
unclassified content -> treat as protected until reviewed; ordinary required mechanics should
not be hidden merely because they contain progression information.

**Waits:** reveal is instant after loading; no fake loading animation.
**Defaults:** reveal-this-item, not reveal-everything. Show how to reset a broader reveal.
The policy itself is an open usability hypothesis (A7), not a tested taxonomy.

## F5: inspect provenance or report an error (U5, U7)

1. Person sees source snapshot and coverage status near the answer.
2. They can inspect the source page/revision, attribution/history reference and change note.
3. A correction route carries the affected item and revision for review.

**Branches:** outbound link unavailable -> keep the archived provenance and explain that the
source could not be reached; source mismatch -> flag pending review; issue submission needs
an external account -> disclose it before leaving and offer a copyable report; cancel -> keep
the answer intact. No data is sent until a deliberate external submission.

**Waits:** navigation has a normal destination; no "report sent" state when only a link opened.
**Defaults:** no analytics identity, save upload, email capture or automatic posting.

## F6: browse visually and narrow without scrolling forever (U8, U9)

1. Person opens a collection (for example Weapons). It shows a labeled icon grid in the active
   content scope, with the result count, current sort and any active filters visible.
2. They sort (name, in-game order, type, content pack, release/version, progress) and add filters
   (type, content pack, progress, has-evolution, pairs with a chosen passive). Each filter shows
   how many results it leaves; active filters appear as removable chips.
3. Recognizing the icon, they select a tile. A compact summary opens in place: name, type,
   pairing at a glance and progress mark. "Show all details" opens V2 without losing the grid.
4. They may switch to compact list, table (choose columns; exhaustive columns are opt-in) or
   detail. Query, sort, filter, selection and scroll position are kept.

**Branches:** filters exclude everything -> name the filter(s) responsible and offer to remove
each; a protected secret -> neutral placeholder tile with "Hidden secret" and a reveal action, no
silhouette, name or art in labels; icon missing or not rights-cleared -> text tile, same size and
actions; very narrow screen -> table falls back to list.

**Waits:** labels render before icons; icons load lazily without shifting the grid; sort/filter
updates are responsive with no spinner for local work.
**Defaults:** grid view, in-game order, active content scope, no progress filter, compact
summary. Remember the last view mode and column choice in this browser only.

## F7: recall a weapon-passive pairing at a glance (U10)

1. From any weapon or passive tile, list row or search result, the person opens its pairing.
   Pairing is the first thing shown in the summary and in V2, not a line deep in the article.
2. Weapon -> partner passive(s) or weapon(s), required levels and result, input-first
   ("Whip at max level + Hollow Heart -> Bloody Tear"). Passive -> every weapon it pairs with,
   as cards, filterable by scope and progress.
3. The pairing view (V7) lists all pairings as input-first cards; an optional matrix shows a
   filtered subset where both axes stay readable.

**Branches:** no passive needed (Bracelet chain) -> "No passive item required" and the next step;
several partners -> list each, never only the first; union or gift -> named mechanic with all
inputs; partner outside scope or hidden -> labeled, not dropped; pairing not reviewed -> "This
pairing has not been verified. Check the source."
**Waits:** instant once content is loaded.
**Defaults:** active content scope, protected results hidden, progress highlighting on when
progress exists ("both inputs marked").

## F8: mark my own progress (U11)

1. Person marks an item, secret, stage or unlock as done from its tile, row, detail or V8.
   The mark appears immediately and "Saved" shows only after the browser confirms the write.
2. Marking an unlock offers to mark its reviewed reward too (and the reverse). The offer is
   explicit and the linked mark is labeled; declining changes nothing.
3. For catch-up, they bulk-mark a group (content pack, version, list section or the visible
   filtered results), see the count first, and can undo the last action.
4. They can set "Skip in suggestions" for anything they do not want recommended.

**Branches:** storage unavailable or private mode -> "Progress is kept for this session only.
Export to keep it." and an export action; quota or write failure -> revert the mark visibly and
explain; another tab changed progress -> refresh with notice or show the conflict; clear all ->
confirm, offer export first.
**Waits:** marking is instant; a failed write is never hidden.
**Defaults:** everything "Not marked", which never means "locked in your game".
No account, no upload, no automatic detection.

## F9: move progress to another browser (U12)

1. Export: one action downloads a readable JSON file named with the date; the person can also
   copy the JSON. The file contains progress and optional preferences, nothing personal.
2. Import: choose a file or paste JSON. It is validated, then a preview shows counts for new,
   changed, unchanged, unknown and conflicting entries.
3. The person chooses **Merge** (default; keeps the newest mark per item) or **Replace**
   (confirm; export current progress first is offered). The change applies all at once.

**Branches:** not JSON, wrong format, too large -> nothing changes; say what is wrong; newer
schema version -> refuse and explain that this version cannot read it; IDs from another content
snapshot -> keep them as "unrecognized marks" and report the count; cancel at preview -> no change.
**Waits:** preview is responsive for a typical file; a large file shows progress, not a frozen view.
**Defaults:** merge, preferences unchanged unless the person opts in to import them.

## F10: suggest what to unlock next and plan one run (U13, U14)

1. V9 shows the modeled coverage first ("N of M unlocks in your scope can be planned") and the
   suggested next unlocks: not yet marked, prerequisites declared, in scope. Each shows why it
   is eligible and what it needs; the ranking rule is visible.
2. "Plan a session" generates a single-run plan: hero, stage, weapons/passives within slot limits,
   any required relic, arcana or item, and the list of attempts it covers, each with its reason.
   Cumulative goals appear separately as "progress toward".
3. The person locks or excludes a hero, stage, weapon or unlock and regenerates, or compares up
   to three alternatives. They can open any attempt's condition and source.
4. After playing, they mark what succeeded (F8); suggestions and plans update from those marks.

**Branches:** a condition is not modeled -> it appears under "Read the condition" with its source,
never in the plan; prerequisites missing -> show what to unlock first; protected secret ->
"Hidden secret: reveal to include it in plans" (revealing is per item by default); locks leave no
compatible plan -> say which lock blocks it; no eligible unlocks in scope -> say so and offer to
widen scope or review marks; ties -> show the tie-break.
**Waits:** suggestions are immediate; plan generation keeps the previous plan visible and can be
cancelled if it takes longer than the responsive target.
**Defaults:** active scope, per-item reveal, no locks, deterministic results. Never phrase a plan
as guaranteed, "optimal for you", or as advice about difficulty that the data does not support.

## F11: try a build and see how each choice changes it (U15, U16, U17, U18)

1. The person opens V10 empty, from any peek or page ("Add to build"), from an explainer ("Open
   in lab"), or from a session plan's weapons. The mechanics version and modeled coverage are shown first ("Data for game
   version X; 41 of 60 weapons in your scope fully modeled").
2. They pick a character and player level. Slots appear with the character's and mode's limits.
3. They add weapons and passives from a grid picker (the same sort/filter as V6, spoiler rules
   apply) and set each level with a stepper. Pairing badges show which slotted weapon and passive
   evolve and at what levels; "Evolve" swaps the weapon in its slot.
4. PowerUps use "My PowerUps" by default; the person can switch to "None", "All maxed" or ranks
   for this build only.
5. Every number updates together. Player stats show total, bonus and a cap mark. Weapon cards
   show T2 effective stats, then T3/T4 only where the weapon's record allows, with the
   assumptions in plain words.
6. Opening any number shows its breakdown: base, character, each passive, each PowerUp, cap
   applied, stats this weapon ignores, model status, sources.

**Branches:** slots full -> say which limit and offer to replace; duplicate item -> refused with
reason; union -> frees a slot and says so; weapon ignores a stat -> its value stays and says "Not
affected by Duration"; cap reached -> "Capped at 1000%" with the excess shown; weapon not modeled
-> identity and "Not modeled yet" with its source, no numbers beyond what is reviewed; Arcana,
Golden Egg, Limit Break, stage or mode chosen -> listed under "Not included in these numbers";
negative total -> shown as is; a level-step table not reviewed -> level 1 values only.
**Waits:** recalculation is instant; nothing partial is shown.
**Defaults:** no character bonuses beyond level 1, "My PowerUps" profile (empty until set),
compact output (T1 key stats and one line per weapon), full stats on request.
Never call a build "best", show a score, or rank builds.

## F12: save builds and compare them (U19, U20)

1. "Save build" names it (default: character + first two weapons). "Saved in this browser" shows
   only after the write. Unsaved changes are marked and kept as a draft in this browser; leaving
   the lab never blocks, and the draft reopens next time (R34).
2. V11 lists saved builds with rename, duplicate, delete and undo.
3. The person selects two or three builds, or one build and a baseline. Rows align by stat and by
   weapon. Each difference shows sign and amount; "Why" names the source of the difference.
4. Builds are part of the JSON export (F9); import previews builds as new, changed, conflicting or
   unrecognized, like progress.

**Branches:** storage unavailable -> "Session only: export to keep it"; builds saved with a
different mechanics version -> "Saved with game version X; numbers recalculated for version Y"
and the changed items listed; a build references a removed item -> kept and flagged, slot shown as
"Unrecognized item"; compare across characters -> allowed, with the character difference first;
nothing to compare -> explain how to save a build.
**Waits:** comparison is responsive; the previous comparison stays until the new one is ready.
**Defaults:** compare against the most recently opened build; differences only, with "Show all
rows" on request. Never declare a winner.

## F13: understand a rule with my own values (U21)

1. The person opens Codex > Rules and stats, taps a stat's name in the build lab, or searches a
   rule. V14 opens with the rule's one-line summary and a figure at a default value.
2. They change the value with a stepper or load it from a saved build ("Use my build"). The
   figure, the cap and floor marks and the worked examples update together.
3. Sources of the stat (items, PowerUps, characters) and weapons that ignore it appear as tiles
   that open peeks.
4. "Open in lab" opens V10 with that value applied.

**Branches:** rule not verified -> "This rule isn't verified yet" before the figure, sources
listed; stat with exceptions -> exceptions listed by weapon; value past a cap -> cap mark with
the excess shown; negative totals -> shown as is; no explainer yet -> sources only.
**Waits:** instant; figures use the same reviewed rules as the build lab (R39).
**Defaults:** the person's current build value when one is open, otherwise the base value.

## F14: peek at anything and return (U22)

1. Any glance (tile, row, chip, slot, suggestion) opens V13 over the current view: a bottom
   sheet on compact, a side sheet on medium, an inspector on expanded. The address records it.
2. The peek shows the answer first, then key facts, the person's mark and actions.
3. Tapping an item inside a peek replaces its content; Back returns to the previous peek.
4. Closing (Escape, Back, swipe down or close) restores the view with scroll, filters, selection
   and focus. "Open page" goes to V2; Back returns to the view with the peek.

**Branches:** hidden secret -> reveal step only (F4); out of scope -> labeled and viewable;
cold address with a peek -> the view loads behind it; item not covered -> says so with sources.
**Waits:** instant from loaded data.
**Defaults:** half-height sheet on compact; inspector stays open on expanded until closed.

## F15: run companion (U23)

1. The person chooses "Pin to run" from a session plan, a build or a peek, or opens the run
   companion from search or Home. V15 takes the full screen.
2. On first use, a one-time note says that switching apps on the same phone may pause the game
   (E32), so the companion is best on a second screen or while paused.
3. They add the items they picked, within the character's slot limits. Each pinned weapon shows
   its level, its next step (target level, partner passive and whether it is held, chest rule).
4. After each level-up they step a level with one tap or key; next steps update at once.
5. "Keep screen on" works only where the browser supports it and only when turned on.
6. "End run" offers "Mark unlocks", then closes; the pinned run stays until cleared.

**Branches:** nothing pinned -> "Add the items you have"; slots full -> say which limit; item
not modeled -> next step still shown, no numbers; screen-awake unsupported -> control hidden;
run ended without marks -> nothing marked automatically.
**Waits:** instant.
**Defaults:** large targets (`size.control.large`), minimal chrome, no navigation away on its own.

## F16: catch up on what's new (U24)

1. On return, the app compares the content snapshot and mechanics version seen last time (kept
   in this browser) with the current ones. Home shows a what's new card only when something
   in scope changed.
2. V16 lists added, changed and removed items in scope, with spoiler rules applied.
3. Marks on removed or renamed IDs are kept and flagged, never dropped. Saved builds affected by
   a mechanics version change are listed.
4. "Mark as seen" updates the last-seen snapshot.

**Branches:** first visit -> nothing to compare, say so; no changes -> no card, and V16 still
states the game version the data covers; a newer game version is known than the data covers ->
say so instead of implying nothing changed; changes outside
scope -> count only; a change touches a hidden secret -> hidden tile.
**Waits:** instant after the content loads.
**Defaults:** the card stays on Home until marked as seen.

## F17: first start, home and preferences (U25, U26)

1. First open, often from a link: the linked view opens directly. Opening Home first shows
   "Start here" with three spoiler-safe starting points and the scope bar; no sign-up or tour.
2. Spoilers default to Hide secrets (reveal one at a time); content scope defaults to the base
   game only until chosen, and matches outside it are counted with "Show all content" (F3).
3. On return, Home shows Continue, What's new and Next unlocks, each only when it has content.
4. Settings (V17) holds content, spoilers, appearance (System, Light, Dark), density, motion and
   data. Each change applies at once on every screen and is kept in this browser.

**Branches:** storage unavailable -> one notice that changes last only for this tab; no progress
yet -> start here; everything hidden by scope -> empty state with "Change scope"; the system asks
for reduced motion or more contrast -> followed unless overridden.
**Waits:** first content load shows skeletons in the shape of the content; then instant.
**Defaults:** system theme, comfortable density, system motion.

## State and accessibility contract

| Context | Required behavior | Future evidence |
|---|---|---|
| Rest / selected / active | Text and icon labels identify the item and selected context; state not color-only | Reviewed task screen |
| Hover / focus | Hover is supplementary; visible keyboard focus is never hidden; every action reachable without a pointer | Keyboard walkthrough |
| Disabled | Reason stated and alternative path provided; no mysterious inactive action | State review |
| Loading | Indicate the region waiting, preserve existing context, avoid layout jump; announce significant status changes accessibly | Slow/failing-request task |
| Empty | Distinguish no matching name, all results filtered, unsupported content, and genuinely absent relation | Negative fixtures |
| Error / conflict | Say what failed, whether old data is shown, and what to do next | Failure-path test |
| Small screen | No page-wide horizontal overflow at 320 CSS px; tables/graphs have a usable summary; primary actions at least 44 CSS px | Later responsive task |
| Zoom / screen reader | Reflow at 200%; semantic headings, labeled controls, list/table meaning, no icon-only recipe relations | Later accessibility audit |
| Themes / motion | Light/dark readable; contrast targets meet WCAG 2.2 AA; no mandatory animation; respect reduced motion | Later theme/assistive checks |
| Grid / matrix | Tiles are buttons or links with full accessible names; arrow-key or tab order follows visual order; a matrix has row/column headers and a list alternative; progress badges have text, not color only | Keyboard and screen-reader grid walkthrough |
| Saving / imported | Persisted state confirmed only after write; import shows a result summary that can be dismissed, with undo where feasible | Storage-failure and import fixtures |
| Numbers and breakdowns | Every computed number has a text label and unit; breakdowns are reachable by keyboard and read as a list of sources; cap, ignored and not-modeled states are words, not only color or icons; compare differences state direction in words ("12% higher") | Screen-reader walkthrough of V10/V11 |

These are requirements, not assertions that an implemented UI passes them. Proposed tokens,
component tiers, typography and palette are in the [design system](design/design-system.md),
with contrast checked for every role; none is implemented. Slate's documentation theme is not
the future product's visual identity.

## Proposed words and glossary

| Concept | Preferred wording | Avoid |
|---|---|---|
| Snapshot | "Source snapshot: [date]" | "Live" or "up to date" without verification |
| Content filter | "Content you own", with an explicit base-game option | "Detected DLC" without actual detection |
| Recipe | "Evolution", "Union", "Gift", "Morph" when those mechanics apply | Calling every transformation an identical evolution |
| Levels | "Requires [item] at level [n]" / "No passive item required" | Unqualified "max" or a universal eight-level assumption |
| Prerequisite | "Requires", with alternatives labeled "Either" | A single path presented as the only path without evidence |
| Unknown fact | "This condition has not been verified. Check the source." | Guessing an answer or silently filling a blank |
| Missing coverage | "This item is not covered in this snapshot." | "This item does not exist." |
| Filtered results | "Some matches are outside your selected content." | Empty output with no explanation |
| Protected information | "Reveal this item" / "Reveal all secrets" | Ambiguous "Continue" that reveals globally |
| Correction link | "Report a possible error" | "Error reported" before submission |
| Progress mark | "Marked unlocked" / "Not marked" | "Locked", "You have unlocked", "Detected" |
| Storage | "Saved in this browser" / "Session only: export to keep it" | "Saved" before the write; "Synced"; "Backed up" |
| Import | "Merge with my progress" / "Replace my progress" | "Restore" or "Sync" without a preview |
| Suggestion | "Suggested next" with "Why" | "You should", "Best", "Easy" without evidence |
| Session plan | "Covers N unlock attempts in one run" | "Optimal", "Guaranteed", success percentages |
| Unmodeled condition | "Read the condition" | Ranking it as if understood |
| View mode | "Grid", "List", "Table", "Details"; "Show all details" | "Advanced" or "Pro" modes |
| Build | "Build", "Saved build", "My PowerUps" | "Loadout score", "Tier", "Meta" |
| Modeled damage rate | "Modeled damage per second (one target, ideal conditions)" | Bare "DPS", "Real DPS", "Actual damage" |
| Player stat | "Might 175% (+75%)" with total and bonus | A single number without saying total or bonus |
| Cap | "Capped at 1000%" | Silently clamping |
| Ignored stat | "Not affected by Duration" | Hiding the row or applying the bonus |
| Model status | "Fully modeled", "Partly modeled", "Stats only", "Not modeled yet" | "Supported", "Accurate", "Verified" without a check |
| Mechanics version | "Data for game version X (snapshot date)" | "Current", "Latest" |
| Compare | "Higher", "Lower", "Same", with "Why" | "Better", "Worse", "Winner" |

App terms (run companion, pin to run, hidden secret, what's new, the five destinations) and the
UI text rules and catalogue are in [UI text](design/ui-text.md). The glossary is a drafting contract; revise it after language/comprehension testing. Translations
are not committed in MVP, but use unambiguous terms and retain source-name aliases for later work.

## Failure boundaries

No source access is bypassed; no user save is parsed; no external account is required for core
lookup; no site-data scraping runs on a visitor's device. Progress lives only in the browser and
in files the person exports; it is never uploaded. The source page and attributed archive
remain inspectable when the compact explanation cannot safely answer a case.
The build lab calculates only from reviewed records and the person's own choices. It never
reads a save, never estimates a missing value, and never presents a model as a measurement.
