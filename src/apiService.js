// ─────────────────────────────────────────────────────
// INTEGRACIÓN CON openfootball/worldcup.json
// Fuente abierta, sin API key, sin CORS, actualizada ~diariamente
// https://github.com/openfootball/worldcup.json
// ─────────────────────────────────────────────────────

const WORLDCUP_JSON_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json'

// Mapeo de nombres openfootball → nombres en nuestra app (data.js)
const TEAM_NAME_MAP = {
  'Mexico':           'México',
  'South Africa':     'Sudáfrica',
  'South Korea':      'Corea del Sur',
  'Korea Republic':   'Corea del Sur',
  'Czech Republic':   'Rep. Checa',
  'Czechia':          'Rep. Checa',
  'Canada':           'Canadá',
  'Bosnia & Herzegovina': 'Bosnia',
  'Bosnia-Herzegovina':   'Bosnia',
  'Qatar':            'Qatar',
  'Switzerland':      'Suiza',
  'Brazil':           'Brasil',
  'Morocco':          'Marruecos',
  'Haiti':            'Haití',
  'Scotland':         'Escocia',
  'USA':              'Estados Unidos',
  'United States':    'Estados Unidos',
  'Paraguay':         'Paraguay',
  'Australia':        'Australia',
  'Turkey':           'Turquía',
  'Türkiye':          'Turquía',
  'Germany':          'Alemania',
  'Curaçao':          'Curazao',
  'Curacao':          'Curazao',
  'Ivory Coast':      'Costa de Marfil',
  "Côte d'Ivoire":    'Costa de Marfil',
  'Ecuador':          'Ecuador',
  'Netherlands':      'Países Bajos',
  'Japan':            'Japón',
  'Sweden':           'Suecia',
  'Tunisia':          'Túnez',
  'Belgium':          'Bélgica',
  'Egypt':            'Egipto',
  'Iran':             'Irán',
  'New Zealand':      'Nueva Zelanda',
  'Spain':            'España',
  'Cape Verde':       'Cabo Verde',
  'Saudi Arabia':     'Arabia Saudita',
  'Uruguay':          'Uruguay',
  'France':           'Francia',
  'Senegal':          'Senegal',
  'Iraq':             'Irak',
  'Norway':           'Noruega',
  'Argentina':        'Argentina',
  'Algeria':          'Argelia',
  'Austria':          'Austria',
  'Jordan':           'Jordania',
  'Portugal':         'Portugal',
  'DR Congo':         'Congo DR',
  'Congo DR':         'Congo DR',
  'Uzbekistan':       'Uzbekistán',
  'Colombia':         'Colombia',
  'England':          'Inglaterra',
  'Croatia':          'Croacia',
  'Ghana':            'Ghana',
  'Panama':           'Panamá',
}

function normalizeTeamName(name) {
  return TEAM_NAME_MAP[name] || name
}

// Descarga y parsea todos los partidos con resultado
export async function fetchLiveResults() {
  try {
    const res = await fetch(WORLDCUP_JSON_URL)
    if (!res.ok) throw new Error(`Error ${res.status}`)
    const data = await res.json()

    const results = []
    ;(data.matches || []).forEach(m => {
      // Solo partidos con score definido
      if (!m.score || m.score.ft === undefined && !m.score.et && !m.score.p) return
      const ft = m.score.ft
      if (!Array.isArray(ft) || ft.length !== 2) return

      results.push({
        home: normalizeTeamName(m.team1),
        away: normalizeTeamName(m.team2),
        homeGoals: ft[0],
        awayGoals: ft[1],
        date: m.date,
        group: m.group,
      })
    })
    return results
  } catch (err) {
    console.error('Error fetching worldcup.json:', err)
    return null
  }
}

// Hace match entre los resultados descargados y nuestros partidos (ALL_MATCHES)
// Retorna un array de { matchId, home, away } listos para guardar
export function matchResultsToFixtures(apiResults, allMatches) {
  const matched = []
  apiResults.forEach(r => {
    const fixture = allMatches.find(m =>
      !m.knockout &&
      m.home.name === r.home &&
      m.away.name === r.away
    )
    if (fixture) {
      matched.push({
        matchId: fixture.id,
        home: r.homeGoals,
        away: r.awayGoals,
      })
    }
  })
  return matched
}