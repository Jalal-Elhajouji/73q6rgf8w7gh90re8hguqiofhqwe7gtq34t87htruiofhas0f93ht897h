import type { PayoutStatus } from '../../features/transactions/types'
import './StatusBadge.css'

const labels: Record<PayoutStatus, string> = {
  paid: 'Paid',
  pending: 'Pending',
  in_transit: 'In transit',
  failed: 'Failed',
  canceled: 'Canceled',
  withdrawn: 'Withdrawn',
}

export function StatusBadge({ status }: { status: PayoutStatus }) {
  return <span className={`badge badge--${status}`}>{labels[status]}</span>
}
