# Task flows, step by step

> **TL;DR:** Seventeen flows (F1-F17) broken into steps. Each step names what the person does,
> what the app does, the screen and component involved, the wait class and the UI text keys
> used. Branches and exits are listed under each flow. The flows are the bridge between the
> user-can statements and the screens in the [app UX plan](app-ux-plan.md). The behavioral rules
> stay authoritative in [experience requirements](../experience.md); this page adds the screen
> and component level. Nothing here has been prototyped or tested.

Status: proposal (OP14). Text keys resolve in the [UI text catalogue](ui-text.md#catalogue).
Components and layouts are defined in [components and views](components.md).

## How to read a flow

- **Wait class** follows the perceived-performance classes: *Instant* (<=100ms, no indicator),
  *Responsive* (<=1s, a pressed or busy state on the control), *Waiting* (1-10s, a progress
  sign where the result will appear), *Long* (>10s, progress with a way to keep working).
  Every local action in this app is Instant.
- **Text keys** are message IDs, not words. Words live in one catalogue so the UI text can be
  linted, budgeted and translated later.
- **Entry points** list where a person starts; most flows start from more than one screen.

## F1: identify the next evolution step

Entry points: search, any tile, a shared address, the run companion. User can: U1, U2, U5.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens search (`/` or the search button) | Palette opens with recent items | Search / CommandPalette | Instant | `search.placeholder` |
| 2 | Types part of a name or an alias | Results grouped by kind, with sprites; out-of-scope matches counted | CommandPalette, EntityRow | Instant | `search.outsideScope` |
| 3 | Picks the weapon | Peek opens with the answer first: inputs, levels, result, conditions | PeekSheet, EvolutionPath | Instant | `answer.requires`, `answer.chestRule` |
| 4 | Reads the answer, or opens Proof | Source, snapshot and confidence shown | SourceCard | Instant | `source.snapshot` |
| 5 | Closes the peek | Returns to where they were | Shell | Instant | `peek.close` |

Branches: no match (`search.empty` with spelling help); ambiguous alias (both shown with kind);
no passive needed (`answer.noPassive`); multi-step chain (each step in order); not covered
(`status.notCovered`); unverified (`answer.unverified`). Exit: answer read, or page opened.

## F2: explain why a recipe did not trigger

Entry points: entity page, peek, Unlocks. User can: U2, U6, U7.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens the item's page | Answer card and prerequisite path | Entity page / EvolutionPath (answer region), PrereqPath | Instant | `answer.requires` |
| 2 | Checks each condition | Each condition shows its source; their own marks shown where present | PrereqPath, ProgressMark | Instant | `prereq.either`, `mark.state.*` |
| 3 | Finds an unmet or unknown condition | Unknown conditions are labeled, not guessed | StatusBadge | Instant | `prereq.unresolved`, `answer.unverified` |
| 4 | Opens the source if still unsure | Source page and correction route | SourceCard | Instant | `correction.report` |

Branches: alternative paths (`prereq.either`); stage or character exceptions; cyclic paths
shown once with a note. Exit: condition identified, or correction started.

## F3: scope to owned content

Entry points: first start, Settings, the scope bar on any filtered screen. User can: U3, U1.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens the scope bar or Settings > Content | Packs listed with sprites; base game always available | ScopeBar, SettingsGroup | Instant | `scope.label`, `settings.content` |
| 2 | Chooses packs they own | Every screen updates in place; counts change | ScopeBar, FilterBar | Instant | `scope.filteredCount` |
| 3 | Searches or browses | Out-of-scope matches counted, reachable on request | CommandPalette, EmptyState | Instant | `search.outsideScope`, `scope.showAll` |

Branches: unclassified content labeled, not hidden; unsupported content (`status.notCovered`).
Exit: scope saved in this browser.

## F4: protect and deliberately reveal spoilers

Entry points: any surface with a protected item. User can: U4.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Meets a protected item | Hidden tile: keyhole shape in the secret colour, no kind, name or sprite | EntityTile (hidden) | Instant | `hidden.tile` |
| 2 | Chooses to reveal it | Only that item is revealed; nothing else changes | PeekSheet, Button | Instant | `reveal.item` |
| 3 | Optionally switches Spoilers from Hide secrets to Show all | Asks once, then applies everywhere; switching back to Hide secrets applies at once and keeps items revealed one at a time | Settings / SegmentedControl, Dialog | Instant | `settings.spoilers`, `spoilers.hideSecrets`, `spoilers.showAll`, `spoilers.confirmShowAll`, `reveal.all` |

Branches: search never suggests a hidden item; a deep link to a hidden item opens on the reveal
step; addresses use an opaque reference for every secret-class item, whatever the sharer's
setting; accessible names say "Hidden secret", never the name. Exit: item revealed or left hidden.

## F5: inspect provenance or report an error

Entry points: Proof on any claim or number. User can: U5, U7.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens "Sources" | Page, revision, date, attribution, transformation note | SourceCard (Proof) | Instant | `source.open`, `source.snapshot` |
| 2 | Opens the source | Source opens in a new tab | Link | Responsive | `source.visit` |
| 3 | Chooses "Report a possible error" | Explains where reports go; opens the source's own route | Dialog | Instant | `correction.report`, `correction.where` |

Branches: source unavailable (archived copy offered); conflicting sources (both shown). Never
says "Reported". Exit: source inspected, or the person is at the correction route.

## F6: browse visually and narrow without scrolling forever

Entry points: Codex, Home modules, search "Show all". User can: U8, U9.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens Codex > Weapons | Sprite grid in scope; remembered view, sort and filters | Codex / CollectionTabs, EntityTile | Instant after first load | `nav.codex`, `collection.*` |
| 2 | Adds filter chips | Grid narrows; each chip shows its count | FilterBar, FacetSheet | Instant | `filter.clear` |
| 3 | Changes sort or view | Same items, new order or form; scroll kept | SortMenu, ViewSwitcher | Instant | `view.grid`, `view.list`, `view.table`, `view.details` |
| 4 | Spots the sprite and taps it | Peek opens | PeekSheet | Instant | `peek.*` |

Branches: no results (`empty.filtered` with "Clear filters"); missing icon (monogram);
protected tiles (F4). First load: skeleton tiles in grid shape (Waiting). Exit: item found.

## F7: recall a weapon-passive pairing at a glance

Entry points: any weapon or passive glance, Codex > Pairings, run companion. User can: U10.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens a weapon or passive peek | Partner shown first, input-first | PeekSheet, EvolutionPath | Instant | `answer.requires` |
| 2 | Or opens Pairings and picks an item | All partners as cards, both directions | Pairings / PairingCard | Instant | `pairing.picker`, `pairing.type.*` |
| 3 | Optionally filters by scope, progress or type | Cards narrow; matrix for a filtered subset | FilterBar, DataTable | Instant | `filter.clear` |

Branches: no passive needed; several partners; unions and gifts labeled by type; partner out
of scope (counted). Exit: partner known.

## F8: mark my own progress

Entry points: any glance or peek, Progress, Home after a run. User can: U11.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Taps the mark on a tile or in a peek | Mark changes after the write; Undo offered | ProgressMark, Toast | Instant | `mark.done`, `toast.undo` |
| 2 | Or selects several in Progress | Bulk bar shows count and actions | BulkBar | Instant | `bulk.selected`, `mark.done` |
| 3 | Linked rewards exist | Offers to mark linked items, never silently | Toast with action | Instant | `mark.linked` |

Branches: storage unavailable (`storage.sessionOnly` and export prompt); write fails
(`storage.failed`). Exit: marks saved in this browser.

## F9: move progress to another browser

Entry points: Progress, Settings > Data. User can: U12, U19.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Chooses Export | File downloads with progress, builds and optional preferences | Button, Checkbox | Responsive | `export.action`, `export.includePrefs` |
| 2 | In the other browser, chooses Import and picks the file | Reads the file | ImportPreview | Waiting | `import.action`, `import.reading` |
| 3 | Reviews the preview | Counts to add, change, keep; unknown IDs listed | ImportPreview | Instant | `import.summary` |
| 4 | Chooses Merge or Replace | Applied; result summary with Undo | Toast | Instant | `import.merge`, `import.replace`, `toast.undo` |

Branches: invalid file (`import.invalid`); newer schema (`import.newer`); conflicting marks
(both shown, person chooses). Exit: progress in the new browser.

## F10: suggest what to unlock next and plan one run

Entry points: Unlocks, Home. User can: U13, U14.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens Unlocks | Suggestions from their marks, each with "Why"; spoilers respected | SuggestionCard | Instant | `unlocks.why` |
| 2 | Chooses "Make a plan" | Plan: character, stage, items, attempts covered | PlanCard, SlotGrid | Responsive | `plan.make`, `plan.covers` |
| 3 | Locks or excludes an item | Plan recomputes; alternatives shown | Chip, PlanCard | Instant | `plan.lock`, `plan.exclude` |
| 4 | Reads unmodeled conditions | Listed separately, never ranked | List | Instant | `plan.readCondition` |
| 5 | Pins the plan to the run | Run companion opens with the plan | Button | Instant | `plan.pin` |

Branches: no marks yet (starting suggestions); nothing left in scope; no compatible plan
(`plan.none` with what to change). Exit: plan pinned to the run companion (plans are
regenerated from progress, not saved).

## F11: try a build and see how each choice changes it

Entry points: Builds, "Add to build" on any peek, "Open in lab" in an explainer. User can:
U15-U18.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Chooses a character and level | Slot counts and starting weapon set | Build lab / ItemPicker | Instant | `lab.character` |
| 2 | Selects a slot and taps an item | Item placed; pairings and conflicts shown | SlotGrid, ItemPicker | Instant | `lab.place`, `lab.slotsFull` |
| 3 | Steps levels | Stats and outputs update with deltas | Stepper, StatList, Delta | Instant | `lab.level` |
| 4 | Sets PowerUps (profile or custom) | Effects and gold price shown | PowerUpGrid | Instant | `powerups.profile`, `powerups.price` |
| 5 | Opens any number | Breakdown: sources, caps, ignored stats, model status | Breakdown | Instant | `stat.capped`, `stat.ignored`, `model.status.*` |
| 6 | Saves | Saved after the write; named build | Toast | Instant | `lab.save`, `storage.saved` |

Branches: slots full; evolution or union changes slots; weapon not modeled (listed, no rate);
cap reached; unsaved changes on leaving (kept as a draft, not a blocking dialog). Exit: build
saved, compared or pinned.

## F12: save builds and compare them

Entry points: Builds > Saved, "Compare" in the lab. User can: U19, U20.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens Saved | Build cards with sprites and dates | BuildCard | Instant | `builds.saved` |
| 2 | Picks two or three | Aligned columns; differences with sign and amount | CompareColumn, DiffList | Instant | `compare.pick` |
| 3 | Opens a difference | "Why" lists the causes | Breakdown | Instant | `compare.why`, `compare.higher`, `compare.lower` |
| 4 | Renames, duplicates or deletes | Applied with Undo | Toast | Instant | `builds.rename`, `builds.duplicate`, `builds.delete` |

Branches: different mechanics versions (`compare.versionMismatch`); removed IDs flagged; only
one saved build (`compare.needTwo`). Exit: decision made; never a declared winner.

## F13: understand a rule with my own values

Entry points: Codex > Rules and stats, any stat in the lab, search. User can: U21.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens a rule or stat | Figure with a default value, caps and floor marked | Explainer / MechanicFigure | Instant | `explainer.yourValue` |
| 2 | Changes the value, or loads their build's value | Figure and examples update with deltas | Stepper, Delta | Instant | `explainer.fromBuild` |
| 3 | Looks at sources of the stat and weapons that ignore it | Tiles open peeks | EntityTile, PeekSheet | Instant | `stat.ignored` |
| 4 | Chooses "Open in lab" | Lab opens with the value applied | Button | Instant | `explainer.try` |

Branches: rule unverified (`explainer.unverified`, shown before the figure); value past cap
(cap mark plus `stat.capped`); explainer not available (`explainer.none` with sources). Exit:
rule understood or tried.

## F14: peek at anything and return

Entry points: every glance. User can: U22.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Taps or presses Enter on a glance | Peek opens over the view; address updated | PeekSheet | Instant | `peek.*` |
| 2 | Acts (mark, add, pin) or reads | Action applied in place | ActionBar | Instant | `peek.mark`, `peek.add`, `peek.pin` |
| 3 | Taps another item inside the peek | Peek content replaced; Back returns to the first | PeekSheet | Instant | `peek.back` |
| 4 | Closes (Escape, Back, swipe, close button) | View restored with scroll, filters and focus | Shell | Instant | `peek.close` |

Branches: hidden item (F4); out of scope (labeled); cold address with a peek (the view loads
behind it); "Open page" leaves the view with Back to return. Exit: same place as before.

## F15: run companion

Entry points: "Pin to run" from a plan, a build or a peek; "Run" in search; Home. User can: U23.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Starts the companion | Full-screen focus layout; one-time note about switching apps on one phone | Run companion / Focus layout | Instant | `run.start`, `run.samePhoneNote` |
| 2 | Adds the items they picked | Slots fill within limits; next steps appear per weapon | SlotGrid, ItemPicker | Instant | `run.add`, `lab.slotsFull` |
| 3 | Steps a level after a level-up | Next step updates; partner status shown | RunSlotRow | Instant | `run.next` |
| 4 | Optionally keeps the screen awake | Turned on only where supported, and by choice | Switch | Responsive | `run.awake` |
| 5 | Ends the run | Offers to mark what was unlocked, then exits | Toast with action | Instant | `run.end`, `run.markAfter` |

Branches: nothing pinned (`run.nothingPinned` with "Add items"); item not modeled (next step
still shown, no numbers); screen-awake unsupported (control hidden, no error). Exit: run ended
or companion closed; the pinned run persists until cleared.

## F16: catch up on what's new

Entry points: Home card, What's new in search. User can: U24.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens What's new | Changes since the last visit, grouped; scope and spoilers applied; the game version the data covers | DiffList, EntityTile | Instant | `whatsNew.dataVersion`, `whatsNew.since`, `whatsNew.added`, `whatsNew.changed`, `whatsNew.removed` |
| 2 | Reviews affected marks | Removed or renamed IDs flagged with their marks kept | ProgressMark, StatusBadge | Instant | `whatsNew.flagged` |
| 3 | Reviews affected builds | Builds with a mechanics version change listed | BuildCard | Instant | `whatsNew.affectsBuild` |
| 4 | Dismisses | Last-seen snapshot updated in this browser | Button | Instant | `whatsNew.dismiss` |

Branches: first visit (`whatsNew.firstVisit`); no changes (module hidden on Home, while
What's new still shows `whatsNew.dataVersion`); a newer game version is known than the data
covers (`whatsNew.behindGame`); changes outside scope (count only). Exit: caught up.

## F17: first start, home and preferences

Entry points: first open, any return, Settings. User can: U25, U26, U3, U4.

| Step | Person does | App responds | Screen / component | Wait | Text keys |
|---|---|---|---|---|---|
| 1 | Opens the app for the first time | Home with "Start here": three reviewer-chosen, spoiler-safe points (O23); Spoilers default to Hide secrets; content to the base game | Home / Hub | Waiting on first load | `home.startHere` |
| 2 | Optionally sets content and spoilers from the scope bar | Applied everywhere | ScopeBar | Instant | `scope.label` |
| 3 | Returns later | Home shows Continue, What's new, Next unlocks (only modules with content) | Home | Instant | `home.continue`, `home.nextUnlocks` |
| 4 | Opens Settings | Theme, density, motion, content, spoilers, data | Settings | Instant | `settings.*` |

Branches: storage unavailable (`storage.sessionOnly` banner once); everything hidden by scope
(EmptyState with "Change scope"); system prefers reduced motion or more contrast (followed
unless overridden). Exit: the person is at their own next step.
