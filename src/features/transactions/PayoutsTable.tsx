import type { ReactNode } from 'react'
import { Icon } from '../../components/ui/Icon'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { formatAmount, formatDate } from '../../lib/format'
import type { Payout } from './types'

const typeLabels: Record<Payout['type'], string> = {
  bank_account: 'Payout to bank account',
}

type PayoutsTableProps = {
  payouts: Payout[]
  onSelect?: (payout: Payout) => void
  /** Extra controls rendered in a trailing column for each row. */
  renderActions?: (payout: Payout) => ReactNode
}

export function PayoutsTable({ payouts, onSelect, renderActions }: PayoutsTableProps) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th className="data-table__amount">Amount</th>
            <th>Status</th>
            <th>Arrive by</th>
            <th>Type</th>
            <th className="data-table__destination">Destination</th>
            {renderActions && (
              <th className="data-table__actions">
                <span className="visually-hidden">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id} onClick={onSelect && (() => onSelect(payout))}>
              <td className="data-table__amount">
                <strong>{formatAmount(payout.amount)}</strong>{' '}
                <span className="data-table__currency">{payout.currency}</span>
              </td>
              <td>
                <StatusBadge status={payout.status} />
              </td>
              <td>{formatDate(payout.arrivalDate)}</td>
              <td>{typeLabels[payout.type]}</td>
              <td className="data-table__destination">
                <span className="destination">
                  <span className="destination__icon">
                    <Icon name="bank" size={12} />
                  </span>
                  <span className="destination__dots">••••</span>
                  {payout.destination.bankLast4}
                </span>
              </td>
              {renderActions && (
                <td className="data-table__actions">{renderActions(payout)}</td>
              )}
            </tr>
          ))}
          {payouts.length === 0 && (
            <tr className="data-table__empty">
              <td colSpan={renderActions ? 6 : 5}>No payouts yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
