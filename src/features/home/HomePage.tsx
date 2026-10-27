import { useState } from 'react'
import { Dialog } from '../../components/ui/Dialog'
import { Icon } from '../../components/ui/Icon'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { formatAmount, formatDate } from '../../lib/format'
import { PayoutsTable } from '../transactions/PayoutsTable'
import { createPayout, deletePayout, updatePayout, usePayouts } from '../transactions/payoutsDb'
import type { Payout } from '../transactions/types'
import { PayoutFormDialog } from './PayoutFormDialog'
import '../transactions/TransactionsPage.css'
import './HomePage.css'

type Modal =
  | { kind: 'create' }
  | { kind: 'view'; payout: Payout }
  | { kind: 'edit'; payout: Payout }
  | { kind: 'delete'; payout: Payout }

export function HomePage() {
  const payouts = usePayouts()
  const [modal, setModal] = useState<Modal | null>(null)
  const close = () => setModal(null)

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Payouts</h1>
        <div className="page-header__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => setModal({ kind: 'create' })}
          >
            <Icon name="plus" size={14} />
            New payout
          </button>
        </div>
      </div>

      <div className="home-table">
        <PayoutsTable
          payouts={payouts}
          onSelect={(payout) => setModal({ kind: 'view', payout })}
          renderActions={(payout) => (
            <div className="row-actions" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="row-actions__btn"
                aria-label="Edit payout"
                onClick={() => setModal({ kind: 'edit', payout })}
              >
                <Icon name="edit" size={15} />
              </button>
              <button
                type="button"
                className="row-actions__btn row-actions__btn--danger"
                aria-label="Delete payout"
                onClick={() => setModal({ kind: 'delete', payout })}
              >
                <Icon name="trash" size={15} />
              </button>
            </div>
          )}
        />
      </div>

      {modal?.kind === 'create' && (
        <PayoutFormDialog
          onClose={close}
          onSubmit={(input) => {
            createPayout(input)
            close()
          }}
        />
      )}

      {modal?.kind === 'edit' && (
        <PayoutFormDialog
          payout={modal.payout}
          onClose={close}
          onSubmit={(input) => {
            updatePayout(modal.payout.id, input)
            close()
          }}
        />
      )}

      {modal?.kind === 'view' && (
        <Dialog
          title="Payout details"
          onClose={close}
          footer={
            <>
              <button
                type="button"
                className="btn btn--danger"
                onClick={() => setModal({ kind: 'delete', payout: modal.payout })}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => setModal({ kind: 'edit', payout: modal.payout })}
              >
                Edit
              </button>
            </>
          }
        >
          <dl className="details">
            <dt>Amount</dt>
            <dd>
              {formatAmount(modal.payout.amount)} {modal.payout.currency}
            </dd>
            <dt>Status</dt>
            <dd>
              <StatusBadge status={modal.payout.status} />
            </dd>
            <dt>Arrive by</dt>
            <dd>{formatDate(modal.payout.arrivalDate)}</dd>
            <dt>Destination</dt>
            <dd>Bank account •••• {modal.payout.destination.bankLast4}</dd>
            <dt>ID</dt>
            <dd className="details__id">{modal.payout.id}</dd>
          </dl>
        </Dialog>
      )}

      {modal?.kind === 'delete' && (
        <Dialog
          title="Delete payout"
          onClose={close}
          footer={
            <>
              <button type="button" className="btn" onClick={close}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn--danger-solid"
                onClick={() => {
                  deletePayout(modal.payout.id)
                  close()
                }}
              >
                Delete payout
              </button>
            </>
          }
        >
          <p className="confirm-text">
            Delete the {formatAmount(modal.payout.amount)} {modal.payout.currency} payout
            arriving {formatDate(modal.payout.arrivalDate)}? This can't be undone.
          </p>
        </Dialog>
      )}
    </>
  )
}
