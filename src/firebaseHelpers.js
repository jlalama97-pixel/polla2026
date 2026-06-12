import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
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
  where,
} from 'firebase/firestore'
import { auth, db } from './firebase'
import { INVITE_CODE, ADMIN_USERS } from './data'

const googleProvider = new GoogleAuthProvider()

// ── AUTH ─────────────────────────────────────────────

export function onUserChange(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider)
  return cred.user
}

export async function logoutUser() {
  await signOut(auth)
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

// Returns null if not registered, profile if registered
export async function checkUserRegistered(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export async function completeRegistration(uid, inviteCode, username) {
  if (inviteCode.toUpperCase() !== INVITE_CODE) {
    throw new Error('Código de invitación incorrecto')
  }
  if (username.length < 3) {
    throw new Error('El usuario debe tener al menos 3 caracteres')
  }

  // Check username not taken
  const snap = await getDoc(doc(db, 'usernames', username.toLowerCase()))
  if (snap.exists()) throw new Error('Ese nombre de usuario ya está en uso')

  await setDoc(doc(db, 'users', uid), {
    username,
    usernameLower: username.toLowerCase(),
    isAdmin: ADMIN_USERS.includes(username.toLowerCase()),
    createdAt: serverTimestamp(),
  })

  await setDoc(doc(db, 'usernames', username.toLowerCase()), { uid })
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
    query(collection(db, 'predictions'), where('uid', '==', uid))
  )
  const preds = {}
  snap.forEach(d => {
    const data = d.data()
    preds[data.matchId] = { home: data.home, away: data.away }
  })
  return preds
}

export function subscribeToResults(callback) {
  return onSnapshot(collection(db, 'results'), snap => {
    const results = {}
    snap.forEach(d => { results[d.id] = d.data() })
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
    snap.forEach(d => { users[d.id] = d.data() })
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