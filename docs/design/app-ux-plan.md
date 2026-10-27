# App UX and UI plan

> **TL;DR:** The product is an app for understanding, planning and playing Vampire Survivors,
> not a wiki of articles. Pictures and numbers do most of the talking. There are five
> destinations (Home, Codex, Unlocks, Builds, Progress), search from every screen, and a
> four-step disclosure ladder (Glance, Peek, Page, Proof), so detail is always one deliberate
> step away and never in the way. Every screen below is planned from the job it serves down to
> its layout, components, states and UI text budget. It is assembled from a strict, token-based
> [design system](design-system.md). This is a written plan: nothing has been designed in a
> tool or built.

Status: proposal for review (OP12-OP16, O17-O23). It refines the behavior in
[experience requirements](../experience.md) and the requirements in the [spec](../spec.md).
Where this page and the spec disagree, the spec wins until this page is revised.
Scenarios and job detail are in [scenarios and jobs](scenarios-and-jobs.md); step-level flows
are in [task flows](task-flows.md).

## The app model

The person comes with one of three intents. The app is organized around them, not around the
old wiki's page types.

| Mode | The person wants to | Answered by | Main jobs | Promises |
|---|---|---|---|---|
| Understand | Know what something is, what it pairs with, how a rule works | Codex: collections, pairings, rules and stats; peeks; explainers | J1, J2, J5, J6, J7, J13 | P1, P4, P5, P8 |
| Plan | Decide what to do next and try it before playing | Unlocks (next unlocks, session plan); Builds (lab, compare) | J8, J9, J10, J11, J12 | P3, P6, P7 |
| Play | Use the answer while the game is running, then record what happened | Run companion; quick marks; Progress | J14, J8 | P1, P3, P8 |

J3, J4, J15 and J16 cut across all three modes: scope and spoilers, returning after an update,
and getting started. Home ties the modes together: it shows the person's own next steps.

### Design principles

Each principle is a rule a reviewer can check, and each traces to owner input or evidence.

| # | Principle | Means in practice | Grounding |
|---|---|---|---|
| 1 | Recognize, don't recall | Sprites and kind shapes first; names under them; search tolerates partial names and aliases | OP01, E12, E22 |
| 2 | Answer first, article never first | Every entity opens as a peek with its answer (pairing, next step); full pages are reached on purpose | OP02, OP03, OP12, E19 |
| 3 | Glance, peek, page, proof | Four disclosure levels with fixed fields per level ([disclosure ladder](#disclosure-ladder)) | OP03, P4 |
| 4 | Keep my place | Peeks and sheets layer over the view; Back restores scroll, filters and selection; addresses carry view state | P8, R31, R32 |
| 5 | Show, then say | Numbers, bars, pips and icons carry meaning, with text twins; UI text stays within budget | OP15, R35 |
| 6 | Direct and instant | Tap to place an item in a slot, step a level, and see the effect in the same frame; undo instead of confirm | OP08, OP09, R34 |
| 7 | Mine, local, portable | Progress, builds, pinned run and preferences stay in this browser and export as one JSON file | OP04, OP05 |
| 8 | Honest about limits | Coverage, model status, unverified rules and snapshot dates are visible where they matter | P4, P5, P7 |
| 9 | Same thing, same look | One component per concept: a weapon tile is the same in Codex, Unlocks, Builds and the companion | OP16, R36 |
| 10 | Adapts, never breaks | One layout system across phone, tablet and desktop; usable from 320 CSS px | OP13, R33 |

## Information architecture

```text
Home                         personal next steps / first-start points / what's new card
Codex                        Understand
  Weapons  Passives  Characters  Stages  Arcanas  Relics  PowerUps  Secrets
  Pairings                   weapon <-> passive, unions, gifts (input-first)
  Rules and stats            explainers: Might, Cooldown, Area, Amount, Duration, ... caps
  <entity page>              answer, path, details, sources
Unlocks                      Plan
  Next                       suggested next unlocks with "Why"
  Session plan               one run that attempts several unlocks
Builds                       Plan
  Lab                        slots, levels, PowerUps -> stats and output
  Saved                      my builds
  Compare                    two or three builds
Progress                     Play (record)
  By kind / by pack          marks, bulk marking, undo
  Import / export            one JSON file

Global, from every screen:   Search and commands, Run companion, What's new, Settings
```

Rules for the structure:

- Five destinations, never more than seven. A destination label is one word.
- No screen sits more than two levels below a destination (R31). Entity pages sit under Codex
  but open from anywhere.
- The run companion is a focus mode, not a destination: it takes the whole screen and has a
  single way out.
- Settings holds content scope, spoilers, theme, density and motion (U26). Scope is also shown,
  and can be changed, in a scope bar wherever it filters what is visible.

### Addresses (URL as state)

Every view has an address so it can be shared, bookmarked and restored. No address carries
progress, saved builds or a hidden secret's identity (R31). Names below are illustrative.

| Address | Shows |
|---|---|
| `/` | Home |
| `/codex/weapons?view=grid&sort=name&filter=pack:base` | Weapons collection with its view, sort and filters |
| `/codex/weapons?peek=weapon:whip` | The same collection with the Whip peek open |
| `/codex/weapon/whip` | Whip entity page |
| `/codex/pairings?item=passive:spinach` | Pairings for Spinach |
| `/codex/rules/cooldown` | Cooldown explainer |
| `/unlocks` and `/unlocks/plan` | Next unlocks and session plan |
| `/builds/lab?id=<local id>` | A saved build or the draft in this browser (the ID resolves only here; builds travel between browsers in the export file, not by link) |
| `/builds/compare?ids=<local id>,<local id>` | Compare saved builds (IDs resolve only in this browser) |
| `/progress` | My progress |
| `/run` | Run companion |
| `/whats-new` and `/settings` | What's new and Settings |

Anything in the secret class is always addressed by an opaque reference, whatever the spoiler
setting of the person who made the link, so a link shared by someone who has revealed
everything still shows no name in the address. Opening it shows a reveal step for anyone whose
setting hides it.

## Navigation by window class

Window classes come from breakpoint tokens
([design system](design-system.md#breakpoints-and-window-classes)). Components respond to their
container, so the same tile works in a phone grid and a desktop panel.

| | Compact (<40rem) | Medium (40-72rem) | Expanded (>=72rem) |
|---|---|---|---|
| Destinations | Bottom bar, 5 icons with 1-word labels | Side rail, icons with labels | Sidebar with labels and sub-sections |
| Search | Top bar button; full-screen palette | Top bar field; palette as dialog | Top bar field; palette as dialog; `/` or Ctrl/Cmd+K |
| Collections | One column of content; filters in a bottom sheet | Grid plus collapsible filter panel | Filter panel, grid, inspector (list-detail) |
| Peek | Bottom sheet (half, then full) | Side sheet | Inspector panel, no scrim |
| Build lab | Stacked: slots, stats, output; sticky summary | Two panes: slots and stats | Three panes: slots, stats, output |
| Compare | One build against a baseline; swipe between | Two columns | Up to three columns |
| Run companion | Full screen, one-hand zone at the bottom | Full screen, two columns | Full screen, three columns; keyboard |

```text
COMPACT 390                     MEDIUM 768                      EXPANDED 1280
+------------------+            +--+---------------------+      +--------+-----------------+----------+
| [<] Title    [Q] |            |  | Title          [Q]  |      | Logo   | Title       [Q] |          |
+------------------+            |H |---------------------|      | Home   |-----------------| Inspector|
|                  |            |C | content             |      | Codex  | content         | (peek)   |
|   content        |            |U |                     |      |  ...   |                 |          |
|                  |            |B |                     |      | Unlocks|                 |          |
|                  |            |P |                     |      | Builds |                 |          |
+------------------+            |  |                     |      | Progress                 |          |
| H  C  U  B  P    |            +--+---------------------+      +--------+-----------------+----------+
+------------------+             rail                            sidebar                    inspector
 bottom bar
```

## Disclosure ladder

Every entity (weapon, passive, character, stage, arcana, relic, PowerUp, secret) can be shown
at four levels. A level shows only its fields; more is always one deliberate step away (OP03).

| Level | Form | Opens from | Shows | Never shows |
|---|---|---|---|---|
| Glance | Tile (grid), row (list), chip (inline) | Collections, pairings, slots, suggestions, search | Sprite or monogram, name, kind shape, one status mark (progress or model status), optional pairing chip | Descriptions, stat tables, sources |
| Peek | Bottom sheet (compact), side sheet (medium), inspector (expanded) | Tap or Enter on any glance | The answer: pairing and next step (input-first), unlock requirement in scope, 3-5 key stats with units, my mark, actions (Mark, Add to build, Pin to run, Open page) | Full stat tables, history, long prose |
| Page | Full entity view | "Open page" in a peek, search result, address | Answer section, prerequisite path, all stats by level, related items, description as content text, notes | Raw source markup; anything outside the scope without a reveal |
| Proof | Expandable section or dialog | "Sources" or "How is this calculated?" on any number or claim | Source page, revision and date, attribution, transformation note, formula and per-source breakdown, confidence, correction link | Unattributed text; numbers without their inputs |

Fields per kind for Glance and Peek:

| Kind | Glance mark | Peek: answer first | Peek: key facts |
|---|---|---|---|
| Weapon | Pairing chip (partner passive sprite) | Evolves with [passive] at level [n] -> [result]; or union, gift or none | Base damage, cooldown, area, amount, max level; stats it ignores |
| Passive | Count of weapons it pairs with | Pairs with these weapons -> results | Stat changed per level, max level, cap |
| Evolution or union | Inputs shown as two small sprites | Inputs and required levels, chest rule | Output stats compared with the base weapon |
| Character | Starting weapon sprite | Starting weapon and stat bonuses | Unlock requirement in scope; growth per level |
| Stage | Progress mark | Unlocks available on this stage (in scope) | Stage modifiers; how to reach it |
| Arcana | Number | What it changes and when it can be chosen | Unlock requirement in scope |
| Relic | Progress mark | What it enables | Where it is found (in scope) |
| PowerUp | Rank pips | Effect per rank, max ranks | Price rule; my ranks from "My PowerUps" |
| Secret | Hidden mark unless revealed | Reveal step, then condition | Reward; related unlocks |

## Interaction patterns

These patterns are used everywhere. A screen does not invent a variant.

| Pattern | Rule | Where |
|---|---|---|
| Search and commands | One palette for items, rules, screens and actions ("Pin to run", "New build"); aliases and partial names; results grouped by kind with sprites; hidden secrets never suggested | Global (U1, U22) |
| Filter chips with counts | Each chip shows how many results it leaves; active chips sit in one row with a single "Clear"; on compact, chips open a sheet | Collections, Unlocks, Progress (U8) |
| View switcher | Grid, List, Table, Details as a segmented control; the choice is remembered per collection | Collections (U9) |
| Peek and return | A peek never replaces the view; Escape, Back or swipe down closes it and returns focus to the tile | All glances (U22) |
| Tap to place | Select a slot, then tap an item; or drag on pointer devices; both reach the same result | Build lab, Run companion (U15, U23) |
| Steppers and pips | Levels and ranks change with a stepper; pips show the level at a glance | Build lab, PowerUps, Run companion |
| Live delta | Any change shows its effect next to the number (+12% Area) | Build lab, explainers, compare |
| Undo over confirm | Reversible actions run at once with an Undo toast; only destructive bulk actions ask first | Progress, builds (R34) |
| Quick mark | A mark toggles from any glance or peek; long-press or the context menu shows all states | Progress everywhere (U11) |
| Scope bar | Shows the active content scope and spoiler level where they filter results; changes apply in place | Collections, Unlocks, search (U3, U4) |
| Reveal on request | Hidden items appear as a hidden tile; revealing one item never reveals others | Everywhere (U4) |
| Sticky summary | Long work surfaces keep the key result visible (stats in the lab, coverage in the plan) | Build lab, session plan |
| Keyboard | `/` search, `g` then a letter for destinations, arrow keys in grids, `Esc` closes, `[` and `]` step levels, `?` lists shortcuts | Medium and expanded |

## Screen plans

Each plan names the jobs and user-can statements it serves, the layout from the
[components and views](components.md#layouts) catalogue, its regions, key components, the
primary action, required states, how it adapts, and its UI text budget. "Budget" counts visible
UI words on first view at the compact size, excluding item names, numbers and content text
([UI text](ui-text.md#budgets)).

### Home (V12)

| Aspect | Plan |
|---|---|
| Serves | J15, J16; U24, U25; P8 |
| Layout | Hub |
| Regions | Header with search; "Continue" (last build or pinned run); "What's new" card when there are changes; "Next unlocks" (top three suggestions); "Pairings" quick entry; on first use, "Start here" (three reviewer-chosen, spoiler-safe base-game points, O23) |
| Components | SuggestionCard, BuildCard, RunCard, WhatsNewCard, EntityTile, ScopeBar |
| Primary action | Resume the most recent thing |
| States | First use (no marks), returning, everything hidden by scope, storage unavailable |
| Adapts | Compact: one column of modules; expanded: two columns with fixed module order |
| Budget | 15 words |

A module appears only when it has something to show (R38). Module order is fixed so the screen
is learnable: Continue, What's new, Next unlocks, Start here or Pairings.

```text
COMPACT 390
+--------------------------------+
| [logo]               [Q] [gear]|
+--------------------------------+
| Continue                       |
| +----------------------------+ |
| | [whip][bible] Bible + Whip | |
| | Build . edited 2 days ago >| |
| +----------------------------+ |
| What's new            3 >      |
| Next unlocks               >   |
| [spr] [spr] [spr]              |
| Name   Name   Name             |
| Pairings                   >   |
+--------------------------------+
| Home Codex Unlocks Builds Prog |
+--------------------------------+
```

### Search and commands (V1)

| Aspect | Plan |
|---|---|
| Serves | J1, J4, J14; U1, U3, U4, U22 |
| Layout | Overlay (palette), placed by the shell |
| Regions | Query field; recent items; results grouped by kind (sprite, name, kind); commands; "outside your content" note with count |
| Components | CommandPalette (overlay layout), EntityRow, ScopeBar, EmptyState |
| Primary action | Open the peek of the top result |
| States | Empty query (recent items), no match, matches outside scope, hidden secrets (never suggested) |
| Adapts | Compact: full screen; others: centered dialog |
| Budget | 6 words |

### Codex collection (V6)

| Aspect | Plan |
|---|---|
| Serves | J6, J3, J4; U8, U9, U3, U4, U11 |
| Layout | Collection |
| Regions | Collection tabs (Weapons, Passives, Characters, Stages, Arcanas, Relics, PowerUps, Secrets); scope bar; filter chips; sort; view switcher; results (Grid, List, Table, Details); inspector on expanded |
| Components | CollectionTabs, FilterBar, FacetSheet, SortMenu, ViewSwitcher, EntityTile, EntityRow, DataTable, PeekSheet |
| Primary action | Open a peek |
| States | First load (skeleton tiles in grid shape), filtered to nothing, out-of-scope matches, hidden tiles, progress marks |
| Adapts | Grid columns from container width (tile minimum 6rem); table shows 4 columns on compact and adds columns with width; Details is a card list |
| Budget | 10 words |

```text
EXPANDED 1280
+--------+----------------------------------------------+-------------------+
| Home   | Codex                                   [Q]  | Whip          [x] |
| Codex  | Weapons Passives Characters Stages ...       | [sprite]  Weapon  |
|  ...   |----------------------------------------------| Evolves with      |
|        | Base + 2 packs [v]  Spoilers: hidden [v]     | [spinach] Lv 8 -> |
|        | [Pairs 54] [Not marked 31] [Projectile 12] x | [bloody tear]     |
|        | Sort: Name [v]          [Grid|List|Table|Det]|-------------------|
|        | +----+ +----+ +----+ +----+ +----+ +----+    | Dmg 10  CD 1.35s  |
|        | |spr | |spr*| |spr | |spr | | ?? | |spr |    | Area 1  Amount 1  |
|        | |Whip| |Wand| |Knife |Axe | |Hidden |Cross   | Ignores: Duration |
|        | +----+ +----+ +----+ +----+ +----+ +----+    |-------------------|
|        | ...                                          | [Mark] [Add] [Pin]|
|        |                                              | Open page >       |
+--------+----------------------------------------------+-------------------+
 * pairing chip on tile; ?? keyhole hidden tile with reveal on request
 numbers and scope values in wireframes are placeholders, not reviewed values or defaults
```

### Peek (V13)

| Aspect | Plan |
|---|---|
| Serves | J6, J7, J14; U22, U10, U11 |
| Layout | Overlay host places it: bottom sheet, side sheet or inspector |
| Regions | Identity (sprite, name, kind); answer (pairing or next step, input-first); key facts (3-5); my mark; actions; "Open page" |
| Components | PeekSheet (overlay layout) with EntityHero, EvolutionPath, StatList, ActionBar |
| Primary action | The answer itself; then Mark or Add to build |
| States | Hidden secret (reveal step), out of scope (labeled, still viewable), not covered in snapshot, unverified condition |
| Adapts | Compact: half-height sheet that expands; medium: side sheet; expanded: inspector without scrim |
| Budget | 8 words |

```text
COMPACT 390, peek over the grid
+--------------------------------+
| (grid, dimmed, scroll kept)    |
+================================+
|            ----                |
| [sprite] Whip          Weapon  |
| Evolves                        |
| [whip]Lv8 + [spinach] -> [tear]|
| any chest after 10:00          |
| Dmg 10   CD 1.35s   Area 1     |
| Not marked              [Mark] |
| [Add to build] [Pin]  Page >   |
+--------------------------------+
```

### Entity page (V2, V3, V5)

| Aspect | Plan |
|---|---|
| Serves | J1, J2, J5; U2, U5, U6, U7 |
| Layout | Entity |
| Regions | Hero (sprite at whole-number scale, name, kind, mark); answer card; prerequisite path; stats by level (table, with a level slider on compact); related items (tiles); description (content text, attributed); sources (Proof) |
| Components | EntityHero, EvolutionPath (answer region), PrereqPath, DataTable (levels), EntityTile, ContentBlock, SourceCard |
| Primary action | Mark, or Add to build |
| States | Unverified condition, conflict between sources, not covered, hidden by scope (reveal step) |
| Adapts | Compact: sections stack with a jump bar; expanded: main column plus a sticky side column (mark, actions, sources) |
| Budget | 12 words |

### Pairings (V7)

| Aspect | Plan |
|---|---|
| Serves | J7, J2; U10, U5 |
| Layout | Collection (pairing variant) |
| Regions | Item picker (search plus recent); pairing cards input-first (weapon sprite + passive sprite -> result sprite, required levels, extra conditions); filters (scope, progress, recipe type); optional matrix for a filtered subset with a list alternative |
| Components | PairingCard, EntityChip, FilterBar, DataTable (matrix), EmptyState |
| Primary action | Pick an item and read its pairing |
| States | Zero-passive recipes, unions, gifts, multiple partners, unverified recipes, hidden results |
| Adapts | Compact: card list; expanded: cards plus optional matrix |
| Budget | 8 words |

```text
COMPACT 390
+--------------------------------+
| Pairings                  [Q]  |
| [Spinach v]  Base [v]          |
+--------------------------------+
| [spinach] + [wand] Lv 8        |
|      -> [holy wand]  Evolution |
| [spinach] + [fire] Lv 8        |
|      -> [hellfire]   Evolution |
+--------------------------------+
 pairings shown are placeholders until the reviewed recipe records exist
```

### Rules and stats explainer (V14)

| Aspect | Plan |
|---|---|
| Serves | J13, J12; U21, U16 |
| Layout | Explainer |
| Regions | Rule name and one-line summary (content text); interactive figure (my value on a scale, cap marks, the Cooldown floor, diminishing effect); sources of the stat (items, PowerUps, characters) as tiles; weapons that ignore it; "Open in lab"; confidence and sources |
| Components | MechanicFigure, Stepper, StatValue, Delta, EntityTile, StatusBadge, SourceCard |
| Primary action | Move the value and watch the result |
| States | Rule unverified, value past cap, negative totals, explainer not available yet |
| Adapts | Figure scales with its container; controls under the figure on compact, beside it on expanded |
| Budget | 10 words |

```text
COMPACT 390, Cooldown
+--------------------------------+
| Cooldown                       |
| Lower is faster                |
|  |=========o--------|---|      |
|  0%      -30%      cap  floor  |
| Your total  -30%   [-] [+]     |
| Whip fires every 0.95 s  -0.40s|
| From: [spr][spr][PowerUp x2]   |
| Ignores: none          Sources>|
| [Open in lab]                  |
+--------------------------------+
```

The figure always uses the same reviewed rule as the build lab (R39); it never has its own copy
of a formula.

### Unlocks: next and session plan (V9)

| Aspect | Plan |
|---|---|
| Serves | J8, J9; U13, U14, U4 |
| Layout | Hub (Next) and Workbench (Session plan) |
| Regions | Next: suggestion cards with sprite, condition summary, "Why", mark. Plan: character, stage, weapons and items as tiles; "Covers N unlock attempts"; included attempts; locks and excludes; alternatives; "Read the condition" list for unmodeled ones |
| Components | SuggestionCard, PlanCard, EntityTile, SlotGrid (read-only), Chip, ProgressMark, EmptyState |
| Primary action | Make the plan, then Pin to run |
| States | No marks yet, everything done in scope, conditions not modeled, conflicting attempts, secrets hidden |
| Adapts | Compact: plan summary sticky at the top, attempts below; expanded: plan beside attempts |
| Budget | 14 words |

### Build lab (V10)

| Aspect | Plan |
|---|---|
| Serves | J10, J12; U15, U16, U17, U18 |
| Layout | Workbench |
| Regions | Character and level; weapon and passive slots (SlotGrid with level pips and pairing badges); PowerUps (profile or custom) as a grid with rank pips; player stats with cap marks and live deltas; per-weapon output cards with model status; "Not modeled" list; mechanics version; Save |
| Components | SlotGrid, ItemPicker (overlay layout), PowerUpGrid, StatList, Breakdown, WeaponOutputCard, StatusBadge, Toast |
| Primary action | Place an item; then Save |
| States | Empty slots, slots full, item not modeled, partly modeled, stat capped, version mismatch, unsaved changes |
| Adapts | Compact: stacked, with a sticky stat summary and a segmented "Slots / Stats / Output"; medium: two panes; expanded: three panes |
| Budget | 18 words |

```text
EXPANDED 1280
+--------+-------------------------+-----------------------+---------------------------+
| nav    | Antonio  Lv 1     [v]   | Stats                 | Output (one target, ideal)|
|        | Weapons 6               | Might   175%  +75%  > | Whip        Fully modeled |
|        | [whip 8][bibl 8][ + ]   | Cooldown -30%       > | 41/s  [=====    ]       > |
|        | [ +  ][ +  ][ +  ]      | Area    140%  +40%  > | King Bible  Partly modeled|
|        | Passives 6              | Amount  +2            | 28/s  [===      ]       > |
|        | [spin 5][empt 5][ + ]   | Duration 130%       > | Not modeled: 0            |
|        | PowerUps  My profile [v]|                       |                           |
|        | Mig ooooo  CD oo...     |                       | Data: game 1.x, snapshot  |
|        |                         |                       |        [Save] [Compare]   |
+--------+-------------------------+-----------------------+---------------------------+
 ">" opens the Breakdown (Proof) for that number; all numbers are placeholders
```

### Compare builds (V11)

| Aspect | Plan |
|---|---|
| Serves | J11, J12; U19, U20 |
| Layout | Compare |
| Regions | Build pickers (2-3); aligned rows: slots, stats, output; difference column with sign, amount and "Why"; version warning |
| Components | CompareColumn, DiffList, Delta, Breakdown, StatusBadge, BuildCard |
| Primary action | Pick builds to compare |
| States | One saved build, different mechanics versions, items not modeled in one build |
| Adapts | Compact: one build against a baseline, swipe to change; medium: two; expanded: three |
| Budget | 10 words |

### Progress (V8)

| Aspect | Plan |
|---|---|
| Serves | J8; U11, U12 |
| Layout | Collection (progress variant) |
| Regions | Summary by kind and pack (counts and bars); grid of items with marks; bulk select; storage status; Export; Import with preview (merge or replace) |
| Components | ProgressSummary, EntityTile, BulkBar, ImportPreview, StorageStatus, Toast |
| Primary action | Mark items |
| States | Storage unavailable (session only), import invalid, import from a newer schema, removed IDs flagged |
| Adapts | Compact: summary then grid; expanded: summary column plus grid |
| Budget | 12 words |

### Run companion (V15)

| Aspect | Plan |
|---|---|
| Serves | J14; U23, U22 |
| Layout | Focus |
| Regions | Character; pinned weapons and passives with level pips (within slot limits); per pinned weapon, the next step (level target, partner passive, chest rule); exit |
| Components | RunSlotRow (one per pinned weapon), SlotGrid (large), Stepper, Toast |
| Primary action | Step a pinned item's level, or add the item just picked |
| States | Nothing pinned, slots full, item not modeled, screen-awake on or off, game on the same phone (one-time note) |
| Adapts | Compact: large targets in the bottom two thirds; expanded: three columns, keyboard steps |
| Budget | 6 words |

```text
COMPACT 390, run companion
+--------------------------------+
| Antonio            [awake] [x] |
+--------------------------------+
| [whip] 6 oooooo..  -> Lv 8     |
|        + [spinach] have Lv 2 ok|
| [bible] 3 ooo.....  -> Lv 8    |
|        + [spellbinder] missing |
| [garlic] 1 o.......            |
|        + [pummarola] missing   |
+--------------------------------+
| Passives  [spin 2][ + ][ + ]   |
|                                |
|   [ + Add picked item ]        |
+--------------------------------+
```

### What's new (V16)

| Aspect | Plan |
|---|---|
| Serves | J15; U24 |
| Layout | Hub (list variant) |
| Regions | Since [date]; the game version the data covers, and a note when a newer game version is known; Added, Changed, Removed groups with tiles; affected marks; affected saved builds (mechanics version); dismiss |
| Components | DiffList, EntityTile, BuildCard, StatusBadge, EmptyState |
| Primary action | Review an affected item or build |
| States | First visit (nothing to compare), no changes, changes outside scope (count only), spoilers inside changes (hidden tiles) |
| Adapts | Compact: grouped list; expanded: groups side by side |
| Budget | 8 words |

```text
COMPACT 390, what's new
+--------------------------------+
| <  What's new                  |
| Since 12 Aug . data: game 1.x  |
+--------------------------------+
| Added  8                       |
| [spr] [spr] [spr] [spr] [key]  |
| Name  Name  Name  Name  Hidden |
| Changed  1                     |
| [bible] recipe . Affects 1     |
|         saved build          > |
| Removed  0                     |
+--------------------------------+
|        [ Mark as seen ]        |
+--------------------------------+
```

### Settings (V17, with V4)

| Aspect | Plan |
|---|---|
| Serves | J3, J4, J16; U26, U3, U4 |
| Layout | Settings |
| Regions | Content (packs I own); Spoilers (Hide secrets, the default, or Show all; see F4); Appearance (System, Light, Dark; more contrast follows the system); Density (Comfortable, Compact); Motion (System, Reduce); Data (storage status, export, import, clear); About (snapshot, coverage, sources, licence) |
| Components | SettingsGroup, SegmentedControl, Switch, Checkbox, StorageStatus, SourceCard |
| Primary action | Change a setting; it applies at once |
| States | Storage unavailable, preference conflicts with a system setting |
| Adapts | Compact: one list; expanded: group navigation beside the groups |
| Budget | 25 words (setting labels are the content of this screen) |

```text
COMPACT 390, settings
+--------------------------------+
| <  Settings                    |
+--------------------------------+
| Content you own                |
| [x] Base game  [ ] Pack A  ... |
| Spoilers                       |
| [Hide secrets | Show all]      |
| Appearance                     |
| [System | Light | Dark]        |
| Density   [Comfortable|Compact]|
| Motion    [System | Reduce]    |
| Data                           |
| Saved in this browser          |
| [Export file] [Import file]    |
| About                        > |
+--------------------------------+
```

## Visual direction

The visual identity is the app's own. It must not copy the game's logo, fonts, menus or trade
dress, and must not suggest official affiliation (spec non-goals, O21).

| Element | Direction |
|---|---|
| Character | Calm surfaces in light and dark that let colourful pixel sprites carry the colour; the UI recedes, the content stands out |
| Colour | Neutral surfaces; one accent for interactive state; kind colours used sparingly as marks with shape twins ([design system](design-system.md#game-domain-roles)) |
| Sprites | Pixel art only inside sprite frames, scaled by whole numbers (1x, 2x, 3x, 4x) with crisp edges; never blurred, stretched or recoloured; monogram fallback when an image is not cleared for use |
| Type | One UI sans-serif family with tabular numerals for changing numbers; one mono family for formulas; candidates must be OFL-licensed; final choice after licence review |
| Icons | One outline icon set for UI actions, always paired with a label or accessible name; kind shapes are separate from UI icons |
| Shape | Medium radius on cards and sheets; full radius on chips; square sprite frames |
| Density | Comfortable by default; Compact density reduces spacing tokens, never text size, and never targets below 44 CSS px |
| Depth | Elevation only for layers (sheet, dialog, toast); cards are flat with a border |

Sprite use depends on asset-rights clearance ([archive readiness](../research/data-readiness.md)).
Until cleared, tiles use the monogram fallback with the kind shape, so the visual-first claim is
also tested without game art (A24).

## Motion

Motion explains change; it is never decoration (R34).

| Moment | Motion | Duration token | Reduced motion |
|---|---|---|---|
| Peek opens or closes | Sheet slides from its edge; inspector fades | `duration.normal` | Instant, no slide |
| Item placed in a slot | Tile moves to the slot and settles | `duration.normal` | Instant; slot outline shows once |
| Number changes | Value rolls; delta appears beside it | `duration.fast`; delta held 3 s | Value swaps; delta stays until the next change |
| Destination switch | Shared-element transition for the selected tile where supported | `duration.normal` | Instant |
| Toast | Rises from the bottom edge | `duration.fast` | Instant |
| Mark toggled | Mark scales with `scale.press` | `duration.fast` | No scale |

No motion loops, autoplays or runs longer than `duration.slow`. Nothing flashes more than three
times per second.

## Accessibility and input

- WCAG 2.2 AA in light, dark and more-contrast contexts; contrast verified for every text and
  non-text role ([design system](design-system.md#colour)).
- Targets at least 44 by 44 CSS px; hover effects only on devices that hover.
- Every tile is a link or button with a full name ("Whip, weapon, evolves with Spinach, not
  marked"); grids support arrow keys; the matrix has a list alternative.
- Peeks and dialogs move focus in and return it; sheets close with Escape and Back.
- Live deltas are announced politely, batched, never on every keystroke.
- Reflows at 200% zoom and from 320 CSS px; no page-wide horizontal scroll.
- Colour, shape, icon and position always have a text twin (protective statement in the spec).

## Waits

Waits follow the budgets in
[spec section 8](../spec.md#8-performance-and-waits-proposed-unmeasured). Local actions (mark,
place, step, open a peek) are instant and never show a spinner. The first content load shows
skeletons in the shape of the content. Import shows "Reading file..." and then a preview.
Nothing waits silently.

## What this plan does not decide

- Framework, rendering approach, hosting, analytics or design tool (none chosen; the current
  phase forbids implementation).
- Final font, icon set and sprite rights (licence review needed).
- Final palette values (proposed in the [design system](design-system.md); confirmed after the
  S1 visual test).
- Whether the app installs for offline use (a later decision; local-first data does not need it).

## How this plan will be tested (future, not run)

| Question | Assumption | Cheapest check | Definition of Done row |
|---|---|---|---|
| Do players understand screens that use few words? | A24 | Five-second and first-click tests on static frames of Home, Codex grid, Peek and Build lab | S1-11 |
| Does the app model still let people land on an item from a web search or a shared link? | A25 | Cold-link test: open an address to an entity and to a peek | S2-19 |
| Can contributors keep to the design system? | A26 | Contributor dry run against the rules and the enforcement suite list | S1-12, S2-18 |
| Is the run companion useful on a second screen? | A27 | Diary-style check with players during real runs (needs authorization) | S2-20 |
