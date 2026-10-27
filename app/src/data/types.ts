/** Tier 0: the shape of the generated codex (scripts/build-data.mjs). */
import type { Kind } from '../design/icons';

export type SpriteRef = { file: string; w: number; h: number };
export type Source = { title: string; revid: number; edited: string } | null;

type Base = {
  ref: string;
  kind: Kind;
  name: string;
  page: string;
  pack: string;
  gameId: string | null;
  sprite: SpriteRef | null;
  caption: string;
  source: Source;
  order?: number | null;
};

export type Weapon = Base & {
  kind: 'weapon' | 'evolution';
  type: string;
  effects: string;
  maxLevel: number | null;
  rarity: number | null;
  stats: Record<string, string>;
  max: Record<string, string>;
  levels: { level: number; text: string }[];
  requires: string[];
  evolution: string | null;
  evolutionItems: string[];
  union: string | null;
  unionItems: string[];
};
export type Passive = Base & { kind: 'passive'; stat: string | null; perLevel: string | null; maxEffect: string | null; stacking: string | null; maxLevel: number | null; rarity: number | null; foundOn: string[] };
export type Character = Base & { kind: 'character'; alias: string | null; startingWeapons: string[]; unlock: string; cost: number | null; secret: boolean; stats: { name: string; value: number | string }[] };
export type Stage = Base & { kind: 'stage'; stageType: string; timeLimit: number | null; modifiers: Record<string, number> };
/** An item an arcana affects, as its source lists it; `ref` when the codex has it, `pic` its picture under /media. */
export type Affected = { name: string; ref: string | null; pic: { i: string; w: number; h: number } | null };
export type Arcana = Base & { kind: 'arcana'; arcanaType: string | null; affects: Affected[]; unlock: string; notes: string | null };
export type Relic = Base & { kind: 'relic'; effects: string; location: string };
export type PowerUp = Base & { kind: 'powerup'; maxRank: number | null; bonus: number | null; percent: boolean; stacking: string | null; cost: number | null };

export type Entity = Weapon | Passive | Character | Stage | Arcana | Relic | PowerUp;

export type Recipe = { ref: string; type: 'evolution' | 'union'; result: string; pack: string; inputs: { ref: string | null; name?: string; max: boolean }[] };

export type Codex = {
  schema: number;
  snapshot: { capturedAt: string | null; source: string; licence: string };
  packs: { id: string; name: string }[];
  entities: Entity[];
  recipes: Recipe[];
};

export type MarkState = 'unlocked' | 'skipped';
