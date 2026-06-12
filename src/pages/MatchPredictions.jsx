import { useMemo } from 'react'
import { calcPoints, maxPoints } from '../data'
import './MatchPredictions.css'

export default function MatchPredictions({ match, result, allPredictions, users }) {
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
    <div className="mp-accordion">
      <div className="mp-subtitle">
        {result
          ? `Resultado final · ${max} pts máximo`
          : '🔴 En vivo · los pronósticos se revelan al cerrar el partido'}
      </div>
      <div className="mp-list">
        {entries.length === 0 && (
          <div className="mp-empty">Nadie ha pronosticado este partido</div>
        )}
        {entries.map((e, i) => {
          const isPerfect = e.pts === max
          const noPred = !e.pred
          return (
            <div key={e.uid} className={`mp-row ${isPerfect ? 'perfect' : ''} ${noPred ? 'no-pred' : ''}`}>
              <span className="mp-rank">
                {result ? (i === 0 && e.pts !== null ? '🥇' : i + 1) : '–'}
              </span>
              <span className="mp-username">{e.username}</span>
              <span className="mp-pred">
                {e.pred ? <strong>{e.pred.home} – {e.pred.away}</strong> : <em>sin pronóstico</em>}
              </span>
              <span className="mp-pts">
                {result ? (e.pts !== null ? `+${e.pts}` : '–') : '?'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
