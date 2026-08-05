import otLockupWhite from '../assets/icons/ot-lockup-white.svg'
import buttonMainMenu from '../assets/icons/button-main-menu.svg'
import collapseArrow from '../assets/icons/collapse-arrow.svg'
import iconDashboard from '../assets/icons/icon-dashboard.svg'
import clipboardList from '../assets/icons/clipboard-list.svg'
import iconSetup from '../assets/icons/icon-setup.svg'
import flag from '../assets/icons/flag.svg'
import iconReports from '../assets/icons/icon-reports.svg'
import iconSetupAlt from '../assets/icons/icon-setup-alt.svg'
import iconSettings from '../assets/icons/icon-settings.svg'
import angleRight from '../assets/icons/angle-right.svg'
import './Sidebar.css'

const TRANSPARENT_GREEN = 'rgba(153,229,167,0)'
const SUBTLE_WHITE = 'rgba(255,255,255,0.16)'
const SUBTLE_WHITE_ALT = 'rgba(255,255,255,0.15)'
const GROUP_HIGHLIGHT = '#292929'

function NavRow({ icon, label, highlight = TRANSPARENT_GREEN, borderTop = false, active = false, expandable = false }) {
  return (
    <div
      className={`nav-row${borderTop ? ' nav-row--border' : ''}${active ? ' nav-row--active' : ''}`}
    >
      <div className="nav-row__highlight" style={{ backgroundColor: highlight }} />
      <img className="nav-row__icon" src={icon} alt="" />
      <p className="nav-row__label">{label}</p>
      {expandable && (
        <div className="nav-row__chevron">
          <img src={angleRight} alt="" />
        </div>
      )}
    </div>
  )
}

const NAV_ITEMS = [
  { type: 'row', icon: iconDashboard, label: 'Dashboard', borderTop: true },
  { type: 'row', icon: clipboardList, label: 'Assessments', borderTop: true, highlight: GROUP_HIGHLIGHT, expandable: true },
  { type: 'row', icon: iconSetup, label: 'Active', highlight: '#99e5a7', active: true },
  { type: 'row', icon: iconSetup, label: 'Archive', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconSetup, label: 'Recycle bin', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconDashboard, label: 'Projects', borderTop: true },
  { type: 'row', icon: flag, label: 'Risk register' },
  { type: 'row', icon: iconReports, label: 'Reports' },
  { type: 'row', icon: iconSetupAlt, label: 'Setup', borderTop: true, highlight: GROUP_HIGHLIGHT, expandable: true },
  { type: 'row', icon: iconSetup, label: 'Templates', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconSetup, label: 'Workflow and routing', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconSetup, label: 'Assessment results', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconSetup, label: 'Integrations', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconSetup, label: 'Email templates', highlight: SUBTLE_WHITE_ALT },
  { type: 'row', icon: iconSetup, label: 'Automation rules', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconSetup, label: 'Attribute manager', highlight: SUBTLE_WHITE },
  { type: 'row', icon: iconSettings, label: 'Settings', borderTop: true },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img className="sidebar__menu-btn" src={buttonMainMenu} alt="Main menu" />
        <img className="sidebar__logo" src={otLockupWhite} alt="OneTrust" />
      </div>
      <p className="sidebar__product">PIA &amp; DPIA Automation</p>
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item, i) => (
          <NavRow key={i} {...item} />
        ))}
      </nav>
      <button className="sidebar__collapse" type="button" aria-label="Collapse sidebar">
        <img src={collapseArrow} alt="" />
      </button>
    </aside>
  )
}
