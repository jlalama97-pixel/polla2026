// ─────────────────────────────────────────────────────
// FUNCIONES PARA INTERACTUAR CON FIREBASE
// Auth: login, registro, logout
// Firestore: guardar/leer pronósticos y resultados
// ─────────────────────────────────────────────────────
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { auth, db } from './firebase'
import { INVITE_CODE, ADMIN_USERS } from './data'

// ── AUTH ─────────────────────────────────────────────

export function onUserChange(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function registerUser(inviteCode, username, password) {
  if (inviteCode.toUpperCase() !== INVITE_CODE) {
    throw new Error('Código de invitación incorrecto')
  }
  if (username.length < 3) {
    throw new Error('El usuario debe tener al menos 3 caracteres')
  }
  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres')
  }
  // Check username not taken
  const snap = await getDoc(doc(db, 'usernames', username.toLowerCase()))
  if (snap.exists()) throw new Error('Ese usuario ya está en uso')

  // Create auth account (Firebase needs email, we fake it)
  const fakeEmail = `${username.toLowerCase()}@polla2026.app`
  const cred = await createUserWithEmailAndPassword(auth, fakeEmail, password)

  // Save display name
  await updateProfile(cred.user, { displayName: username })

  // Save user profile in Firestore
  await setDoc(doc(db, 'users', cred.user.uid), {
    username: username,
    usernameLower: username.toLowerCase(),
    isAdmin: ADMIN_USERS.includes(username.toLowerCase()),
    createdAt: serverTimestamp(),
  })

  // Reserve username
  await setDoc(doc(db, 'usernames', username.toLowerCase()), {
    uid: cred.user.uid,
  })

  return cred.user
}

export async function loginUser(username, password) {
  const fakeEmail = `${username.toLowerCase()}@polla2026.app`
  try {
    const cred = await signInWithEmailAndPassword(auth, fakeEmail, password)
    return cred.user
  } catch {
    throw new Error('Usuario o contraseña incorrectos')
  }
}

export async function logoutUser() {
  await signOut(auth)
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

// ── PREDICTIONS ──────────────────────────────────────

export async function savePrediction(uid, matchId, home, away) {
  await setDoc(doc(db, 'predictions', `${uid}_${matchId}`), {
    uid,
    matchId,
    home: Number(home),
    away: Number(away),
    savedAt: serverTimestamp(),
  })
}

export async function getUserPredictions(uid) {
  const snap = await getDocs(
    query(collection(db, 'predictions'))
  )
  const preds = {}
  snap.forEach(d => {
    const data = d.data()
    if (data.uid === uid) {
      preds[data.matchId] = { home: data.home, away: data.away }
    }
  })
  return preds
}

export function subscribeToResults(callback) {
  return onSnapshot(collection(db, 'results'), snap => {
    const results = {}
    snap.forEach(d => {
      results[d.id] = d.data()
    })
    callback(results)
  })
}

export function subscribeToAllPredictions(callback) {
  return onSnapshot(collection(db, 'predictions'), snap => {
    const all = {}
    snap.forEach(d => {
      const data = d.data()
      if (!all[data.uid]) all[data.uid] = {}
      all[data.uid][data.matchId] = { home: data.home, away: data.away }
    })
    callback(all)
  })
}

export function subscribeToUsers(callback) {
  return onSnapshot(collection(db, 'users'), snap => {
    const users = {}
    snap.forEach(d => {
      users[d.id] = d.data()
    })
    callback(users)
  })
}

// ── RESULTS (Admin only) ─────────────────────────────

export async function saveResult(matchId, home, away) {
  await setDoc(doc(db, 'results', String(matchId)), {
    home: Number(home),
    away: Number(away),
    updatedAt: serverTimestamp(),
  })
}
