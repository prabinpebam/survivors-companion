# Components, layouts and views

> **TL;DR:** The proposed component inventory, by tier. Fundamentals are sealed parts (Sprite,
> StatValue, LevelPips, Chip, ...). Compounds are meaningful assemblies made only from
> fundamentals (EntityTile, PairingCard, SlotGrid, Breakdown, ...). Eight page layouts and four
> overlay layouts arrange regions. Views are data: a layout name plus regions filled from a
> registry, so a screen is written as JSON, not code. Every component must cover every state in
> light, dark and more contrast. Nothing here is built; JSON blocks are illustrative contracts.

Status: proposal (OP16, R36). Tier rules and tokens are in the [design system](design-system.md);
where each piece is used is in the [app UX plan](app-ux-plan.md#screen-plans).

## How the pieces fit

```text
Shell (one per app)
  top bar | navigation (bar / rail / sidebar) | main | overlay host
                                                 |        |
                                         one page layout   overlay layouts (peek, sheet, dialog, palette)
                                                 |        + toast region
                                              regions
                                                 |
                                compounds (repeated per item where the region says so)
                                                 |
                                            fundamentals
                                                 |
                                               tokens
```

- The **shell** is the app frame, not a layout. It owns navigation, the top bar and the overlay
  host, and places exactly one page layout in `main`.
- A **region** holds one compound, a fixed list of compounds side by side, or one compound
  repeated over a list of items. A compound never contains another compound; when two compounds
  belong together, the region lists both.
- **Overlay layouts** are placed only by the shell's overlay host, so a peek can never open
  inside a card or a dialog inside a sheet by accident.

## Fundamentals (tier 1)

Sealed: typed props, no class or style props, variants as props.

| Fundamental | Purpose | Key props | Notes |
|---|---|---|---|
| Sprite | Pixel art at whole-number scale, or monogram fallback | `entityId`, `scale`, `decorative` | Never an icon; alt text from the entity name unless decorative. Small sizes only beside a name in dense rows or in running text; a mob is never shown under 64 px outside running text. A `cover` size fills the width at the picture's own shape (stage screenshots, as content under the name) |
| Icon | UI icon from one set | `name`, `label` | Label required unless a visible text sits beside it |
| Text | Every UI string | `key`, `params`, `size`, `tone` | Takes a message key, not a literal ([UI text](ui-text.md)) |
| ContentText | Source content text | `contentRef` | Only way to render content text; always paired with a source |
| StatValue | A number with unit and label | `value`, `unit`, `label`, `format` | Tabular numerals; formats from [number rules](ui-text.md#numbers) |
| Delta | Change with sign, amount and direction word | `from`, `to`, `goodWhen` (optional) | Neutral direction colour by default; `goodWhen` adds positive or negative colour only in the build lab and only for stats whose direction is reviewed (O22) |
| LevelPips | Level or rank as pips plus number | `level`, `max` | Number always shown for screen readers and over 10 pips |
| Meter | Bar for a value against a scale with marks | `value`, `min`, `max`, `marks` | Cap and floor marks have labels |
| KindBadge | Kind shape, colour and name | `kind` | Name visible or as accessible name |
| StatusBadge | Model, verification or coverage status | `status` | Word plus icon twin |
| ProgressMark | Person's mark, toggleable | `state`, `onChange` | Three states; long-press or menu for all |
| Button | Action | `key`, `variant`, `icon` | Verb-first label; icon-only needs `label` |
| Link | Navigation | `to`, `key` | Opens the target or a peek; never both |
| Chip | Filter or choice with optional count | `key`, `count`, `selected` | Count shows results left after selecting |
| SegmentedControl | One of 2-4 choices | `options`, `value` | View switcher, settings. A track with an inset solid-accent thumb; no ring meets the track border |
| Stepper | Increase or decrease a level or value | `value`, `min`, `max` | Keyboard `[` and `]`; holds to repeat |
| Switch / Checkbox | On or off; one of many | `key`, `checked` | Label always visible |
| TextField | Text input | `key`, `value` | Search and rename |
| Tooltip | Name and shortcut for a control | `key` | Never holds information that exists nowhere else |
| Kbd | Shortcut key | `keys` | Shown only on hover-capable or keyboard devices |
| Skeleton | Shape of content while it loads | `shape` | Same size as the content it replaces |
| RecordTable | Named records with labelled values, in a grid inside their container | `records`, `label` | Prototype: a stage's map events, inside the wave card's Map events panel. A list of records, each a small table captioned by its picture (72 px), name and summary, with labels in their own column so values line up within the record. Records take as many columns as fit between `size.record.min` and `size.record.max` (15 and 22 rem) inside the panel; they have no surface of their own, so the panel stays one chunk and never competes with its peers for width. A number keeps its unit on its line |

## Compounds (tier 2)

Made only from fundamentals and tokens.

| Compound | Shows | Built from | Used in |
|---|---|---|---|
| EntityTile | Glance in a grid: sprite, name, kind, one mark, optional pairing chip. A tile marked unlocked has a pale green background and green border (`color.bg.positive`, `color.border-positive`) | Sprite, Text, KindBadge, ProgressMark or StatusBadge | Codex, Unlocks, Progress, What's new, Home |
| EntityRow | Glance in a list | Sprite, Text, KindBadge, ProgressMark | Search, List view |
| EntityChip | Inline glance | Sprite, Text | Inside text-like places (plans, breakdowns) |
| EntityHero | Identity at the top of a peek or page, with the mark toggles as icon buttons (open lock: unlocked; skip sign: skipped) before close and the mark's words in the meta line. Built as `PeekHeader` | Sprite, Text, KindBadge, ProgressMark | Peek, Entity page |
| EvolutionPath | Input-first recipe: inputs, levels, result, conditions | Sprite, Text, LevelPips, StatusBadge | Peek, Entity page, Pairings, Run companion |
| PairingCard | One pairing in either direction | Sprite, Text, LevelPips, KindBadge | Pairings |
| PrereqPath | Conditions with sources, alternatives and the person's marks | Text, ProgressMark, StatusBadge, Link | Entity page |
| DataTable | Configurable table with sortable columns; presets for collection table, levels and matrix | Text, StatValue, Sprite | Table view, Entity page, Pairings matrix |
| CollectionTabs | Collection switcher | Button, Text | Codex |
| FilterBar | Active chips with counts and Clear | Chip, Button | Collections, Unlocks, Progress |
| SortMenu | Sort choice | Button, Text | Collections |
| ViewSwitcher | Grid, List, Table, Details | SegmentedControl | Collections |
| ScopeBar | Active content scope and spoiler level | Chip, Button, Text | Collections, search, Unlocks |
| StatList | Player stats with totals, bonuses, caps and deltas | StatValue, Delta, Meter, Link | Build lab, Peek |
| Breakdown | Sources of a number: each source, value, cap, ignored, model status | StatValue, Text, StatusBadge, Sprite | Build lab, Compare, Explainer (Proof) |
| WeaponOutputCard | Per-weapon output by tier with model status | Sprite, StatValue, Meter, StatusBadge | Build lab |
| SlotGrid | Weapon and passive slots with levels and pairing marks | Sprite, LevelPips, Button | Build lab, Run companion, Session plan (read-only) |
| PowerUpGrid | PowerUps with rank pips, effect and price | Sprite or Icon, LevelPips, Stepper, StatValue | Build lab |
| CompareColumn | One build's values aligned to rows | Sprite, StatValue, Delta | Compare |
| DiffList | Differences or changes with sign, amount and cause | Text, Delta, Sprite, StatusBadge | Compare, What's new |
| MechanicFigure | Interactive rule figure from rule data | Meter, StatValue, Delta, Text | Explainer |
| RunSlotRow | One pinned weapon: level, next step, partner status | Sprite, LevelPips, Stepper, Text, StatusBadge | Run companion |
| SuggestionCard | Suggested unlock with reason | Sprite, Text, ProgressMark, Button | Unlocks, Home |
| PlanCard | Session plan summary and attempts covered | Sprite, Text, StatValue, Button | Unlocks |
| BuildCard | Saved build: sprites, name, date, version | Sprite, Text, StatusBadge | Builds, Home, What's new |
| RunCard / WhatsNewCard | Home entries for the pinned run and changes | Sprite, Text, StatValue | Home |
| ProgressSummary | Counts and bars by kind and pack | Meter, StatValue, Text | Progress |
| BulkBar | Selection count and bulk actions | Text, Button | Progress |
| ImportPreview | What an import will add, change and keep | StatValue, Text, Button | Progress, Settings |
| StorageStatus | Where data lives and whether it is saved | Icon, Text, Button | Progress, Settings |
| SourceCard | Source page, revision, date, attribution, correction route | Text, Link, StatusBadge | Proof everywhere |
| ContentBlock | A block of source content text with attribution | ContentText, Link | Entity page, Explainer |
| ActionBar | Context actions for an item | Button | Peek, Entity page |
| SettingsGroup | A group of related settings | Text, Switch, SegmentedControl, Checkbox | Settings |
| EmptyState | Why nothing is here and the next action | Icon, Text, Button | Everywhere |
| Toast | Result of an action with Undo | Text, Button | Overlay host |
| TopBar, NavBar, NavRail, Sidebar | Shell navigation by window class | Icon, Text, Link | Shell |

## Layouts

Page layouts (tier 3) place regions per window class. A layout never contains another layout.

| Layout | Regions | Compact | Medium | Expanded | Used by |
|---|---|---|---|---|---|
| Hub | header, modules (ordered list) | One column | Two columns | Two columns, wider | Home, Unlocks: Next, What's new |
| Collection | tabs, scope, filters, toolbar, results, inspector | Results only; filters in a sheet; peek as a sheet | Filters collapsible; side sheet | Filters, results, inspector | Codex, Pairings, Progress |
| Entity | hero, answer, path, details, related, content, proof, side | Stacked with a jump bar | Stacked, wider | Main plus sticky side | Entity page |
| Workbench | setup, primary, secondary, output, summary | Stacked; segmented switch; sticky summary | Two panes | Three panes | Build lab, Session plan |
| Compare | pickers, columns, diff | Baseline plus one, swipe | Two columns | Three columns | Compare |
| Focus | header, rows, tray, action | Full screen; action at the bottom | Two columns | Three columns | Run companion |
| Explainer | summary, figure, controls, sources, related | Figure then controls | Figure beside controls | Figure beside controls, related at side | Rules and stats |
| Settings | groups, group nav | One list | One list | Group nav beside groups | Settings |

Overlay layouts, placed only by the shell's overlay host:

| Overlay | Regions | Compact | Medium and expanded |
|---|---|---|---|
| PeekSheet | hero, media, answer, facts, actions, proof | Bottom sheet, half then full | Side sheet (medium) or inspector without scrim (expanded) |
| FacetSheet and ItemPicker | header, groups or results, actions | Bottom sheet | Side sheet or popover |
| Dialog | title, body, actions | Full-width sheet | Centered dialog |
| CommandPalette | query, results by kind, commands | Full screen | Centered dialog |

## States every component covers

Each component's stories show every state that applies, in light, dark and more contrast, at
compact and expanded sizes.

| State | Requirement |
|---|---|
| Rest | Default appearance with its full accessible name |
| Hover | Only on hover-capable pointers; never the only cue |
| Active / pressed | `scale.press` unless reduced motion |
| Focus | Visible `color.focus` ring, never clipped |
| Selected | `color.bg.selected` plus a non-colour cue (check, bar or weight) |
| Disabled | Reduced emphasis plus the reason as text or tooltip |
| Loading | Skeleton of the same shape; no spinner for local work |
| Empty | EmptyState with reason and next action |
| Error | What happened and how to fix it, next to the control |
| Hidden (entities) | Keyhole shape in `color.kind.secret`, "Hidden secret", reveal action; no kind, name or sprite |
| Out of scope (entities) | Labeled; viewable on request |
| Not covered / not modeled | StatusBadge with words |

## Views as data

A view spec names a layout and fills its regions from the registry. It has no styles and no
code. The renderer resolves it; the suite fails when a view names an unknown component, a region
the layout lacks, or a UI string that is not a message key.

### Registry (illustrative)

```json
{
  "components": {
    "EntityTile":  { "tier": 2, "props": { "entityId": "id", "mark": "progress|model|none", "pairingChip": "boolean" } },
    "FilterBar":   { "tier": 2, "props": { "facets": "facetId[]" } },
    "ViewSwitcher":{ "tier": 2, "props": { "modes": "grid|list|table|details[]" } },
    "StatList":    { "tier": 2, "props": { "stats": "statId[]", "source": "build|entity" } }
  },
  "layouts": {
    "Collection": { "regions": ["tabs", "scope", "filters", "toolbar", "results", "inspector"] },
    "Workbench":  { "regions": ["setup", "primary", "secondary", "output", "summary"] }
  }
}
```

### Weapons collection (illustrative)

```json
{
  "view": "codex.weapons",
  "layout": "Collection",
  "title": "codex.weapons.title",
  "regions": {
    "tabs":     { "component": "CollectionTabs", "props": { "active": "weapons" } },
    "scope":    { "component": "ScopeBar" },
    "filters":  { "component": "FilterBar", "props": { "facets": ["pairs-with", "progress", "pack", "attack-type"] } },
    "toolbar":  [ { "component": "SortMenu", "props": { "options": ["name", "pack", "unlock-order"] } },
                  { "component": "ViewSwitcher", "props": { "modes": ["grid", "list", "table", "details"] } } ],
    "results":  { "repeat": "query:weapons", "component": "EntityTile", "props": { "mark": "progress", "pairingChip": true } },
    "inspector":{ "overlay": "PeekSheet", "from": "selection" }
  },
  "empty": "empty.filtered"
}
```

### Build lab (illustrative)

```json
{
  "view": "builds.lab",
  "layout": "Workbench",
  "title": "builds.lab.title",
  "regions": {
    "setup":     { "component": "SlotGrid", "props": { "source": "build", "editable": true } },
    "primary":   { "component": "PowerUpGrid", "props": { "source": "profile-or-build" } },
    "secondary": { "component": "StatList", "props": { "stats": "all-player", "source": "build" } },
    "output":    { "repeat": "build:weapons", "component": "WeaponOutputCard" },
    "summary":   { "component": "StatList", "props": { "stats": ["might", "cooldown", "area", "amount"], "source": "build" } }
  },
  "empty": "lab.empty"
}
```

### Content contract per region

A region receives typed content records, never raw source text. Each record carries its stable
ID, scope tags, spoiler class, coverage and model status, and source reference, so every
compound can show hidden, out-of-scope, not-covered and not-modeled states without guessing.
The records follow the logical contracts in [archive readiness](../research/data-readiness.md).
