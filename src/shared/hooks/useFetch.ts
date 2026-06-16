// src/shared/hooks/useFetch.ts
import { useEffect, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseFetchState<T> {
  const [state, setState] = useState<UseFetchState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error : new Error('Unknown error'),
          });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}