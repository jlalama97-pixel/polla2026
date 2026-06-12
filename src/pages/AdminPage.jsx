import { useState, useMemo } from 'react'
import { ALL_MATCHES, PHASE_LABELS, calcPoints, isMatchLocked, formatKickoff, INVITE_CODE } from '../data'
import { saveResult } from '../firebaseHelpers'
import { fetchLiveResults, matchResultsToFixtures } from '../apiService'
import './AdminPage.css'

export default function AdminPage({ users, allPredictions, results, showToast }) {
  const [resultInputs, setResultInputs] = useState({})
  const [saving, setSaving] = useState({})
  const [syncing, setSyncing] = useState(false)
  const [activeSection, setActiveSection] = useState('pending')

  const setInput = (matchId, side, value) => {
    setResultInputs(prev => ({
      ...prev,
      [matchId]: { ...prev[matchId], [side]: value }
    }))
  }

  const getInput = (matchId, side) => {
    if (resultInputs[matchId]?.[side] !== undefined) return resultInputs[matchId][side]
    const r = results[matchId]
    return r ? String(r[side]) : ''
  }

  const handleSaveResult = async (matchId) => {
    const h = getInput(matchId, 'home')
    const a = getInput(matchId, 'away')
    if (h === '' || a === '' || isNaN(Number(h)) || isNaN(Number(a))) {
      showToast('Ingresa un resultado válido', 'error')
      return
    }
    setSaving(prev => ({ ...prev, [matchId]: true }))
    try {
      await saveResult(matchId, Number(h), Number(a))
      showToast('Resultado guardado ✓')
    } catch {
      showToast('Error al guardar', 'error')
    }
    setSaving(prev => ({ ...prev, [matchId]: false }))
  }

  const handleSyncAPI = async () => {
    setSyncing(true)
    try {
      const apiResults = await fetchLiveResults()
      if (!apiResults) {
        showToast('No se pudo conectar a la fuente de datos', 'error')
        setSyncing(false)
        return
      }
      const fixtures = matchResultsToFixtures(apiResults, ALL_MATCHES)

      // Solo guardar los que NO existen todavía o cambiaron
      let savedCount = 0
      for (const f of fixtures) {
        const current = results[f.matchId]
        if (!current || current.home !== f.home || current.away !== f.away) {
          await saveResult(f.matchId, f.home, f.away)
          savedCount++
        }
      }

      if (savedCount > 0) {
        showToast(`${savedCount} resultado(s) actualizados ✓`)
      } else {
        showToast('Todo ya estaba actualizado ✓')
      }
    } catch (err) {
      showToast('Error al sincronizar', 'error')
    }
    setSyncing(false)
  }

  const copyInvite = () => {
    navigator.clipboard.writeText(INVITE_CODE)
    showToast(`Código copiado: ${INVITE_CODE}`)
  }

  const pendingMatches = useMemo(() => {
    const now = Date.now()
    return ALL_MATCHES.filter(m => {
      if (results[m.id]) return false
      if (!m.kickoffUTC) return false
      const kickoff = new Date(m.kickoffUTC).getTime()
      return kickoff - now < 2 * 60 * 60 * 1000
    }).sort((a, b) => new Date(a.kickoffUTC) - new Date(b.kickoffUTC))
  }, [results])

  const userList = useMemo(() => {
    return Object.entries(users).map(([uid, profile]) => {
      const preds = allPredictions[uid] || {}
      let total = 0, count = 0
      ALL_MATCHES.forEach(m => {
        const result = results[m.id]
        const pred = preds[m.id]
        if (result && pred) {
          total += calcPoints(pred, result, m.knockout)
          count++
        }
      })
      const predCount = Object.keys(preds).length
      return { uid, username: profile.username, total, scored: count, predicted: predCount }
    }).sort((a, b) => b.total - a.total)
  }, [users, allPredictions, results])

  const renderMatchRow = (match) => {
    const locked = isMatchLocked(match.kickoffUTC)
    const hasResult = !!results[match.id]
    return (
      <div key={match.id} className={`admin-match-row ${hasResult ? 'done' : ''}`}>
        <div className="admin-match-teams">
          <span>{match.home.flag} {match.home.name}</span>
          <span className="vs">vs</span>
          <span>{match.away.name} {match.away.flag}</span>
        </div>
        <div className="admin-match-meta">
          {formatKickoff(match.kickoffUTC)}
          {locked && !hasResult && <span className="badge-live">EN VIVO / TERMINADO</span>}
          {hasResult && <span className="badge-done">✓ Guardado</span>}
        </div>
        <div className="admin-match-inputs">
          <input
            className="admin-score-input"
            type="number" min="0" max="20" inputMode="numeric"
            value={getInput(match.id, 'home')}
            onChange={e => setInput(match.id, 'home', e.target.value)}
            placeholder="–"
          />
          <span className="score-sep">–</span>
          <input
            className="admin-score-input"
            type="number" min="0" max="20" inputMode="numeric"
            value={getInput(match.id, 'away')}
            onChange={e => setInput(match.id, 'away', e.target.value)}
            placeholder="–"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSaveResult(match.id)}
            disabled={saving[match.id]}
          >
            {saving[match.id] ? <span className="spinner" /> : 'Guardar'}
          </button>
        </div>
      </div>
    )
  }

  const sections = [
    { id: 'pending', label: `⏱️ Pendientes${pendingMatches.length ? ` (${pendingMatches.length})` : ''}` },
    { id: 'results', label: '⚽ Todos los partidos' },
    { id: 'users', label: '👥 Usuarios' },
    { id: 'invite', label: '🔗 Invitación' },
  ]

  return (
    <div className="admin-page">
      <div className="sync-bar">
        <button className="btn btn-primary btn-sm" onClick={handleSyncAPI} disabled={syncing}>
          {syncing ? <><span className="spinner" /> Sincronizando...</> : '🔄 Sincronizar resultados'}
        </button>
        <span className="sync-note">Fuente: openfootball (actualiza ~1 vez al día)</span>
      </div>

      <div className="admin-tabs">
        {sections.map(s => (
          <button
            key={s.id}
            className={`admin-tab-btn ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {activeSection === 'pending' && (
        <div>
          <p className="section-desc">
            Partidos que ya empezaron o están a punto de empezar y aún no tienen resultado guardado.
            Puedes sincronizar arriba o ingresarlos manualmente.
          </p>
          {pendingMatches.length === 0 && (
            <div className="admin-empty">🎉 No hay partidos pendientes por ahora.</div>
          )}
          {pendingMatches.map(renderMatchRow)}
        </div>
      )}

      {activeSection === 'results' && (
        <div>
          <p className="section-desc">Ingresa los resultados de cada partido (solo 90 min reglamentarios).</p>
          {ALL_MATCHES.map(renderMatchRow)}
        </div>
      )}

      {activeSection === 'users' && (
        <div>
          <p className="section-desc">{userList.length} participantes registrados.</p>
          {userList.map(u => (
            <div className="admin-user-row" key={u.uid}>
              <div>
                <div className="admin-username">{u.username}</div>
                <div className="admin-user-meta">{u.predicted} pronósticos · {u.scored} partidos jugados</div>
              </div>
              <div className="admin-user-pts">{u.total} pts</div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'invite' && (
        <div>
          <p className="section-desc">Comparte este código con tus amigos para que puedan registrarse.</p>
          <div className="invite-box">
            <div className="invite-code">{INVITE_CODE}</div>
            <button className="btn btn-primary" onClick={copyInvite}>Copiar código</button>
          </div>
        </div>
      )}
    </div>
  )
}