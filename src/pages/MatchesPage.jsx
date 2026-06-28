import { useState, useCallback, useEffect, useMemo } from 'react'
import { ALL_MATCHES, PHASE_LABELS, GROUP_FILTERS, GROUP_FILTER_LABELS, calcPoints, maxPoints, isMatchLocked, formatKickoff, isToday } from '../data'
import { savePrediction } from '../firebaseHelpers'
import MatchPredictions from './MatchPredictions'
import './MatchesPage.css'

function makeCalendarUrl(match) {
  const start = new Date(match.kickoffUTC)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)
  const fmt = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const title = encodeURIComponent(`⚽ ${match.home.name} vs ${match.away.name} - Mundial 2026`)
  const details = encodeURIComponent(`Polla Mundialista 2026 · ${match.group}`)
  const dates = `${fmt(start)}/${fmt(end)}`
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`
}

// Orden de fases para agrupar
const PHASE_ORDER = ['group', 'round32', 'round16', 'quarter', 'semi', 'third', 'final']

export default function MatchesPage({ currentUser, myPredictions, results, allPredictions, users, showToast }) {
  const [filter, setFilter] = useState('all')
  const [inputs, setInputs] = useState({})
  const [saving, setSaving] = useState({})
  const [now, setNow] = useState(Date.now())
  const [expandedMatch, setExpandedMatch] = useState(null)

  // Fases colapsadas: por defecto colapsar 'group' si ya terminó
  const [collapsedPhases, setCollapsedPhases] = useState({ group: true })

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(timer)
  }, [])

  const togglePhase = (phase) => {
    setCollapsedPhases(prev => ({ ...prev, [phase]: !prev[phase] }))
  }

  const getInput = (matchId, side) => {
    if (inputs[matchId]?.[side] !== undefined) return inputs[matchId][side]
    const pred = myPredictions[matchId]
    return pred ? String(pred[side]) : ''
  }

  const setInput = (matchId, side, value) => {
    setInputs(prev => ({ ...prev, [matchId]: { ...prev[matchId], [side]: value } }))
  }

  const handleSave = useCallback(async (match) => {
    if (isMatchLocked(match.kickoffUTC)) {
      showToast('Este partido ya está cerrado', 'error')
      return
    }
    const h = inputs[match.id]?.home !== undefined ? inputs[match.id].home : (myPredictions[match.id]?.home ?? '')
    const a = inputs[match.id]?.away !== undefined ? inputs[match.id].away : (myPredictions[match.id]?.away ?? '')
    if (h === '' || a === '' || isNaN(Number(h)) || isNaN(Number(a))) {
      showToast('Ingresa un resultado válido', 'error')
      return
    }
    setSaving(prev => ({ ...prev, [match.id]: true }))
    try {
      await savePrediction(currentUser.uid, match.id, Number(h), Number(a))
      showToast('Pronóstico guardado ✓')
    } catch {
      showToast('Error al guardar', 'error')
    }
    setSaving(prev => ({ ...prev, [match.id]: false }))
  }, [inputs, myPredictions, currentUser, showToast])

  // Lista filtrada y agrupada por fase
  const { filtered, byPhase } = useMemo(() => {
    const list = ALL_MATCHES.filter(m => filter === 'all' || m.group === filter)
    const sorted = filter === 'all'
      ? [...list].sort((a, b) => new Date(a.kickoffUTC) - new Date(b.kickoffUTC))
      : list

    // Agrupar por fase
    const byPhase = {}
    sorted.forEach(m => {
      if (!byPhase[m.phase]) byPhase[m.phase] = []
      byPhase[m.phase].push(m)
    })

    return { filtered: sorted, byPhase }
  }, [filter])

  const renderMatch = (match) => {
    const result = results[match.id]
    const pred = myPredictions[match.id]
    const pts = result && pred ? calcPoints(pred, result, match.knockout) : null
    const max = maxPoints(match.knockout)
    const isPerfect = pts === max
    const isFinished = !!result
    const locked = isMatchLocked(match.kickoffUTC)
    const hasPred = !!pred
    const minsLeft = match.kickoffUTC
      ? Math.floor((new Date(match.kickoffUTC).getTime() - now) / 60000) : null
    const showCountdown = !isFinished && !locked && minsLeft !== null && minsLeft <= 60 && minsLeft > 0
    const clickable = locked || isFinished
    const showCalendar = !isFinished && !locked && match.kickoffUTC
    const isExpanded = expandedMatch === match.id
    const playsToday = !isFinished && isToday(match.kickoffUTC)

    return (
      <div key={match.id}>
        <div
          className={`match-card ${hasPred && !isFinished ? 'has-pred' : ''} ${isFinished ? 'finished' : ''} ${locked && !isFinished ? 'locked' : ''} ${clickable ? 'clickable' : ''} ${isExpanded ? 'expanded' : ''}`}
          onClick={clickable ? () => setExpandedMatch(isExpanded ? null : match.id) : undefined}
        >
          {match.knockout && (
            <div className="knockout-label">
              <span className="badge badge-gold">{match.group === 'FINAL' ? '⭐ FINAL' : match.group}</span>
            </div>
          )}
          {filter === 'all' && !match.knockout && (
            <div className="group-tag">Grupo {match.group}</div>
          )}
          {playsToday && <div className="today-badge">🔴 HOY</div>}

          <div className="match-grid">
            <div className="team home">
              <span className="team-flag">{match.home.flag}</span>
              <span className="team-name">{match.home.name}</span>
            </div>

            <div className="match-center">
              {isFinished ? (
                <>
                  <div className="result-score">{result.home} – {result.away}</div>
                  {pts !== null && (
                    <div className={`pts-earned ${isPerfect ? 'perfect' : ''}`}>
                      +{pts} pts{isPerfect ? ' 🎯' : ''}
                    </div>
                  )}
                  {pred
                    ? <div className="my-pred-label">Tu pronóstico: <strong>{pred.home}–{pred.away}</strong></div>
                    : <div className="no-pred-label">Sin pronóstico</div>
                  }
                  <div className="tap-hint">{isExpanded ? '▲ Ocultar' : '▼ Ver todos los pronósticos'}</div>
                </>
              ) : locked ? (
                <>
                  <div className="lock-icon">🔒</div>
                  <div className="match-datetime">{formatKickoff(match.kickoffUTC)}</div>
                  {match.city && <div className="match-venue">📍 {match.stadium}, {match.city}</div>}
                  {pred
                    ? <div className="my-pred-label">Tu pronóstico: <strong>{pred.home}–{pred.away}</strong></div>
                    : <div className="no-pred-label">Sin pronóstico</div>
                  }
                  <div className="tap-hint">{isExpanded ? '▲ Ocultar' : '▼ Ver pronósticos'}</div>
                </>
              ) : (
                <>
                  <div className="match-datetime">
                    {formatKickoff(match.kickoffUTC)}
                    {showCountdown && <span className="countdown"> · ⏱ {minsLeft} min</span>}
                  </div>
                  {match.city && <div className="match-venue">📍 {match.stadium}, {match.city}</div>}
                  <div className="pred-row">
                    <input
                      className="score-input"
                      type="number" min="0" max="20" inputMode="numeric"
                      value={getInput(match.id, 'home')}
                      onChange={e => setInput(match.id, 'home', e.target.value)}
                      placeholder="0"
                      onClick={e => e.stopPropagation()}
                    />
                    <span className="score-sep">–</span>
                    <input
                      className="score-input"
                      type="number" min="0" max="20" inputMode="numeric"
                      value={getInput(match.id, 'away')}
                      onChange={e => setInput(match.id, 'away', e.target.value)}
                      placeholder="0"
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                  <div className="match-actions">
                    <button
                      className="btn btn-primary btn-sm save-btn"
                      onClick={e => { e.stopPropagation(); handleSave(match) }}
                      disabled={saving[match.id]}
                    >
                      {saving[match.id] ? <span className="spinner" /> : 'Guardar'}
                    </button>
                    {showCalendar && (
                      <a
                        className="btn-calendar"
                        href={makeCalendarUrl(match)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        title="Añadir a Google Calendar"
                      >📅</a>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="team away">
              <span className="team-flag">{match.away.flag}</span>
              <span className="team-name">{match.away.name}</span>
            </div>
          </div>

          {isExpanded && (
            <div onClick={e => e.stopPropagation()}>
              <MatchPredictions
                match={match}
                result={result}
                allPredictions={allPredictions}
                users={users}
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  // Vista filtrada por grupo (sin acordeón de fases)
  if (filter !== 'all') {
    return (
      <div className="matches-page">
        <div className="filter-bar">
          {GROUP_FILTERS.map(f => (
            <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {GROUP_FILTER_LABELS[f] || `Grupo ${f}`}
            </button>
          ))}
        </div>
        {filtered.map(renderMatch)}
        <div style={{ height: '2rem' }} />
      </div>
    )
  }

  // Vista "Todos" — agrupada por fase con acordeón
  const phases = PHASE_ORDER.filter(p => byPhase[p]?.length > 0)

  return (
    <div className="matches-page">
      <div className="filter-bar">
        {GROUP_FILTERS.map(f => (
          <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {GROUP_FILTER_LABELS[f] || `Grupo ${f}`}
          </button>
        ))}
      </div>

      {phases.map(phase => {
        const matches = byPhase[phase]
        const isCollapsed = !!collapsedPhases[phase]
        const label = PHASE_LABELS[phase] || phase
        const total = matches.length
        const finished = matches.filter(m => !!results[m.id]).length
        const allDone = finished === total

        return (
          <div key={phase} className="phase-section">
            <button
              className={`phase-accordion-btn ${isCollapsed ? 'collapsed' : ''} ${allDone ? 'all-done' : ''}`}
              onClick={() => togglePhase(phase)}
            >
              <span className="phase-accordion-label">
                {allDone ? '✅' : '⚽'} {label}
              </span>
              <span className="phase-accordion-meta">
                {finished}/{total} partidos
                <span className="phase-chevron">{isCollapsed ? '▼' : '▲'}</span>
              </span>
            </button>

            {!isCollapsed && (
              <div className="phase-matches">
                {matches.map(renderMatch)}
              </div>
            )}
          </div>
        )
      })}

      <div style={{ height: '2rem' }} />
    </div>
  )
}