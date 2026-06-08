import { useMemo } from 'react'
import { calcPoints, maxPoints } from '../data'
import './MatchDetail.css'

export default function MatchDetail({ match, result, allPredictions, users, onClose }) {
  const entries = useMemo(() => {
    return Object.entries(users).map(([uid, profile]) => {
      const pred = allPredictions[uid]?.[match.id]
      const pts = result && pred ? calcPoints(pred, result, match.knockout) : null
      return { uid, username: profile.username, pred, pts }
    })
    .sort((a, b) => {
      if (a.pts === null && b.pts === null) return 0
      if (a.pts === null) return 1
      if (b.pts === null) return -1
      return b.pts - a.pts
    })
  }, [users, allPredictions, match, result])

  const max = maxPoints(match.knockout)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Match header */}
        <div className="md-header">
          {match.knockout && (
            <div className="md-phase">{match.group === 'FINAL' ? '⭐ FINAL' : match.group}</div>
          )}
          <div className="md-teams">
            <div className="md-team">
              <span className="md-flag">{match.home.flag}</span>
              <span className="md-name">{match.home.name}</span>
            </div>
            {result ? (
              <div className="md-result">{result.home} – {result.away}</div>
            ) : (
              <div className="md-vs">🔒</div>
            )}
            <div className="md-team">
              <span className="md-flag">{match.away.flag}</span>
              <span className="md-name">{match.away.name}</span>
            </div>
          </div>
          {result && (
            <div className="md-subtitle">Resultado final · {max} pts máximo</div>
          )}
          {!result && (
            <div className="md-subtitle">Partido cerrado · los pronósticos se revelan al terminar</div>
          )}
        </div>

        {/* Predictions list */}
        <div className="md-list">
          {entries.map((e, i) => {
            const isPerfect = e.pts === max
            const noPred = !e.pred
            return (
              <div key={e.uid} className={`md-row ${isPerfect ? 'perfect' : ''} ${noPred ? 'no-pred' : ''}`}>
                <span className="md-rank">
                  {result
                    ? (i === 0 && e.pts !== null ? '🥇' : i + 1)
                    : '–'
                  }
                </span>
                <span className="md-username">{e.username}</span>
                <span className="md-pred">
                  {e.pred
                    ? <strong>{e.pred.home} – {e.pred.away}</strong>
                    : <em>sin pronóstico</em>
                  }
                </span>
                <span className="md-pts">
                  {result
                    ? (e.pts !== null ? `+${e.pts}` : '–')
                    : '?'
                  }
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
