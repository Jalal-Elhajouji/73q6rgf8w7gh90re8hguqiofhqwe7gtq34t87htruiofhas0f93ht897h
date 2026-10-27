import { useSyncExternalStore } from 'react'

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

/** Current path from the URL hash, e.g. `#/transactions` → `/transactions`. */
export function useHashRoute(): string {
  return useSyncExternalStore(subscribe, getPath)
}
