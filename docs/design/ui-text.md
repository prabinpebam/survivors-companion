# UI text

> **TL;DR:** The app keeps two kinds of words apart. **UI text** is the app talking: labels,
> actions, statuses, errors, empty states. It is short, comes only from one message catalogue,
> follows the rules below and has a word budget per screen. **Content text** is information
> about the game: names, descriptions, conditions, quotes. It comes from reviewed records with
> a source, is rendered only by content components, and is never rewritten into UI strings.
> Pictures and numbers carry most meaning; every icon, colour and shape has a text twin. This
> page holds the rules, budgets, number formats, the catalogue of proposed strings and the lint
> that will enforce them. Nothing is implemented.

Status: proposal (OP15, O19, R35). The base glossary stays in
[experience requirements](../experience.md#proposed-words-and-glossary); this page extends it
for the app and does not repeat it.

## UI text and content text

| | UI text | Content text |
|---|---|---|
| What it is | The app's own words: navigation, actions, labels, statuses, errors, empty states, help | Facts and descriptions about the game: entity names, descriptions, conditions, notes, quotes |
| Source | The message catalogue (keys) | Reviewed content records with a source reference |
| Who writes it | Product team, under these rules | Derived from sources; reviewed; attributed |
| Rendered by | `Text` and components that take message keys | `ContentText` and `ContentBlock` only |
| Style | Sentence case, short, verb-first actions, glossary terms | As the record holds it; never paraphrased into a confident summary |
| Counted in budgets | Yes | No (entity names and numbers are not counted either) |
| Visual treatment | UI type roles; never quoted | `size.measure` line length; attribution nearby |
| Can mix? | Never in one string: a UI string may insert an entity name or number as a parameter, nothing more | Never carries UI instructions |

Examples: "Evolves with" is UI text; "Spinach" is an entity name (content); "Requires any chest
after 10:00" is a reviewed condition (content); "Not verified" is UI text.

## Budgets

Budgets count visible UI words on first view at the compact size, excluding entity names,
numbers, units and content text. Screen budgets are set in the
[app UX plan](app-ux-plan.md#screen-plans) (for example Run companion 6, Codex 10, Build lab 18).

| Element | Budget | Rule |
|---|---|---|
| Destination label | 1 word | Home, Codex, Unlocks, Builds, Progress |
| Global entry | 1-2 words | Screens reached from every destination but not destinations themselves: Run companion, What's new, Settings |
| Button or action | 1-3 words | Starts with a verb, except the allow-listed words in [lint](#lint); "Report a possible error" (base glossary) is the one 4-word action |
| Section heading | 1-4 words | Noun phrase, no punctuation |
| Field or setting label | 1-4 words | Noun phrase; help text only if a wrong choice is likely |
| Status | 1-4 words plus parameters | State as a fact |
| Warning | Up to 2 short sentences | What is true now, then how to avoid a problem |
| Help note | Up to 2 short sentences | Shown once, where needed; never instructions for using the UI |
| Empty state | Up to 2 short sentences, or a title of up to 6 words and one action | Says why and what to do |
| Error | Up to 2 short sentences | What happened, how to fix it |
| Toast | Up to 6 words + optional action | Result, then Undo where possible |
| Tooltip | Up to 6 words | Name plus shortcut; never the only place information exists |
| Instruction paragraphs in chrome | None | If the UI needs a paragraph, redesign the UI |

## Rules by element

- **Voice:** plain, calm, a fellow player, not a narrator. No jokes in errors, no exclamation
  marks, no "please", "oops", "simply" or "just".
- **Actions:** verb first, sentence case, specific ("Pin to run", "Make a plan"). Never OK,
  Submit, Yes/No or "Click here".
- **Statuses:** facts, not promises. "Saved in this browser" only after the write.
- **Errors:** what happened, then how to fix it. Never blame the person.
- **Waits:** "Verbing object..." with a count when known ("Reading file...").
- **Empty states:** why it is empty, and the next action ("No matches. Clear filters").
- **Spoilers:** a hidden item is always "Hidden secret", never a name or a hint in any text,
  tooltip, accessible name or address.
- **Claims:** no "best", "optimal", "guaranteed", "real DPS" (see the base glossary).
- **Accessible names:** a tile's name reads as "[Name], [kind], [key fact], [mark]".

## Numbers

| Kind | Format | Example |
|---|---|---|
| Percent stat | Total with bonus in parentheses | Might 175% (+75%) |
| Flat stat | Value with sign when a bonus | Amount +2 |
| Time | Seconds with up to two decimals; mm:ss for clock | 1.35 s; 10:00 |
| Rate | Value with "/s" and the model label nearby | 41/s, one target, ideal conditions |
| Delta | Sign, amount, direction word for screen readers | +12% (higher) |
| Large counts | Grouped digits | 1,400 |
| Unknown | An en dash with a status word, never 0 | - Not modeled yet |
| Cap | "Capped at" plus value | Capped at 1000% |

Numbers use tabular numerals. Units always appear on screen or in the accessible name. Locale
formatting is deferred with translation, so keys take numbers as parameters, not text.

### Short forms

Widely known short forms keep labels and values light. They are applied once, when the data is
built (`app/scripts/short.mjs`), and in the app's own strings.

| Long form | Short form | Where | Example |
|---|---|---|---|
| seconds, milliseconds, minutes, hours after a number | s, ms, min, h | Values, labels | 1.35 s; 30 min |
| per second | /s | Values, labels | 0.1 HP/s |
| (seconds) in a header | (s), or the unit moved onto the value in a tile | Labels | Duration (s); Duration 5.0 s |
| Maximum, Minimum | Max, Min | Labels | Max level; Enemy min |
| Critical | Crit | Labels | Crit Multiplier |
| Experience | XP | Labels | XP bonus |

- A no-break space joins a number and its unit, so "1.35 s" never splits across lines.
- Paragraphs, quotes, notes, headings and captions keep the source's words.
- Game stat names keep their in-game spelling (Max Health, Move Speed, Level).

## Icons and text twins

Every icon used for meaning has a text twin: a visible label, or an accessible name plus a
tooltip. Kind shapes pair with kind names; status icons pair with status words; the delta arrow
pairs with "higher", "lower" or "same". Colour alone never distinguishes two states.

## Catalogue

Proposed English strings. The key is the contract; the words are revised after the S1
comprehension test. `{name}`, `{n}` and `{date}` are parameters.

### Navigation and shell

| Key | Text | Type |
|---|---|---|
| `nav.home` / `nav.codex` / `nav.unlocks` / `nav.builds` / `nav.progress` | Home / Codex / Unlocks / Builds / Progress | Destination |
| `nav.search` | Search | Action |
| `nav.run` | Run companion | Global entry (focus mode) |
| `nav.whatsNew` | What's new | Global entry |
| `nav.settings` | Settings | Global entry |
| `collection.*` | Weapons / Passives / Characters / Stages / Arcanas / Relics / PowerUps / Secrets / Pairings / Rules and stats | Tab |
| `codex.weapons.title` | Weapons | Heading |
| `builds.lab.title` | Build lab | Heading |

### Search, scope and spoilers

| Key | Text | Type |
|---|---|---|
| `search.placeholder` | Search items, rules, actions | Placeholder |
| `search.empty` | No matches for "{query}". Check the spelling or try another name. | Empty |
| `search.outsideScope` | {n} more outside your content | Status |
| `scope.label` | Your content | Label |
| `scope.filteredCount` | {n} hidden by your content | Status |
| `scope.showAll` | Show all content | Action |
| `hidden.tile` | Hidden secret | Status |
| `reveal.item` | Reveal this item | Action |
| `reveal.all` | Reveal all secrets | Action |

### Peek, answer and paths

| Key | Text | Type |
|---|---|---|
| `peek.mark` / `peek.add` / `peek.pin` | Mark / Add to build / Pin to run | Action |
| `peek.page` | Open page | Action |
| `peek.back` / `peek.close` | Back / Close | Action |
| `answer.requires` | Evolves with | Label |
| `answer.noPassive` | No passive item required | Status |
| `answer.chestRule` | Then open a chest | Label (the reviewed condition follows as content) |
| `answer.unverified` | Not verified. Check the source. | Warning |
| `prereq.either` | Either | Label |
| `prereq.unresolved` | Not resolved | Status |
| `status.notCovered` | This item is not covered in this snapshot. | Warning |
| `pairing.picker` | Pick an item | Action |
| `pairing.type.*` | Evolution / Union / Gift / Morph | Label |

### Collections and filters

| Key | Text | Type |
|---|---|---|
| `view.grid` / `view.list` / `view.table` / `view.details` | Grid / List / Table / Details | Choice |
| `filter.clear` | Clear filters | Action |
| `empty.filtered` | No matches. Clear filters or change your content. | Empty |

### Progress, storage, import and export

| Key | Text | Type |
|---|---|---|
| `mark.state.*` | Marked unlocked / Skipped / Not marked | Status |
| `mark.done` | Mark unlocked | Action |
| `mark.linked` | Mark {n} linked items | Action |
| `bulk.selected` | {n} selected | Status |
| `toast.undo` | Undo | Action |
| `storage.saved` | Saved in this browser | Status |
| `storage.sessionOnly` | Not saved after you close this tab. Export to keep it. | Warning |
| `storage.failed` | Couldn't save. Export now to keep your changes. | Error |
| `export.action` | Export file | Action |
| `export.includePrefs` | Include preferences | Choice |
| `import.action` | Import file | Action |
| `import.reading` | Reading file... | Wait |
| `import.summary` | {added} new, {changed} changed, {kept} kept | Status |
| `import.merge` / `import.replace` | Merge with mine / Replace mine | Action |
| `import.invalid` | This file isn't a progress file. Choose a file exported from this app. | Error |
| `import.newer` | This file is from a newer version. Update the app, then import again. | Error |

### Unlocks and plans

| Key | Text | Type |
|---|---|---|
| `unlocks.why` | Why | Action |
| `plan.make` | Make a plan | Action |
| `plan.covers` | Covers {n} unlock attempts | Status |
| `plan.lock` / `plan.exclude` | Keep / Leave out | Action |
| `plan.readCondition` | Read the condition | Action |
| `plan.pin` | Pin to run | Action |
| `plan.none` | No plan fits these choices. Remove a kept item. | Empty |

### Build lab, compare and explainers

| Key | Text | Type |
|---|---|---|
| `lab.character` | Character | Label |
| `lab.place` | Add item | Action |
| `lab.level` | Level | Label |
| `lab.slotsFull` | Slots full. Remove an item first. | Warning |
| `lab.save` | Save build | Action |
| `lab.empty` | Add a weapon to start | Empty |
| `powerups.profile` | My PowerUps | Label |
| `powerups.price` | {gold} gold | Status |
| `stat.capped` | Capped at {value} | Status |
| `stat.ignored` | Not affected by {stat} | Status |
| `model.status.*` | Fully modeled / Partly modeled / Stats only / Not modeled yet | Status |
| `builds.saved` | Saved builds | Heading |
| `builds.rename` / `builds.duplicate` / `builds.delete` | Rename / Duplicate / Delete | Action |
| `compare.pick` | Pick builds | Action |
| `compare.higher` / `compare.lower` | Higher / Lower | Status |
| `compare.why` | Why | Action |
| `compare.versionMismatch` | Different data versions. Results may not line up. | Warning |
| `compare.needTwo` | Save another build to compare | Empty |
| `explainer.yourValue` | Your value | Label |
| `explainer.fromBuild` | Use my build | Action |
| `explainer.try` | Open in lab | Action |
| `explainer.unverified` | This rule isn't verified yet. Check the sources. | Warning |
| `explainer.none` | No explainer yet. See the sources. | Empty |

### Sources and corrections

| Key | Text | Type |
|---|---|---|
| `source.open` | Sources | Action |
| `source.snapshot` | Source snapshot: {date} | Status |
| `source.visit` | Open source | Action |
| `correction.report` | Report a possible error | Action |
| `correction.where` | Reports go to the source's own page. Nothing is sent from here. | Help note |

### Run companion

| Key | Text | Type |
|---|---|---|
| `run.start` | Start run | Action |
| `run.add` | Add picked item | Action |
| `run.next` | Next: level {n} | Status |
| `run.awake` | Keep screen on | Choice |
| `run.samePhoneNote` | On the same phone, switching apps may pause your game. | Help note (shown once) |
| `run.end` | End run | Action |
| `run.markAfter` | Mark unlocks | Action |
| `run.nothingPinned` | Nothing pinned. Add the items you have. | Empty |

### Home, what's new and settings

| Key | Text | Type |
|---|---|---|
| `home.continue` | Continue | Heading |
| `home.nextUnlocks` | Next unlocks | Heading |
| `home.startHere` | Start here | Heading |
| `whatsNew.since` | Since {date} | Heading |
| `whatsNew.added` / `whatsNew.changed` / `whatsNew.removed` | Added / Changed / Removed | Heading |
| `whatsNew.flagged` | Check this mark | Status |
| `whatsNew.affectsBuild` | Affects {n} saved builds | Status |
| `whatsNew.dismiss` | Mark as seen | Action |
| `whatsNew.firstVisit` | Changes will show here next time | Empty |
| `whatsNew.dataVersion` | Data covers game {version} | Status |
| `whatsNew.behindGame` | Game {version} is out. This data doesn't cover it yet. | Warning |
| `settings.*` | Content / Spoilers / Appearance / Density / Motion / Data / About | Heading |
| `settings.content` | Content you own | Label |
| `settings.spoilers` | Spoilers | Label |
| `spoilers.hideSecrets` / `spoilers.showAll` | Hide secrets / Show all | Choice |
| `spoilers.confirmShowAll` | Show every secret everywhere? You can hide them again. | Warning |

## Glossary additions

| Concept | Preferred wording | Avoid |
|---|---|---|
| Quick look at an item | "Peek" internally; the UI never names it (it just opens) | "Popup", "Modal", "Quick view" |
| Focus mode during a run | "Run companion" | "Overlay", "HUD", "Live mode" |
| Pin items for a run | "Pin to run" | "Track", "Follow", "Sync" |
| Main areas | Home, Codex, Unlocks, Builds, Progress | "Wiki", "Database", "Hub" |
| Changes since last visit | "What's new" | "Patch notes" (unless quoting a source), "Updates" |
| Protected item | "Hidden secret" | "Locked", "???" without a name for screen readers |
| Collection of everything | "Codex" | "Wiki", "Encyclopedia" |

"Disclosure ladder", "Glance", "UI text" and "Content text" are design terms for this
documentation; they never appear in the product.

## Lint

The UI text lint is part of the design-system suite ([design system](design-system.md#enforcement-suite)).
It fails when:

1. A component or view contains a literal user-visible string instead of a message key.
2. A key is used but missing from the catalogue, or catalogued but unused.
3. A string exceeds its element budget, or a screen exceeds its budget in its fixture.
4. An action does not start with a verb (allow-list: Undo, Back, Close, Why, Sources, Continue).
5. A string uses a banned word: OK, Submit, please, oops, simply, just, click, best, optimal,
   guaranteed, real DPS, synced, backed up.
6. A string is not in sentence case, or ends an action or label with a full stop.
7. A glossary term is replaced by a listed "avoid" word.
8. An icon-only control has no accessible name or tooltip.
9. A content field is rendered by `Text`, or a UI key is rendered by `ContentText`.
10. Any string, accessible name or address could expose a hidden secret's name.
