import { useMemo } from 'react'
import { ALL_MATCHES, calcPoints, maxPoints } from '../data'
import './LeaderboardPage.css'

export default function LeaderboardPage({ users, allPredictions, results, currentUser }) {
  const ranked = useMemo(() => {
    return Object.entries(users).map(([uid, profile]) => {
      const preds = allPredictions[uid] || {}
      let total = 0, exact = 0, partial = 0, predicted = 0

      ALL_MATCHES.forEach(m => {
        const result = results[m.id]
        const pred = preds[m.id]
        if (result && pred) {
          const pts = calcPoints(pred, result, m.knockout)
          total += pts
          if (pts === maxPoints(m.knockout)) exact++
          else if (pts > 0) partial++
          predicted++
        }
      })

      return { uid, username: profile.username, total, exact, partial, predicted }
    }).sort((a, b) => b.total - a.total || b.exact - a.exact)
  }, [users, allPredictions, results])

  const myStats = ranked.find(u => u.uid === currentUser?.uid)
  const myRank = ranked.findIndex(u => u.uid === currentUser?.uid) + 1

  return (
    <div className="lb-page">
      {/* My stats summary */}
      {myStats && (
        <div className="my-stats-grid">
          {[
            ['Posición', `#${myRank}`],
            ['Puntos', myStats.total],
            ['Perfectos', myStats.exact],
            ['Pronóst.', myStats.predicted],
          ].map(([label, value]) => (
            <div className="stat-card" key={label}>
              <div className="stat-label">{label}</div>
              <div className="stat-value">{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* Leaderboard table */}
      <div className="lb-table">
        <div className="lb-header">
          <span>#</span>
          <span>Usuario</span>
          <span className="text-center">Puntos</span>
          <span className="text-center hide-xs">Exactos</span>
          <span className="text-center hide-sm">Pronóst.</span>
        </div>

        {ranked.length === 0 && (
          <div className="empty-state">
            <div>⚽</div>
            <p>Aún no hay participantes</p>
          </div>
        )}

        {ranked.map((u, i) => {
          const isMe = u.uid === currentUser?.uid
          const rankIcon = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1
          return (
            <div className={`lb-row ${isMe ? 'is-me' : ''}`} key={u.uid}>
              <span className={`lb-rank rank-${Math.min(i + 1, 4)}`}>{rankIcon}</span>
              <span className="lb-username">
                {u.username}
                {isMe && <span className="you-badge">tú</span>}
              </span>
              <span className="lb-pts text-center">{u.total}</span>
              <span className="lb-num text-center hide-xs">{u.exact}</span>
              <span className="lb-num text-center hide-sm">{u.predicted}</span>
            </div>
          )
        })}
      </div>

      <div className="lb-footer">
        <p>Los puntos se actualizan en tiempo real al terminar cada partido</p>
      </div>
    </div>
  )
}
