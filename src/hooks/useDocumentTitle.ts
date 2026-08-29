import { useEffect } from 'react';

/** Setează titlul paginii și, opțional, meta description. */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
