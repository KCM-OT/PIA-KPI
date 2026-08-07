import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import PageHeader from './components/PageHeader'
import DashboardPromo from './components/DashboardPromo'
import AssessmentsTable from './components/AssessmentsTable'
import './App.css'

const DEFAULT_FILTER = { field: 'stage', value: 'Completed', label: 'Completed' }

function App() {
  const [activeFilter, setActiveFilter] = useState(DEFAULT_FILTER)

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <TopHeader />
        <PageHeader />
        <div className="app-shell__content">
          <DashboardPromo onApplyFilter={setActiveFilter} />
          <AssessmentsTable activeFilter={activeFilter} onClearFilter={() => setActiveFilter(null)} />
        </div>
      </div>
    </div>
  )
}

export default App
