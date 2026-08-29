import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { isRemoteConfigured } from '../lib/remote';
import { matches as localMatches } from './matches';
import { fetchSnapshot } from './remote';
import { standings as localStandings } from './standings';
import type { StandingsMap } from './standings';
import type { Match } from './types';

type ClubData = {
  matches: Match[];
  standings: StandingsMap;
  /** `local` = datele din cod, `remote` = datele publicate în Supabase. */
  source: 'local' | 'remote';
  /** Momentul ultimei actualizări raportat de sursa live. */
  updatedAt: string | null;
  status: 'idle' | 'loading' | 'ready' | 'error';
  refresh: () => void;
};

const fallback: ClubData = {
  matches: localMatches,
  standings: localStandings,
  source: 'local',
  updatedAt: null,
  status: 'idle',
  refresh: () => {},
};

const DataContext = createContext<ClubData>(fallback);

/** Reîmprospătare periodică, cât timp pagina e vizibilă. */
const REFRESH_MS = 15 * 60 * 1000;

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Omit<ClubData, 'refresh'>>(fallback);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!isRemoteConfigured) return;

    const controller = new AbortController();
    setState((s) => ({ ...s, status: 'loading' }));

    fetchSnapshot(controller.signal)
      .then((snapshot) => {
        // Dacă sursa live e goală, rămânem pe datele din cod.
        if (!snapshot.matches.length) {
          setState((s) => ({ ...s, status: 'ready' }));
          return;
        }
        setState({
          matches: snapshot.matches,
          standings: Object.keys(snapshot.standings).length
            ? snapshot.standings
            : localStandings,
          source: 'remote',
          updatedAt: snapshot.updatedAt,
          status: 'ready',
        });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.warn('Sursa live nu a răspuns, folosim datele din cod:', error);
        setState((s) => ({ ...s, status: 'error' }));
      });

    return () => controller.abort();
  }, [tick]);

  // Reîmprospătăm când utilizatorul revine în tab și la interval fix.
  useEffect(() => {
    if (!isRemoteConfigured) return;
    const onFocus = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const id = window.setInterval(onFocus, REFRESH_MS);
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [refresh]);

  const value = useMemo<ClubData>(() => ({ ...state, refresh }), [state, refresh]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/** Meciurile și clasamentele curente — din Supabase dacă e configurat, altfel din cod. */
export const useClubData = () => useContext(DataContext);
