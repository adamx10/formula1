import { useState, useEffect } from 'react';
import { fetchF1 } from '../api/f1Client';

export type FetchState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    fetchF1<T>(url)
      .then((data) => { if (!cancelled) setState({ status: 'success', data }); })
      .catch((err: unknown) => {
        if (!cancelled) setState({ status: 'error', message: err instanceof Error ? err.message : 'Error' });
      });
    return () => { cancelled = true; };
  }, [url]);

  return state;
}
