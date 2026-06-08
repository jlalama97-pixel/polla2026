import { useState, useCallback, useEffect } from 'react'
import { ALL_MATCHES, PHASE_LABELS, GROUP_FILTERS, GROUP_FILTER_LABELS, calcPoints, maxPoints, isMatchLocked, formatKickoff } from '../data'
import { savePrediction } from '../firebaseHelpers'
import MatchDetail from './MatchDetail'
import './MatchesPage.css'

export default function MatchesPage({ currentUser, myPredictions, results, allPredictions, users, showToast }) {
  const [filter, setFilter] = useState('all')
  const [inputs, setInputs] = useState({})
  const [saving, setSaving] = useState({})
  const [now, setNow] = useState(Date.now())
  const [selectedMatch, setSelectedMatch] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(timer)
  }, [])

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

  const filtered = ALL_MATCHES.filter(m => filter === 'all' || m.group === filter)
  let currentPhase = ''

  return (
    <div className="matches-page">
      <div className="filter-bar">
        {GROUP_FILTERS.map(f => (
          <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {GROUP_FILTER_LABELS[f] || `Grupo ${f}`}
          </button>
        ))}
      </div>

      {filtered.map(match => {
        const phaseHeader = match.phase !== currentPhase
          ? (currentPhase = match.phase, PHASE_LABELS[match.phase]) : null

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

        return (
          <div key={match.id}>
            {phaseHeader && <div className="phase-header">{phaseHeader}</div>}

            <div
              className={`match-card ${hasPred && !isFinished ? 'has-pred' : ''} ${isFinished ? 'finished' : ''} ${locked && !isFinished ? 'locked' : ''} ${clickable ? 'clickable' : ''}`}
              onClick={clickable ? () => setSelectedMatch(match) : undefined}
            >
              {match.knockout && (
                <div className="knockout-label">
                  <span className="badge badge-gold">{match.group === 'FINAL' ? '⭐ FINAL' : match.group}</span>
                </div>
              )}

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
                      <div className="tap-hint">Toca para ver todos los pronósticos</div>
                    </>
                  ) : locked ? (
                    <>
                      <div className="lock-icon">🔒</div>
                      <div className="match-datetime">{formatKickoff(match.kickoffUTC)}</div>
                      {pred
                        ? <div className="my-pred-label">Tu pronóstico: <strong>{pred.home}–{pred.away}</strong></div>
                        : <div className="no-pred-label">Sin pronóstico</div>
                      }
                      <div className="tap-hint">Toca para ver los pronósticos</div>
                    </>
                  ) : (
                    <>
                      <div className="match-datetime">
                        {formatKickoff(match.kickoffUTC)}
                        {showCountdown && <span className="countdown"> · ⏱ {minsLeft} min</span>}
                      </div>
                      <div className="pred-row">
                        <input
                          className="score-input"
                          type="number" min="0" max="20" inputMode="numeric"
                          value={getInput(match.id, 'home')}
                          onChange={e => setInput(match.id, 'home', e.target.value)}
                          placeholder="0"
                        />
                        <span className="score-sep">–</span>
                        <input
                          className="score-input"
                          type="number" min="0" max="20" inputMode="numeric"
                          value={getInput(match.id, 'away')}
                          onChange={e => setInput(match.id, 'away', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-sm save-btn"
                        onClick={() => handleSave(match)}
                        disabled={saving[match.id]}
                      >
                        {saving[match.id] ? <span className="spinner" /> : 'Guardar'}
                      </button>
                    </>
                  )}
                </div>

                <div className="team away">
                  <span className="team-flag">{match.away.flag}</span>
                  <span className="team-name">{match.away.name}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div style={{ height: '2rem' }} />

      {selectedMatch && (
        <MatchDetail
          match={selectedMatch}
          result={results[selectedMatch.id]}
          allPredictions={allPredictions}
          users={users}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  )
}
