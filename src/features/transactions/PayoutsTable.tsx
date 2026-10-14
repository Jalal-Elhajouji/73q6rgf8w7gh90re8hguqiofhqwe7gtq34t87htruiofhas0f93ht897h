import { Icon } from '../../components/ui/Icon'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { formatAmount, formatDate } from '../../lib/format'
import type { Payout } from './types'

const typeLabels: Record<Payout['type'], string> = {
  bank_account: 'Payout to bank account',
}

export function PayoutsTable({ payouts }: { payouts: Payout[] }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th className="data-table__amount">Amount</th>
            <th>Status</th>
            <th>Arrive by</th>
            <th>Type</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id}>
              <td className="data-table__amount">
                <strong>{formatAmount(payout.amount)}</strong>{' '}
                <span className="data-table__currency">{payout.currency}</span>
              </td>
              <td>
                <StatusBadge status={payout.status} />
              </td>
              <td>{formatDate(payout.arrivalDate)}</td>
              <td>{typeLabels[payout.type]}</td>
              <td>
                <span className="destination">
                  <span className="destination__icon">
                    <Icon name="bank" size={12} />
                  </span>
                  <span className="destination__dots">••••</span>
                  {payout.destination.bankLast4}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
