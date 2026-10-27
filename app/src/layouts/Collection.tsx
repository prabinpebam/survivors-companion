/**
 * Collection layout: header, collection tabs, filters, toolbar and results.
 * Results lay out as a tile grid, a list or a table; the peek is placed by the shell, not here.
 * Grouped results come one group after another, each under a header (name, a rule, then the count
 * in a round badge at the end of the row) that
 * collapses it, as in a file manager. A table groups inside itself, so it never uses these groups.
 * Use for every Codex collection and Pairings. Filters sit in a disclosure (closed, with how many are
 * on) so a narrow item column keeps its results in view.
 * @tier layout
 * @a11y Results sit in a region named by the collection so screen-reader users can jump to them;
 * each group header is a heading inside a native disclosure, so it is reachable and states whether it is open.
 */
import type { ComponentChildren } from 'preact';
import { Glyph } from '../design/glyph';
import s from './Collection.module.css';

type Group = {
  key: string;
  /** The group's name. */
  label: string;
  /** How many items it holds, as a number. */
  count: string;
  /** The same count as words, for screen readers. */
  countLabel: string;
  /** The group's items. */
  content: ComponentChildren;
};
type Props = {
  /** Page header region. */
  header: ComponentChildren;
  /** Collection tabs region. */
  tabs: ComponentChildren;
  /** Filter chips region (empty when the collection has no facets). Shown in a disclosure. */
  filters?: ComponentChildren;
  /** The filter disclosure's name. */
  filtersLabel?: string;
  /** How many filters are on, shown on the closed disclosure. */
  filtersActive?: number;
  /** Search, view switch, sort, group and count. */
  toolbar: ComponentChildren;
  /** How results are arranged. */
  mode: 'grid' | 'list' | 'table';
  /** The accessible name of the results region. */
  resultsLabel: string;
  /** The results, or the empty state when there are none. Ignored when there are groups. */
  results: ComponentChildren;
  /** The results in groups, when the person groups them. */
  groups?: Group[];
};

export function Collection({ header, tabs, filters, filtersLabel, filtersActive = 0, toolbar, mode, resultsLabel, results, groups }: Props) {
  return (
    <div class={s.collection}>
      <div class={s.header}>{header}</div>
      <div class={s.tabs}>{tabs}</div>
      <div class={s.controls}>
        {toolbar}
        {filters && (
          <details class={s.filters}>
            <summary class={s.filtersHead}>
              <span class={s.whenOpen}>
                <Glyph name="chevron" size="sm" />
              </span>
              <span class={s.whenClosed}>
                <Glyph name="chevron-end" size="sm" />
              </span>
              <span>{filtersLabel}</span>
              {filtersActive > 0 && <span class={s.badge}>{filtersActive}</span>}
            </summary>
            <div class={s.filtersBody}>{filters}</div>
          </details>
        )}
      </div>
      {groups ? (
        <section class={s.groups} aria-label={resultsLabel}>
          {groups.map((g) => (
            <details key={g.key} class={s.group} open>
              <summary class={s.groupHead}>
                <span class={s.chevron} aria-hidden="true">
                  <span class={s.whenOpen}>
                    <Glyph name="chevron" size="sm" />
                  </span>
                  <span class={s.whenClosed}>
                    <Glyph name="chevron-end" size="sm" />
                  </span>
                </span>
                <h2 class={s.groupTitle}>{g.label}</h2>
                <span class={s.rule} aria-hidden="true" />
                <span class={s.groupCount} aria-hidden="true">
                  {g.count}
                </span>
                <span class="visually-hidden">{g.countLabel}</span>
              </summary>
              <div class={s.results} data-mode={mode}>
                {g.content}
              </div>
            </details>
          ))}
        </section>
      ) : (
        <section class={s.results} data-mode={mode} aria-label={resultsLabel}>
          {results}
        </section>
      )}
    </div>
  );
}
