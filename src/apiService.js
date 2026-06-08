// ─────────────────────────────────────────────────────
// INTEGRACIÓN CON football-data.org
// Mundial 2026: código de competición = "WC"
// Registro gratuito en: https://www.football-data.org/
// ─────────────────────────────────────────────────────

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY || ''
const BASE_URL = 'https://api.football-data.org/v4'
const WC_CODE = 'WC'

export async function fetchLiveResults() {
  try {
    const res = await fetch(`${BASE_URL}/competitions/${WC_CODE}/matches`, {
      headers: { 'X-Auth-Token': API_KEY },
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()
    return parseMatches(data.matches || [])
  } catch (err) {
    console.error('Error fetching results:', err)
    return null
  }
}

function parseMatches(apiMatches) {
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