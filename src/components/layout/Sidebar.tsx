import { Icon, type IconName } from '../ui/Icon'
import './Sidebar.css'

type NavItem = {
  label: string
  icon: IconName
  active?: boolean
  expandable?: boolean
}

const primaryNav: NavItem[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Balances', icon: 'balances' },
  { label: 'Transactions', icon: 'transactions', active: true },
  { label: 'Customers', icon: 'customers' },
  { label: 'Product catalog', icon: 'catalog' },
]

const shortcuts: NavItem[] = [
  { label: 'Identity', icon: 'identity' },
  { label: 'Billing overview', icon: 'clock' },
]

const products: NavItem[] = [
  { label: 'Payments', icon: 'wallet', expandable: true },
  { label: 'Billing', icon: 'billing', expandable: true },
  { label: 'Reporting', icon: 'reporting', expandable: true },
  { label: 'Apps', icon: 'apps', expandable: true },
  { label: 'More', icon: 'more', expandable: true },
]

function NavList({ items }: { items: NavItem[] }) {
  return (
    <ul className="nav-list">
      {items.map((item) => (
        <li key={item.label}>
          <a
            href="#"
            className={`nav-item${item.active ? ' nav-item--active' : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            <Icon name={item.icon} size={18} />
            <span className="nav-item__label">{item.label}</span>
            {item.expandable && (
              <Icon name="chevronDown" size={14} className="nav-item__chevron" />
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function Sidebar() {
  return (
    <aside className="sidebar">
      <button type="button" className="account-switcher">
        <span className="account-switcher__logo">L</span>
        <span className="account-switcher__text">
          <span className="account-switcher__name">lnbk</span>
          <span className="account-switcher__sub">Business account</span>
        </span>
        <Icon name="chevronDown" size={14} />
      </button>

      <nav aria-label="Main">
        <NavList items={primaryNav} />

        <h2 className="nav-heading">Shortcuts</h2>
        <NavList items={shortcuts} />

        <h2 className="nav-heading">Products</h2>
        <NavList items={products} />
      </nav>
    </aside>
  )
}
