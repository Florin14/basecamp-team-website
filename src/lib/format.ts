const dateFmt = new Intl.DateTimeFormat('ro-RO', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const shortDateFmt = new Intl.DateTimeFormat('ro-RO', {
  day: '2-digit',
  month: 'short',
});

const weekdayFmt = new Intl.DateTimeFormat('ro-RO', { weekday: 'long' });

const timeFmt = new Intl.DateTimeFormat('ro-RO', {
  hour: '2-digit',
  minute: '2-digit',
});

/** Prima literă mare — lunile și zilele sunt cu literă mică în română. */
export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const formatDate = (iso: string) => dateFmt.format(new Date(iso));
export const formatShortDate = (iso: string) => shortDateFmt.format(new Date(iso));
export const formatTime = (iso: string) => timeFmt.format(new Date(iso));
export const formatWeekday = (iso: string) => weekdayFmt.format(new Date(iso));

/** „Sâmbătă, 5 septembrie 2026 · 18:00” */
export const formatKickoff = (iso: string) =>
  `${capitalize(formatWeekday(iso))}, ${formatDate(iso)} · ${formatTime(iso)}`;

/** Concatenează nume de clase, ignorând valorile falsy. */
export const cx = (...parts: unknown[]) =>
  parts.filter((p): p is string => typeof p === 'string' && p.length > 0).join(' ');

/** Diferență de goluri cu semn explicit. */
export const signed = (n: number) => (n > 0 ? `+${n}` : `${n}`);

const pluralRules = new Intl.PluralRules('ro-RO');

/**
 * Acord corect în română: „1 meci”, „5 meciuri”, „22 de meciuri”.
 * `one` este forma de singular, `many` forma de plural.
 */
/** Doar forma potrivită a cuvântului, fără număr. */
export function pluralWord(count: number, one: string, many: string): string {
  return pluralRules.select(count) === 'one' ? one : many;
}

export function plural(count: number, one: string, many: string): string {
  switch (pluralRules.select(count)) {
    case 'one':
      return `${count} ${one}`;
    case 'few':
      return `${count} ${many}`;
    default:
      return `${count} de ${many}`;
  }
}
