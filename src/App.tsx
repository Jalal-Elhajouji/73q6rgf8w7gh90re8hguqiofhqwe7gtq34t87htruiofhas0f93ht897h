import { AppLayout } from './components/layout/AppLayout'
import { HomePage } from './features/home/HomePage'
import { TransactionsPage } from './features/transactions/TransactionsPage'
import { useHashRoute } from './lib/useHashRoute'

function App() {
  const path = useHashRoute()

  return (
    <AppLayout currentPath={path}>
      {path === '/transactions' ? <TransactionsPage /> : <HomePage />}
    </AppLayout>
  )
}

export default App
