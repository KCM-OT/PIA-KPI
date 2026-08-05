import './PageHeader.css'

export default function PageHeader() {
  return (
    <div className="page-header">
      <div className="page-header__left">
        <h2 className="page-header__title">Assessments</h2>
        <p className="page-header__description">
          Use assessments to evaluate the PIA and DPIA risks within your organization.
        </p>
      </div>
      <div className="page-header__right">
        <button type="button" className="page-header__cta">
          Launch assessment
        </button>
      </div>
      <div className="page-header__divider" />
    </div>
  )
}
