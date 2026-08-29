import { useEffect, useState } from 'react';

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** Momentul țintă a trecut. */
  done: boolean;
};

function diff(target: number): Countdown {
  const ms = target - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

/** Numărătoare inversă până la data meciului (ISO string sau Date). */
export function useCountdown(target: string | Date): Countdown {
  const time = typeof target === 'string' ? new Date(target).getTime() : target.getTime();
  const [state, setState] = useState<Countdown>(() => diff(time));

  useEffect(() => {
    setState(diff(time));
    if (Number.isNaN(time)) return;
    const id = setInterval(() => setState(diff(time)), 1000);
    return () => clearInterval(id);
  }, [time]);

  return state;
}
