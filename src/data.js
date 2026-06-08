export const INVITE_CODE = 'MUNDIAL26'
export const ADMIN_USERS = ['admin']
 
// ─────────────────────────────────────────────────────
// GRUPOS REALES DEL MUNDIAL 2026
// 12 grupos de 4 equipos = 48 equipos
// ─────────────────────────────────────────────────────
const GRUPOS = {
  A: [
    { name: 'México',       flag: '🇲🇽' },
    { name: 'Corea del Sur',flag: '🇰🇷' },
    { name: 'Rep. Checa',   flag: '🇨🇿' },
    { name: 'Sudáfrica',    flag: '🇿🇦' },
  ],
  B: [
    { name: 'Canadá',       flag: '🇨🇦' },
    { name: 'Qatar',        flag: '🇶🇦' },
    { name: 'Suiza',        flag: '🇨🇭' },
    { name: 'Bosnia',       flag: '🇧🇦' },
  ],
  C: [
    { name: 'Brasil',       flag: '🇧🇷' },
    { name: 'Marruecos',    flag: '🇲🇦' },
    { name: 'Haití',        flag: '🇭🇹' },
    { name: 'Escocia',      flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  ],
  D: [
    { name: 'Estados Unidos',flag: '🇺🇸' },
    { name: 'Paraguay',     flag: '🇵🇾' },
    { name: 'Australia',    flag: '🇦🇺' },
    { name: 'Turquía',      flag: '🇹🇷' },
  ],
  E: [
    { name: 'Alemania',     flag: '🇩🇪' },
    { name: 'Ecuador',      flag: '🇪🇨' },
    { name: 'Costa de Marfil', flag: '🇨🇮' },
    { name: 'Curazao',      flag: '🇨🇼' },
  ],
  F: [
    { name: 'Países Bajos', flag: '🇳🇱' },
    { name: 'Japón',        flag: '🇯🇵' },
    { name: 'Túnez',        flag: '🇹🇳' },
    { name: 'Suecia',       flag: '🇸🇪' },
  ],
  G: [
    { name: 'Bélgica',      flag: '🇧🇪' },
    { name: 'Irán',         flag: '🇮🇷' },
    { name: 'Nueva Zelanda',flag: '🇳🇿' },
    { name: 'Egipto',       flag: '🇪🇬' },
  ],
  H: [
    { name: 'España',       flag: '🇪🇸' },
    { name: 'Arabia Saudita',flag: '🇸🇦' },
    { name: 'Uruguay',      flag: '🇺🇾' },
    { name: 'Cabo Verde',   flag: '🇨🇻' },
  ],
  I: [
    { name: 'Francia',      flag: '🇫🇷' },
    { name: 'Senegal',      flag: '🇸🇳' },
    { name: 'Noruega',      flag: '🇳🇴' },
    { name: 'Irak',         flag: '🇮🇶' },
  ],
  J: [
    { name: 'Argentina',    flag: '🇦🇷' },
    { name: 'Argelia',      flag: '🇩🇿' },
    { name: 'Austria',      flag: '🇦🇹' },
    { name: 'Jordania',     flag: '🇯🇴' },
  ],
  K: [
    { name: 'Portugal',     flag: '🇵🇹' },
    { name: 'Colombia',     flag: '🇨🇴' },
    { name: 'Uzbekistán',   flag: '🇺🇿' },
    { name: 'Congo DR',     flag: '🇨🇩' },
  ],
  L: [
    { name: 'Inglaterra',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'Ghana',        flag: '🇬🇭' },
    { name: 'Panamá',       flag: '🇵🇦' },
    { name: 'Croacia',      flag: '🇭🇷' },
  ],
}
 
// Fechas primer partido por grupo
const GROUP_DATES = {
  A: '11 Jun', B: '12 Jun', C: '13 Jun', D: '12 Jun',
  E: '13 Jun', F: '13 Jun', G: '14 Jun', H: '15 Jun',
  I: '16 Jun', J: '16 Jun', K: '15 Jun', L: '17 Jun',
}
 
const GROUP_TIMES = ['15:00', '18:00', '21:00']
 
function genGroupMatches() {
  const matches = []
  let id = 1
  Object.entries(GRUPOS).forEach(([g, teams]) => {
    let t = 0
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push({
          id: String(id++).padStart(3, '0'),
          group: g,
          home: teams[i],
          away: teams[j],
          date: GROUP_DATES[g],
          time: GROUP_TIMES[t % 3],
          phase: 'group',
          knockout: false,
        })
        t++
      }
    }
  })
  return matches
}
 
export const KNOCKOUT_MATCHES = [
  // Ronda de 32 (nuevo en 2026)
  { id: 'r32_1',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '1° Grupo A', flag: '🔵' }, away: { name: '2° Grupo B', flag: '🔴' }, date: '28 Jun', time: '18:00' },
  { id: 'r32_2',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '1° Grupo C', flag: '🔵' }, away: { name: '2° Grupo D', flag: '🔴' }, date: '28 Jun', time: '21:00' },
  { id: 'r32_3',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '1° Grupo E', flag: '🔵' }, away: { name: '2° Grupo F', flag: '🔴' }, date: '29 Jun', time: '18:00' },
  { id: 'r32_4',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '1° Grupo G', flag: '🔵' }, away: { name: '2° Grupo H', flag: '🔴' }, date: '29 Jun', time: '21:00' },
  { id: 'r32_5',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '1° Grupo I', flag: '🔵' }, away: { name: '2° Grupo J', flag: '🔴' }, date: '30 Jun', time: '18:00' },
  { id: 'r32_6',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '1° Grupo K', flag: '🔵' }, away: { name: '2° Grupo L', flag: '🔴' }, date: '30 Jun', time: '21:00' },
  { id: 'r32_7',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '2° Grupo A', flag: '🔵' }, away: { name: '1° Grupo B', flag: '🔴' }, date: '1 Jul',  time: '18:00' },
  { id: 'r32_8',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '2° Grupo C', flag: '🔵' }, away: { name: '1° Grupo D', flag: '🔴' }, date: '1 Jul',  time: '21:00' },
  { id: 'r32_9',  group: 'R32',   phase: 'round32', knockout: true, home: { name: '2° Grupo E', flag: '🔵' }, away: { name: '1° Grupo F', flag: '🔴' }, date: '2 Jul',  time: '18:00' },
  { id: 'r32_10', group: 'R32',   phase: 'round32', knockout: true, home: { name: '2° Grupo G', flag: '🔵' }, away: { name: '1° Grupo H', flag: '🔴' }, date: '2 Jul',  time: '21:00' },
  { id: 'r32_11', group: 'R32',   phase: 'round32', knockout: true, home: { name: '2° Grupo I', flag: '🔵' }, away: { name: '1° Grupo J', flag: '🔴' }, date: '3 Jul',  time: '18:00' },
  { id: 'r32_12', group: 'R32',   phase: 'round32', knockout: true, home: { name: '2° Grupo K', flag: '🔵' }, away: { name: '1° Grupo L', flag: '🔴' }, date: '3 Jul',  time: '21:00' },
  { id: 'r32_13', group: 'R32',   phase: 'round32', knockout: true, home: { name: '3° mejor 1', flag: '🟡' }, away: { name: '3° mejor 2', flag: '🟡' }, date: '4 Jul',  time: '18:00' },
  { id: 'r32_14', group: 'R32',   phase: 'round32', knockout: true, home: { name: '3° mejor 3', flag: '🟡' }, away: { name: '3° mejor 4', flag: '🟡' }, date: '4 Jul',  time: '21:00' },
  { id: 'r32_15', group: 'R32',   phase: 'round32', knockout: true, home: { name: '3° mejor 5', flag: '🟡' }, away: { name: '3° mejor 6', flag: '🟡' }, date: '5 Jul',  time: '18:00' },
  { id: 'r32_16', group: 'R32',   phase: 'round32', knockout: true, home: { name: '3° mejor 7', flag: '🟡' }, away: { name: '3° mejor 8', flag: '🟡' }, date: '5 Jul',  time: '21:00' },
  // Octavos de Final (R16)
  { id: 'r16_1', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G1 R32', flag: '🔵' }, away: { name: 'G2 R32', flag: '🔴' }, date: '7 Jul',  time: '18:00' },
  { id: 'r16_2', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G3 R32', flag: '🔵' }, away: { name: 'G4 R32', flag: '🔴' }, date: '7 Jul',  time: '21:00' },
  { id: 'r16_3', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G5 R32', flag: '🔵' }, away: { name: 'G6 R32', flag: '🔴' }, date: '8 Jul',  time: '18:00' },
  { id: 'r16_4', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G7 R32', flag: '🔵' }, away: { name: 'G8 R32', flag: '🔴' }, date: '8 Jul',  time: '21:00' },
  { id: 'r16_5', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G9 R32', flag: '🔵' }, away: { name: 'G10 R32', flag: '🔴' }, date: '9 Jul', time: '18:00' },
  { id: 'r16_6', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G11 R32', flag: '🔵' }, away: { name: 'G12 R32', flag: '🔴' }, date: '9 Jul', time: '21:00' },
  { id: 'r16_7', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G13 R32', flag: '🔵' }, away: { name: 'G14 R32', flag: '🔴' }, date: '10 Jul', time: '18:00' },
  { id: 'r16_8', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G15 R32', flag: '🔵' }, away: { name: 'G16 R32', flag: '🔴' }, date: '10 Jul', time: '21:00' },
  // Cuartos
  { id: 'qf_1', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G1 R16', flag: '🔵' }, away: { name: 'G2 R16', flag: '🔴' }, date: '12 Jul', time: '18:00' },
  { id: 'qf_2', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G3 R16', flag: '🔵' }, away: { name: 'G4 R16', flag: '🔴' }, date: '12 Jul', time: '21:00' },
  { id: 'qf_3', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G5 R16', flag: '🔵' }, away: { name: 'G6 R16', flag: '🔴' }, date: '13 Jul', time: '18:00' },
  { id: 'qf_4', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G7 R16', flag: '🔵' }, away: { name: 'G8 R16', flag: '🔴' }, date: '13 Jul', time: '21:00' },
  // Semis
  { id: 'sf_1', group: 'SF', phase: 'semi', knockout: true, home: { name: 'G1 QF', flag: '🔵' }, away: { name: 'G2 QF', flag: '🔴' }, date: '15 Jul', time: '21:00' },
  { id: 'sf_2', group: 'SF', phase: 'semi', knockout: true, home: { name: 'G3 QF', flag: '🔵' }, away: { name: 'G4 QF', flag: '🔴' }, date: '16 Jul', time: '21:00' },
  // Tercer lugar
  { id: 'tp_1', group: '3P', phase: 'third', knockout: true, home: { name: 'Perdedor SF-1', flag: '🔵' }, away: { name: 'Perdedor SF-2', flag: '🔴' }, date: '19 Jul', time: '15:00' },
  // Final
  { id: 'final', group: 'FINAL', phase: 'final', knockout: true, home: { name: 'Ganador SF-1', flag: '🏆' }, away: { name: 'Ganador SF-2', flag: '🏆' }, date: '19 Jul', time: '18:00' },
]
 
export const ALL_MATCHES = [...genGroupMatches(), ...KNOCKOUT_MATCHES]
 
export const PHASE_LABELS = {
  group:   'Fase de Grupos',
  round32: 'Ronda de 32',
  round16: 'Octavos de Final',
  quarter: 'Cuartos de Final',
  semi:    'Semifinales',
  third:   'Tercer Lugar',
  final:   '⭐ Final',
}
 
export const GROUP_FILTERS = ['all', 'A','B','C','D','E','F','G','H','I','J','K','L','R32','R16','QF','SF','FINAL']
export const GROUP_FILTER_LABELS = {
  all: 'Todos', R32: 'Ronda 32', R16: 'Octavos', QF: 'Cuartos', SF: 'Semis', FINAL: 'Final',
}
 
// ─────────────────────────────────────────────────────
// SISTEMA DE PUNTUACIÓN GolPredictor
// Grupos:       winner=5, exactHome=2, exactAway=2, diff=1 → máx 10
// Eliminatoria: todo × 2                                   → máx 20
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