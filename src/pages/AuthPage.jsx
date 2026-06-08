import { useState, useEffect } from 'react'
import { signInWithGoogle, checkUserRegistered, completeRegistration, logoutUser } from '../firebaseHelpers'
import './AuthPage.css'

export default function AuthPage() {
  const [step, setStep] = useState('login')
  const [pendingUser, setPendingUser] = useState(null)
  const [inviteCode, setInviteCode] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Si hay un pendingUser, verificamos Firestore con reintento
  // porque a veces Firebase Auth devuelve el usuario antes
  // de que Firestore esté listo para responder
  useEffect(() => {
    if (!pendingUser) return
    let cancelled = false
    let attempts = 0

    async function verify() {
      while (attempts < 5 && !cancelled) {
        attempts++
        try {
          const profile = await checkUserRegistered(pendingUser.uid)
          if (cancelled) return
          if (profile) {
            // Ya tiene perfil — App.jsx lo detectará automáticamente
            return
          } else {
            // No tiene perfil — pedir código y nombre
            setStep('register')
            return
          }
        } catch {
          // Firestore aún no responde, esperar 500ms y reintentar
          await new Promise(r => setTimeout(r, 500))
        }
      }
      if (!cancelled) setStep('register')
    }

    verify()
    return () => { cancelled = true }
  }, [pendingUser])

  async function handleGoogleSignIn() {
    setError('')
    setLoading(true)
    try {
      const user = await signInWithGoogle()
      setPendingUser(user)
      // El useEffect se encarga de verificar Firestore
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Cerraste la ventana de Google. Inténtalo de nuevo.')
      } else {
        setError('Error al iniciar sesión con Google. Inténtalo de nuevo.')
      }
      setLoading(false)
    }
  }

  async function handleCompleteRegistration(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await completeRegistration(pendingUser.uid, inviteCode.trim(), username.trim())
      // App.jsx detectará el cambio automáticamente
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  async function handleCancelRegister() {
    await logoutUser()
    setPendingUser(null)
    setStep('login')
    setInviteCode('')
    setUsername('')
    setError('')
    setLoading(false)
  }

  // Pantalla de carga mientras verificamos Firestore
  if (pendingUser && step === 'login') {
    return (
      <div className="auth-bg">
        <div className="auth-glow" />
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <div className="auth-logo">
            <h1>POLLA 2026</h1>
          </div>
          <div className="spinner" style={{ width: 32, height: 32, margin: '1rem auto' }} />
          <p style={{ color: 'var(--text2)', fontSize: 14 }}>Verificando tu cuenta...</p>
        </div>
      </div>
    )
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

        {step === 'login' && (
          <div className="login-section">
            <p className="login-desc">
              Entra con tu cuenta de Google para participar en la polla mundialista con tus amigos.
            </p>
            <button className="btn-google" onClick={handleGoogleSignIn} disabled={loading}>
              {loading ? <span className="spinner" /> : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Entrar con Google
                </>
              )}
            </button>
            <p className="login-note">Solo pueden entrar quienes tengan el código de invitación.</p>
          </div>
        )}

        {step === 'register' && (
          <form onSubmit={handleCompleteRegistration}>
            <div className="register-welcome">
              👋 Hola <strong>{pendingUser?.displayName?.split(' ')[0]}</strong>, un paso más para unirte.
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
              onClick={handleCancelRegister}
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
