# Build mechanics research

> **TL;DR:** A trustworthy build lab is feasible for **player stats** (stacking, caps and
> PowerUps are documented precisely) and for **per-weapon effective stats** (base values,
> level steps and which stats each weapon ignores). A single honest "DPS" number is not
> feasible from the archive alone: hit timing (hitbox delay) is missing for about two thirds
> of weapons, many weapons have special behavior, and real damage depends on enemies.
> The lab should show stats exactly, show modeled damage rates only for reviewed weapons,
> label everything else, and check itself against the game's own stat panel and Results screen.

This page records what the game's build math is, how sure we are of each part, what data
exists to drive it, and how to prove a future calculator right. It is read-only research from
2026-10-26. It is not a formula implementation, a data file or a promise that the archive
matches the current game version.

## How to read confidence

| Label | Meaning | May drive a number in the lab? |
|---|---|---|
| **Confirmed (archive)** | Stated on the archived wiki page or present in archived structured data, with the path given | Yes, after the in-game check for that rule passes (BM-V) |
| **Datamine** | Inferred from decompiled game data by a third party; hedged by its own authors | Only as a cross-check, never as the only source |
| **Player report** | A player statement in a forum thread | No; it raises a question to verify |
| **Unknown** | Not found, blank, contradictory or out of date | No; the lab shows "Not modeled" |

Archive paths are workspace-root-relative and read-only. The Slate reader serves only `docs/`,
so open archive files in VS Code.

## Sources inspected

| Source | Kind | What it gave |
|---|---|---|
| `resources/pages/Main/{Might,Area,Duration,Speed,Cooldown,Amount,Move_Speed,Max_Health,Magnet,Armor_(stat),Luck,Growth}.wikitext` | Confirmed (archive) | Base values, stacking rules, caps and exceptions per stat |
| `resources/pages/Main/PowerUps.wikitext`; `resources/data/bucket/rows/infobox_powerup.jsonl` (28 rows); `resources/pages/Module/PowerUpsTable/Data.lua` | Confirmed (archive) | Rank bonus, maximum rank, stacking kind, initial price and the price formula |
| `resources/pages/Main/*.wikitext` with `Infobox Weapon` (381 pages) | Confirmed (archive) | Base damage, cooldown, area, speed, duration, amount, interval, pool, pierce, knockback, crit chance and multiplier, hitbox delay, effects text, level and Limit Break tables |
| `resources/data/bucket/rows/stats_combos.jsonl` (355 rows) | Confirmed (archive) | Per weapon, which stats and passives affect it (true/absent flags) |
| `resources/pages/Main/*.wikitext` with `Infobox Passive item` (43 pages) | Confirmed (archive) | Per-level effect, maximum effect, maximum level and stacking for 32/26 of them |
| `resources/data/bucket/rows/infobox_character.jsonl` (387 rows) | Confirmed (archive) | Starting stats (`stats_json`) and level bonuses as free text |
| `resources/pages/Module/DefaultStats.lua` | Confirmed (archive) | Default player stats (Max Health 100, Move Speed 1, Might 1, Amount 0 …) |
| `resources/pages/Main/{Results,Critical_Hit,Limit_Break,Level_up,Mindbender,Player_stats}.wikitext` | Confirmed (archive), `Player_stats` marked outdated | Results-screen DPS, crit rule, Limit Break, slots, level-up choices |
| [lukeod/vampiresurvivors-modding](https://github.com/lukeod/vampiresurvivors-modding) (`damage-system.md`, `weapon-system.md`) | Datamine | Weapon data field names (power, area, speed, duration, interval, amount, knockback, hitBoxDelay, critChance, critMul, poolLimit, charges, intervalDependsOnDuration…) |
| Steam threads [E35](user-evidence.md#build-lab-supplementary-evidence) and [E36](user-evidence.md#build-lab-supplementary-evidence) | Player report | Players confuse Might with base damage; players dispute which weapons use Duration |
| Competitor planners S13, S15-S19 and the wiki Calculators page | Rendered pages | See the [benchmark](competitor-benchmark.md#build-lab-comparison) |

The local `Player_stats` page is flagged outdated by the wiki itself (missing three DLCs).
Individual stat pages are the authority; `Player_stats` is not.

## Slots and what fills them

| Rule | Detail | Confidence |
|---|---|---|
| Normal limit | 6 weapon slots and 6 passive slots | Confirmed (archive) |
| Fewer weapon slots | Mindbender lets the player choose a maximum of 1-6 weapons | Confirmed (archive) |
| More slots | Stage items, Candybox gifts, Arma Dio, Survarot (+1 passive), Congregation, Perkeo (100 passive slots), Queen Sigma | Confirmed (archive); each needs its own reviewed rule before the lab allows it |
| Evolution | The evolved weapon replaces the base weapon in the same slot; the passive stays | Confirmed (archive) |
| Union | Two weapons merge into one slot, freeing the other | Confirmed (archive) |
| Gifts and morphs | Gifts add items outside the normal choice; morphs are character-specific | Confirmed (archive) |
| Level-up choice | 3-4 options weighted by item rarity | Confirmed (archive); relevant to plans, not to the stat math |

The lab therefore needs a slot rule per character and mode, not one fixed 6+6 layout. First
release: 6+6 with the Mindbender weapon limit, and every slot-changing exception shown as
"Not modeled" until reviewed.

## Player stats: base, stacking and caps

"Additive" means bonuses are summed and then applied once. "Multiplicative" means each bonus
multiplies the running total.

| Stat | Base | How bonuses stack | Cap or floor | Confidence |
|---|---|---|---|---|
| Might | 100% | Additive across character, PowerUp, passives | Total 1000% (shown as +900% in the stat panel) | Confirmed |
| Area | 100% | Additive; Arcana bonuses apply on top | 1000% total; Arcana part not limited | Confirmed |
| Duration | 100% | Additive; Arcana bonuses apply on top | 500% total; Arcana part not limited | Confirmed |
| Speed (projectile) | 100% | Additive; Arcana bonuses apply on top | 500% total; negative total makes projectiles move backwards | Confirmed |
| Cooldown | 100% | Additive reductions | Reduction limited to -90% (floor 10% of base); Tragic Princess (III) is exempt | Confirmed |
| Amount | +0 | Flat additive | +10 from characters, PowerUps, passives and weapon bonuses; some character effects have no cap | Confirmed |
| Move Speed | 100% | Additive; stage bonuses multiply the result (e.g. Cappella Magna ×1.4) | No general cap; some items limit their own bonus to +500% | Confirmed |
| Max Health | 100 | Character bonus additive; PowerUp and items multiply after it | None | Confirmed |
| Magnet | 30 | Multiplicative | None | Confirmed |
| Armor | 0 | Flat additive | No cap on Armor; retaliation bonus capped at +500% (50 Armor); only Toastie exceeds +50 | Confirmed |
| Luck, Growth, Greed, Curse | 100% | Additive | None (Curse affects enemies; a separate enemy-count limit applies) | Confirmed |
| Recovery, Revival | 0 | Flat additive | None | Confirmed |

Implications for the lab:

- Show every derived stat as **total = base + sum of sources**, with a source breakdown and a
  visible "capped" mark. The stat panel shows *bonus*, not *total*; the lab must say which.
- Negative totals are real (Rose starts at -90% Might; Master Librarian at -100% Move Speed).
- Arcana, stage and temporary bonuses follow different stacking. Leave them out of the first
  release and say so, rather than mixing rules.

## PowerUps

28 PowerUp rows in `infobox_powerup.jsonl`. The ones that change build math:

| PowerUp | Per rank | Ranks | Maximum | Stacking | Initial price |
|---|---|---|---|---|---|
| Might | +5% | 5 | +25% | Additive | 200 |
| Armor | +1 | 3 | +3 | Additive | 600 |
| Max Health | +10% | 3 | ×1.331 | Multiplicative | 200 |
| Recovery | +0.1 HP/s | 5 | +0.5 | Additive | 200 |
| Cooldown | -2.5% | 2 | -5% | Additive | 900 |
| Area | +5% | 2 | +10% | Additive | 300 |
| Speed | +10% | 2 | +20% | Additive | 300 |
| Duration | +15% | 2 | +30% | Additive | 300 |
| Amount | +1 | 1 | +1 | Additive | 5000 |
| Move Speed | +5% | 2 | +10% | Additive | 600 |
| Magnet | +25% | 2 | ×1.5625 (description says +50%) | Multiplicative | 300 |
| Luck | +10% | 3 | +30% | Additive | 600 |
| Growth / Greed / Curse | +3% / +10% / +10% | 5 each | +15% / +50% / +50% | Additive | 900 / 200 / 1666 |
| Omni | +2% to Might, Area, Speed, Duration | 5 | +10% each | Additive | 1000 |

Also present: Revival, Charm, Defang, Reroll, Skip, Banish, Preserve, Fever and Seals. They
affect runs, not the damage math. Prices are the `cost` field of each row.

**Price formula** (`PowerUps.wikitext`, Cost section; confirmed):

- First rank ever bought (no ranks of any PowerUp owned): `Price = InitialPrice`.
- Otherwise: `Price = InitialPrice × (1 + Bought) + floor(20 × 1.1^TotalBought)`.
- `Bought` = ranks of this PowerUp already owned; `TotalBought` = ranks of all PowerUps owned.
- Since v0.7.2 (9 June 2022) fees are additive, so purchase order does not change the total.
- Refund returns all gold. A maxed PowerUp can be switched off; a switched-off PowerUp
  contributes nothing to the lab totals.

The wiki's own definition of `TotalBought` says "including the one whose Price is being
calculated", which reads ambiguously against the TotalBought = 0 case. Golden case GC11 and the
in-game check settle it before any price is shown.

## Passive items

43 passive pages carry `Infobox Passive item`; 32 fill `per-level` and `max-effect`, 26 fill
`stacking`. Most core passives are uniform and additive:

| Passive | Stat | Per level | Levels | Maximum |
|---|---|---|---|---|
| Spinach | Might | +10% | 5 | +50% |
| Candelabrador | Area | +10% | 5 | +50% |
| Bracer | Speed | +10% | 5 | +50% |
| Spellbinder | Duration | +10% | 5 | +50% |
| Empty Tome | Cooldown | -8% | 5 | -40% |
| Duplicator | Amount | +1 | 2 | +2 |

Not all are uniform: Torrona's Box gives +4% at level 1 then +3% per level to +25% at level 8,
across four stats. Attractorb's Magnet bonuses vary per level and multiply. Silver Ring and
Gold Ring are linked items. Level descriptions are sometimes imprecise ("Base damage up by 10%"
on Spinach is a Might bonus, not base damage). The lab needs a reviewed per-level table per
passive, not a "per-level × level" shortcut.

## Weapons

### Stat fields and coverage

381 archived pages carry `Infobox Weapon` (185 normal, 135 evolution, 26 union, 26 special,
3 gift; some infoboxes are malformed). Field coverage:

| Field | Pages with a value | Notes |
|---|---|---|
| damage | 364 | Base damage per hit |
| cooldown | 355 | Seconds |
| pool | 346 | Maximum projectiles on screen |
| interval | 341 | Seconds between projectiles of one volley |
| amount | 304 | Projectiles per volley; "-" when ignored |
| area | 278 | Percent |
| duration | 246 | Seconds |
| effects | 246 | Free text such as "Ignores Speed and Duration" |
| speed | 244 | Percent or "-" / "N/A" |
| max-level | 243 | 8 most common, then 1 and 6 |
| knockback | 221 | |
| pierce | 174 | Number or "Area of Effect" |
| chance, critMul | 144, 115 | Crit chance and multiplier |
| **delay** (hitbox delay) | **134** | Blank on 247 pages; values from 0.016 s to 2 s |

`resources/data/bucket/rows/infobox_weapon.jsonl` holds identity fields only; all stats above
are in the wikitext and need a reviewed extraction.

### Levels and Limit Break

- About 205 pages have a Levels table (134 multi-line rows, 71 inline). Steps are prose:
  "Base Damage up by 5.", "Cooldown reduced by 0.1 seconds.", "Fires 1 more projectile."
- 78 pages have no Levels section; about 97 (mostly evolutions) have only a Limit Break table.
- 237 pages have a Limit Break table (description, rarity, max total). Limit Break raises a
  weapon past its maximum level; evolving resets it. Out of first-release scope.
- Displayed steps can be rounded. Santa Water's level 5 text says +0.3 s Duration; the page's
  own note says the real step is +0.25 s. The lab must store real values with the shown text
  beside them, and check each table's sum against the stated maximum (GC07).

### Which stats a weapon uses

`stats_combos.jsonl` flags, per weapon, which stats affect it (`might` 275, `cooldown` 287,
`area` 263, `amount` 258, `speed` 176, `duration` 146, `luck` 82 rows, among others). Absent
means "not affected". The wiki's `Combos/stats` pages add conditional notes the bucket omits.
Confirmed exceptions in weapon infoboxes:

| Weapon | Ignores |
|---|---|
| Whip | Speed, Duration |
| Magic Wand | Duration |
| Garlic | Amount, Duration, Speed |
| Santa Water | Speed |
| Clock Lancet | Might, Amount, Speed, Area |
| Laurel, Gorgeous Moon | Everything except Cooldown |

When a stat does not apply, the lab shows the weapon's value unchanged and says "Not
affected by Duration". Silent omission is how players get misled (E36).

## Damage and the "DPS" problem

**Per hit (confirmed):** `damage = base damage (with level steps) × Might total`.
On a critical hit, multiply by the weapon's crit multiplier. Crit chance is the weapon's base
chance scaled by Luck (`Critical_Hit.wikitext`; verify the exact Luck rule in GC14).
On-screen numbers include a cosmetic ±5 (`Might.wikitext`, E35), so screen numbers are not a
precise check; the stat panel and Results screen are.

**Per volley:** projectiles = weapon amount + Amount total (if the weapon uses Amount), limited
by the pool. Extra projectiles arrive `interval` seconds apart.

**Cycle (confirmed for some weapons):** for duration weapons such as King Bible, "Cooldown
starts when active Duration ends", so one cycle = cooldown + duration. For others the cooldown
runs from the volley. Which rule applies is per weapon (`intervalDependsOnDuration` in the
datamine). Effective cooldown = base cooldown × Cooldown total, never below 10% of base.

**Why a single DPS figure misleads:**

1. **Hit timing is missing.** One enemy can be hit again only after the weapon's hitbox delay.
   For persistent weapons (King Bible 1.7 s, Santa Water 0.5 s) this, not cooldown, decides the
   rate. It is blank for 247 of 381 weapons.
2. **Enemies decide hits.** Area, pierce, projectile speed and spread change how many enemies
   are hit and how often; a one-target number undersells area weapons and oversells homing ones.
3. **Special behavior.** Many weapons (Laurel, Clock Lancet, Gorgeous Moon, unions, gifts) do
   things a damage formula cannot capture.
4. **Temporary and contextual bonuses.** Arcanas, Golden Eggs, stage modifiers, Gold Finger,
   Paranormal Scan, Curse and modes (Hyper, Inverse) change the totals.
5. **Version drift.** Patches change weapons often (a 1.15.100 beta shipped 2026-04-01).

### Proposed output tiers

| Tier | What it shows | Shown when |
|---|---|---|
| T1 Player stats | Totals for Might, Area, Duration, Speed, Cooldown, Amount, Max Health, Armor, Recovery, Move Speed, Magnet, Luck, Growth, Greed, Curse, Revival, with sources and caps | Always (character, passives and PowerUps are reviewed) |
| T2 Weapon effective stats | Damage per hit, projectiles per volley, effective cooldown, duration, area, speed, pierce | Weapon record is at least "stats-only" |
| T3 Per volley and cycle | Damage per volley, cycle time, expected crit factor | Weapon record is "partial" or "modeled" |
| T4 Modeled damage rate | "Modeled damage per second, one target, ideal conditions" | Weapon record is "modeled", and only with its assumptions listed |

A build total is shown only when every equipped weapon is "modeled", labeled "Sum of
one-target modeled rates", with the same assumptions. Otherwise the lab shows "3 of 5 weapons
modeled" and no total. Never "optimal", never a ranking claim.

### Weapon model record (logical contract)

| Field | Purpose |
|---|---|
| Weapon ID, game version target, pack | Identity and version scope |
| Base stats with units | From the infobox, real values not rounded text |
| Level steps 1..max (structured deltas) | From the Levels table, checked against the stated maximum |
| Stat applicability with conditional notes | From `stats_combos` plus `Combos/stats` notes |
| Cycle rule, interval, pool, hitbox delay, crit | Needed for T3/T4 |
| Special behavior note | Plain-language reason for "partial" or "not modeled" |
| Sources (page, revision) and reviewer, review date | Provenance (R05) |
| Status: modeled / partial / stats-only / not modeled | Decides which tiers appear |
| In-game check result | Which GC/BM-V checks it passed, with the game version |

## Contradictions and open questions

| ID | Conflict | Current handling |
|---|---|---|
| BM-C1 | Garlic infobox says it ignores Duration; a player says Duration lengthens Garlic and Soul Eater debuffs (E36) | Both may hold: damage aura vs debuff. Record "secondary effect" notes; verify in game |
| BM-C2 | Gorgeous Moon: archive says it ignores everything except Cooldown; one web summary said otherwise | Archive wins until the in-game check |
| BM-C3 | Might cap 1000% total vs "+900%" in the stat panel | Display convention: total vs bonus. Show both |
| BM-C4 | A competitor shows "compounding totals" (S16), but core stats are additive | Ours follows the archive; difference noted in the benchmark |
| BM-C5 | A flat 0.1 s invulnerability claim vs per-weapon hitbox delays | Use per-weapon delay; unknown stays unknown |
| BM-C6 | `TotalBought` definition wording vs the zero-purchase case | GC11 decides |
| BM-C7 | Passive level text ("Base damage up by 10%") vs actual Might bonus | Use structured stat, keep the text as a quote |
| BM-C8 | Move Speed: no general cap vs +500% caps on specific items | Caps are per source, not global |
| BM-C9 | `Player_stats` page outdated vs current stat pages | Stat pages are the authority |
| BM-C10 | Datamine field names vs wiki field names; redistribution rights of datamined data unknown | Cross-check only; rights question in A23 |
| BM-C11 | Magnet PowerUp description says max +50%; the structured maximum is ×1.5625 (two multiplicative +25% ranks). DefaultStats.lua stores Magnet 0 while the Magnet page says base 30 | Use multiplicative math; show the in-game wording beside it; verify in the stat panel |

## Golden cases (hand-computed, to be verified in game)

These are expected values from the archive rules. Each must match the in-game stat panel or
Results screen before the rule is marked verified. "No other bonuses" means character at
level 1 with no bonus to that stat, no Arcana, no Golden Egg, no stage modifier.

| ID | Setup | Expected | What it falsifies |
|---|---|---|---|
| GC01 | Whip level 8 (base 10, +5 at levels 3-8), Spinach 5, Might PowerUp 5 | Might total 175%; 40 × 1.75 = **70** per hit (screen shows 65-75) | Multiplicative Might stacking; Might added to base damage |
| GC02 | Magic Wand level 8 (1.2 s, -0.2 s at level 3), Empty Tome 5, Cooldown PowerUp 2 | Cooldown total 55%; **0.55 s** | Multiplicative cooldown stacking |
| GC03 | Porta at level 1 (-90% temporary), Empty Tome 5, Magic Wand level 8 | -130% clamps to -90%; **0.10 s** | Missing cooldown floor |
| GC04 | Gennaro (+1), Duplicator 2, Amount PowerUp; Magic Wand level 8 and Garlic level 8 | Magic Wand **8** projectiles (1 + 3 + 4); Garlic stays **1** | Amount applied to weapons that ignore it |
| GC05 | Spellbinder 5 with Whip level 8 and King Bible level 8 | Whip unchanged; King Bible duration 4.0 s → **6.0 s** | Duration applied to Whip |
| GC06 | King Bible level 8 (3.0 s cooldown, 4.0 s duration, 30 damage, 1.7 s delay) | Cycle **7.0 s**, active 57%; with Spellbinder 5: cycle **9.0 s**, active 67%. Naive 30 ÷ 3.0 = 10/s is wrong | Cooldown running during duration; damage ÷ cooldown as DPS |
| GC07 | Santa Water levels 1-8 | Duration steps sum to **+1.0 s** (0.5 + 0.25 + 0.25), not the displayed 1.1 s | Using rounded display text |
| GC08 | Antonio (Max Health 120), Max Health PowerUp 3 | 120 × 1.331 = **159.7** | Additive Max Health PowerUp |
| GC09 | Might sources summing above 1000% | Clamped to **1000%** with a "capped" mark | Missing Might cap |
| GC10 | Any Arcana that adds Area | Shown as "Not modeled", no number change | Mixing Arcana stacking into v1 |
| GC11 | Buy Might rank 1 first, then Might rank 2 | **200**, then 200 × 2 + floor(20 × 1.1) = **422** | Fee formula, `TotalBought` reading |
| GC12 | Torrona's Box levels 1-8 | +4%, then +3% per level, **+25%** at level 8 | Uniform per-level shortcut |
| GC13 | Rose (-90% Might) with Spinach 5 | Might total **60%** | Rejecting negative totals |
| GC14 | Whip (20% base crit, ×2) with +30% Luck PowerUp | Crit chance and expected factor per the `Critical_Hit` rule | Unverified Luck-to-crit scaling |
| GC15 | Laurel with Spinach 5 and Candelabrador 5 | Laurel values unchanged except Cooldown | Applying stats to "ignores all but Cooldown" weapons |

## In-game verification protocol (BM-V)

1. Record the game version and platform. Refund all PowerUps, then buy only the ranks in the
   case; switch off the rest.
2. Pick the stated character and a stage without stat modifiers. No Arcanas, no Golden Eggs.
3. Reach the case's items and levels; pause and capture the stat panel.
4. Compare each panel value with the lab's expected total. Stats must match exactly after the
   panel's rounding; any mismatch marks the rule unverified and blocks the dependent numbers.
5. For damage-rate checks, play a fixed time against a single dummy-like target where possible
   and capture the Results screen (level, damage, time held, DPS per weapon). Treat Results DPS
   as a band, not an exact match: it depends on enemies hit. A modeled rate far outside the
   band flags the weapon record for review. (Results DPS was 10× too small before patch 0.2.7.)
6. Store the captures with the case ID and version. A new game version re-opens every case
   that touches a changed weapon or stat.

## What this means for the spec

- P7 and the build lab are in the [spec](../spec.md#1-customer-promise); its requirements
  carry the tiers, record statuses and checks above.
- Data work is a reviewed extraction of DS13-DS15 ([readiness](data-readiness.md)), not a parser
  trusted as is.
- Risks are A19-A23 in [assumptions](../planning/assumptions.md).
- First release: character, player level, weapons and passives with levels, PowerUps.
  Later and labeled meanwhile: Arcanas, Golden Eggs, Limit Break, stage and mode modifiers,
  temporary effects, enemy-dependent hit counts.
