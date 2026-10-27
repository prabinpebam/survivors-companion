# Roadmap and dependency-aware backlog

> **TL;DR:** Validate priority tasks and source correctness first. A small trustworthy slice
> (lookup, visual browse, pairings, local progress, then unlock suggestions on reviewed
> conditions, and a build lab whose numbers come only from reviewed weapon records) precedes a
> complete-wiki migration.
> No implementation work below is started or authorized.

## Stage dependency map

```text
D0: research + specification (this task)
  -> owner reviews scope and authorizes participant work
S1: task validation + manual content/rights audit (recipes, unlock-condition sample, weapon-record
    sample with in-game golden checks, icon rights)
  -> owner records go / change / stop and separately authorizes coding
S2: thin slice on audited content: lookup / explanation / prerequisites, visual browse and
    pairings, local progress with export/import, then suggestions and session plans on the
    modeled subset; build lab (slots, levels, PowerUps, tiered output) and saved-build compare;
    all inside the app shell and design system (tokens and text lint from the first commit)
  -> observe failures, fix, and decide supported coverage
S3: measured release candidate with attribution and maintenance
  -> only then evaluate offline use, Arcana/Egg/Limit Break modeling and broader coverage
```

This is a planning dependency map, not an executable pipeline.
The [Definition of Done](definition-of-done.md) owns the stage gates; this page owns order
and priority. The [work plan](work-plan.md) owns the current documentation execution.

## Backlog

Priority is ordinal (P0 before P1), not a numerical demand score inferred from forum votes.
Roles are proposed responsibilities, not staffed assignments.

| ID | Priority / stage | Outcome | Supports | Depends on | Acceptance / owner |
|---|---|---|---|---|---|
| B01 | P0 / S1 | Decide the first task and explicit launch coverage | P1-P4, A1 | D0 pack and owner review | S1-01; product owner |
| B02 | P0 / S1 | Test real recent player tasks and current alternatives | A1, A2 | Contact/consent approval | S1-02/03; researcher |
| B03 | P0 / S1 | Establish a rights/attribution publication path | P4, A3 | Source and asset review | S1-05; owner + rights reviewer |
| B04 | P0 / S1 | Audit representative recipe and prerequisite cases | U2/U6, A4/A5 | Source slice selected | S1-04; content reviewer |
| B05 | P0 / S1 | Record go/change/stop and coding permission separately | All | B01-B04, B22/B23 sample audits, B24 golden checks | S1-06; product owner |
| B06 | P0 / S2 | Project reviewed entities, recipes and provenance | U1/U2/U5, A4 | B05; no importer before authorization | S2-01/04; engineering + content |
| B07 | P0 / S2 | Find the item and explain the next valid evolution step | U1/U2 | B06 | S2-01; engineering + design |
| B08 | P0 / S2 | Apply owned-content and spoiler context without hiding why | U3/U4 | B06, reviewed policy | S2-02/03; design + engineering |
| B09 | P0 / S2 | Inspect source/limitations and report a correction | U5/U7 | B06 | S2-04/07; content + engineering |
| B10 | P1 / S2 | Follow a bounded prerequisite path | U6 | B04, B06, conflict handling | S2-05; content + engineering |
| B11 | P0 / S2 | Complete the slice on small screens and with assistive input | All | B07-B10, B15, B18-B21, B26, B28 | S2-06; design + QA |
| B12 | P0 / S3 | Validate useful task outcomes and revise failures | PD1-PD3 | S2 usable slice; participant approval | S3-02; researcher |
| B13 | P0 / S3 | Establish measured performance/accessibility/privacy | PD5 | B11 and defined release coverage | S3-03/04; engineering + QA |
| B14 | P0 / S3 | Publish only reviewed coverage with maintenance ownership | P4 | B03, B12, B13 | S3-01/04/05; owner |
| B15 | P1 / S2 | Build lab: slot editor, levels, PowerUps and tiered, explained stats and weapon output (reverses the earlier deferral by O16) | U15-U18, OP08/OP09/OP11, A11/A19/A21 | B06 entity projection, B19 pairings, B23 records, B24 in-game checks | S2-14/15/16; engineering + content |
| B16 | Discovery later | Test demand for offline pinning and any account/cloud option | A12; local progress is now B19/B20 | Measured need and privacy/storage design | New brief/DoD; no cloud-save promise |
| B17 | Discovery later | Expand to additional DLC/platforms/locales | Coverage hypothesis | Correctness/rights capacity, not archive size | New reviewed coverage contract |
| B18 | P0 / S2 | Browse collections in a labeled icon grid with sorts, filters and view modes | U8/U9, OP01/OP03, A13/A17 | B06 entity projection; B28 shell; icon mapping (DS11) and rights path (B03); text-tile fallback | S2-08; design + engineering |
| B19 | P0 / S2 | See weapon-passive pairings both ways and in a pairing view | U10, OP02 | B06 reviewed recipes, B04 audit | S2-09; content + engineering |
| B20 | P0 / S2 | Mark progress locally and move it by JSON export/import | U11/U12, OP04/OP05, A16 | B06 stable IDs; storage-failure design | S2-10/11; engineering + design |
| B21 | P1 / S2 | Get explainable next-unlock suggestions and single-run session plans | U13/U14, OP06/OP07, A14/A15/A18 | B20 progress, B22 reviewed conditions, spoiler policy (B08) | S2-12/13; content + engineering |
| B22 | P0 / S1-S2 | Audit and model unlock/secret conditions with sources and coverage | R21, A14, DS12 | S1 sample audit (S1-07) before full modeling; no importer before authorization | S1-07, S2-13; content reviewer |
| B23 | P0 / S1-S2 | Audit and model weapon, passive, PowerUp and character stat records with status and sources | R24/R25/R30, A19/A20/A23, DS13-DS15 | S1 sample of 30 weapons (S1-09) before full modeling; no extractor before authorization | S1-09, S2-15; content reviewer |
| B24 | P0 / S1, repeated per game version | Check golden cases in the game (stat panel, Results screen) and record the version | A19/A22, GC01-GC15, BM-V | A player with the game and the relevant content; B23 sample | S1-09, PD8; content reviewer + player |
| B25 | P1 / S1 | Test static build-lab and compare cards with build-interested players | A11/A21 | Participant approval (B02) | S1-10; researcher |
| B26 | P1 / S2 | Save, export/import and compare builds | U19/U20, OP10, R28/R29 | B15 build lab, B20 storage and export | S2-17; engineering + design |
| B27 | P0 / S1-S2 | Design-system foundation: DTCG tokens, tiers, sealed fundamentals, design library and enforcement suite | R36, OP16, O18, A26 | S1-12 review; coding authorization | S1-12, S2-18; design + engineering |
| B28 | P0 / S2 | App shell, adaptive navigation, search everywhere, peek and preferences | U22/U26, R31-R34, OP12-OP14, O17/O20, A25 | B27 | S2-19; design + engineering |
| B29 | P0 / S2 | UI text catalogue and lint; content components with attribution | R35, OP15, O19 | B27 | S2-23; design + content |
| B30 | P0 / S1 | Test static frames for visual-first comprehension, with and without sprites | A24/A25, P8 | Participant approval (B02); B03 rights path | S1-11; researcher |
| B31 | P2 / S2 | Run companion | U23, R37, A27 | B28 shell, B19 pairings, B15 slot rules | S2-20; design + engineering |
| B32 | P1 / S2 | Mechanics explainers driven by the build lab's rules | U21, R39 | B23 records, B24 golden checks, B15 | S2-21; content + engineering |
| B33 | P1 / S2 | Home and what's new | U24/U25, R38, A10/A22, O23 | B28 shell, B20 storage, versioned content snapshots and a named maintainer | S2-22; engineering + content |

## Scope controls

| Pressure | Current response | Trigger to reconsider |
|---|---|---|
| "We archived everything, so expose everything" | Source archive stays separate from product search and release payload | Reviewed, scoped projection plus demonstrated task benefit |
| "A planner is the differentiator" | The owner chose an unlock-session planner (O15) and a build lab (O16), both on reviewed records only | Research shows a planner is unused or misread (A11/A15/A21) |
| "Users need an account to track progress" | Progress stays in the browser with JSON export/import; no account, cloud or save import | Study establishes need and privacy/maintenance cost is justified |
| "Just parse the unlock text automatically" | A parser may draft records; only reviewed records drive suggestions/plans, with coverage shown | Audit shows parsed drafts are reliably correct for a condition type |
| "Show every field so nothing is missing" | Compact default with deliberate "Show all details" and column chooser (OP03) | Participants repeatedly miss a needed field in the compact default |
| "Support every DLC on day one" | Clearly label audited coverage and omissions | Content team can maintain that exact scope |
| "Make it a wiki with better articles" | An app organized by intent; full pages exist behind every peek for links and search (O17) | Participants landing from search cannot complete tasks without an article (A25) |
| "Make an exception to the tokens just this once" | No raw values; extend the token set and its docs instead (O18) | A rule repeatedly blocks a valid design and is changed by a recorded decision |
| "Just show one DPS number" | Tiered output; modeled rate only for reviewed weapons, labeled one target, ideal conditions; no ranking (R27) | In-game checks show a weapon's rate is reliable across its Results-screen band | Not in scope; source-grounded deterministic explanations first | A separately evaluated problem cannot be solved adequately by structured answers |

## Effort and scheduling

No delivery date or velocity estimate is asserted before the team, scope and content audit are
known. Use relative sizing only: B06/B04 are high-uncertainty content work; B07/B08 are medium
interaction work; B09 is small only after provenance exists. Research recruitment and rights
clearance can dominate elapsed time and are not safely estimated as coding hours.

Critical path: B01 + B03 + B04 -> B05 -> B06 -> B07/B08/B09 -> B11/B12 -> B14.
B02 proceeds in parallel with B03/B04 and can change B01 before B05.
Owner-added work: B22's sample audit runs in S1 beside B04. After B06, B18/B19/B20 can proceed in
parallel with B07-B09; B21 waits for B20 and the modeled conditions from B22. If B22 shows that
few conditions can be modeled, ship B18-B20 and narrow B21 to the modeled subset.
Build lab: B23's sample audit and B24's in-game checks run in S1 beside B04/B22. B15 follows B06,
B19 and the reviewed records; B26 follows B15 and B20. If B23 shows few weapons can be modeled,
ship B15 with T1/T2 and B26, and limit T3/T4 to the modeled subset (spec R27/R30 valve).
Relative sizing: B23 is high-uncertainty content work (381 weapon pages, two table layouts,
missing timing); B24 needs game access and repeats each patch; B15/B26 are medium logic work.
Relative sizing: B22 is high-uncertainty content work (hundreds of free-text conditions);
B21 is medium logic work once conditions exist; B18-B20 are medium interaction work.
If rights remain unresolved, keep the work local or choose an independently authored text-only
slice; do not route around rights by copying a competitor's chart.

## Release and maintenance responsibilities (proposal)

- Product owner: coverage, scope, permission to implement/publish, license decisions.
- Content reviewer: source lineage, recipe exceptions, release notes and correction triage.
- Researcher: recruitment consent, study notes and outcome interpretation.
- Engineering/design/QA: implementation and measured quality only after authorization.
- Maintainer: patch review cadence, upstream changes, provenance refresh and rollback.

Initial proposed maintenance policy: label every content snapshot date; review announced game
patches before claiming compatibility; triage reported incorrect recipes before adding features.
The eventual review cadence and staffing must be accepted before a public release.
