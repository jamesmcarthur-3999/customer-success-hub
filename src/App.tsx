import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from './layouts/MainLayout'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'))
const CustomerDetails = lazy(() => import('./pages/CustomerDetails'))
const CustomerForm = lazy(() => import('./pages/CustomerForm'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Settings = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id/edit" element={<CustomerForm />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}

export default App
