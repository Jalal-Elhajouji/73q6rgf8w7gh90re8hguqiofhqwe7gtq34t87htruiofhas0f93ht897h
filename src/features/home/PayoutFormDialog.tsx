import { useState, type FormEvent } from 'react'
import { Dialog } from '../../components/ui/Dialog'
import { payoutStatusLabels } from '../transactions/statusLabels'
import type { Payout, PayoutInput, PayoutStatus } from '../transactions/types'

const currencies = ['AUD', 'USD', 'EUR', 'GBP', 'NZD']

type PayoutFormDialogProps = {
  /** Payout to edit; omit to create a new one. */
  payout?: Payout
  onSubmit: (input: PayoutInput) => void
  onClose: () => void
}

export function PayoutFormDialog({ payout, onSubmit, onClose }: PayoutFormDialogProps) {
  const [amount, setAmount] = useState(payout ? (payout.amount / 100).toFixed(2) : '')
  const [currency, setCurrency] = useState(payout?.currency ?? 'AUD')
  const [status, setStatus] = useState<PayoutStatus>(payout?.status ?? 'pending')
  const [arrivalDate, setArrivalDate] = useState(payout?.arrivalDate ?? today())
  const [bankLast4, setBankLast4] = useState(payout?.destination.bankLast4 ?? '')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const minorUnits = Math.round(Number(amount) * 100)
    if (!amount.trim() || !Number.isFinite(minorUnits) || minorUnits === 0) {
      setError('Enter a non-zero amount. Use a negative amount for withdrawals.')
      return
    }
    if (!arrivalDate) {
      setError('Choose an arrival date.')
      return
    }
    if (!/^\d{4}$/.test(bankLast4)) {
      setError('Bank account must be the last 4 digits.')
      return
    }
    onSubmit({
      amount: minorUnits,
      currency,
      status,
      arrivalDate,
      type: 'bank_account',
      destination: { bankLast4 },
    })
  }

  return (
    <Dialog
      title={payout ? 'Edit payout' : 'New payout'}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="payout-form" className="btn btn--primary">
            {payout ? 'Save changes' : 'Create payout'}
          </button>
        </>
      }
    >
      <form id="payout-form" className="form" onSubmit={handleSubmit} noValidate>
        <div className="form__row">
          <label className="field">
            <span className="field__label">Amount</span>
            <input
              className="field__input"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              autoFocus
            />
          </label>
          <label className="field field--narrow">
            <span className="field__label">Currency</span>
            <select
              className="field__input"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
            >
              {currencies.map((code) => (
                <option key={code}>{code}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="field">
          <span className="field__label">Status</span>
          <select
            className="field__input"
            value={status}
            onChange={(event) => setStatus(event.target.value as PayoutStatus)}
          >
            {Object.entries(payoutStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <div className="form__row">
          <label className="field">
            <span className="field__label">Arrive by</span>
            <input
              className="field__input"
              type="date"
              required
              value={arrivalDate}
              onChange={(event) => setArrivalDate(event.target.value)}
            />
          </label>
          <label className="field">
            <span className="field__label">Bank account (last 4)</span>
            <input
              className="field__input"
              inputMode="numeric"
              maxLength={4}
              placeholder="1234"
              value={bankLast4}
              onChange={(event) => setBankLast4(event.target.value.replace(/\D/g, ''))}
            />
          </label>
        </div>

        {error && (
          <p className="form__error" role="alert">
            {error}
          </p>
        )}
      </form>
    </Dialog>
  )
}

function today() {
  return new Date().toLocaleDateString('en-CA')
}
