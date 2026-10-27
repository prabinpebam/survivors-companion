# Work plan

> **TL;DR:** Current mode is **show me the UX sooner / work with me** (owner, 2026-10-26): a
> local, iterable prototype of the app in `app/` so the UX and UI can be judged on real screens.
> The discovery phase below it is complete and kept as the record.

## Prototype phase (current)

**Goal:** the owner can use the main flows on real screens with real archive content and decide
keep, change or drop for each, before anything is hardened.

**Done when:** each increment below is reachable at the local prototype address with a "Try it"
and has the owner's verdict; the shortcuts list says what production work must replace.

**Limits:** read the archive, never modify it; no accounts, analytics or participant contact.
Development is local (`app/` dev server on `127.0.0.1`). On 2026-10-27 the owner asked for a
public repository and a GitHub Pages deployment. The site is published from a separate
`public` branch (no raw archive) at <https://prabinpebam.github.io/survivors-companion/>, with
game art, the wiki's CC BY-NC-SA attribution and a non-affiliation notice. The handoff's "Icon
rights" question stays open; the monogram fallback can replace the art if needed.
Coding was authorized by the owner on 2026-10-26 ("Start implementation"); the S1 research
gates remain open and are not claimed.

| ID | Increment | Serves | Check before showing |
|---|---|---|---|
| I10 | Shell, tokens, archive data projection, Codex collections (grid, list, table, sort, filters), peek with the pairing answer, Pairings, quick marks, Settings | U8-U11, U22, U26 partial; OP01-OP03, OP12-OP16 | Type check, production build, screenshots at 390 and 1280 px in light and dark |
| I11 | Build lab: slots, levels, PowerUps, derived stats with sources | U15-U18; OP08-OP11 | Same, plus golden cases from build mechanics |
| I12 | Progress export and import; Unlocks next and session plan | U11-U14; OP04-OP07 | Same, plus a round-trip import |
| I13 | Home, run companion, compare, what's new | U19-U25 | Same |

**Status (2026-10-26):** I10 is ready to try at `http://127.0.0.1:5173/` (always-on dev server,
W13); the owner's verdict is pending. Checks held: `npm run check`, `npm run build`, and a
headless Playwright sweep of 10 screens at 320, 390 and 1280 px in light and dark (no sideways
scroll, no broken images, no page errors). Fixed on the way: facet chips overflowing at 1280 px;
a doubled Home title. I10 gaps: no entity page (peek only), filters inline rather than a bottom
sheet on compact, no pairing chip on weapon tiles; Unlocks, Builds and Progress are placeholders.

**I10 iteration 1 (owner feedback, 2026-10-26).**

- The inspector is docked and open from the start (empty state until a pick), resizable by a
  keyboard-operable splitter, and scrolls on its own; every region uses minimal scrollbars.
- A theme control switches between light and dark.
- Collections arrange like a file manager (W15): Sort by and Group by menus, collapsible group
  headers with counts, and table columns that sort, resize and fit.

Checks held: `npm run check`, `npm run build`, and two headless Playwright scripts covering the
inspector, menus, groups, column sort/resize/fit and persistence at 390, 800, 1280 and 1440 px
in light and dark. Fixed on the way:
- The splitter was hidden under the inspector (it now isolates its stacking).
- The dev server's file watcher missed edits and served stale modules; it now polls.

**I10 iteration 2: two columns and the whole page (owner feedback, 2026-10-26).**

- The Codex is two columns beside the navigation (W16):
  - a narrower item list, resizable between 18 and 48rem;
  - a wide detail column.
- The detail column leads with the glance (evolution, key stats, marks), then "All details". That
  holds everything the archived wiki page holds (infobox stats, every section, tables, galleries,
  links), in closed sections whose teasers say what's inside (a first sentence or a count). Open
  all and Close all act on every section; which ones are open is remembered per kind. Long tables
  and lists show 10 rows with "Show all N". Links to other items open them in place.
- Stages appear once each; the archive's three rows per stage (Normal, Hyper, Inverse) become
  the named values of each Modifiers stat.
- All stats show as tiles, not tables (owner feedback): each tile has the stat's name, its value
  large, any other tab as a named line (Max, Hyper, Inverse) and the wiki's hint. Empty tabs are
  dropped and prose values take a whole row. Tables stay for the wiki's own tables (Levels, Combos).
- Bold typography (owner feedback): a ramp with large steps (labels 0.75rem, tile values 1.5rem,
  group headers and screen titles 2.25rem, the item's name 3.25rem), group headers
  that read like an article's headings, larger pictures in every tile, and each tile's hint shown
  once in a list after the tiles. Recorded in the design system's Typography section.
- Softer emphasis (owner feedback): one strong weight, semibold (600), replaces bold and heavy
  everywhere, including the browser's own bold elements; links are coloured, never underlined
  (hover shifts colour); every tile and card shares a larger radius (`c.shared.tile-radius`,
  0.75rem).
- Room to breathe (owner feedback): each section of the details column is its own outlined tile
  that opens and closes on its own, with 1.25rem between tiles and a wider inset inside them,
  instead of one bordered stack of rows.
- One heading per recipe (owner feedback): beside an item, "Evolves with" or "Made from" already
  names the recipe, so its card drops the repeated "Evolution" label; a Union keeps its label,
  and the Pairings view keeps every card's type.
- Cards, not paragraphs (owner feedback): a list whose items are "picture, name - what it does"
  (arcanas, stage items, relics; 557 entries) becomes entry cards, with nested points kept inside
  the card; picture-and-name lists become tiles; an Effects or Mechanics section's paragraphs
  become one card per statement, led by the picture of the stat it names (about 2,000 statements
  across 392 sections). Found by a pure transform (`app/src/data/cards.ts`) and drawn by a new
  `RichCards` compound; no source words are rewritten. Other prose (About, Tips) stays prose.
- Small tables as tiles (owner feedback): a table with one header row, no merged cells, two to
  four columns and a short, unique name in its first column becomes one tile per row (Levels,
  Limit Break, Passive bonuses, PowerUp ranks; 626 of 1,815 tables). The first cell titles the
  tile, a wordy second column is its words, a two-column table's short value is shown large like
  a stat, and other columns are labelled values. Comparison tables (Combos, Evolutions, wide stat
  tables) stay tables; Waves became wave cards (below).
- Combination grids (owner feedback; 1,068 Combos tables): the item cell spans all four rows
  (icons, marks, icons, marks) instead of sitting under an empty corner, as it did in the source.
  Only leading header rows head a table, so the second row of icons stays in place. Picture-only
  cells are centred, footnote markers [n] are kept beside their marks, and the item shows at tile
  size. Picture paths keep `&` and `,` literal, which the dev server needs (19 pictures were broken).
- Filters fold into a disclosure with an active count.
- Each tab's own page first (owner feedback): with nothing picked, the detail column shows the
  tab's wiki page (Weapons, Passive items, Characters, Stages, Arcanas, Relics, PowerUps; Evolution
  for Pairings), not the empty state. Its introduction is open and the rest is closed sections, as
  for an item. The list the tab already shows is left out at build time: tables naming three or
  more of the tab's items or one item every other row, and runs of item links with almost no
  words between them (the character picture grids); 57 blocks across the eight pages. Mechanics,
  stats, notes, update history and trivia stay. The page named per tab is data in
  `collections.json`. Like the empty state, it shows only when docked: below 72rem nothing opens
  over the list and focus stays put. Fixed on the way: collapsed teasers clipped their descenders.
- Bigger pictures in Details cards (owner feedback): 6rem squares instead of 3rem. Stage
  pictures, which are landscape screenshots, show 16rem wide at their own shape. Each tab sets
  its default arrangement in data, and Stages now opens in Details.
- Segmented control redesign (owner feedback: the selected option's ring clashed with the group
  border). It's now a track and a thumb. The track is 44px, matching the menu buttons. Options sit
  inside it with an even inset, with corners nested to the track's radius. The chosen option is a
  solid accent fill with no ring, and a transparent outline keeps it visible in forced colours.
  Each option's press target still covers the track's full height.
- Stage pictures as content (owner feedback): a small stage picture is useless, so stages drop the
  header icon. The header holds only the name, kind, pack and close. The screenshot is the first
  content under it, filling the detail column at its own shape, with crisp pixels and no cropping.
  It goes in a new `media` region of the inspector, and the tab turns it on in data
  (`headerPicture: "cover"`). Other kinds keep their icon.
- Arcanas corrected against the source page (owner feedback). The source has two tables, Arcana
  (0 to XXI) and Darkana (13 cards). The tab mixed them and showed small numeral icons. It now opens
  grouped by type (a new `defaultGroup` in data; picking None is kept as `group=none`). Its type is
  also a filter and a table column. Each card shows its card art. The detail lists everything the
  source says the card affects, 564 in total, with pictures and links, including pickups such as
  Gold Coin and Experience Gem that were dropped before. It also shows How to unlock and the source's
  Notes, which were missing. Pictures behind file redirects (Nitesco, the Speculo weapons) resolve
  as the wiki shows them. The header says Arcana or Darkana instead of the generic kind.
- Weapon combination tables redesigned (owner feedback). The weapon sits in a quiet wrapper tile
  beside separate rounded tables, one per band (an icon row and its marks row), with even gaps and
  padding. Evolution recipe icons wrap instead of crowding, and narrow screens scroll the bands
  inside the wrapper, not the page. The harsh near-black fill on tiles and table headers in dark
  is now a softer new role, `color.bg.tile` (`#1F2129`, a step above raised). Inputs and tracks keep
  `color.bg.sunken`. The new role passes the same contrast checks as sunken.
- Group header counts in a round badge (owner feedback). In a grouped grid or list the count now sits
  at the right end of the header row, after the rule, in a circle (`size.badge`, tile fill, muted
  semibold numerals) that widens into a pill for longer numbers. A grouped table uses the same badge
  beside the group name, because a wide table's right edge may be out of view.
- Typography opened up (owner feedback: "too tightly packed and intimidating"). Reading text is
  a new `text.body` (17px on a 28px line) in content, notes, descriptions and How to unlock.
  Headings inside content step up to a new `text.subhead` (20px). Every line height is looser
  (labels 12/18, small 14/22, controls 16/26, values 24/32). Tile and field labels grow from 12 to
  14px, and recipe names from 12 to 14px semibold. Paragraphs, list items, figures and captions,
  tiles, cards, notes and the detail column's regions all get more space, and pictures sit
  `space.3` or more from their words. Details cards show the name as a heading and their
  description at 16px.
- No needless width limits (owner feedback: "Challenge" split mid-word in a stage's facts). Fact
  tiles no longer sit in fixed 7.5rem columns. They wrap as a row that sizes to their content
  and shares the full width, and a word breaks only when it can't fit on the screen at all (no
  `overflow-wrap: anywhere` or auto hyphenation on values). Recipe pieces grow with their names.
  Codex grid columns are wide enough for the longest one-word name in the data (Frogamorphosis).
  Checked on six detail screens at 320, 390, 800, 1100 and 1440 px: no word wider than its box.
- Waves as cards (owner feedback): every stage's waves table (27 tables, 709 waves; Holy
  Forbidden's prose-style table stays a table) becomes one card per wave
  (`app/src/data/waves.ts`, drawn by a new `WaveCards` compound). The time leads the card, as
  a large heading, with a tag for a variant (Moongolow's Eclipse and Normal rows share a
  time). The enemies follow as a row of sprite tiles, each named on hover and as alt text.
  Beside them, the enemy minimum, maximum and spawn interval appear as pills with an icon
  (new `crowd`, `crowd-max` and `timer` glyphs; the column name is the tooltip and the hidden
  term). Bosses and the treasure they drop get their own panel: each boss's sprite and name,
  the chest's Level and Evolution, the odds of each chest tier, and the rewards as an ordered
  row of chips, one per slot as in the source list. Map events and notes close the card under
  a hairline. Row and column spans are resolved; a cell that doesn't read as expected keeps
  its source runs, and "-" or "N/A" shows nothing. Each card takes a full row (owner feedback:
  one card per row, not two) and has two rows (owner feedback): the time, enemies and counts;
  then up to three panels side by side (Bosses & Treasure, the widest; Map events; Notes),
  wrapping to fewer columns when narrow.
- Map events as a table (owner feedback: run-on lines were hard to read): each event cell
  (373 cells, 548 events across 28 stages) is read into records, each with its picture, its
  name, the source's summary line ("0:10 / 20% / x6") and its labelled values (Unit, Amount
  per, Chance, Repeats (max), Delay, Duration, Range, Interval; only those the event has). A
  new `RecordTable` fundamental first drew them as one table with a row group per event; each
  event is now its own small aligned table in the record grid (see below). Map events take the
  widest share of the
  row. Moongolow's one prose event stays prose. Checked on every stage at 390, 800, 1100 and
  1440 px: every wave and event table renders, and no table is wider than its panel.
- Mob pictures at 64 px or more (owner feedback: mobs aren't recognisable smaller). Small sizes
  are kept for pictures in running text only; enemies, bosses and map events in wave cards,
  cards, tiles and stat tiles now use the 72 px sprite step (`size.sprite.lg`), and a map
  event's picture sits beside its name and summary. Many wiki sprites sit in a mostly empty
  canvas (an enemy of 76×96 pixels in 256×256), so a bigger frame alone didn't help:
  `npm run data` now trims the clear margin from the generated copy of any still PNG whose
  content fills less than 80% of its canvas (312 of 2,513 pictures; `app/scripts/trim.mjs`,
  using `pngjs`). Pixels are unchanged, `resources/` is never written, and each picture's
  shown size in the data is scaled by the same crop, so inline pictures keep their scale.
  Codex list and table rows keep 32 px item sprites (items, never mobs); chest and odds icons
  are unchanged.
- Traps as tiles (owner feedback: adapt them to the tile system, several to a row). A stage's
  Traps table (a wide table whose units have pictures and whose body has no spans) is read into
  record tiles by `recordCards`: the event names the tile, the unit leads with its 72 px
  picture, the short columns (Amount, Duration, Range) become labelled values, and the wordy
  Notes column closes the tile under a hairline. This matches exactly the five stages with trap
  data (Abyss Foscari, Dairy Plant, Gallo Tower, Laborratory, Lake Foscari); Ode to
  Castlevania's empty trap table stays a table.
- A shared record grid (owner feedback: short records stacked full width waste the room). New
  tokens `size.record.min` and `size.record.max` (15 and 22 rem) set an item's narrowest and
  widest width; items take as many equal columns as fit and wrap when narrow. Used by trap tiles
  and by the events inside a wave's Map events panel. The grid applies within its own container
  only (owner feedback): Map events stay one panel beside Bosses & Treasure and Notes, its
  records have no surface of their own, and the panel's share of the row doesn't depend on
  them, so records stack in a narrow panel and sit side by side when the panel has the room.
  Boss pictures no longer shrink under 72 px in a narrow Bosses & Treasure panel. Checked on
  six stages at 320 to 1440 px: no sideways scroll, mob pictures at 72 px outside running text.
- Short forms for units and labels (owner feedback: "Duration (seconds)" and the like crowd the
  screen). A copy audit of the generated data found about 1,675 "seconds" in values, 116 long
  labels ("Spawn interval (seconds)", "Enemy minimum", "Critical Multiplier") and minutes and
  hours in unlock lines. One build-time module (`app/scripts/short.mjs`) now shortens 8,039
  strings: values get "s", "ms", "min", "h" and "/s" after a number, joined by a no-break space;
  labels and headers also get "(s)", Max, Min, Crit and XP. Paragraphs, quotes, notes, headings
  and captions keep the source's words, and game stat names (Max Health, Move Speed) are kept.
  A column's unit moves onto its bare numbers in tiles ("Duration", "5.0 s"); stage modifiers
  read "Gold multiplier", "XP bonus". Rule recorded in [UI text](../design/ui-text.md#short-forms).
- Published (owner, 2026-10-27): <https://prabinpebam.github.io/survivors-companion/>. The app
  takes its base path from the build (`npm run build:pages`): the router strips the base from
  incoming addresses and adds it to outgoing ones, internal links get it in one place, and data
  and picture URLs use it. Pages answers deep links with a copy of `index.html` (`404.html`).
  Settings → About links to the wiki and the CC BY-NC-SA licence. Checked on a Pages-like local
  server: home, tabs, peeks, back, a deep link, pictures and the docs at `/docs/`.

Checks held: `npm run check`, `npm run build`, two Playwright scripts (two-column behaviour and
progressive reveal; arrange menus and table columns) and a 10-screen sweep at 320, 390, 800, 1100,
1280 and 1440 px in light and dark. Fixed on the way:
- Duplicate stage keys.
- Single-value stat rows squeezed into the first column (they now span).
- Prose labels wrapping one word per line.
- Table headers hidden under the pinned name column when scrolled into view (WCAG 2.4.11).

### Working defaults (prototype)

| ID | Choice | Reason / reversal |
|---|---|---|
| W7 | Vite + Preact + TypeScript in `app/`, packages from the approved npm proxy | Small runtime, fast reload, typed props for sealed components; replaceable (O7 stays open for production) |
| W8 | Tokens as DTCG JSON in `app/design/tokens/` (started from the agentic-craft `templates/agentic-craft/tokens/` starter); the kit's own `build-tokens`, `check-tokens`, `lint-styles` and `lint-copy` tools run from the pinned submodule; components read only semantic and their own component tokens | Keeps OP16 token discipline from the first screen with the harness's tools, not a re-invented generator |
| W9 | A read-only projection script turns archive bucket rows and infobox parameters into `app/public/data/codex.json` and copies sprites; generated output is not committed | Real content without an importer or database; regenerate with `npm run data` |
| W10 | Marks and preferences in `localStorage` | Fastest path to judge marking; IndexedDB and export come in I12 |
| W11 | Icon drawing is a tier-0 `Glyph` module; the `Icon` fundamental wraps it for compounds | Fundamentals may use tier 0 only, so Button, Chip and others draw icons through `Glyph` instead of importing `Icon` |
| W12 | `src/shell/` is the app frame (skip link, navigation slot, main, overlay cell), not a layout; views are `.ts` data checked against the block registry | Keeps layouts single-purpose and views free of markup and styles |
| W13 | The prototype dev server stays running at `http://127.0.0.1:5173/` alongside the docs reader (owner, 2026-10-26) | The owner can drop in at any time; hot reload shows the latest work |
| W14 | The inspector is always docked from 72rem up (empty state before a pick), resizable between token limits with the width kept in preferences; each region scrolls on its own; a theme control sets light or dark (owner, 2026-10-26) | Opening a peek never reflows the grid; below 72rem the peek stays a sheet |
| W15 | Every collection-like view arranges like a file manager: a Sort by menu (field and direction), a Group by menu (None or a field; names group in 0–9, A–H, I–P, Q–Z buckets), collapsible group headers with counts; tables sort by header, resize columns by drag or arrow keys, and fit a column on double-click; widths are kept per collection (owner, 2026-10-26) | One pattern across Codex, Pairings and later lists; sort, direction and group live in the URL so a view can be shared |
| W16 | From 72rem up the Codex is navigation, an item list (26rem default, 18–48rem, kept in preferences) and a detail column filling the rest. The detail shows the glance first, then every part of the archived page as closed sections with teasers (progressive reveal); open sections are remembered per kind. With nothing picked it shows the tab's own wiki page without its item list. Other sections stay full width; below 72rem the detail is a sheet (owner, 2026-10-26). Supersedes W14's docked inspector | The answer stays one glance away while nothing from the wiki is lost; a build step parses each archived page into structured blocks loaded only when an item is picked |

### Shortcuts (production work must replace)

- Partial enforcement suite (S2-18): `npm run check` runs the kit's token check, style lint and
  copy lint, plus a project check (`app/scripts/check-design.mjs`) for tier imports, sealed
  fundamentals, `@tier`/`@a11y` doc comments, component-token ownership, private primitives,
  breakpoint-only width queries, unread tokens, views without styles and a 160-line component
  limit. Not yet: component stories, the generated design library, axe in every context, or a
  test for contrast in the more-contrast context.
- No shadows: the kit's token build can't alias a colour inside a shadow, so elevation is drawn
  with surface roles and borders for now.
- Data projection is unaudited: no recipe review (S1-04), no per-field provenance, no coverage
  report; wikitext is reduced to plain text by simple rules.
- Sprites are archive copies used locally; rights are not cleared (A24, handoff "Icon rights").
- No automated tests, accessibility audit, performance budget or offline support.
- Spoiler classification is a placeholder: only the bucket's `secret_character` flag is used.
- Persistence is `localStorage` without schema versioning or migration.
- Full-page detail (W16) is a projection of archived HTML, not an audited model:
  - Media are copied into `public/media` (about 217 MB), which bloats a build.
  - Legacy infobox variants on some pages are skipped. Stage modes are rebuilt from bucket rows;
    other switching infoboxes show only their default.
  - Links to pages with several items open the first one.
  - Wiki prose can name secrets that the glance hides.
  - Closed sections can't be found with the browser's find in page.
  - Rights for the copied text and media are not cleared.

# Discovery work plan (complete)

## Intent and bounds

**Goal:** understand real player tasks and alternatives, then specify a differentiated experience
that can use the archive without losing correctness, provenance or legal boundaries.

**Done when:** the documentation-phase rows `D0-01` through `D0-08` in
[Definitions of Done](definition-of-done.md) have recorded evidence.

**Limits:** local setup and documentation only; preserve archive and scrapers; no product code,
prototype, importer, deployment, participant contact, credentials, spending, push, or
live-site recreation. No public publication is implied. On 2026-10-26 the owner authorized
a local root Git repository and local commits; push and deployment remain unauthorized.

**Time box:** one discovery work stretch with 45-minute checkpoints; review at stage boundaries
or after roughly 30 minutes. If evidence is inaccessible, record the limitation and use
accessible primary sources rather than bypassing blocks or fabricating findings.

## Increments and their checks

| ID | Increment | Smallest relevant check | Dependency |
|---|---|---|---|
| I1 | Install the three pinned kits and populate project facts | Exact revision checks, installed files and frontmatter, Slate runtime drift | None |
| I2 | Research player requests and benchmark alternatives | Original links, access status, observed vs inferred, dates and sample limits | None |
| I3 | Assess archive and rights constraints | Existing inventory/schema samples and license authorities; no source mutations | None |
| I4 | Ground brief, spec, flows and requirements | Every capability traces to a job/promise and evidence or a labeled assumption | I2, I3 |
| I5 | Define stages, risks, DoD and a prioritized backlog | Quantified future gates, dependencies, responsible roles and no invented outcomes | I4 |
| I6 | Register docs and finish handoff | Local links/navigation/config, source references, kit integrity, no product changes | I1, I5 |
| I7 | Integrate owner-player input | Each OP ID traced through spec, flows, requirements, risks and DoD | I6 |
| I8 | Research build mechanics and spec the build lab | Sourced rules with confidence, contradictions and golden cases; OP08-OP11 traced; no code or data files | I7 |
| I9 | Spec the app experience and design system | Scenarios, jobs, user-can criteria, flows, screen plans, token proposal with computed contrast, components and UI text; OP12-OP16 traced; no tokens, components or prototype | I8 |

## Research responsibility boundary

Two independent research streams have separate ownership:

- **Player research:** actual forum/review evidence, coding, jobs, contradictions and follow-up study.
- **Competitor benchmark:** live/documented alternatives, capability comparison and task walkthroughs.

The main session owns kit setup, archive readiness, spec and planning. It consumes the reports
without duplicating their searches. This prevents counted-twice evidence and contradictory edits.

## Working defaults

| ID | Choice | Reason / reversal |
|---|---|---|
| W1 | Project-local Copilot skills; no global setup | Workspace-specific scope; reversible without touching user settings |
| W2 | Complete pinned upstream packages; no package-manager bootstrap | Reproducible instructions and vendored docs runtime, no dependency installation needed |
| W3 | Markdown authority with Slate navigation | Keeps the material readable without a reader server |
| W4 | Narrow task-first MVP proposal rather than wholesale wiki replacement | Archive semantics/rights are not launch-ready; validate demand first |
| W5 | No auto-approval of product scope, code license or release rights | These remain owner decisions after reviewing the evidence |
| W6 | Keep the Slate documentation reader running locally | Owner explicitly requested ongoing availability; preserve the detached docs process, not temporary test servers (O14) |

## Shortcuts and findings

- Desk research is purposive and English-language-heavy; it cannot establish population demand
  or validate prototype usability.
- No participant work, prototype tests, baseline timings or product performance measures are claimed.
- Existing archive counts/hashes are reused as evidence, not rerun as unrelated validation.
- Imported content rights and source freshness are release constraints, not reasons to skip planning.
- Documentation setup copies upstream executable runtime; no project-specific product logic was written.

## Status

**Documentation phase complete on 2026-10-26; D0-01 through D0-08 passed. The owner-player
spec revision (I7, D0-09), the build-lab revision (I8, D0-10) and the app experience revision
(I9, D0-11) followed on the same date.**

| Increment | Status | Recorded outcome |
|---|---|---|
| I1 | Done | Three exact pins, 14 skills, 3 reviewer definitions, clean upstream packages and runtime digest |
| I2 | Done | 20 primary-feedback pages across 4 primary platforms; 34 qualified E units; 10 alternative/baseline entries. Corrected source-count and interpretation defects before completion |
| I3 | Done | DS01-DS10 readiness/rights assessment; no archive or scraper files modified |
| I4 | Done | Evidence/assumption -> promise/job/capability -> flow/view -> requirement traceability, including input-first notation and explicit coverage/freshness limits |
| I5 | Done | Open risk register, O1-O14, distinct future gates and dependency-aware B01-B17 backlog; no future outcomes marked achieved |
| I6 | Done | All 16 reader routes, internal links/config, responsive checks and handoff verified; requested docs server retained |
| I7 | Done | Owner-player input OP01-OP07 traced into P5/P6, J6-J9, U8-U14, F6-F10, V6-V9, R13-R22, O15, A13-A18, DS11/DS12, PD6/PD7, S1-07/08, S2-08 to S2-13 and B18-B22; read-only archive sizing only; no code |
| I8 | Done | Build mechanics research page; OP08-OP11 traced into P7, J10-J12, U15-U20, F11/F12, V10/V11, R23-R30, O16, A19-A23, DS13-DS15, PD8, S1-09/10, S2-14 to S2-17, B15 and B23-B26; E35/E36 and S27-S30 added as supplementary; no code |
| I9 | Done | Six Design pages; OP12-OP16 traced into P8, J13-J16, U21-U26, F13-F17, V12-V17, R31-R39, O17-O23, A24-A27, PD9, S1-11/12, S2-18 to S2-23 and B27-B33, O22/O23 from the grounding review; contrast computed for every colour role; no token file, component or prototype |

The [validation record](validation.md) owns the executed evidence; the
[handoff](handoff.md) owns the next authorization boundary. "Planning complete" does not mean
"product validated" or "ready to implement." S1 participant work and S2 coding have not started.
