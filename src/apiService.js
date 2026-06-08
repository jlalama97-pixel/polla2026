// ─────────────────────────────────────────────────────
// INTEGRACIÓN CON football-data.org
// API gratuita para resultados del Mundial 2026
// Registro en: https://www.football-data.org/
// ─────────────────────────────────────────────────────

// ⚠️  PON TU API KEY AQUÍ (o en .env como VITE_FOOTBALL_API_KEY)
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY || 'TU_API_KEY_AQUI'
const BASE_URL = 'https://api.football-data.org/v4'

// ID del Mundial 2026 en football-data.org (se actualiza cuando lo publiquen)
const WORLD_CUP_ID = 2000

export async function fetchLiveResults() {
  try {
    const res = await fetch(`${BASE_URL}/competitions/${WORLD_CUP_ID}/matches`, {
      headers: { 'X-Auth-Token': API_KEY },
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()
    return parseMatches(data.matches)
  } catch (err) {
    console.error('Error fetching results:', err)
    return null
  }
}

function parseMatches(apiMatches) {
  // Convierte formato API → formato nuestro
  return apiMatches
    .filter(m => m.status === 'FINISHED')
    .map(m => ({
      apiId: m.id,
      homeTeam: m.homeTeam.name,
      awayTeam: m.awayTeam.name,
      home: m.score.fullTime.home,
      away: m.score.fullTime.away,
      status: m.status,
      utcDate: m.utcDate,
    }))
}

export async function fetchMatchStatus(apiMatchId) {
  try {
    const res = await fetch(`${BASE_URL}/matches/${apiMatchId}`, {
      headers: { 'X-Auth-Token': API_KEY },
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()
    return {
      status: data.status,
      home: data.score?.fullTime?.home,
      away: data.score?.fullTime?.away,
    }
  } catch (err) {
    console.error('Error fetching match:', err)
    return null
  }
}
