import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import PageHeader from './components/PageHeader'
import DashboardPromo from './components/DashboardPromo'
import AssessmentsTable from './components/AssessmentsTable'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <TopHeader />
        <PageHeader />
        <div className="app-shell__content">
          <DashboardPromo />
          <AssessmentsTable />
        </div>
      </div>
    </div>
  )
}

export default App
