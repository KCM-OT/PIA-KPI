import iconSavedViews from '../assets/icons/icon-saved-views.svg'
import angleDown from '../assets/icons/angle-down.svg'
import iconTableSearch from '../assets/icons/icon-table-search.svg'
import iconColumns from '../assets/icons/icon-columns.svg'
import iconDownload from '../assets/icons/icon-download.svg'
import iconPlus from '../assets/icons/icon-plus.svg'
import iconCloseX from '../assets/icons/icon-close-x.svg'
import iconEllipsis from '../assets/icons/icon-ellipsis.svg'
import iconSortUp from '../assets/icons/icon-sort-up.svg'
import iconSortDown from '../assets/icons/icon-sort-down.svg'
import iconPaginationArrow from '../assets/icons/icon-pagination-arrow.svg'
import iconAvatarEmpty from '../assets/icons/icon-avatar-empty.svg'
import iconAvatarGroup from '../assets/icons/icon-avatar-group.svg'
import './AssessmentsTable.css'

const ROWS = [
  { id: '45332', name: 'Data Processing Impact', stage: 'Completed', result: 'Low Risk', residual: 'Low', org: 'Mercurial Logistics', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
  { id: '78433', name: 'Transfer Impact', stage: 'Completed', result: 'Medium Risk', residual: 'Medium', org: 'Quicksilver Media', respondent: { type: 'initials', text: 'FE', color: '#cb347d' } },
  { id: '89654', name: 'Legitimate Interest', stage: 'Completed', result: 'Approved', residual: 'Low', org: 'Helix Pharmaceuticals', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
  { id: '53221', name: 'Data Protection Impact', stage: 'Completed', result: 'High Risk – Mitigated', residual: 'High', org: 'Meridian Financial', respondent: { type: 'initials', text: 'NS', color: '#ab47bc' } },
  { id: '09475', name: 'Vendor Risk', stage: 'Completed', result: 'Approved with Conditions', residual: 'Medium', org: 'Stratos Aerospace', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
  { id: '65432', name: 'Third-Party Sharing', stage: 'Completed', result: 'Low Risk', residual: 'Low', org: 'Vanguard Consulting', respondent: { type: 'empty' } },
  { id: '65765', name: 'Automated Decision-Making', stage: 'Completed', result: 'Non-Compliant', residual: 'Medium', org: 'Polaris Data Systems', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
  { id: '45322', name: "Children's Data", stage: 'Completed', result: 'Approved with Conditions', residual: 'Low', org: 'Nexus Energy', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
  { id: '90324', name: 'Cross-Border Transfer', stage: 'Completed', result: 'Medium Risk', residual: 'High', org: 'Catalent Solutions', respondent: { type: 'group', color: '#2e447d' } },
  { id: '55432', name: 'Biometric Data', stage: 'Completed', result: 'High Risk – Mitigated', residual: 'Low', org: 'Zenith Capital', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
  { id: '67445', name: 'Employee Monitoring', stage: 'Completed', result: 'Approved', residual: 'Medium', org: 'Prism Manufacturing', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
  { id: '90332', name: 'AI/ML Processing', stage: 'Completed', result: 'Low Risk', residual: 'Low', org: 'Orbit Telecom', respondent: { type: 'initials', text: 'KP', color: '#2e447d' } },
]

const COLUMNS = '48px 48px 100px minmax(180px, 1fr) 120px minmax(160px, 1fr) 150px minmax(160px, 1fr) 100px'

function rowMatchesFilter(row, filter) {
  if (!filter) return true
  switch (filter.field) {
    case 'stage':
      return row.stage === filter.value
    case 'result':
      return row.result === filter.value
    case 'residual':
      return row.residual === filter.value
    case 'organization':
      return row.org === filter.value
    case 'respondent':
      return row.respondent.type === 'initials' && row.respondent.text === filter.value
    default:
      return true
  }
}

function SortIcon() {
  return (
    <span className="sort-icon">
      <img className="sort-icon__up" src={iconSortUp} alt="" />
      <img className="sort-icon__down" src={iconSortDown} alt="" />
    </span>
  )
}

function Checkbox() {
  return <span className="checkbox" />
}

function Avatar({ respondent }) {
  if (respondent.type === 'empty') {
    return (
      <span className="avatar avatar--empty">
        <img className="avatar__empty-icon" src={iconAvatarEmpty} alt="" />
      </span>
    )
  }
  if (respondent.type === 'group') {
    return (
      <span className="avatar" style={{ backgroundColor: respondent.color }}>
        <img className="avatar__group-icon" src={iconAvatarGroup} alt="" />
      </span>
    )
  }
  return (
    <span className="avatar" style={{ backgroundColor: respondent.color }}>
      <span className="avatar__initials">{respondent.text}</span>
    </span>
  )
}

function FilterToolbar({ activeFilter, onClearFilter }) {
  return (
    <div className="assessments-table__toolbar">
      <div className="assessments-table__toolbar-row">
        <div className="saved-views">
          <img className="saved-views__icon" src={iconSavedViews} alt="" />
          <span className="saved-views__label">Global</span>
          <img className="saved-views__caret" src={angleDown} alt="" />
        </div>
        <div className="toolbar-actions">
          <div className="table-search">
            <span className="table-search__placeholder">Search...</span>
            <img className="table-search__icon" src={iconTableSearch} alt="" />
          </div>
          <button type="button" className="icon-button" aria-label="Choose columns">
            <img src={iconColumns} alt="" />
          </button>
          <button type="button" className="icon-button" aria-label="Download">
            <img src={iconDownload} alt="" />
          </button>
        </div>
      </div>
      <div className="assessments-table__toolbar-row">
        <button type="button" className="add-filter">
          <img className="add-filter__icon" src={iconPlus} alt="" />
          <span>Add filter</span>
        </button>
        {activeFilter && (
          <>
            <span className="filter-tag">
              <span className="filter-tag__label">{activeFilter.label}</span>
              <button type="button" className="filter-tag__close" onClick={onClearFilter} aria-label="Remove filter">
                <img src={iconCloseX} alt="" />
              </button>
            </span>
            <span className="filter-links">
              <a href="#" className="filter-links__link">Hide</a>
              <span className="filter-links__divider" />
              <a href="#" className="filter-links__link" onClick={(event) => { event.preventDefault(); onClearFilter() }}>
                Clear all
              </a>
            </span>
          </>
        )}
      </div>
    </div>
  )
}

function TableHeaderRow() {
  return (
    <div className="table-row table-row--head" style={{ gridTemplateColumns: COLUMNS }}>
      <div className="cell cell--checkbox">
        <Checkbox />
      </div>
      <div className="cell" />
      <div className="cell cell--head">
        <span className="cell__label">ID</span>
        <SortIcon />
      </div>
      <div className="cell cell--head">
        <span className="cell__label">Name</span>
        <SortIcon />
      </div>
      <div className="cell cell--head">
        <span className="cell__label">Stage</span>
        <SortIcon />
      </div>
      <div className="cell cell--head">
        <span className="cell__label">Result</span>
      </div>
      <div className="cell cell--head">
        <span className="cell__label">Residual risk score</span>
      </div>
      <div className="cell cell--head">
        <span className="cell__label">Organization</span>
      </div>
      <div className="cell cell--head">
        <span className="cell__label">Respondent</span>
      </div>
    </div>
  )
}

function TableDataRow({ row }) {
  return (
    <div className="table-row" style={{ gridTemplateColumns: COLUMNS }}>
      <div className="cell cell--checkbox">
        <Checkbox />
      </div>
      <div className="cell cell--ellipsis">
        <button type="button" className="icon-button" aria-label="Row actions">
          <img src={iconEllipsis} alt="" />
        </button>
      </div>
      <div className="cell cell--text">{row.id}</div>
      <div className="cell cell--link">{row.name}</div>
      <div className="cell cell--stage">
        <span className="badge">{row.stage}</span>
      </div>
      <div className="cell cell--text">{row.result}</div>
      <div className="cell cell--text">{row.residual}</div>
      <div className="cell cell--link">{row.org}</div>
      <div className="cell cell--avatar">
        <Avatar respondent={row.respondent} />
      </div>
    </div>
  )
}

function Pagination({ count }) {
  return (
    <div className="pagination">
      <div className="pagination__left">
        <div className="pagination__buttons">
          <button type="button" className="pagination__nav" aria-label="Previous page">
            <span className="pagination__arrow pagination__arrow--left">
              <img src={iconPaginationArrow} alt="" />
            </span>
          </button>
          <button type="button" className="pagination__page pagination__page--active">1</button>
          <button type="button" className="pagination__page">2</button>
          <button type="button" className="pagination__page">3</button>
          <button type="button" className="pagination__page">4</button>
          <button type="button" className="pagination__nav" aria-label="Next page">
            <span className="pagination__arrow pagination__arrow--right">
              <img src={iconPaginationArrow} alt="" />
            </span>
          </button>
        </div>
        <span className="pagination__divider" />
        <div className="pagination__go">
          <span className="pagination__go-label">Go to page</span>
          <input type="text" className="pagination__go-input" aria-label="Page number" />
          <button type="button" className="pagination__go-button">Go</button>
        </div>
      </div>
      <div className="pagination__right">
        <span className="pagination__count">
          {count > 0 ? `Showing 1-${count} of ${count} items` : 'No items match this filter'}
        </span>
        <span className="pagination__divider" />
        <div className="pagination__row-select">
          <span>50 per view</span>
          <img className="pagination__row-select-caret" src={angleDown} alt="" />
        </div>
      </div>
    </div>
  )
}

export default function AssessmentsTable({ activeFilter, onClearFilter }) {
  const visibleRows = ROWS.filter((row) => rowMatchesFilter(row, activeFilter))

  return (
    <div className="assessments-table" id="assessments-table">
      <FilterToolbar activeFilter={activeFilter} onClearFilter={onClearFilter} />
      <div className="assessments-table__body">
        <TableHeaderRow />
        {visibleRows.map((row) => (
          <TableDataRow key={row.id} row={row} />
        ))}
      </div>
      <Pagination count={visibleRows.length} />
    </div>
  )
}
