import type { Payout } from './types'

// Mock data until the payouts API exists.
export const payouts: Payout[] = [
  {
    id: 'po_003',
    amount: -1683343,
    currency: 'AUD',
    status: 'withdrawn',
    arrivalDate: '2026-09-24',
    type: 'bank_account',
    destination: { bankLast4: '1392' },
  },
  {
    id: 'po_002',
    amount: 237580,
    currency: 'AUD',
    status: 'canceled',
    arrivalDate: '2026-09-16',
    type: 'bank_account',
    destination: { bankLast4: '1392' },
  },
  {
    id: 'po_001',
    amount: 1810434,
    currency: 'AUD',
    status: 'paid',
    arrivalDate: '2026-09-11',
    type: 'bank_account',
    destination: { bankLast4: '1392' },
  },
]
