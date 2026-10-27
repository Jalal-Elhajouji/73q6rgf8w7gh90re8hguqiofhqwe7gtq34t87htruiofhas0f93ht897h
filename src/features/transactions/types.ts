export type PayoutStatus =
  | 'paid'
  | 'pending'
  | 'in_transit'
  | 'failed'
  | 'canceled'
  | 'withdrawn'

export type Payout = {
  id: string
  /** Amount in minor units (cents). Negative for withdrawals. */
  amount: number
  currency: string
  status: PayoutStatus
  arrivalDate: string
  type: 'bank_account'
  destination: {
    bankLast4: string
  }
}

export type PayoutInput = Omit<Payout, 'id'>
