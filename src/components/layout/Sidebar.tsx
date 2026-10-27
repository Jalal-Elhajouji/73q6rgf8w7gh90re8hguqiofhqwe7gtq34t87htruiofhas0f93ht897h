import { NavIcon, type NavIconName } from './NavIcon'
import './Sidebar.css'

type NavItem = {
  label: string
  icon: NavIconName
  /** Route path; items without one are placeholders. */
  path?: string
  expandable?: boolean
}

const primaryNav: NavItem[] = [
  { label: 'Home', icon: 'home', path: '/' },
  { label: 'Balances', icon: 'balances' },
  { label: 'Transactions', icon: 'transactions', path: '/transactions' },
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

function NavList({ items, currentPath }: { items: NavItem[]; currentPath: string }) {
  return (
    <ul className="nav-list">
      {items.map((item) => {
        const active = item.path === currentPath
        return (
          <li key={item.label}>
            <a
              href={item.path ? `#${item.path}` : '#'}
              onClick={item.path ? undefined : (event) => event.preventDefault()}
              className={`nav-item${active ? ' nav-item--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <NavIcon name={item.icon} />
              <span className="nav-item__label">{item.label}</span>
              {item.expandable && (
                <NavIcon name="chevronDown" size={12} className="nav-item__chevron" />
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export function Sidebar({ currentPath }: { currentPath: string }) {
  return (
    <aside className="sidebar">
      <button type="button" className="account-switcher">
        <span className="account-switcher__logo">
          I
          <span className="account-switcher__badge">WIX</span>
        </span>
        <span className="account-switcher__text">
          <span className="account-switcher__name">idlvr.com.au</span>
          <span className="account-switcher__sub">WIX.com</span>
        </span>
        <NavIcon name="chevronDown" size={12} className="account-switcher__chevron" />
      </button>

      <nav aria-label="Main">
        <NavList items={primaryNav} currentPath={currentPath} />

        <h2 className="nav-heading">Shortcuts</h2>
        <NavList items={shortcuts} currentPath={currentPath} />

        <h2 className="nav-heading">Products</h2>
        <NavList items={products} currentPath={currentPath} />
      </nav>
    </aside>
  )
}
