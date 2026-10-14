import { useState } from 'react'
import { Icon } from '../../components/ui/Icon'
import { payouts } from './data'
import { PayoutsTable } from './PayoutsTable'
import type { PayoutStatus } from './types'
import './TransactionsPage.css'

const tabs = ['Payments', 'Payouts', 'All activity'] as const

type StatusFilter = {
  label: string
  statuses: PayoutStatus[] | null
}

const statusFilters: StatusFilter[] = [
  { label: 'All', statuses: null },
  { label: 'Paid', statuses: ['paid'] },
  { label: 'Pending or in transit', statuses: ['pending', 'in_transit'] },
  { label: 'Failed', statuses: ['failed'] },
  { label: 'Canceled', statuses: ['canceled'] },
]

export function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Payouts')
  const [activeFilter, setActiveFilter] = useState(statusFilters[0])

  const visible = activeFilter.statuses
    ? payouts.filter((p) => activeFilter.statuses!.includes(p.status))
    : payouts

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Transactions</h1>
        <div className="page-header__actions">
          <button type="button" className="btn btn--icon" aria-label="Export">
            <Icon name="export" size={14} />
          </button>
          <button type="button" className="btn btn--icon" aria-label="Reports">
            <Icon name="chart" size={14} />
          </button>
          <button type="button" className="btn btn--icon" aria-label="Settings">
            <Icon name="settings" size={14} />
          </button>
          <button type="button" className="btn btn--ghost" disabled>
            <Icon name="plus" size={14} />
            New payout
            <kbd>N</kbd>
          </button>
        </div>
      </div>

      <div className="tabs" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={tab === activeTab}
            className="tabs__tab"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <div className="chips">
          {statusFilters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className={`chip${filter === activeFilter ? ' chip--active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.label}
            </button>
          ))}
          <button type="button" className="chip chip--icon" aria-label="More filters">
            <Icon name="more" size={18} />
          </button>
        </div>
        <div className="toolbar__right">
          <button type="button" className="chip">
            <Icon name="filter" size={16} />
            Filter
          </button>
          <button type="button" className="chip chip--icon" aria-label="Edit columns">
            <Icon name="sliders" size={18} />
          </button>
        </div>
      </div>

      <PayoutsTable payouts={visible} />

      <div className="pagination">
        <button type="button" className="pagination__btn" aria-label="Previous page" disabled>
          <Icon name="chevronLeft" size={14} />
        </button>
        <button type="button" className="pagination__btn" aria-label="Next page" disabled>
          <Icon name="chevronRight" size={14} />
        </button>
        <span>
          {visible.length ? `1–${visible.length}` : '0'} of {visible.length} results
        </span>
      </div>
    </>
  )
}
