import { useState } from 'react'
import { completeRegistration } from '../firebaseHelpers'
import './AuthPage.css'

export default function CompleteProfile({ user, onComplete, onLogout }) {
  const [inviteCode, setInviteCode] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await completeRegistration(user.uid, inviteCode.trim(), username.trim())
      await onComplete()
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="auth-bg">
      <div className="auth-glow" />
      <div className="auth-card">
        <div className="auth-logo">
          <h1>POLLA 2026</h1>
          <p>MUNDIAL DE FÚTBOL</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="register-welcome">
            👋 Hola <strong>{user?.displayName?.split(' ')[0]}</strong>, un paso más para unirte.
          </div>
          <div className="input-group">
            <label>Código de invitación</label>
            <input
              type="text"
              placeholder="MUNDIAL26"
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
              style={{ textTransform: 'uppercase', letterSpacing: '3px' }}
              autoCapitalize="characters"
              required
            />
          </div>
          <div className="input-group">
            <label>Tu nombre en la tabla</label>
            <input
              type="text"
              placeholder="ej: Juancho, ElProfe, Messi..."
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoCapitalize="none"
              required
            />
            <span className="input-hint">Así aparecerás en el ranking</span>
          </div>
          <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Unirse a la Polla 🏆'}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-full"
            style={{ marginTop: 8 }}
            onClick={onLogout}
          >
            Cancelar y salir
          </button>
        </form>
      </div>
    </div>
  )
}
