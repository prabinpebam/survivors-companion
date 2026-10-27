/**
 * A stage's waves as cards, one per wave in source order, in two rows. The first row is the time,
 * which leads the card, then the enemies that spawn as a row of pictures, each named on hover, and
 * the wave's counts (enemy minimum, spawn interval) as an icon and a number. The second row holds up
 * to three panels side by side, wrapping when narrow: the bosses and the treasure they drop (the
 * widest), map events as a table of records (each event's name and summary, then its labelled
 * values) and notes. Long sets show their first waves with a
 * way to see all. Use for a waves table found by data/waves; other tables use RichContent.
 * @tier compound
 * @a11y A list of waves, each led by its time as a heading. An enemy's picture carries its name as
 * alt text and as a tooltip; a linked enemy is one link. Each count is a description list whose
 * term is the column's name, hidden visually and shown as a tooltip. Rewards stay an ordered list.
 */
import type { ComponentChildren } from 'preact';
import { useState } from 'preact/hooks';
import { mediaUrl, type Inline } from '../../data/detail';
import type { BossGroup, Thing, Treasure, Wave, WaveLabels, WaveStat } from '../../data/waves';
import { Button } from '../fundamentals/Button';
import { Icon } from '../fundamentals/Icon';
import { RecordTable } from '../fundamentals/RecordTable';
import { RichText } from '../fundamentals/RichText';
import s from './WaveCards.module.css';

type Props = {
  /** The waves, in source order. */
  items: Wave[];
  /** The source's column names: enemies, bosses and treasure, map events, notes. */
  labels: WaveLabels;
  /** A spawn interval worded in seconds: "1.0" becomes "1.0 s". */
  seconds: (n: string) => string;
  /** Where an in-app link to a codex ref goes. */
  hrefFor: (ref: string) => string;
  /** The words a tick and a cross stand for. */
  marks: { yes: string; no: string };
  /** Waves shown before "show all". */
  limit?: number;
  /** The show-all label for a count, and the show-fewer label. */
  more: { all: (n: number) => string; fewer: string };
};

const GLYPH = { min: 'crowd', max: 'crowd-max', interval: 'timer' } as const;
type Pic = Thing['pics'][number];

export function WaveCards({ items, labels, seconds, hrefFor, marks, limit = 10, more }: Props) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, limit);
  const text = (c: Inline[]) => <RichText runs={c} hrefFor={hrefFor} marks={marks} />;
  const pic = (p: Pic, alt: string, look: string) => (
    <img class={look} src={mediaUrl(p.i)} width={p.w} height={p.h} alt={alt} loading="lazy" decoding="async" />
  );
  // An enemy is named by its first picture and on hover; a boss shows its name.
  const thing = (x: Thing, look: 'enemy' | 'boss') => {
    const body = (
      <>
        <span class={s.pics}>{x.pics.map((p, i) => pic(p, look === 'enemy' && !i ? x.name : '', s.pic))}</span>
        {look === 'boss' && <span class={s.bossName}>{x.name}</span>}
      </>
    );
    return (
      <li class={s[look]} title={look === 'enemy' ? x.name : undefined}>
        {x.r ? <a class={s.link} href={hrefFor(x.r)}>{body}</a> : body}
      </li>
    );
  };
  const stat = (x: WaveStat) => (
    <div class={s.stat} title={x.look === 'other' ? undefined : x.label}>
      <dt class={x.look === 'other' ? s.label : 'visually-hidden'}>{x.label}</dt>
      <dd class={s.statValue}>
        {x.look !== 'other' && <Icon name={GLYPH[x.look]} size="sm" />}
        {x.seconds ? seconds(x.value) : x.value}
      </dd>
    </div>
  );
  const treasure = (t: Treasure) => (
    <div class={s.treasure}>
      <div class={s.chest}>
        {pic(t.pic, '', s.chestPic)}
        <dl class={s.facts}>
          {t.facts.map((f) => (
            <div class={s.fact}>
              <dt class={s.label}>{f.label}</dt>
              <dd class={s.factValue}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul class={s.odds}>
        {t.odds.map((o) => <li class={s.odd}>{pic(o.pic, o.pic.a ?? '', s.oddPic)}{o.value}</li>)}
      </ul>
      {t.rewards && (
        <div class={s.rewards}>
          <span class={s.label}>{t.rewards.label}</span>
          <ol class={s.chips}>{t.rewards.items.map((r) => <li class={s.chip}>{r}</li>)}</ol>
        </div>
      )}
    </div>
  );
  const group = (g: BossGroup) => (
    <div class={s.group}>
      <ul class={s.bosses}>{g.bosses.map((b) => thing(b, 'boss'))}</ul>
      {g.treasure && treasure(g.treasure)}
      {g.c && <p class={s.words}>{text(g.c)}</p>}
    </div>
  );
  const part = (label: string, body: ComponentChildren, look: 'part' | 'lead' | 'wide' = 'part') => (
    <div class={s[look]}>
      <p class={s.label}>{label}</p>
      {body}
    </div>
  );
  const panel = (c: Inline[]) => <div class={`${s.panel} ${s.words}`}>{text(c)}</div>;

  return (
    <div class={s.block}>
      <ol class={s.waves}>
        {shown.map((w) => (
          <li class={s.wave}>
            <div class={s.top}>
              <div class={s.when}>
                <h4 class={s.time}>{w.time}</h4>
                {w.variant && <span class={s.variant}>{w.variant}</span>}
              </div>
              {w.enemiesText ? (
                <p class={`${s.enemies} ${s.words}`}>{text(w.enemiesText)}</p>
              ) : (
                w.enemies.length > 0 && <ul class={s.enemies} aria-label={labels.enemies}>{w.enemies.map((x) => thing(x, 'enemy'))}</ul>
              )}
              {w.stats.length > 0 && <dl class={s.stats}>{w.stats.map(stat)}</dl>}
            </div>
            {(w.bosses.length > 0 || w.bossesText || w.eventList || w.events || w.notes) && (
              <div class={s.rest}>
                {(w.bosses.length > 0 || w.bossesText) &&
                  part(labels.bosses, w.bossesText ? panel(w.bossesText) : <div class={s.groups}>{w.bosses.map(group)}</div>, 'lead')}
                {w.eventList &&
                  part(labels.events, <div class={s.panel}><RecordTable label={labels.events} records={w.eventList.map((e) => ({ ...e, aside: e.summary, rows: e.facts }))} /></div>, 'wide')}
                {w.events && part(labels.events, panel(w.events))}
                {w.notes && part(labels.notes, panel(w.notes))}
              </div>
            )}
          </li>
        ))}
      </ol>
      {items.length > limit && (
        <span class={s.more}>
          <Button variant="quiet" icon={all ? 'up' : 'down'} onPress={() => setAll(!all)}>
            {all ? more.fewer : more.all(items.length)}
          </Button>
        </span>
      )}
    </div>
  );
}
