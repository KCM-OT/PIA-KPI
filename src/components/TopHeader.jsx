import iconSearch from '../assets/icons/icon-search.svg'
import iconAlert from '../assets/icons/icon-alert.svg'
import iconCog from '../assets/icons/icon-cog.svg'
import iconQuestion from '../assets/icons/icon-question.svg'
import angleDown from '../assets/icons/angle-down.svg'
import copilotVector from '../assets/icons/copilot-vector.svg'
import './TopHeader.css'

export default function TopHeader() {
  return (
    <header className="top-header">
      <p className="top-header__org">Mercurial Global</p>

      <div className="top-header__utilities">
        <img className="top-header__icon-btn" src={iconSearch} alt="Search" />

        <button type="button" className="top-header__copilot">
          <img src={copilotVector} alt="" />
          <span>Ask Copilot</span>
        </button>

        <div className="top-header__cluster">
          <img className="top-header__icon-btn" src={iconAlert} alt="Alerts" />

          <button type="button" className="top-header__group-select">
            <span>Privacy Group</span>
            <img src={angleDown} alt="" />
          </button>

          <img className="top-header__icon-btn" src={iconCog} alt="Settings" />

          <button type="button" className="top-header__avatar-btn">
            <span className="top-header__avatar">AR</span>
          </button>

          <img className="top-header__icon-btn" src={iconQuestion} alt="Help" />
        </div>
      </div>
    </header>
  )
}
