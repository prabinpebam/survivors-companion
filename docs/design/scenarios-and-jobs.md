# Scenarios, jobs and user-can detail

> **TL;DR:** This page expands the spec's chain from promise to job to user-can statement. It
> covers six player moments, five task segments (not personas) and sixteen scenarios (SC01-SC16)
> told as short stories. Each job (J1-J16) gets a card: functional, emotional and social sides,
> the forces for and against switching, today's workaround, measurable outcomes and evidence.
> Each user-can statement (U1-U26) gets an observable pass criterion and a failure sign. Ten
> protective statements (N1-N10) say what the app must never do. All of this is a proposal built
> from desk research and owner input; no participant has been studied.

Status: proposal (OP14). IDs J, U, P, F and V are defined in the [spec](../spec.md) and
[experience requirements](../experience.md). Evidence IDs (E) are in the
[user evidence ledger](../research/user-evidence.md); OP rows are the owner's input. Evidence
mapping is an **inference** from public posts and reviews, not interview findings.

## Player moments

The same person needs different things at different moments. The moment decides the device,
the attention available and the right amount of UI.

| Moment | Typical context | Attention and time | What the app must do | Main screens |
|---|---|---|---|---|
| Before a run | Desktop or phone, game menu open or not yet started | Several minutes, focused | Help choose character, stage, build and target unlocks | Unlocks, Build lab, Home |
| During a run | Game on a monitor or console; app on a phone, tablet or second monitor; or game paused | Seconds, divided | Show next steps for pinned items, large and quiet | Run companion, Peek, Search |
| After a run | Same devices, run just ended | A minute, satisfied or frustrated | Record what happened in a few taps; show what opened up | Progress, Home, Unlocks |
| Between sessions | Phone, commute or couch | Minutes, curious | Browse, learn a rule, compare ideas | Codex, Explainers, Builds |
| After an update or a break | Any device | Minutes, unsure what changed | Show what is new in scope and what it affects | What's new, Home |
| First time | Any device, often a phone, from a search or a link | Seconds to decide whether to stay | Answer the question that brought them; offer spoiler-safe starting points | Peek or Entity page, Home |

## Task segments

Segments are defined by what a person is trying to do, not by who they are. One person moves
between segments. These are not statistically established personas.

| Segment | Trying to | Spoiler stance | Main jobs | Evidence (inference) |
|---|---|---|---|---|
| Newcomer | Survive longer, learn the evolution rule, find what to buy first | Avoids spoilers | J16, J1, J4, J10 | E03, E06, E26, E08 |
| Regular | Remember pairings, pick level-ups, try a new character | Mixed | J7, J6, J1, J14 | E12, E16, E19, OP01, OP02 |
| Completionist | Track unlocks and secrets, plan runs that clear several at once | Wants answers, per item | J8, J9, J2, J4 | OP04-OP07, E07, E11 |
| Theorycrafter | Understand rules and numbers, compare builds | Wants everything | J10, J11, J12, J13 | E01, E02, E35, E36, OP08-OP11 |
| Returning player | Catch up after an update or a long break | Mixed | J15, J3, J5 | E02, E11, E18, E30, E31 |

## Scenarios

Each scenario is a short story of a real moment, with the jobs, user-can statements and flows
it exercises. Names of items are illustrative; the reviewed content decides real values.

| ID | Moment | Story | Jobs | User can | Flows | Done looks like |
|---|---|---|---|---|---|---|
| SC01 | During a run | Mid-run, I have the Whip at level 6 and can't remember its passive. I tap search on my phone, type "wh", and the peek shows Whip + Spinach -> evolution, with the chest rule. I'm back in the game in under ten seconds. | J1, J7, J14 | U1, U2, U10, U22 | F1, F14 | Answer read without opening a page |
| SC02 | Between sessions | I remember a weapon as "the blue spinning thing" but not its name. I open Weapons, filter by "Not marked" and "Projectile", switch to Grid and spot it by its sprite. | J6 | U8, U9 | F6 | Found by sight, no scrolling past 3 screens |
| SC03 | Before a run | I picked up Spinach in my last run and want to know everything it pairs with. Pairings shows every partner, input-first, with what each becomes. | J7 | U10 | F7 | All partners seen in one view |
| SC04 | After a run | I just unlocked a stage and a character. On the home screen I tap the two tiles in "Next unlocks" and mark them; Undo is there if I tap the wrong one. | J8 | U11, U25 | F8, F17 | Two marks in two taps; saved message after the write |
| SC05 | Before a run | I want to knock out several unlocks tonight. Unlocks suggests a session plan: one character, one stage, three weapons, covering four attempts, with why each is included. I pin it to the run companion. | J9 | U13, U14, U23 | F10, F15 | Plan accepted and pinned without reading condition pages |
| SC06 | During a run | The pinned plan is on my tablet beside the TV. When a level-up appears, I glance: which of my pinned weapons still needs its passive. I step the level with one tap. | J14 | U23 | F15 | Glance and update in under five seconds |
| SC07 | Before a run | I'm deciding between Might and Cooldown PowerUps with my gold. In the build lab I raise each rank and watch my stats and each weapon's output change, with the gold price. | J10 | U15, U16, U17, U18 | F11 | Decision made with the numbers in view |
| SC08 | Between sessions | I have two build ideas. I save both and compare them; the app shows where they differ and why ("Area +40% from Candelabrador"), without calling one better. | J11, J12 | U19, U20 | F12 | Differences understood without a spreadsheet |
| SC09 | Between sessions | Someone said more Cooldown stops helping. I open the Cooldown explainer, slide my value and see where the floor is and which of my weapons it affects. | J13 | U21 | F13 | Rule understood from the figure, not a paragraph |
| SC10 | Any | A number in my build looks too high. I open it and see each source, the cap and that one weapon ignores Duration. I trust it, or I see it isn't modeled. | J12, J5 | U18, U5 | F11, F5 | Every number traceable in one step |
| SC11 | After an update | I haven't played for two months and an update came out. Home shows "What's new": eight added items in my scope, one changed recipe that affects a saved build. | J15, J3 | U24, U25 | F16 | Changes reviewed; affected build flagged |
| SC12 | First time | A friend sent me a link to a weapon. It opens straight on that weapon's page; I can go back to a grid of weapons or to Home without a sign-up or tour. | J16, J1 | U25, U22 | F17, F14 | Answer at the link; clear way onward |
| SC13 | First time | I'm new and don't want spoilers. I keep Spoilers on "Hide secrets" (the default); secrets appear as hidden tiles and nothing reveals itself until I ask. | J16, J4 | U26, U4 | F17, F4 | No secret seen without a deliberate reveal |
| SC14 | Any | I only own the base game and one pack. I set my content once; results outside my content are counted, not mixed in, and I can still look at them if I choose. | J3 | U3, U26 | F3, F17 | Scope applied everywhere; nothing silently hidden |
| SC15 | Any | I play on desktop and phone. I export my progress and builds as one file and import it on the other browser after a preview of what will change. | J8, J11 | U12, U19 | F9 | Same progress on both after a previewed import |
| SC16 | Any | A recipe looks wrong after a patch. I open its sources, see the snapshot date and the source page, and follow "Report a possible error" to the source. | J5 | U5, U7 | F5 | Source inspected; correction started at the source |

## Job cards

### Functional, emotional and social sides

| Job | Functional (get done) | Emotional (feel) | Social (be seen as) |
|---|---|---|---|
| J1 | Know the next evolution step for an item I hold | Confident, not stalled mid-run | A player who knows their build |
| J2 | Find the missing condition behind a failed evolution or unlock | Relieved, not stuck repeating | Not the one asking an obvious question |
| J3 | Only see what applies to my packs and version | In control of my context | Not misled by others' setups |
| J4 | Get a hint without full spoilers | Discovery preserved | Able to talk about the game without spoiling it |
| J5 | Check where a fact comes from and report a problem | Able to trust or doubt with reason | A good community citizen |
| J6 | Find an item by how it looks | Quick, not lost in lists | (none strong) |
| J7 | See an item's partner instantly | Freed from memorising pairs | A player who builds well |
| J8 | Keep my own checklist of progress | Proud of progress, organised | Able to share progress if I choose |
| J9 | Plan a run that clears several unlocks | Efficient, purposeful | (none strong) |
| J10 | See how slots, levels and PowerUps change my numbers | Smart about choices, not guessing | Able to explain my build |
| J11 | Keep and compare build ideas | Decisive | Able to share a build idea as an export file |
| J12 | Trace a surprising number | Trusting, or rightly cautious | Credible in discussions |
| J13 | Understand how a rule or stat works | Curious, satisfied | Able to explain a rule to others |
| J14 | Use the answer during a run without losing the run | Calm, not distracted | (none strong) |
| J15 | Catch up after an update or a break | Reoriented, not overwhelmed | Current with the community |
| J16 | Start without a tutorial wall or spoilers | Welcome, not lectured | (none strong) |

### Forces and current workarounds

Push: what drives the person away from today's way. Pull: what attracts them to the app.
Anxiety: what makes them hesitate. Habit: what keeps them where they are.

| Job | Push | Pull | Anxiety | Habit and workaround today |
|---|---|---|---|---|
| J1 | Searching mid-run; long pages; ad-heavy hosts (E15, E16) | Answer in one peek | "Is this current for my version?" | Web search, wiki article, memory |
| J2 | Unclear conditions; misconceptions about the chest rule (E04, E08, E25) | Named missing condition | Wrong answer stated with confidence | Forum question, trial and error |
| J3 | Instructions for content I don't own; stale guides (E11, E30) | Scope applied everywhere | Hidden results I needed | Mentally filtering |
| J4 | Spoilers in search results and threads (E03, E09, E10) | Per-item reveal | Accidental reveal | Avoiding the wiki, asking for hints |
| J5 | Unattributed or outdated answers (E18, E20, E23) | Source and date on every claim | The app is also wrong | Cross-checking several sites |
| J6 | Endless names-only lists (OP01) | Sprite grid with filters | Can't find without the name | Scrolling, image search |
| J7 | Pairing buried in a page; result-first notation (OP02, E12, E19) | Input-first pairing, both directions | Missing unions or exceptions | Cheat-sheet images, memory |
| J8 | No external checklist; the in-game record only shows what is found (OP04, E07) | Local marks, export | Losing marks; marks called "locked" | Spreadsheets, memory |
| J9 | Chasing one unlock per run (OP06, OP07) | Plan covering several attempts | A plan that can't work | Reading many condition pages |
| J10 | Guessing; spreadsheets (OP08, OP09, E01, E06, E26) | Live numbers with math | Numbers that are wrong or overclaimed | Trial runs, forum advice |
| J11 | Ideas lost between runs (OP10, E02) | Saved builds and compare | Being told a "winner" | Notes, screenshots |
| J12 | Numbers with no explanation (OP11, E35) | Breakdown per source | False precision | Asking in forums |
| J13 | Rules scattered across answers (E35, E36) | Interactive explainer with my values | Simplified to the point of wrong | Forum threads, video guides |
| J14 | Switching apps mid-run pauses or loses the game on one phone (E32); per-weapon lookups (E16) | Second-screen companion | Distraction, screen sleeping | Second-monitor cheat sheets (E21), pausing |
| J15 | Patch lag in other tools; outdated guides (E18, E30, E31) | What's new in my scope | Changes that break my builds silently | Patch notes, community threads |
| J16 | Overwhelming references; spoilers (E03, E06) | Spoiler-safe starting points | Being lectured or spoiled | Asking friends, trial and error |

### Outcomes and evidence

Outcome measures are what a future test would observe. None has been measured.

| Job | Desired outcomes (future measures) | Evidence (inference) |
|---|---|---|
| J1 | Time from question to next step under 10 s on a phone; no page opened | E08, E12, E16, OP02 |
| J2 | The missing condition named in one step; fewer repeated failed attempts | E04, E08, E25 |
| J3 | No out-of-scope instruction followed; filtered results always counted | E05, E11, E30, E31 |
| J4 | No protected item seen without a deliberate reveal | E03, E09, E10 |
| J5 | Source, date and correction route reachable in one step from any claim | E18, E20, E23, E30 |
| J6 | Item found by sight within three screens of grid | OP01, E22 |
| J7 | Partner seen in one step from either item | OP02, E12, E19 |
| J8 | Mark in one tap; export and import with a preview; no lost marks | OP04, OP05, E07 |
| J9 | Plan covering more than one attempt, with a reason per attempt | OP06, OP07 |
| J10 | Effect of each change visible in the same frame, with sources | OP08, OP09, E01, E06, E26 |
| J11 | Two builds compared, every difference explained | OP10, E01, E02 |
| J12 | Every number traceable to sources, caps and model status | OP11, E35 |
| J13 | Rule understood (correct prediction in a test) after one explainer | E35, E36 |
| J14 | Glance and update in under 5 s; no navigation away from the pinned run | E16, E21, E32 |
| J15 | Changes in scope reviewed in one screen; affected marks and builds flagged | E02, E18, E30 |
| J16 | First question answered without sign-up, tour or spoiler | E03, E04, E06 |

## User-can criteria

Each statement from the spec, with an observable pass criterion and the sign that it fails.
"Future DoD" rows in the spec reference these criteria.

| User can | Passes when (observable) | Fails if |
|---|---|---|
| U1 | A covered item is found from its name, a partial name or a reviewed alias; ambiguous matches show kind and sprite | An alias returns nothing, or two matches look identical |
| U2 | The next step shows inputs, required levels and special conditions, input-first | A universal rule is shown where an exception applies |
| U3 | Scope is set once; filtered results are counted and reachable | A filtered result looks like missing coverage |
| U4 | Hidden secrets stay hidden in grids, search, suggestions, what's new and addresses until revealed one at a time | Any surface reveals a hidden item's name or sprite |
| U5 | Source, revision, snapshot date, coverage and attribution are one step from any claim | A claim has no reachable source |
| U6 | The prerequisite path shows each condition and its source; unresolved branches are labeled | A path is shown as complete when it is not |
| U7 | An unverified answer says so and offers the source and the correction route | "Error reported" appears before anything is sent |
| U8 | A collection shows as a labeled sprite grid; filters combine and show counts | Tiles without names; filters without counts |
| U9 | Grid, List, Table and Details switch in place, keeping filters and scroll | Switching loses filters or position |
| U10 | From any weapon or passive, its partners show in the peek; Pairings lists all, input-first | The pairing needs a full page to find |
| U11 | Marking, unmarking and bulk marking work from any glance; Undo is offered | A mark is lost or "Saved" shows before the write |
| U12 | Export makes one readable JSON file; import previews merge or replace | Import overwrites without a preview |
| U13 | Suggestions respect marks and spoilers, each with a reason | A suggestion reveals a hidden item or has no reason |
| U14 | A plan names character, stage and items, counts the attempts covered and says why each is included | The plan claims success or hides unmodeled conditions |
| U15 | Items are placed within the character's slot limits; pairings and conflicts show | More items than slots, or a conflict without a reason |
| U16 | Changing a level updates every affected number in the same frame | Any number lags or disagrees with its breakdown |
| U17 | PowerUp ranks show effect and price, from a profile or per build | Price or effect hidden; profile changes not reflected |
| U18 | Every derived number opens to its sources, caps, ignored stats and model status | A bare "DPS"; an unmodeled weapon shows a rate |
| U19 | Builds save, rename, duplicate and delete with Undo; they travel in the export | A build is lost or saved with computed numbers only |
| U20 | Up to three builds compare; each difference has sign, amount and cause | A winner is declared; versions differ silently |
| U21 | An explainer shows the rule with the person's value, caps, sources and ignored cases, and matches build-lab numbers | The explainer disagrees with the lab or hides uncertainty |
| U22 | A peek opens from any glance and closes back to the same scroll, filters and focus | Closing a peek resets the view or loses focus |
| U23 | A run can be pinned within slot limits; each pinned item shows its next step; a level steps in one tap; the pin survives reload | The companion navigates away on its own, or the pin is lost |
| U24 | Changes since the last visit in scope are listed with affected marks and builds; spoilers stay hidden | A removed item drops a mark silently, or a change reveals a secret |
| U25 | Home shows the person's next steps, or on first use three spoiler-safe starting points; no empty modules | Home shows an empty module or a tour wall |
| U26 | Theme, density, motion, scope and spoilers set once apply on every screen and persist in this browser | A screen ignores a preference |

## Protective statements

What a person must never experience. Each one is a test the product must keep passing.

| ID | A person never | Guards |
|---|---|---|
| N1 | Sees a hidden secret's name, sprite or condition without a deliberate reveal | U4, U13, U24 |
| N2 | Loses progress, a build or a pinned run without having chosen to | U11, U19, U23 |
| N3 | Is told "Saved", "Synced" or "Imported" before it is true | U11, U12 |
| N4 | Is told a build or plan is "best", guaranteed or optimal | U14, U20 |
| N5 | Sees a computed number that has no breakdown or that hides a missing model | U18, U21 |
| N6 | Has their progress or builds sent anywhere they did not export them to | U12, U26 |
| N7 | Has to read an article to get an answer the app can show | U2, U10, U22 |
| N8 | Meets meaning carried only by colour, icon, shape or position | All |
| N9 | Is blocked by a sign-up, tour or ad before the answer | U25 |
| N10 | Is shown content outside their scope as if it applied to them | U3 |

## Traceability

The chain from promise to screen. Every screen in the [app UX plan](app-ux-plan.md#screen-plans)
traces to at least one row.

| Promise | Jobs | User can | Flows | Views and screens |
|---|---|---|---|---|
| P1 | J1, J2, J7, J14 | U1, U2, U10, U22 | F1, F2, F7, F14 | V1 Search, V2 Entity page, V7 Pairings, V13 Peek |
| P2 | J3, J4, J9, J16 | U3, U4, U26 | F3, F4, F17 | V4 and V17 Settings, ScopeBar everywhere |
| P3 | J2, J3, J5, J15 | U5, U6, U7, U24 | F2, F5, F16 | V3, V5 Proof, V16 What's new |
| P4 | J5, J12, J13 | U5, U18, U21 | F5, F11, F13 | V5, V10, V14 Explainer |
| P5 | J6, J7 | U8, U9, U10 | F6, F7 | V6 Codex, V7 Pairings |
| P6 | J8, J9 | U11, U12, U13, U14 | F8, F9, F10 | V8 Progress, V9 Unlocks |
| P7 | J10, J11, J12, J13 | U15-U20 | F11, F12 | V10 Build lab, V11 Compare |
| P8 | J13, J14, J15, J16 | U21-U26 | F13-F17 | V12 Home, V13 Peek, V14, V15 Run companion, V16, V17 |
