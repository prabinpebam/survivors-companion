# Decision log

> **TL;DR:** Operational choices for this documentation phase are made. Product scope, release
> rights and implementation remain proposals for owner review. A working default is not approval.

## Decision flow

| Evidence changes | Update first | Then update |
|---|---|---|
| A task is not valuable | Assumption / research synthesis | Promise, capability and stage scope |
| A recipe cannot be represented safely | Data-readiness risk | Coverage, requirements, content plan |
| A release right is missing | Rights gate | Public scope or publication decision |
| A target is unrealistic | Recorded target decision with reason | Study/DoD before the next run, never retroactively |

## Decisions and working defaults

| ID | Question | Options | Recommendation / working default | Status |
|---|---|---|---|---|
| O1 | What is the first experience? | Full wiki clone; quick evolution companion; full planner | Start with source-backed evolution lookup and explanations plus bounded prerequisites, extended by the owner with visual browsing, pairing, local progress and unlock-session planning (O15); validate before committing to the larger roadmap | Proposed; scope extended by O15 |
| O2 | Who and what content first? | Every franchise page; Vampire Survivors only; one DLC only | Vampire Survivors task-focused slice; base-game-first with explicit reviewed DLC scope; no Crawlers/media/user/talk corpus | Working default; confirm in S1 |
| O3 | Which software/content license? | One blanket license; separated code/content/asset terms | Select an OSI-compliant code license later (MIT is a candidate); preserve imported CC BY-NC-SA terms and asset-specific rights separately | Open release decision; no license assigned here |
| O4 | Accounts or save integration? | Cloud accounts; game-save import; local preferences only; manual local progress | No account, cloud sync or game-save import. Content/spoiler/view preferences and **user-declared progress** stay in the browser, portable only by user-initiated JSON export/import (O15) | Revised 2026-10-26 by owner input |
| O5 | Spoiler policy? | Everything visible; everything hidden; progressive reveal | Hide explicitly classified secrets/unlock outcomes by default; show enough mechanics to complete the asked task; explicit reveal, not a false claim to know a player's progress | Proposed; validate in S1 |
| O6 | Planner/tracker in the first release? | Full builds + progress tracking; lookup first; owner-requested tracker and unlock planner | Split by job. Manual progress tracking and the **unlock-session planner** are in scope (O15). The **build lab** (slots, levels, PowerUps, explained stats and weapon output, saved builds and compare) is in scope by owner decision (O16), gated by reviewed weapon records (R30). Build *optimization* stays out | Revised 2026-10-26 twice by owner input |
| O7 | Which product framework and storage? | Static/precomputed; client-heavy app; server-backed system | Prefer a read-only precomputed content projection and lightweight search; select technology only after content and interaction constraints are validated | Uncommitted architectural direction |
| O8 | Is live/current compatibility promised? | Always current; snapshot-based; audited version claims | Expose source snapshot and supported coverage; only claim version/platform compatibility after audit | Working default |
| O9 | May this phase recruit or contact players? | Contact now; desk research only | Desk research only; supply a protocol and recruit later with consent/authorization | Decided for D0 by task bounds |
| O10 | How are kits installed? | Global; workspace; only browser documentation | Workspace-local Copilot skill/agent discovery, complete upstream source at stack pins, unchanged Slate runtime | Done; see [setup](kit-setup.md) |
| O11 | May this phase build or publish? | Prototype now; local product now; docs only | Documentation and setup only; no product server, importer, deployment or publication | Decided by owner instruction |
| O12 | What names indicate confidence? | Binary supported/unsupported; evidence-aware states | Distinguish verified, documented, inferred, unknown, out-of-scope and unavailable; do not turn missing data into "no requirement" | Working default |
| O13 | Do we replace the community wiki? | Compete on article volume; focused companion with attribution | Complement deep reference with task-focused answers and source links; do not assume the current wiki fails all users | Proposed positioning |
| O14 | Keep the documentation site running? | Temporary checks only; ongoing local reader | Keep Slate at `http://127.0.0.1:8080/` as an independent loopback-only background process; preserve it during cleanup and restart if unavailable. No reboot-start service or public hosting configured | Decided by owner request on 2026-10-26 |
| O15 | Do owner-player requirements OP01-OP07 enter scope? | Defer pending research; adopt as owner intent with validation; adopt without gates | Adopt as owner intent: visual grid with sort/filter, multiple view modes with progressive disclosure, pairing lookup, manual browser-local progress, JSON export/import, next-unlock suggestions and an automatic unlock-session plan. Keep automatic game sync, save import, accounts and build optimization out (the build lab itself is O16). Suggestions and plans use only reviewed conditions (R21); icons need rights clearance with text fallback. S1 still tests whether other players share these needs (A13-A18) | Decided by owner on 2026-10-26; implementation not authorized |
| O16 | Does the owner's build lab (OP08-OP11) enter scope, and how far may its numbers go? | Keep deferred (old B15/A11); stats only; full DPS calculator; tiered output gated by reviewed weapon records | Adopt as owner intent: slot editor with levels, PowerUps alongside, saved builds and compare. Output is tiered (player stats, weapon effective stats, per-cycle damage, modeled one-target rate) and each tier appears only where the reviewed weapon record allows (R27/R30). First release covers character, player level, weapons, passives and PowerUps; Arcanas, Golden Eggs, Limit Break, stage/mode modifiers and enemy-dependent effects are labeled "Not modeled". No "best build", score or ranking. Numbers are checked against the game's stat panel and Results screen before release (S1-09, PD8) | Decided by owner on 2026-10-26; reverses the B15/A11 deferral; implementation not authorized |
| O17 | Is the product a wiki or an app (OP12)? | Article wiki restructured; app with articles behind it; task app with pages as one level | An app organized by intent (Understand, Plan, Play) into five destinations (Home, Codex, Unlocks, Builds, Progress) plus search everywhere and a run companion. Every item appears at four levels (Glance, Peek, Page, Proof); a full page exists for every item so links and search still land somewhere (A25). Articles are not the main way in ([app UX plan](../design/app-ux-plan.md)) | Decided by owner on 2026-10-26; implementation not authorized |
| O18 | How strict is the design system (OP16)? | Style guide; component library; DTCG tokens with tiers, sealed fundamentals, views from data and an enforcement suite | W3C DTCG tokens in light, dark and more-contrast contexts; tiers tokens > fundamentals > compounds > layouts > views; sealed fundamentals; views assembled from data; an enforcement suite from the first commit. Values on the [design system](../design/design-system.md) page are proposals with contrast computed, confirmed after S1-12. Separate from Slate's documentation theme | Decided by owner on 2026-10-26; no token file or component built |
| O19 | How are UI words kept from mixing with game content (OP15)? | One text layer; UI strings from a catalogue and content only through content components | UI strings come only from a keyed catalogue with budgets and a lint; source content is rendered only by content components with attribution. Pictures and numbers carry the meaning; every icon has a name ([UI text](../design/ui-text.md)) | Decided by owner on 2026-10-26 |
| O20 | How do people move around on phones and desktops? | One responsive page layout; adaptive navigation by window class | Bottom bar (compact), rail (medium), sidebar (expanded); search and commands from every screen; peeks open over the current view and Back restores it; list-detail on expanded. Every state has an address that carries no progress or hidden secret (R31-R33) | Proposed working default; test in S2-19 |
| O21 | What does the app look like next to the game? | Copy the game's look; neutral app with game art only in item sprites | A neutral, modern app frame with its own palette and type; game art appears only in item sprites (rights-gated, A3) with a text-and-shape fallback (A24). No game logo, fonts or trade dress, and nothing that suggests official affiliation | Proposed working default; rights review still open |
| O22 | How are differences coloured in Compare, What's new and the build lab? | Good/bad colour everywhere; neutral direction everywhere; neutral in comparisons, effect colour only in the lab for reviewed stats | Compare and What's new show direction only (arrow, sign, "Higher"/"Lower") in neutral colour, because good/bad colour implies a winner (U20) and depends on context (Cooldown floor, ignored stats). The build lab may colour its own deltas by effect, only for stats whose direction is reviewed | Proposed working default; test in S1-10 |
| O23 | Who chooses the three "Start here" points on Home? | None; a rule over the spoiler class; a reviewer-curated list | Three base-game, non-secret items chosen by content reviewers and stored as data, re-checked when the spoiler classification (A7) changes. No module if fewer than three qualify | Proposed working default; depends on A7 |

## Reversal and authority

Operational decisions O10/O11 preserve the current task's limits. Changing them requires the
owner, not a kit's sample instruction. Product decisions O1-O8/O12/O13 can be revised after
research without changing third-party evidence to fit the proposal. O14 changes only the local
documentation reader's lifecycle, not the prohibition on product implementation. O15, O16, O17, O18 and O19 are
the owner's scope decisions (O20-O23 are working defaults); research can change their priority or design, and the owner decides
whether to keep them. Neither authorizes coding. O16 does not settle whether modeled numbers
help more than they mislead (A21); S1 tests that.

Before S2 starts, record: which scope was approved, which assumptions remain open, which rights
path is accepted, whether coding is authorized, and the exact coverage to implement.
No missing approval is replaced by an inferred "go."
