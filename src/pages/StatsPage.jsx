import { useMemo } from 'react'
import { ALL_MATCHES, calcPoints, maxPoints } from '../data'
import './StatsPage.css'

function StatCard({ title, emoji, rows }) {
  return (
    <div className="stat-card-block">
      <div className="stat-card-title">{emoji} {title}</div>
      {rows.length === 0 && <div className="stat-empty">Sin datos aún</div>}
      {rows.map((row, i) => (
        <div className="stat-row" key={row.username}>
          <span className="stat-pos">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
          <span className="stat-name">{row.username}</span>
          <span className="stat-val">{row.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function StatsPage({ users, allPredictions, results }) {
  const stats = useMemo(() => {
    const finishedMatches = ALL_MATCHES.filter(m => results[m.id])

    if (finishedMatches.length === 0) return null

    const userStats = Object.entries(users).map(([uid, profile]) => {
      const preds = allPredictions[uid] || {}
      let perfectScores = 0
      let correctWinners = 0
      let correctDraws = 0
      let totalGoalsPredicted = 0
      let totalGoalsReal = 0
      let goalsExact = 0
      let totalPts = 0
      let played = 0

      finishedMatches.forEach(m => {
        const pred = preds[m.id]
        const result = results[m.id]
        if (!pred || !result) return

        played++
        const pts = calcPoints(pred, result, m.knockout)
        const max = maxPoints(m.knockout)
        totalPts += pts

        // Resultado exacto
        if (pts === max) perfectScores++

        // Ganador correcto
        const predW = pred.home > pred.away ? 'H' : pred.home < pred.away ? 'A' : 'D'
        const resW  = result.home > result.away ? 'H' : result.home < result.away ? 'A' : 'D'
        if (predW === resW) correctWinners++
        if (resW === 'D' && predW === 'D') correctDraws++

        // Goles
        totalGoalsPredicted += Number(pred.home) + Number(pred.away)
        totalGoalsReal += Number(result.home) + Number(result.away)
        if (Number(pred.home) === Number(result.home)) goalsExact++
        if (Number(pred.away) === Number(result.away)) goalsExact++
      })

      const winnerPct = played > 0 ? Math.round((correctWinners / played) * 100) : 0
      const avgGoalDiff = played > 0
        ? Math.abs((totalGoalsPredicted / played) - (totalGoalsReal / played)).toFixed(1)
        : '-'

      return {
        uid,
        username: profile.username,
        perfectScores,
        correctWinners,
        winnerPct,
        correctDraws,
        goalsExact,
        totalPts,
        played,
        avgGoalDiff,
        totalGoalsPredicted,
      }
    }).filter(u => u.played > 0)

    if (userStats.length === 0) return null

    return {
      // Más pronósticos perfectos
      perfectScores: [...userStats]
        .sort((a, b) => b.perfectScores - a.perfectScores)
        .map(u => ({ username: u.username, value: `${u.perfectScores} perfectos` })),

      // Mejor % acierto de ganador
      winnerPct: [...userStats]
        .sort((a, b) => b.winnerPct - a.winnerPct)
        .map(u => ({ username: u.username, value: `${u.winnerPct}%` })),

      // Más empates acertados
      correctDraws: [...userStats]
        .sort((a, b) => b.correctDraws - a.correctDraws)
        .map(u => ({ username: u.username, value: `${u.correctDraws} empates` })),

      // Más goles exactos (local o visitante)
      goalsExact: [...userStats]
        .sort((a, b) => b.goalsExact - a.goalsExact)
        .map(u => ({ username: u.username, value: `${u.goalsExact} goles exactos` })),

      // Más optimista (más goles pronosticados)
      optimist: [...userStats]
        .sort((a, b) => b.totalGoalsPredicted - a.totalGoalsPredicted)
        .map(u => ({ username: u.username, value: `${u.totalGoalsPredicted} goles pred.` })),

      // Más conservador (menos goles pronosticados)
      conservative: [...userStats]
        .sort((a, b) => a.totalGoalsPredicted - b.totalGoalsPredicted)
        .map(u => ({ username: u.username, value: `${u.totalGoalsPredicted} goles pred.` })),

      // Más puntos totales
      topScorer: [...userStats]
        .sort((a, b) => b.totalPts - a.totalPts)
        .map(u => ({ username: u.username, value: `${u.totalPts} pts` })),

      totalFinished: finishedMatches.length,
    }
  }, [users, allPredictions, results])

  if (!stats) {
    return (
      <div className="stats-page">
        <div className="stats-empty">
          <div className="stats-empty-icon">📊</div>
          <h2>Las estadísticas aparecerán aquí</h2>
          <p>Una vez que terminen los primeros partidos del Mundial podrás ver quién predice mejor, quién acierta más empates, y mucho más.</p>
          <p className="stats-date">El Mundial empieza el <strong>11 de junio de 2026</strong></p>
        </div>
      </div>
    )
  }

  return (
    <div className="stats-page">
      <div className="stats-header">
        Basado en <strong>{stats.totalFinished}</strong> {stats.totalFinished === 1 ? 'partido terminado' : 'partidos terminados'}
      </div>

      <div className="stats-grid">
        <StatCard
          title="Más pronósticos perfectos"
          emoji="🎯"
          rows={stats.perfectScores}
        />
        <StatCard
          title="Mejor acierto de ganador"
          emoji="🏆"
          rows={stats.winnerPct}
        />
        <StatCard
          title="Más empates acertados"
          emoji="🤝"
          rows={stats.correctDraws}
        />
        <StatCard
          title="Más goles exactos"
          emoji="⚽"
          rows={stats.goalsExact}
        />
        <StatCard
          title="El más goleador"
          emoji="🔥"
          rows={stats.optimist}
        />
        <StatCard
          title="El más conservador"
          emoji="🧱"
          rows={stats.conservative}
        />
      </div>
    </div>
  )
}
