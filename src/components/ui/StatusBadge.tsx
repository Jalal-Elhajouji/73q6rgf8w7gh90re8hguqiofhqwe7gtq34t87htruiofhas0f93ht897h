import { payoutStatusLabels } from '../../features/transactions/statusLabels'
import type { PayoutStatus } from '../../features/transactions/types'
import './StatusBadge.css'

export function StatusBadge({ status }: { status: PayoutStatus }) {
  return <span className={`badge badge--${status}`}>{payoutStatusLabels[status]}</span>
}
