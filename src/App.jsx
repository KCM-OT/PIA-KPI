import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import PageHeader from './components/PageHeader'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <TopHeader />
        <PageHeader />
        <div className="app-shell__content" />
      </div>
    </div>
  )
}

export default App
