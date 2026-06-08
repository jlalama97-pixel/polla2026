import { useState, useEffect, useCallback, useRef } from 'react'
import {
  onUserChange, getUserProfile, getUserPredictions,
  subscribeToResults, subscribeToAllPredictions, subscribeToUsers,
  logoutUser,
} from './firebaseHelpers'
import { ADMIN_USERS } from './data'
import AuthPage from './pages/AuthPage'
import LeaderboardPage from './pages/LeaderboardPage'
import MatchesPage from './pages/MatchesPage'
import RulesPage from './pages/RulesPage'
import AdminPage from './pages/AdminPage'
import './App.css'

const TABS = [
  { id: 'leaderboard', label: '🏆 Tabla' },
  { id: 'matches', label: '⚽ Partidos' },
  { id: 'rules', label: '📋 Reglas' },
]

export default function App() {
  const [user, setUser] = useState(undefined) // undefined = loading
  const [profile, setProfile] = useState(null)
  const [activeTab, setActiveTab] = useState('leaderboard')
  const [myPredictions, setMyPredictions] = useState({})
  const [allPredictions, setAllPredictions] = useState({})
  const [results, setResults] = useState({})
  const [users, setUsers] = useState({})
  const [toast, setToast] = useState({ msg: '', show: false, type: 'success' })
  const toastTimer = useRef(null)

  // Auth listener
  useEffect(() => {
    return onUserChange(async (firebaseUser) => {
      if (firebaseUser) {
        const p = await getUserProfile(firebaseUser.uid)
        setProfile(p)
        setUser(firebaseUser)
        // Load own predictions
        const preds = await getUserPredictions(firebaseUser.uid)
        setMyPredictions(preds)
      } else {
        setUser(null)
        setProfile(null)
      }
    })
  }, [])

  // Real-time subscriptions (when logged in)
  useEffect(() => {
    if (!user) return
    const unsubResults = subscribeToResults(setResults)
    const unsubPreds = subscribeToAllPredictions(setAllPredictions)
    const unsubUsers = subscribeToUsers(setUsers)
    return () => { unsubResults(); unsubPreds(); unsubUsers() }
  }, [user])

  // Keep myPredictions in sync with allPredictions
  useEffect(() => {
    if (user && allPredictions[user.uid]) {
      setMyPredictions(allPredictions[user.uid])
    }
  }, [allPredictions, user])

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, show: true, type })
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3000)
  }, [])

  const isAdmin = profile?.isAdmin || ADMIN_USERS.includes(profile?.usernameLower || '')

  const tabs = isAdmin
    ? [...TABS, { id: 'admin', label: '⚙️ Admin' }]
    : TABS

  // Loading state
  if (user === undefined) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: '1rem' }}>
        <div className="spinner" style={{ width: 32, height: 32 }} />
        <div style={{ color: 'var(--text3)', fontSize: 14 }}>Cargando...</div>
      </div>
    )
  }

  // Not logged in
  if (!user) return <AuthPage />

  return (
    <div className="app-layout">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-logo">POLLA 2026</div>
        <div className="topbar-right">
          <span className="topbar-user">
            {profile?.username || user.displayName}
          </span>
          <button className="btn btn-ghost btn-sm" onClick={() => logoutUser()}>
            Salir
          </button>
        </div>
      </header>

      {/* Nav tabs */}
      <nav className="nav-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Page content */}
      <main className="main-content">
        {activeTab === 'leaderboard' && (
          <LeaderboardPage
            users={users}
            allPredictions={allPredictions}
            results={results}
            currentUser={user}
          />
        )}
        {activeTab === 'matches' && (
          <MatchesPage
            currentUser={user}
            myPredictions={myPredictions}
            results={results}
            allPredictions={allPredictions}
            users={users}
            showToast={showToast}
          />
        )}
        {activeTab === 'rules' && <RulesPage />}
        {activeTab === 'admin' && isAdmin && (
          <AdminPage
            users={users}
            allPredictions={allPredictions}
            results={results}
            showToast={showToast}
          />
        )}
      </main>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''} ${toast.type === 'error' ? 'toast-error' : ''}`}>
        {toast.msg}
      </div>
    </div>
  )
}
