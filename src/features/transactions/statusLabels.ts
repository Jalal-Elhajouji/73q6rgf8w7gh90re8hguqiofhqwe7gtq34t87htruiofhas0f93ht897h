import type { PayoutStatus } from './types'

export const payoutStatusLabels: Record<PayoutStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  in_transit: 'In transit',
  failed: 'Failed',
  canceled: 'Canceled',
  withdrawn: 'Withdrawn',
}
