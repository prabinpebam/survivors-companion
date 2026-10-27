# Design system

> **TL;DR:** A strict, token-based design system for the app, separate from the Slate theme
> used for these documents. Values live only in W3C DTCG tokens: private primitives, semantic
> roles, and component tokens owned by one component each. There are light, dark and
> more-contrast contexts. UI is built in tiers (tokens, fundamentals, compounds, layouts, views),
> and views are data. Every text colour role was checked at 4.5:1 or better and every non-text
> role at 3:1 or better on every surface it can sit on. An enforcement suite runs from the first
> commit. Everything here is a written proposal: no token file, stylesheet or component exists.

Status: proposal (OP16, O18, R36). Token values are proposals to be confirmed after the S1
visual test (S1-12). Screen plans are in the [app UX plan](app-ux-plan.md); components and
layouts in [components and views](components.md); words in [UI text](ui-text.md).

## Rules

1. **Every value is a token.** Components never contain a raw colour, length, duration, shadow,
   z-index or font. The one exception is sprite scaling ([sprites](#sprites)).
2. **Primitives are private.** Only semantic roles and component tokens are used by components.
   A primitive is never referenced outside the token files.
3. **Every token is read.** A token no component uses is deleted. The suite fails on unread tokens.
4. **Generated output only.** The stylesheet of custom properties is generated from the token
   files and never edited by hand; the suite fails if it is stale.
5. **Tiers only point down.** A fundamental uses only tokens; a compound uses fundamentals and
   tokens, never another compound; a layout places regions and never contains another layout;
   a view is data.
6. **Fundamentals are sealed.** They take typed props, not class names or style props. Variants
   are props.
7. **Everything documents itself.** Each component has a doc comment, typed props and stories
   for every state in every context. The design library is generated from the source.
8. **Separate from Slate.** The Slate documentation theme is not the product's design system;
   no product token or component is copied from it.

## Tiers

| Tier | Contains | May use | Examples |
|---|---|---|---|
| 0 Tokens | Primitives, semantic roles, component tokens; contexts | Other tokens | `color.text`, `space.4`, `c.shared.tile-radius` |
| 1 Fundamentals | Smallest sealed parts | Tokens | Sprite, Icon, Text, StatValue, LevelPips, Button, Chip |
| 2 Compounds | Meaningful assemblies | Fundamentals, tokens | EntityTile, PairingCard, SlotGrid, Breakdown |
| 3 Layouts | Region arrangements per window class | Compounds via regions, tokens | Hub, Collection, Entity, Workbench, Compare, Focus, Explainer, Settings |
| Views | Data: a layout name plus regions filled from a registry | Nothing (data only) | Weapons collection, Build lab |

The full inventory is in [components and views](components.md).

## Token architecture

Planned files (none created). Names are illustrative; the structure is the commitment.

| File | Holds | Visible to components |
|---|---|---|
| `tokens/primitives.tokens.json` | Raw palettes (`p.neutral.50`...), raw sizes, raw durations | No |
| `tokens/semantic.tokens.json` | Roles: colour, text, space, radius, shadow, motion, layer, opacity, size | Yes |
| `tokens/contexts/light.tokens.json`, `dark`, `more-contrast` | Context values for colour roles | Through roles |
| `tokens/components/<component>.tokens.json` | `c.<component>.*` with `$extensions.owner` naming the one component allowed to read it | Owner only |
| Generated stylesheet | Custom properties for all roles; colour roles use `light-dark()` | Yes (generated) |

```json
{
  "color": {
    "text": {
      "$type": "color",
      "$value": "{p.neutral.950}",
      "$description": "Body and UI text on canvas, raised and sunken surfaces",
      "$extensions": { "contexts": { "dark": "{p.neutral.50}", "more-contrast": "{p.neutral.950}" } }
    }
  },
  "c": {
    "tile": {
      "padding": { "$type": "dimension", "$value": "{space.2}", "$extensions": { "owner": "EntityTile" } }
    }
  }
}
```

Naming: `category.role[.variant][.state]`, lower case, dot-separated, no colour names in role
names (`color.status.negative`, not `color.red`). Component tokens start with `c.`.

## Colour

Contexts: **light**, **dark** (both first-class), and a **more-contrast** modifier applied on
top of either when the system asks for more contrast. The person chooses System, Light or Dark;
more contrast follows the system.

### Surface and text roles

Ratios are the minimum against every surface the role can sit on: canvas, raised, sunken, tile and
the selected surface (`color.bg.selected`). Computed with the WCAG 2.2 relative-luminance
formula on 2026-10-26; recheck when any value changes.

| Role | Use | Light | Min ratio | Dark | Min ratio | Need |
|---|---|---|---|---|---|---|
| `color.bg.canvas` | App background | `#F6F6F9` | - | `#0E0F14` | - | - |
| `color.bg.raised` | Cards, sheets, bars | `#FFFFFF` | - | `#181A21` | - | - |
| `color.bg.sunken` | Wells, inputs, tracks | `#ECEDF2` | - | `#08090C` | - | - |
| `color.bg.tile` | Content tiles, table headers, combination wrappers: a quiet step from the surface | `#ECEDF2` | - | `#1F2129` | - | - |
| `color.bg.selected` | Selected chip, tile, row | `#ECE8FF` | - | `#2A2350` | - | - |
| `color.text` | Text, numbers | `#15161C` | 15.09 | `#ECEDF3` | 12.36 | 4.5 |
| `color.text.muted` | Secondary text, units | `#4F5260` | 6.48 | `#A4A7B5` | 6.03 | 4.5 |
| `color.accent` | Links, active controls, selected marks | `#5A3FCF` | 5.76 | `#A996FF` | 5.84 | 4.5 |
| `color.text.on-accent` | Text on accent fill | `#FFFFFF` | 6.89 | `#140F2E` | 7.47 | 4.5 |
| `color.focus` | Focus ring (2px, offset 2px) | `#5A3FCF` | 5.76 | `#A996FF` | 5.84 | 3 |
| `color.border` | Meaningful boundaries (inputs, tiles) | `#7C808E` | 3.29 | `#6E7282` | 3.02 | 3 |
| `color.border.subtle` | Decorative dividers only | `#DCDDE4` | decorative | `#2A2D36` | decorative | none |
| `color.status.positive` | Higher, done, fully modeled | `#1B7238` | 5.00 | `#5FD68E` | 7.90 | 4.5 |
| `color.status.negative` | Lower, error, not modeled | `#B3261E` | 5.46 | `#FF8B7E` | 6.36 | 4.5 |
| `color.status.warning` | Partly modeled, unverified, capped | `#8A5700` | 5.10 | `#F0BE4F` | 8.38 | 4.5 |

`color.border.subtle` may never carry meaning: anything a person must perceive to use a control
uses `color.border` or stronger.

### More-contrast modifier

| Role | Light | Min ratio | Dark | Min ratio |
|---|---|---|---|---|
| `color.text.muted` | `#33353F` | 10.43 | `#D2D4DD` | 11.75 |
| `color.border` | `#4F5260` | 6.48 | `#A4A7B5` | 6.03 |
| `color.border.subtle` | becomes `color.border` | - | becomes `color.border` | - |

Measured against canvas, raised and sunken. In more contrast, shadows are replaced by borders
and `opacity.disabled` is not used for text.

## Game-domain roles

Colour is never the only signal. Each kind has a **shape**, and its name is always available as
text (visible label or accessible name). Kind colours are used for the kind mark and thin
accents, never for large fills behind text.

| Kind | Shape twin | Light | Min ratio | Dark | Min ratio |
|---|---|---|---|---|---|
| `color.kind.weapon` | Diamond | `#B4441B` | 4.64 | `#FF8A5B` | 6.21 |
| `color.kind.passive` | Circle | `#2A63A8` | 5.09 | `#6FA8FF` | 6.00 |
| `color.kind.evolution` | Star | `#9A3FB8` | 4.65 | `#D08BFF` | 6.06 |
| `color.kind.character` | Shield | `#256858` | 5.49 | `#4FD1B3` | 7.63 |
| `color.kind.stage` | Square | `#626628` | 5.09 | `#C9CE6A` | 8.61 |
| `color.kind.arcana` | Card | `#A6327A` | 5.23 | `#FF7AC6` | 6.08 |
| `color.kind.relic` | Hexagon | `#765A0F` | 5.42 | `#E6C35C` | 8.47 |
| `color.kind.powerup` | Triangle up | `#A5430A` | 5.15 | `#FFA24C` | 7.23 |
| `color.kind.secret` | Keyhole | `#5C5F6E` | 5.29 | `#9C9FB0` | 5.50 |

Ratios are minimums over canvas, raised, sunken and selected, so kind colours also pass as text.

Status and progress roles map onto the semantic roles above, always with a word:

| Concept | Words (from [UI text](ui-text.md#catalogue)) | Colour role | Shape or icon twin |
|---|---|---|---|
| Model status | Fully modeled / Partly modeled / Stats only / Not modeled yet | positive / warning / muted / negative | Filled, half, outline, crossed circle |
| Progress mark | Marked unlocked / Skipped / Not marked | positive / muted / none | Check, dash, empty |
| Hidden | Hidden secret | `color.kind.secret` | Keyhole |
| Delta | Higher / Lower / Same, with sign and amount | text (neutral) by default; positive / negative only in the build lab for reviewed directions (O22) | Up, down, equals arrow |
| Cap | Capped at [value] | warning | Cap bar on the figure |
| Ignored stat | Not affected by [stat] | muted | Slashed stat icon |
| Unverified | Not verified | warning | Question mark |

Higher is not always better (lower Cooldown is faster, and past a floor or for a weapon that
ignores a stat it changes nothing). So Compare and What's new colour a difference only by
direction, never as good or bad, which would imply a winner (U20). The build lab may colour its
own deltas by effect, only for stats whose direction is reviewed (O22). The words always say the
direction of the number.

## Typography

**Direction: bold typography (owner, 2026-10-26).** The ramp has large steps so key information
stands out at a glance: small muted labels, then values and headers far larger and semibold. A
person reads the number or the name first and the label only if needed. Headers that organise a
screen (group headers in a grid, screen titles, the item's name) read like an article's headings,
not like captions. Repeated explanations (an infobox stat's hint) are shown once after the tiles,
never inside each tile.

One UI family with tabular numerals; one mono family for formulas and codes. Candidates must be
OFL- or similarly licensed and are chosen after licence review. Sizes in `rem`.

| Token | Size / line height | Use |
|---|---|---|
| `text.xs` | 0.75rem / 1.125rem | Pips, badges, nav labels (never body) |
| `text.sm` | 0.875rem / 1.375rem | Tile and field labels, secondary text, chips, captions, hints |
| `text.md` | 1rem / 1.625rem | Controls, names, tables, card words, subheadings (semibold) |
| `text.body` | 1.0625rem / 1.75rem | Reading text: paragraphs, lists, notes, descriptions |
| `text.subhead` | 1.25rem / 1.75rem | Headings inside a section's content |
| `text.lg` | 1.5rem / 2rem | Key values in tiles; detail section titles |
| `text.xl` | 2.25rem / 2.5rem | Screen titles; group headers in a grouped grid, list or table |
| `text.2xl` | 3.25rem / 3.5rem | Display: the item's name in the detail column (one per screen) |
| `text.xl` | 2.25rem / 2.5rem | Screen titles; group headers in a grouped grid, list or table |
| `text.2xl` | 3.25rem / 3.5rem | Display: the item's name in the detail column (one per screen) |
| `font.weight.medium` / `semibold` | 500 / 600 | Semibold is the one strong weight (values, titles, headings, display); never full bold (owner, 2026-10-26). Emphasis comes from size, not weight |
| `font.tracking.display` | -0.05rem | Tighter letter spacing for `text.xl` and up |
| `font.numeric` | Tabular numerals on | Every changing number |

A value too long to read at `text.lg` in a tile (more than about 12 characters, or a named item
with its picture) drops to `text.md`; prose values take a whole row. Pictures inside tiles are
enlarged to `size.sprite.md`; grid tiles, recipe cards and the detail header use
`size.sprite.lg`. Cards in the Details arrangement use `size.sprite.xl` (6rem). A tab whose
pictures are landscape art (Stages) sets `detailsPicture: "banner"` in its collection data, and
its cards show the picture at `size.sprite.banner` (16rem wide, height following the picture).
The picture sits above the words when the list is too narrow for both.

Content text (descriptions, quotes, notes) uses `text.body` with a maximum line length of 65ch.

**Breathing room (owner, 2026-10-26).** Reading text never sits at the small sizes: paragraphs
are `text.body` on a 1.65 line height with `space.5` between them, headings inside content get
`space.6` above, and every picture keeps at least `space.3` from its words (captions, names under
sprites, the detail header). Tiles and cards are inset by `space.4`; the detail column's regions
are `space.8` apart.

**No needless width limits (owner, 2026-10-26).** A box never makes its text break mid-word.
Tiles holding values wrap as a row sized by their content, not fixed columns; values use
`overflow-wrap: break-word` (never `anywhere` or auto hyphenation), so a word breaks only when it
is wider than the screen. Fixed grids (the Codex grid) set their minimum column from the longest
one-word name in the data. Reading text keeps its 65ch measure.

## Space, size and shape

| Token group | Values | Notes |
|---|---|---|
| `space.0`-`space.16` | 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4 rem (steps 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16) | Compact density maps each inset one step down; never below `space.1` |
| `size.control` | 2.75rem (44 CSS px) | Minimum target in every density |
| `size.control.large` | 3.5rem | Run companion targets |
| `size.badge` | 2rem | Round count badge (group header counts); widens into a pill for longer numbers |
| `size.icon.sm` / `md` / `lg` | 1rem / 1.25rem / 1.5rem | UI icons |
| `size.tile.min` | 7.5rem | Grid tile minimum; columns come from the container |
| `size.measure` | 65ch | Maximum line length of content text |
| `size.sheet.max` | 90% of the dynamic viewport height | Tallest a bottom sheet may grow |
| `radius.none` / `sm` / `md` / `lg` / `full` | 0 / 0.25 / 0.5 / 0.75rem / 999rem | Sprite frames use `radius.none` |
| `border.width.thin` / `thick` | 1px / 2px | Hairlines stay 1px |
| `shadow.raised` / `sheet` / `dialog` | Three elevation levels | Replaced by borders in more contrast |
| `opacity.scrim` / `disabled` | 0.48 / 0.38 | Disabled controls also state why |
| `layer.base` / `sticky` / `nav` / `sheet` / `overlay` / `toast` | 0 / 10 / 20 / 30 / 40 / 50 | Only the shell's overlay host uses `sheet`-`toast` |

## Sprites

Pixel art is shown only inside a Sprite fundamental. It is scaled by a whole number of device
pixels per source pixel (`sprite.scale.1` to `sprite.scale.4`) with nearest-neighbour
sampling, so edges stay crisp. This is the one place where sizes derive from source pixels
rather than `rem`; the Sprite frame around it still uses tokens. Sprites are never stretched,
blurred, recoloured or used as UI icons. If an image is not cleared for use, the Sprite shows a
monogram on the kind colour with the kind shape.

## Motion

| Token | Value | Use |
|---|---|---|
| `duration.instant` | 0ms | Reduced motion, state swaps |
| `duration.fast` | 120ms | Press, toggle, toast |
| `duration.normal` | 200ms | Peek, placement, transitions |
| `duration.slow` | 320ms | Largest allowed transition (full-screen sheet) |
| `duration.hold` | 3000ms | How long a delta stays visible; not a transition |
| `ease.standard` / `enter` / `exit` | Standard, decelerate, accelerate curves | One curve per purpose |
| `scale.press` / `scale.lift` | 0.96 / 1.02 | Pressed controls; lifted dragged tile |

Under reduced motion every duration resolves to `duration.instant`, and transforms are removed.

## Breakpoints and window classes

| Token | Value | Window class |
|---|---|---|
| `bp.sm` | 40rem | Below: compact |
| `bp.md` | 56rem | Medium: two panes may appear |
| `bp.lg` | 72rem | At or above: expanded |
| `bp.short` | max-height 30rem | Short screens: sticky regions collapse |

Layouts switch on window class. Components switch on their container's size (container
queries), never on the window. No view has page-wide horizontal scroll at 320 CSS px.

## Component tokens

A component may read its own `c.<component>.*` tokens, semantic roles and nothing else. Owner is
declared in `$extensions.owner`. Examples:

| Token | Value | Owner |
|---|---|---|
| `c.shared.tile-radius` | `{radius.lg}` | shared: every tile and card |
| `c.tile.sprite-scale` | `{sprite.scale.2}` (compact) / `{sprite.scale.3}` (expanded) | EntityTile |
| `c.peek.max-height` | `{size.sheet.max}` | PeekSheet |
| `c.slot.size` | `{size.control.large}` | SlotGrid |
| `c.pips.gap` | `{space.1}` | LevelPips |
| `c.delta.hold` | `{duration.hold}` | Delta |

## Enforcement suite

Runs on every change from the first commit; failing any check blocks the change. Proposed checks:

| # | Check | Fails when |
|---|---|---|
| 1 | Raw values | A component style has a literal colour, length, duration, shadow, z-index or font |
| 2 | Private primitives | Anything outside token files references `p.*` |
| 3 | Component token ownership | A component reads another component's `c.*` token |
| 4 | Unread tokens | A semantic or component token is not used |
| 5 | Generated output | The generated stylesheet differs from a fresh build |
| 6 | Contrast | Any text role under 4.5:1 or non-text role under 3:1 on any surface in any context |
| 7 | Tier imports | A fundamental imports a component; a compound imports a compound; a layout imports a layout; a view contains code or style |
| 8 | Sealed fundamentals | A fundamental accepts class or style props |
| 9 | Documentation | A component lacks a doc comment, typed props or a story per state per context |
| 10 | Library | The design library is not regenerated from source |
| 11 | Targets | An interactive element is under `size.control` |
| 12 | Hover | Hover styles outside a hover-capable media condition |
| 13 | Overflow | Page-wide horizontal scroll at 320 CSS px in any view fixture |
| 14 | Motion | Animation not removed under reduced motion; a duration above `duration.slow` |
| 15 | Sprites | A sprite scaled by a fraction, smoothed, or used as an icon |
| 16 | UI text | A literal string in a component or view; a message over budget or against the [UI text rules](ui-text.md#lint) |
| 17 | Icon names | An icon-only control without an accessible name and tooltip |
| 18 | Views from data | A view not resolvable from the registry; a region filled with an unknown component |

## Contributing

- New value: propose a semantic role first; add a primitive only if no role fits.
- New component: say its tier, the user-can statement it serves, its props, states and stories,
  and its tokens. A compound that needs another compound is a layout region instead.
- New screen: write the view spec (data) and its UI text keys; no new component unless the
  inventory lacks one.
- Every change shows light, dark and more-contrast stories, compact and expanded.
