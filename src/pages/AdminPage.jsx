import { useState, useMemo } from 'react'
import { ALL_MATCHES, PHASE_LABELS, calcPoints } from '../data'
import { saveResult } from '../firebaseHelpers'
import { fetchLiveResults } from '../apiService'
import { INVITE_CODE } from '../data'
import './AdminPage.css'

export default function AdminPage({ users, allPredictions, results, showToast }) {
  const [resultInputs, setResultInputs] = useState({})
  const [saving, setSaving] = useState({})
  const [syncing, setSyncing] = useState(false)
  const [activeSection, setActiveSection] = useState('results')

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
      const liveResults = await fetchLiveResults()
      if (!liveResults) {
        showToast('No se pudo conectar a la API', 'error')
        return
      }
      showToast(`Sincronizados ${liveResults.length} partidos ✓`)
    } catch {
      showToast('Error al sincronizar', 'error')
    }
    setSyncing(false)
  }

  const copyInvite = () => {
    navigator.clipboard.writeText(INVITE_CODE)
    showToast(`Código copiado: ${INVITE_CODE}`)
  }

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

  const sections = [
    { id: 'results', label: '⚽ Resultados' },
    { id: 'users', label: '👥 Usuarios' },
    { id: 'invite', label: '🔗 Invitación' },
    { id: 'api', label: '🔄 API' },
  ]

  return (
    <div className="admin-page">
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

      {/* RESULTS */}
      {activeSection === 'results' && (
        <div>
          <p className="section-desc">Ingresa los resultados de cada partido (solo 90 min reglamentarios).</p>
          {ALL_MATCHES.map(match => (
            <div key={match.id} className="admin-match-row">
              <div className="admin-match-teams">
                <span>{match.home.flag} {match.home.name}</span>
                <span className="vs">vs</span>
                <span>{match.away.name} {match.away.flag}</span>
              </div>
              <div className="admin-match-inputs">
                <input
                  className="admin-score-input"
                  type="number" min="0" max="20"
                  inputMode="numeric"
                  value={getInput(match.id, 'home')}
                  onChange={e => setInput(match.id, 'home', e.target.value)}
                  placeholder="–"
                />
                <span className="score-sep">–</span>
                <input
                  className="admin-score-input"
                  type="number" min="0" max="20"
                  inputMode="numeric"
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
          ))}
        </div>
      )}

      {/* USERS */}
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

      {/* INVITE */}
      {activeSection === 'invite' && (
        <div>
          <p className="section-desc">Comparte este código con tus amigos para que puedan registrarse.</p>
          <div className="invite-box">
            <div className="invite-code">{INVITE_CODE}</div>
            <button className="btn btn-primary" onClick={copyInvite}>Copiar código</button>
          </div>
          <div className="invite-tip">
            💡 Cuando alguien se registre, solo necesita ir a la web y elegir "Registrarse" con este código.
          </div>
        </div>
      )}

      {/* API */}
      {activeSection === 'api' && (
        <div>
          <p className="section-desc">
            La app usa <strong>football-data.org</strong> para obtener resultados automáticamente.
            Cuando empiece el Mundial, puedes sincronizar todos los resultados de los partidos terminados con un click.
          </p>
          <button
            className="btn btn-primary"
            onClick={handleSyncAPI}
            disabled={syncing}
          >
            {syncing ? <><span className="spinner" /> Sincronizando...</> : '🔄 Sincronizar resultados desde API'}
          </button>
          <div className="api-note">
            <strong>Nota:</strong> La API funciona automáticamente una vez que configures tu API key en el archivo <code>.env</code> (ver guía de instalación).
          </div>
        </div>
      )}
    </div>
  )
}
