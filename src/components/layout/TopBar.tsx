import { Icon } from '../ui/Icon'
import './TopBar.css'

export function TopBar() {
  return (
    <header className="topbar">
      <label className="search">
        <Icon name="search" size={16} />
        <input type="search" placeholder="Search" aria-label="Search" />
      </label>

      <div className="topbar__actions">
        <button type="button" className="icon-button" aria-label="Apps">
          <Icon name="apps" size={20} />
        </button>
        <button type="button" className="icon-button" aria-label="Help">
          <Icon name="help" size={20} />
        </button>
        <button
          type="button"
          className="icon-button icon-button--dot"
          aria-label="Notifications"
        >
          <Icon name="bell" size={20} />
        </button>
        <button type="button" className="icon-button" aria-label="Settings">
          <Icon name="settings" size={20} />
        </button>
        <button type="button" className="create-button" aria-label="Create">
          <Icon name="plus" size={14} />
        </button>
      </div>
    </header>
  )
}
