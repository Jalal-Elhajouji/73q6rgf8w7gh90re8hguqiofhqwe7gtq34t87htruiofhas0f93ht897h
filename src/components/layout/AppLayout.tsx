import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import './AppLayout.css'

type AppLayoutProps = {
  currentPath: string
  children: ReactNode
}

export function AppLayout({ currentPath, children }: AppLayoutProps) {
  return (
    <div className="app-layout">
      <Sidebar currentPath={currentPath} />
      <div className="app-layout__main">
        <TopBar />
        <main>{children}</main>
      </div>
    </div>
  )
}
