import { useState, useCallback } from 'react'
import { ALL_MATCHES, PHASE_LABELS, GROUP_FILTERS, GROUP_FILTER_LABELS, calcPoints, maxPoints } from '../data'
import { savePrediction } from '../firebaseHelpers'
import './MatchesPage.css'

export default function MatchesPage({ currentUser, myPredictions, results, showToast }) {
  const [filter, setFilter] = useState('all')
  const [inputs, setInputs] = useState({}) // { matchId: { home, away } }
  const [saving, setSaving] = useState({})

  const getInput = (matchId, side) => {
    if (inputs[matchId]?.[side] !== undefined) return inputs[matchId][side]
    const pred = myPredictions[matchId]
    return pred ? String(pred[side]) : ''
  }

  const setInput = (matchId, side, value) => {
    setInputs(prev => ({
      ...prev,
      [matchId]: { ...prev[matchId], [side]: value }
    }))
  }

  const handleSave = useCallback(async (match) => {
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

  const filtered = ALL_MATCHES.filter(m =>
    filter === 'all' || m.group === filter
  )

  let currentPhase = ''

  return (
    <div className="matches-page">
      {/* Filter pills */}
      <div className="filter-bar">
        {GROUP_FILTERS.map(f => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {GROUP_FILTER_LABELS[f] || `Grupo ${f}`}
          </button>
        ))}
      </div>

      {/* Matches */}
      {filtered.map(match => {
        const phaseHeader = match.phase !== currentPhase
          ? (currentPhase = match.phase, PHASE_LABELS[match.phase])
          : null

        const result = results[match.id]
        const pred = myPredictions[match.id]
        const pts = result && pred ? calcPoints(pred, result, match.knockout) : null
        const max = maxPoints(match.knockout)
        const isPerfect = pts === max
        const hasPred = !!pred || (inputs[match.id]?.home !== '' && inputs[match.id])
        const isFinished = !!result

        return (
          <div key={match.id}>
            {phaseHeader && (
              <div className="phase-header">{phaseHeader}</div>
            )}

            <div className={`match-card ${hasPred && !isFinished ? 'has-pred' : ''} ${isFinished ? 'finished' : ''}`}>
              {match.knockout && (
                <div className="knockout-label">
                  <span className="badge badge-gold">{match.group === 'FINAL' ? '⭐ FINAL' : match.group}</span>
                </div>
              )}

              <div className="match-grid">
                {/* Home team */}
                <div className="team home">
                  <span className="team-flag">{match.home.flag}</span>
                  <span className="team-name">{match.home.name}</span>
                </div>

                {/* Center */}
                <div className="match-center">
                  {isFinished ? (
                    <>
                      <div className="result-score">{result.home} – {result.away}</div>
                      {pts !== null && (
                        <div className={`pts-earned ${isPerfect ? 'perfect' : ''}`}>
                          +{pts} pts{isPerfect ? ' 🎯' : ''}
                        </div>
                      )}
                      {pred && (
                        <div className="my-pred-label">
                          Tu pronóstico: <strong>{pred.home}–{pred.away}</strong>
                        </div>
                      )}
                      {!pred && (
                        <div className="no-pred-label">Sin pronóstico</div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="match-datetime">{match.date} · {match.time}</div>
                      <div className="pred-row">
                        <input
                          className="score-input"
                          type="number"
                          min="0"
                          max="20"
                          inputMode="numeric"
                          value={getInput(match.id, 'home')}
                          onChange={e => setInput(match.id, 'home', e.target.value)}
                          placeholder="0"
                        />
                        <span className="score-sep">–</span>
                        <input
                          className="score-input"
                          type="number"
                          min="0"
                          max="20"
                          inputMode="numeric"
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

                {/* Away team */}
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
    </div>
  )
}
