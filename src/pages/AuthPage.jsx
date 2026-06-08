import { useState } from 'react'
import { registerUser, loginUser } from '../firebaseHelpers'
import './AuthPage.css'

export default function AuthPage() {
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Login state
  const [loginUser_, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')

  // Register state
  const [regCode, setRegCode] = useState('')
  const [regUser, setRegUser] = useState('')
  const [regPass, setRegPass] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginUser(loginUser_.trim(), loginPass)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  async function handleRegister(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerUser(regCode.trim(), regUser.trim(), regPass)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="auth-bg">
      <div className="auth-glow" />
      <div className="auth-card">
        <div className="auth-logo">
          <h1>POLLA 2026</h1>
          <p>MUNDIAL DE FÚTBOL</p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => { setTab('login'); setError('') }}>
            Ingresar
          </button>
          <button className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => { setTab('register'); setError('') }}>
            Registrarse
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Usuario</label>
              <input
                type="text"
                placeholder="tu_usuario"
                value={loginUser_}
                onChange={e => setLoginUser(e.target.value)}
                autoCapitalize="none"
                required
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Ingresar al Torneo'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Código de invitación</label>
              <input
                type="text"
                placeholder="MUNDIAL26"
                value={regCode}
                onChange={e => setRegCode(e.target.value)}
                style={{ textTransform: 'uppercase', letterSpacing: '3px' }}
                autoCapitalize="characters"
                required
              />
            </div>
            <div className="input-group">
              <label>Elige tu usuario</label>
              <input
                type="text"
                placeholder="tu_usuario"
                value={regUser}
                onChange={e => setRegUser(e.target.value)}
                autoCapitalize="none"
                required
              />
            </div>
            <div className="input-group">
              <label>Contraseña (mín. 6 caracteres)</label>
              <input
                type="password"
                placeholder="••••••••"
                value={regPass}
                onChange={e => setRegPass(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Unirse a la Polla'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
