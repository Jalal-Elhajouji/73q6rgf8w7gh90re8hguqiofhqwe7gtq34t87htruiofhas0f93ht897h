import { useSyncExternalStore } from 'react'
import { payouts as seed } from './data'
import type { Payout, PayoutInput } from './types'

// Local persistence for payouts. Seeded with the mock data on first run.
const STORAGE_KEY = 'lnbk.payouts'

const listeners = new Set<() => void>()
let cache = load()

function load(): Payout[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
    return seed
  }
  try {
    return JSON.parse(raw) as Payout[]
  } catch {
    return seed
  }
}

function commit(next: Payout[]) {
  cache = next
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Keep other open tabs in sync.
window.addEventListener('storage', (event) => {
  if (event.key !== STORAGE_KEY) return
  cache = load()
  listeners.forEach((listener) => listener())
})

export function usePayouts(): Payout[] {
  return useSyncExternalStore(subscribe, () => cache)
}

export function createPayout(input: PayoutInput): Payout {
  const payout = { id: `po_${crypto.randomUUID().slice(0, 8)}`, ...input }
  commit([payout, ...cache])
  return payout
}

export function updatePayout(id: string, input: PayoutInput) {
  commit(cache.map((payout) => (payout.id === id ? { id, ...input } : payout)))
}

export function deletePayout(id: string) {
  commit(cache.filter((payout) => payout.id !== id))
}
