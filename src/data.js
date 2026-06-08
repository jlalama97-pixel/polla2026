// ─────────────────────────────────────────────────────
// TODOS LOS PARTIDOS DEL MUNDIAL 2026
// Fase de grupos: 8 grupos × 6 partidos = 48 partidos
// Fase eliminatoria: 16+8+4+2+1+1 = 32 partidos (aprox)
// ─────────────────────────────────────────────────────

export const INVITE_CODE = 'MUNDIAL26'
export const ADMIN_USERS = ['admin']

// Equipos clasificados (provisional, grupos reales por confirmar)
const GRUPOS = {
  A: [
    { name: 'México',   flag: '🇲🇽' },
    { name: 'Canadá',   flag: '🇨🇦' },
    { name: 'Ecuador',  flag: '🇪🇨' },
    { name: 'Jamaica',  flag: '🇯🇲' },
  ],
  B: [
    { name: 'Brasil',   flag: '🇧🇷' },
    { name: 'Argentina',flag: '🇦🇷' },
    { name: 'Uruguay',  flag: '🇺🇾' },
    { name: 'Bolivia',  flag: '🇧🇴' },
  ],
  C: [
    { name: 'España',   flag: '🇪🇸' },
    { name: 'Francia',  flag: '🇫🇷' },
    { name: 'Bélgica',  flag: '🇧🇪' },
    { name: 'Gales',    flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  ],
  D: [
    { name: 'Alemania', flag: '🇩🇪' },
    { name: 'Portugal', flag: '🇵🇹' },
    { name: 'Turquía',  flag: '🇹🇷' },
    { name: 'Escocia',  flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  ],
  E: [
    { name: 'Inglaterra',flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'Países B.',  flag: '🇳🇱' },
    { name: 'Dinamarca', flag: '🇩🇰' },
    { name: 'Serbia',    flag: '🇷🇸' },
  ],
  F: [
    { name: 'Italia',   flag: '🇮🇹' },
    { name: 'Croacia',  flag: '🇭🇷' },
    { name: 'Eslovenia',flag: '🇸🇮' },
    { name: 'Albania',  flag: '🇦🇱' },
  ],
  G: [
    { name: 'Japón',    flag: '🇯🇵' },
    { name: 'Australia',flag: '🇦🇺' },
    { name: 'Corea S.', flag: '🇰🇷' },
    { name: 'Indonesia',flag: '🇮🇩' },
  ],
  H: [
    { name: 'Marruecos',flag: '🇲🇦' },
    { name: 'Senegal',  flag: '🇸🇳' },
    { name: 'Nigeria',  flag: '🇳🇬' },
    { name: 'Camerún',  flag: '🇨🇲' },
  ],
}

// Fechas por grupo
const GROUP_DATES = {
  A: '11 Jun', B: '12 Jun', C: '13 Jun', D: '14 Jun',
  E: '15 Jun', F: '16 Jun', G: '17 Jun', H: '18 Jun',
}

function genGroupMatches() {
  const matches = []
  let id = 1
  Object.entries(GRUPOS).forEach(([g, teams]) => {
    const times = ['15:00', '18:00', '21:00']
    let t = 0
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id: String(id++).padStart(3, '0'),
          group: g,
          home: teams[i],
          away: teams[j],
          date: GROUP_DATES[g],
          time: times[t % 3],
          phase: 'group',
          knockout: false,
          apiId: null,
        })
        t++
      }
    }
  })
  return matches
}

export const KNOCKOUT_MATCHES = [
  // Octavos
  { id: 'r16_1', group: 'R16', phase: 'round16', knockout: true, home: { name: '1° Grupo A', flag: '🔵' }, away: { name: '2° Grupo B', flag: '🔴' }, date: '29 Jun', time: '18:00' },
  { id: 'r16_2', group: 'R16', phase: 'round16', knockout: true, home: { name: '1° Grupo C', flag: '🔵' }, away: { name: '2° Grupo D', flag: '🔴' }, date: '30 Jun', time: '18:00' },
  { id: 'r16_3', group: 'R16', phase: 'round16', knockout: true, home: { name: '1° Grupo E', flag: '🔵' }, away: { name: '2° Grupo F', flag: '🔴' }, date: '1 Jul', time: '18:00' },
  { id: 'r16_4', group: 'R16', phase: 'round16', knockout: true, home: { name: '1° Grupo G', flag: '🔵' }, away: { name: '2° Grupo H', flag: '🔴' }, date: '2 Jul', time: '18:00' },
  { id: 'r16_5', group: 'R16', phase: 'round16', knockout: true, home: { name: '2° Grupo A', flag: '🔵' }, away: { name: '1° Grupo B', flag: '🔴' }, date: '3 Jul', time: '18:00' },
  { id: 'r16_6', group: 'R16', phase: 'round16', knockout: true, home: { name: '2° Grupo C', flag: '🔵' }, away: { name: '1° Grupo D', flag: '🔴' }, date: '4 Jul', time: '18:00' },
  { id: 'r16_7', group: 'R16', phase: 'round16', knockout: true, home: { name: '2° Grupo E', flag: '🔵' }, away: { name: '1° Grupo F', flag: '🔴' }, date: '5 Jul', time: '18:00' },
  { id: 'r16_8', group: 'R16', phase: 'round16', knockout: true, home: { name: '2° Grupo G', flag: '🔵' }, away: { name: '1° Grupo H', flag: '🔴' }, date: '6 Jul', time: '18:00' },
  // Cuartos
  { id: 'qf_1', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'Ganador R16-1', flag: '🔵' }, away: { name: 'Ganador R16-2', flag: '🔴' }, date: '10 Jul', time: '18:00' },
  { id: 'qf_2', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'Ganador R16-3', flag: '🔵' }, away: { name: 'Ganador R16-4', flag: '🔴' }, date: '11 Jul', time: '18:00' },
  { id: 'qf_3', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'Ganador R16-5', flag: '🔵' }, away: { name: 'Ganador R16-6', flag: '🔴' }, date: '12 Jul', time: '18:00' },
  { id: 'qf_4', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'Ganador R16-7', flag: '🔵' }, away: { name: 'Ganador R16-8', flag: '🔴' }, date: '13 Jul', time: '18:00' },
  // Semis
  { id: 'sf_1', group: 'SF', phase: 'semi', knockout: true, home: { name: 'Ganador QF-1', flag: '🔵' }, away: { name: 'Ganador QF-2', flag: '🔴' }, date: '15 Jul', time: '18:00' },
  { id: 'sf_2', group: 'SF', phase: 'semi', knockout: true, home: { name: 'Ganador QF-3', flag: '🔵' }, away: { name: 'Ganador QF-4', flag: '🔴' }, date: '16 Jul', time: '18:00' },
  // Tercer lugar
  { id: 'tp_1', group: '3P', phase: 'third', knockout: true, home: { name: 'Perdedor SF-1', flag: '🔵' }, away: { name: 'Perdedor SF-2', flag: '🔴' }, date: '19 Jul', time: '15:00' },
  // Final
  { id: 'final', group: 'FINAL', phase: 'final', knockout: true, home: { name: 'Ganador SF-1', flag: '🏆' }, away: { name: 'Ganador SF-2', flag: '🏆' }, date: '19 Jul', time: '18:00' },
]

export const ALL_MATCHES = [...genGroupMatches(), ...KNOCKOUT_MATCHES]

export const PHASE_LABELS = {
  group: 'Fase de Grupos',
  round16: 'Octavos de Final',
  quarter: 'Cuartos de Final',
  semi: 'Semifinales',
  third: 'Tercer Lugar',
  final: '⭐ Gran Final',
}

export const GROUP_FILTERS = ['all', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'R16', 'QF', 'SF', 'FINAL']
export const GROUP_FILTER_LABELS = {
  all: 'Todos', R16: 'Octavos', QF: 'Cuartos', SF: 'Semis', FINAL: 'Final',
}

// ─────────────────────────────────────────────────────
// SISTEMA DE PUNTUACIÓN (estilo GolPredictor)
// Grupos:      winner=5, exactHome=2, exactAway=2, diffGoal=1 → máx 10
// Eliminatoria: todo × 2                                       → máx 20
// ─────────────────────────────────────────────────────
export function calcPoints(pred, result, knockout) {
  if (!pred || !result) return null
  const mul = knockout ? 2 : 1
  let pts = 0
  const predW = pred.home > pred.away ? 'H' : pred.home < pred.away ? 'A' : 'D'
  const resW  = result.home > result.away ? 'H' : result.home < result.away ? 'A' : 'D'
  if (predW === resW) pts += 5 * mul
  if (Number(pred.home) === Number(result.home)) pts += 2 * mul
  if (Number(pred.away) === Number(result.away)) pts += 2 * mul
  if ((pred.home - pred.away) === (result.home - result.away)) pts += 1 * mul
  return pts
}

export function maxPoints(knockout) {
  return knockout ? 20 : 10
}
