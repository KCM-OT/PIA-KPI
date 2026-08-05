import { useEffect, useState } from 'react'
import './DashboardPromo.css'

const MAX_CARDS = 3

function WidgetTile({ variant, label }) {
  if (variant === 'add') {
    return (
      <div className="widget-tile widget-tile--add">
        <span className="widget-tile__plus">+</span>
        <span className="widget-tile__label">Add widget</span>
      </div>
    )
  }
  return (
    <div className="widget-tile widget-tile--selected">
      <span className="widget-tile__bars">
        <span />
        <span />
        <span />
      </span>
      <span className="widget-tile__label">{label}</span>
    </div>
  )
}

function DashboardIllustration() {
  return (
    <div className="dashboard-illustration">
      <div className="dashboard-illustration__grid">
        <WidgetTile variant="selected" label="Risk score" />
        <WidgetTile variant="selected" label="Open items" />
        <WidgetTile variant="selected" label="Completion" />
        <WidgetTile variant="add" />
      </div>
    </div>
  )
}

const TAG_STYLES = {
  red: { background: '#fbe7e6', color: '#c0392b' },
  green: { background: '#e8f5e9', color: '#2c6145' },
  blue: { background: '#e3f2fd', color: '#1470a9' },
  orange: { background: '#fff3e0', color: '#b25e09' },
  grey: { background: '#efefef', color: '#4d4d4d' },
}

function Tag({ label, variant }) {
  return (
    <span className="kpi-card__tag" style={TAG_STYLES[variant]}>
      {label}
    </span>
  )
}

function CardVisual({ visual }) {
  switch (visual.type) {
    case 'stat-pair':
      return (
        <div className="kpi-visual kpi-visual--stat-pair">
          {visual.items.map((item) => (
            <div className="stat" key={item.label}>
              <span className={`stat__value stat__value--${item.variant}`}>{item.value}</span>
              <span className="stat__label">{item.label}</span>
            </div>
          ))}
        </div>
      )
    case 'stat-vs':
      return (
        <div className="kpi-visual kpi-visual--stat-pair">
          <div className="stat">
            <span className="stat__value stat__value--dark">{visual.left.value}</span>
            <span className="stat__label">{visual.left.label}</span>
          </div>
          <span className="stat__vs">vs</span>
          <div className="stat">
            <span className="stat__value stat__value--dark">{visual.right.value}</span>
            <span className="stat__label">{visual.right.label}</span>
          </div>
        </div>
      )
    case 'stacked-bar':
      return (
        <div className="kpi-visual kpi-visual--stacked">
          <div className="stacked-bar">
            {visual.segments.map((segment, index) => (
              <span key={index} style={{ flex: segment.flex, background: segment.color }} />
            ))}
          </div>
          <span className="stacked-bar__legend">{visual.legend}</span>
        </div>
      )
    case 'bars':
      return (
        <div className="kpi-visual kpi-visual--bars">
          {visual.rows.map((row) => (
            <div className="bar-row" key={row.label}>
              <span className="bar-row__label">{row.label}</span>
              <span className="bar-row__track">
                <span className="bar-row__fill" style={{ width: `${row.value}%`, background: row.color }} />
              </span>
            </div>
          ))}
        </div>
      )
    case 'percent':
      return (
        <div className="kpi-visual kpi-visual--percent">
          <span className="percent__value">{visual.value}%</span>
          <span className="percent__track">
            <span className="percent__fill" style={{ width: `${visual.value}%` }} />
          </span>
        </div>
      )
    case 'donut':
      return (
        <div className="kpi-visual kpi-visual--donut">
          <span className="donut" />
          <div className="donut__text">
            <span className="donut__label">{visual.label}</span>
            <span className="donut__detail">{visual.detail}</span>
          </div>
        </div>
      )
    case 'sparkline':
      return (
        <div className="kpi-visual kpi-visual--sparkline">
          <svg viewBox="0 0 120 32" preserveAspectRatio="none">
            <polyline points="0,8 20,10 40,9 60,14 80,18 100,22 120,24" fill="none" stroke="#7fbfa1" strokeWidth="2" />
          </svg>
        </div>
      )
    case 'list':
      return (
        <div className="kpi-visual kpi-visual--list">
          {visual.rows.map((row) => (
            <div className="list-row" key={row.label}>
              <span className="list-row__dot" style={{ background: row.dot }} />
              <span className="list-row__label">{row.label}</span>
              <span className={`list-row__value list-row__value--${row.valueVariant}`}>{row.value}</span>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

const CARD_DEFS = [
  {
    id: 'assessment-deadlines',
    title: 'Assessment deadlines',
    tag: 'Compliance',
    tagVariant: 'red',
    question: 'Am I exposed? Overdue and due-soon at a glance.',
    visual: { type: 'stat-pair', items: [{ value: '28', label: 'overdue', variant: 'danger' }, { value: '10', label: 'due soon', variant: 'dark' }] },
  },
  {
    id: 'open-risks-by-severity',
    title: 'Open risks by severity',
    tag: 'Leader',
    tagVariant: 'red',
    question: 'Where is my unmitigated residual risk sitting?',
    visual: {
      type: 'stacked-bar',
      segments: [
        { color: '#d64545', flex: 1 },
        { color: '#e8845a', flex: 1.6 },
        { color: '#f0b429', flex: 2.2 },
        { color: '#4f9d81', flex: 1.4 },
      ],
      legend: '7 crit · 13 high · 19 med · 11 low',
    },
  },
  {
    id: 'stage-pipeline',
    title: 'Stage pipeline',
    tag: 'Operator',
    tagVariant: 'blue',
    question: 'Where is the work concentrated right now?',
    visual: {
      type: 'bars',
      rows: [
        { label: 'Not started', value: 100, color: '#a9c9e8' },
        { label: 'In progress', value: 68, color: '#5b8fc9' },
        { label: 'Under review', value: 34, color: '#2f5f9e' },
      ],
    },
  },
  {
    id: 'intake-vs-completed',
    title: 'Intake vs. completed',
    tag: 'Program',
    tagVariant: 'green',
    question: 'Are we keeping up with what is coming in?',
    visual: { type: 'stat-vs', left: { value: '34', label: 'launched' }, right: { value: '29', label: 'completed' } },
  },
  {
    id: 'on-time-completion',
    title: 'On-time completion',
    tag: 'Program',
    tagVariant: 'green',
    question: 'Is our SLA holding?',
    visual: { type: 'percent', value: 71 },
  },
  {
    id: 'cycle-time-by-stage',
    title: 'Cycle time by stage',
    tag: 'Program',
    tagVariant: 'green',
    question: 'Where is the bottleneck?',
    visual: {
      type: 'bars',
      rows: [
        { label: 'Not started', value: 100, color: '#c3b8e8' },
        { label: 'In progress', value: 48, color: '#a493d8' },
        { label: 'Under review', value: 88, color: '#8570c9' },
      ],
    },
  },
  {
    id: 'overdue-by-organisation',
    title: 'Overdue by organisation',
    tag: 'Operator',
    tagVariant: 'blue',
    question: 'Which org is driving the overdue backlog?',
    visual: { type: 'donut', label: 'Potential Transfers', detail: 'leads at 11 of 28' },
  },
  {
    id: 'residual-risk-trend',
    title: 'Residual risk trend',
    tag: 'Leader',
    tagVariant: 'red',
    question: 'Are we reducing risk over time?',
    visual: { type: 'sparkline' },
  },
  {
    id: 'coverage-by-unit',
    title: 'Coverage by unit',
    tag: 'Blind spots',
    tagVariant: 'orange',
    question: 'Which teams have no assessments at all?',
    visual: {
      type: 'bars',
      rows: [
        { label: 'Marketing', value: 92, color: '#7fae5c' },
        { label: 'Product', value: 62, color: '#9fbf5c' },
        { label: 'HR', value: 16, color: '#e8a34d' },
      ],
    },
  },
  {
    id: 'my-action-queue',
    title: 'My action queue',
    tag: 'Personal',
    tagVariant: 'grey',
    question: 'What needs me, specifically, today?',
    visual: {
      type: 'list',
      rows: [
        { dot: '#5b8fc9', label: 'Awaiting review', value: '5', valueVariant: 'dark' },
        { dot: '#d64545', label: 'Assigned + overdue', value: '3', valueVariant: 'danger' },
      ],
    },
  },
]

function KpiCard({ card, selected, disabled, onToggle }) {
  return (
    <div className={`kpi-card${selected ? ' kpi-card--selected' : ''}`}>
      <div className="kpi-card__header">
        <h3 className="kpi-card__title">{card.title}</h3>
        <button
          type="button"
          className={`kpi-card__checkbox${selected ? ' kpi-card__checkbox--checked' : ''}`}
          aria-pressed={selected}
          aria-label={selected ? `Remove ${card.title} from dashboard` : `Add ${card.title} to dashboard`}
          disabled={disabled}
          onClick={() => onToggle(card.id)}
        >
          {selected && '✓'}
        </button>
      </div>
      <div className={`kpi-card__visual${selected ? '' : ' kpi-card__visual--muted'}`}>
        <CardVisual visual={card.visual} />
      </div>
      <p className="kpi-card__question">{card.question}</p>
      <Tag label={card.tag} variant={card.tagVariant} />
    </div>
  )
}

function FeedbackCard() {
  return (
    <div className="kpi-card kpi-card--feedback">
      <span className="feedback-card__icon">+</span>
      <h3 className="feedback-card__title">Can&apos;t find a card for your insight?</h3>
      <p className="feedback-card__description">Submit an idea — our team reviews every one.</p>
      <span className="feedback-card__link">+ OneTrust Listens</span>
    </div>
  )
}

function DashboardBuilderModal({ onClose }) {
  const [selectedIds, setSelectedIds] = useState([])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function toggleCard(id) {
    setSelectedIds((current) => {
      if (current.includes(id)) return current.filter((cardId) => cardId !== id)
      if (current.length >= MAX_CARDS) return current
      return [...current, id]
    })
  }

  return (
    <div className="dashboard-builder" role="dialog" aria-modal="true" aria-labelledby="dashboard-builder-title">
      <header className="dashboard-builder__header">
        <div className="dashboard-builder__brand">
          <span className="dashboard-builder__logo">OT</span>
          <span className="dashboard-builder__brand-name">Assessments</span>
        </div>
        <div className="dashboard-builder__steps">
          <span className="dashboard-builder__step dashboard-builder__step--active">1 · Choose cards</span>
          <span className="dashboard-builder__step-divider">•</span>
          <span className="dashboard-builder__step">2 · Your dashboard</span>
        </div>
        <button type="button" className="dashboard-builder__close" aria-label="Close" onClick={onClose}>
          &times;
        </button>
      </header>

      <div className="dashboard-builder__body">
        <h1 id="dashboard-builder-title" className="dashboard-builder__title">Build your dashboard</h1>
        <p className="dashboard-builder__subtitle">
          Pick up to three cards for your top row. Every card answers one question and lets you drill into
          the rows behind it. You can change the mix any time.
        </p>

        <div className="dashboard-builder__toolbar">
          <span className="dashboard-builder__count">
            <strong>{selectedIds.length}</strong> of {MAX_CARDS} selected
          </span>
          <button
            type="button"
            className="dashboard-builder__continue"
            disabled={selectedIds.length === 0}
            onClick={onClose}
          >
            Continue &rarr;
          </button>
        </div>

        <div className="dashboard-builder__grid">
          {CARD_DEFS.map((card) => (
            <KpiCard
              key={card.id}
              card={card}
              selected={selectedIds.includes(card.id)}
              disabled={!selectedIds.includes(card.id) && selectedIds.length >= MAX_CARDS}
              onToggle={toggleCard}
            />
          ))}
          <FeedbackCard />
        </div>
      </div>
    </div>
  )
}

export default function DashboardPromo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="dashboard-promo">
      <DashboardIllustration />
      <div className="dashboard-promo__content">
        <p className="dashboard-promo__eyebrow">Modular dashboard</p>
        <h3 className="dashboard-promo__title">Customize your dashboard</h3>
        <p className="dashboard-promo__description">
          Build your own dashboard by choosing up to three KPI widgets that matter most to your team.
        </p>
        <button type="button" className="dashboard-promo__cta" onClick={() => setIsModalOpen(true)}>
          Customize dashboard
        </button>
      </div>
      {isModalOpen && <DashboardBuilderModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
