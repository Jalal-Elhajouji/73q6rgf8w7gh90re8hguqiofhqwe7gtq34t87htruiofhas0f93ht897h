import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import './AppLayout.css'

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__main">
        <TopBar />
        <main>{children}</main>
      </div>
    </div>
  )
}
