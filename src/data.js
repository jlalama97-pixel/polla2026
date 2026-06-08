export const INVITE_CODE = 'MUNDIAL26'
export const ADMIN_USERS = ['admin', 'jlalama']

// ─────────────────────────────────────────────────────
// Retorna true si el partido ya está bloqueado
// (faltan menos de 10 minutos para el kickoff)
// Las fechas están en UTC — se convierten a hora local
// del usuario automáticamente
// ─────────────────────────────────────────────────────
export function isMatchLocked(kickoffUTC) {
  if (!kickoffUTC) return false
  const now = Date.now()
  const kickoff = new Date(kickoffUTC).getTime()
  return now >= kickoff - 10 * 60 * 1000 // 10 minutos antes
}

export function formatKickoff(kickoffUTC) {
  if (!kickoffUTC) return ''
  return new Date(kickoffUTC).toLocaleString('es', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// ─────────────────────────────────────────────────────
// GRUPOS REALES DEL MUNDIAL 2026
// ─────────────────────────────────────────────────────
const GRUPOS = {
  A: [
    { name: 'México',        flag: '🇲🇽' },
    { name: 'Corea del Sur', flag: '🇰🇷' },
    { name: 'Rep. Checa',    flag: '🇨🇿' },
    { name: 'Sudáfrica',     flag: '🇿🇦' },
  ],
  B: [
    { name: 'Canadá',        flag: '🇨🇦' },
    { name: 'Qatar',         flag: '🇶🇦' },
    { name: 'Suiza',         flag: '🇨🇭' },
    { name: 'Bosnia',        flag: '🇧🇦' },
  ],
  C: [
    { name: 'Brasil',        flag: '🇧🇷' },
    { name: 'Marruecos',     flag: '🇲🇦' },
    { name: 'Haití',         flag: '🇭🇹' },
    { name: 'Escocia',       flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  ],
  D: [
    { name: 'Estados Unidos',flag: '🇺🇸' },
    { name: 'Paraguay',      flag: '🇵🇾' },
    { name: 'Australia',     flag: '🇦🇺' },
    { name: 'Turquía',       flag: '🇹🇷' },
  ],
  E: [
    { name: 'Alemania',      flag: '🇩🇪' },
    { name: 'Ecuador',       flag: '🇪🇨' },
    { name: 'C. de Marfil',  flag: '🇨🇮' },
    { name: 'Curazao',       flag: '🇨🇼' },
  ],
  F: [
    { name: 'Países Bajos',  flag: '🇳🇱' },
    { name: 'Japón',         flag: '🇯🇵' },
    { name: 'Túnez',         flag: '🇹🇳' },
    { name: 'Suecia',        flag: '🇸🇪' },
  ],
  G: [
    { name: 'Bélgica',       flag: '🇧🇪' },
    { name: 'Irán',          flag: '🇮🇷' },
    { name: 'Nueva Zelanda', flag: '🇳🇿' },
    { name: 'Egipto',        flag: '🇪🇬' },
  ],
  H: [
    { name: 'España',        flag: '🇪🇸' },
    { name: 'Arabia Saudita',flag: '🇸🇦' },
    { name: 'Uruguay',       flag: '🇺🇾' },
    { name: 'Cabo Verde',    flag: '🇨🇻' },
  ],
  I: [
    { name: 'Francia',       flag: '🇫🇷' },
    { name: 'Senegal',       flag: '🇸🇳' },
    { name: 'Noruega',       flag: '🇳🇴' },
    { name: 'Irak',          flag: '🇮🇶' },
  ],
  J: [
    { name: 'Argentina',     flag: '🇦🇷' },
    { name: 'Argelia',       flag: '🇩🇿' },
    { name: 'Austria',       flag: '🇦🇹' },
    { name: 'Jordania',      flag: '🇯🇴' },
  ],
  K: [
    { name: 'Portugal',      flag: '🇵🇹' },
    { name: 'Colombia',      flag: '🇨🇴' },
    { name: 'Uzbekistán',    flag: '🇺🇿' },
    { name: 'Congo DR',      flag: '🇨🇩' },
  ],
  L: [
    { name: 'Inglaterra',    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'Ghana',         flag: '🇬🇭' },
    { name: 'Panamá',        flag: '🇵🇦' },
    { name: 'Croacia',       flag: '🇭🇷' },
  ],
}

// ─────────────────────────────────────────────────────
// PARTIDOS FASE DE GRUPOS CON FECHAS UTC REALES
// Fuente: calendario oficial FIFA 2026
// ─────────────────────────────────────────────────────
// Formato kickoffUTC: ISO 8601 en UTC
// México City = UTC-6, ET = UTC-4, CET = UTC+2

const GROUP_MATCHES_DATA = [
  // GRUPO A
  { home: 'México',        away: 'Sudáfrica',     group: 'A', kickoffUTC: '2026-06-11T19:00:00Z' },
  { home: 'Corea del Sur', away: 'Rep. Checa',    group: 'A', kickoffUTC: '2026-06-12T02:00:00Z' },
  { home: 'México',        away: 'Corea del Sur', group: 'A', kickoffUTC: '2026-06-17T01:00:00Z' },
  { home: 'Rep. Checa',    away: 'Sudáfrica',     group: 'A', kickoffUTC: '2026-06-18T16:00:00Z' },
  { home: 'México',        away: 'Rep. Checa',    group: 'A', kickoffUTC: '2026-06-22T22:00:00Z' },
  { home: 'Sudáfrica',     away: 'Corea del Sur', group: 'A', kickoffUTC: '2026-06-22T22:00:00Z' },
  // GRUPO B
  { home: 'Canadá',        away: 'Bosnia',        group: 'B', kickoffUTC: '2026-06-12T19:00:00Z' },
  { home: 'Qatar',         away: 'Suiza',         group: 'B', kickoffUTC: '2026-06-13T19:00:00Z' },
  { home: 'Canadá',        away: 'Qatar',         group: 'B', kickoffUTC: '2026-06-17T23:00:00Z' },
  { home: 'Suiza',         away: 'Bosnia',        group: 'B', kickoffUTC: '2026-06-18T19:00:00Z' },
  { home: 'Canadá',        away: 'Suiza',         group: 'B', kickoffUTC: '2026-06-23T22:00:00Z' },
  { home: 'Bosnia',        away: 'Qatar',         group: 'B', kickoffUTC: '2026-06-23T22:00:00Z' },
  // GRUPO C
  { home: 'Brasil',        away: 'Marruecos',     group: 'C', kickoffUTC: '2026-06-13T22:00:00Z' },
  { home: 'Haití',         away: 'Escocia',       group: 'C', kickoffUTC: '2026-06-14T01:00:00Z' },
  { home: 'Brasil',        away: 'Haití',         group: 'C', kickoffUTC: '2026-06-18T00:30:00Z' },
  { home: 'Escocia',       away: 'Marruecos',     group: 'C', kickoffUTC: '2026-06-19T03:00:00Z' },
  { home: 'Brasil',        away: 'Escocia',       group: 'C', kickoffUTC: '2026-06-23T02:00:00Z' },
  { home: 'Marruecos',     away: 'Haití',         group: 'C', kickoffUTC: '2026-06-24T22:00:00Z' },
  // GRUPO D
  { home: 'Estados Unidos',away: 'Paraguay',      group: 'D', kickoffUTC: '2026-06-13T01:00:00Z' },
  { home: 'Australia',     away: 'Turquía',       group: 'D', kickoffUTC: '2026-06-12T22:00:00Z' },
  { home: 'Estados Unidos',away: 'Australia',     group: 'D', kickoffUTC: '2026-06-18T00:00:00Z' },
  { home: 'Turquía',       away: 'Paraguay',      group: 'D', kickoffUTC: '2026-06-17T22:00:00Z' },
  { home: 'Estados Unidos',away: 'Turquía',       group: 'D', kickoffUTC: '2026-06-23T00:00:00Z' },
  { home: 'Paraguay',      away: 'Australia',     group: 'D', kickoffUTC: '2026-06-23T00:00:00Z' },
  // GRUPO E
  { home: 'Alemania',      away: 'Curazao',       group: 'E', kickoffUTC: '2026-06-14T17:00:00Z' },
  { home: 'C. de Marfil',  away: 'Ecuador',       group: 'E', kickoffUTC: '2026-06-14T23:00:00Z' },
  { home: 'Alemania',      away: 'C. de Marfil',  group: 'E', kickoffUTC: '2026-06-19T21:00:00Z' },
  { home: 'Ecuador',       away: 'Curazao',       group: 'E', kickoffUTC: '2026-06-20T05:00:00Z' },
  { home: 'Alemania',      away: 'Ecuador',       group: 'E', kickoffUTC: '2026-06-25T01:00:00Z' },
  { home: 'Curazao',       away: 'C. de Marfil',  group: 'E', kickoffUTC: '2026-06-25T01:00:00Z' },
  // GRUPO F
  { home: 'Países Bajos',  away: 'Japón',         group: 'F', kickoffUTC: '2026-06-14T20:00:00Z' },
  { home: 'Túnez',         away: 'Suecia',        group: 'F', kickoffUTC: '2026-06-14T04:00:00Z' },
  { home: 'Países Bajos',  away: 'Túnez',         group: 'F', kickoffUTC: '2026-06-20T00:00:00Z' },
  { home: 'Suecia',        away: 'Japón',         group: 'F', kickoffUTC: '2026-06-20T17:00:00Z' },
  { home: 'Países Bajos',  away: 'Suecia',        group: 'F', kickoffUTC: '2026-06-25T21:00:00Z' },
  { home: 'Japón',         away: 'Túnez',         group: 'F', kickoffUTC: '2026-06-25T21:00:00Z' },
  // GRUPO G
  { home: 'Bélgica',       away: 'Irán',          group: 'G', kickoffUTC: '2026-06-15T00:00:00Z' },
  { home: 'Nueva Zelanda', away: 'Egipto',        group: 'G', kickoffUTC: '2026-06-15T19:00:00Z' },
  { home: 'Bélgica',       away: 'Nueva Zelanda', group: 'G', kickoffUTC: '2026-06-20T22:00:00Z' },
  { home: 'Egipto',        away: 'Irán',          group: 'G', kickoffUTC: '2026-06-21T01:00:00Z' },
  { home: 'Bélgica',       away: 'Egipto',        group: 'G', kickoffUTC: '2026-06-26T01:00:00Z' },
  { home: 'Irán',          away: 'Nueva Zelanda', group: 'G', kickoffUTC: '2026-06-26T01:00:00Z' },
  // GRUPO H
  { home: 'España',        away: 'Cabo Verde',    group: 'H', kickoffUTC: '2026-06-15T16:00:00Z' },
  { home: 'Arabia Saudita',away: 'Uruguay',       group: 'H', kickoffUTC: '2026-06-15T22:00:00Z' },
  { home: 'España',        away: 'Arabia Saudita',group: 'H', kickoffUTC: '2026-06-21T17:00:00Z' },
  { home: 'Uruguay',       away: 'Cabo Verde',    group: 'H', kickoffUTC: '2026-06-21T22:00:00Z' },
  { home: 'España',        away: 'Uruguay',       group: 'H', kickoffUTC: '2026-06-26T21:00:00Z' },
  { home: 'Cabo Verde',    away: 'Arabia Saudita',group: 'H', kickoffUTC: '2026-06-26T21:00:00Z' },
  // GRUPO I
  { home: 'Francia',       away: 'Senegal',       group: 'I', kickoffUTC: '2026-06-16T19:00:00Z' },
  { home: 'Noruega',       away: 'Irak',          group: 'I', kickoffUTC: '2026-06-16T22:00:00Z' },
  { home: 'Francia',       away: 'Noruega',       group: 'I', kickoffUTC: '2026-06-21T21:00:00Z' },
  { home: 'Senegal',       away: 'Irak',          group: 'I', kickoffUTC: '2026-06-22T21:00:00Z' },
  { home: 'Francia',       away: 'Irak',          group: 'I', kickoffUTC: '2026-06-27T01:00:00Z' },
  { home: 'Noruega',       away: 'Senegal',       group: 'I', kickoffUTC: '2026-06-27T01:00:00Z' },
  // GRUPO J
  { home: 'Argentina',     away: 'Argelia',       group: 'J', kickoffUTC: '2026-06-17T01:00:00Z' },
  { home: 'Austria',       away: 'Jordania',      group: 'J', kickoffUTC: '2026-06-17T04:00:00Z' },
  { home: 'Argentina',     away: 'Austria',       group: 'J', kickoffUTC: '2026-06-22T01:00:00Z' },
  { home: 'Jordania',      away: 'Argelia',       group: 'J', kickoffUTC: '2026-06-22T03:00:00Z' },
  { home: 'Argentina',     away: 'Jordania',      group: 'J', kickoffUTC: '2026-06-27T21:00:00Z' },
  { home: 'Argelia',       away: 'Austria',       group: 'J', kickoffUTC: '2026-06-27T21:00:00Z' },
  // GRUPO K
  { home: 'Portugal',      away: 'Congo DR',      group: 'K', kickoffUTC: '2026-06-15T17:00:00Z' },
  { home: 'Uzbekistán',    away: 'Colombia',      group: 'K', kickoffUTC: '2026-06-16T03:00:00Z' },
  { home: 'Portugal',      away: 'Uzbekistán',    group: 'K', kickoffUTC: '2026-06-21T19:00:00Z' },
  { home: 'Colombia',      away: 'Congo DR',      group: 'K', kickoffUTC: '2026-06-22T03:00:00Z' },
  { home: 'Portugal',      away: 'Colombia',      group: 'K', kickoffUTC: '2026-06-26T19:00:00Z' },
  { home: 'Congo DR',      away: 'Uzbekistán',    group: 'K', kickoffUTC: '2026-06-27T23:30:00Z' },
  // GRUPO L
  { home: 'Ghana',         away: 'Panamá',        group: 'L', kickoffUTC: '2026-06-16T16:00:00Z' },
  { home: 'Inglaterra',    away: 'Croacia',        group: 'L', kickoffUTC: '2026-06-17T21:00:00Z' },
  { home: 'Inglaterra',    away: 'Ghana',          group: 'L', kickoffUTC: '2026-06-23T01:00:00Z' },
  { home: 'Panamá',        away: 'Croacia',        group: 'L', kickoffUTC: '2026-06-23T23:00:00Z' },
  { home: 'Inglaterra',    away: 'Panamá',         group: 'L', kickoffUTC: '2026-06-28T02:00:00Z' },
  { home: 'Croacia',       away: 'Ghana',          group: 'L', kickoffUTC: '2026-06-28T02:00:00Z' },
]

function buildTeamMap() {
  const map = {}
  Object.values(GRUPOS).flat().forEach(t => { map[t.name] = t })
  return map
}

function genGroupMatches() {
  const teamMap = buildTeamMap()
  return GROUP_MATCHES_DATA.map((m, i) => ({
    id: String(i + 1).padStart(3, '0'),
    group: m.group,
    home: teamMap[m.home] || { name: m.home, flag: '🏳️' },
    away: teamMap[m.away] || { name: m.away, flag: '🏳️' },
    kickoffUTC: m.kickoffUTC,
    phase: 'group',
    knockout: false,
  }))
}

export const KNOCKOUT_MATCHES = [
  // Ronda de 32
  { id: 'r32_1',  group: 'R32', phase: 'round32', knockout: true, home: { name: '1° Grupo A', flag: '🔵' }, away: { name: '2° Grupo B', flag: '🔴' }, kickoffUTC: '2026-06-28T20:00:00Z' },
  { id: 'r32_2',  group: 'R32', phase: 'round32', knockout: true, home: { name: '1° Grupo C', flag: '🔵' }, away: { name: '2° Grupo D', flag: '🔴' }, kickoffUTC: '2026-06-29T00:00:00Z' },
  { id: 'r32_3',  group: 'R32', phase: 'round32', knockout: true, home: { name: '1° Grupo E', flag: '🔵' }, away: { name: '2° Grupo F', flag: '🔴' }, kickoffUTC: '2026-06-29T20:00:00Z' },
  { id: 'r32_4',  group: 'R32', phase: 'round32', knockout: true, home: { name: '1° Grupo G', flag: '🔵' }, away: { name: '2° Grupo H', flag: '🔴' }, kickoffUTC: '2026-06-30T00:00:00Z' },
  { id: 'r32_5',  group: 'R32', phase: 'round32', knockout: true, home: { name: '1° Grupo I', flag: '🔵' }, away: { name: '2° Grupo J', flag: '🔴' }, kickoffUTC: '2026-06-30T20:00:00Z' },
  { id: 'r32_6',  group: 'R32', phase: 'round32', knockout: true, home: { name: '1° Grupo K', flag: '🔵' }, away: { name: '2° Grupo L', flag: '🔴' }, kickoffUTC: '2026-07-01T00:00:00Z' },
  { id: 'r32_7',  group: 'R32', phase: 'round32', knockout: true, home: { name: '2° Grupo A', flag: '🔵' }, away: { name: '1° Grupo B', flag: '🔴' }, kickoffUTC: '2026-07-01T20:00:00Z' },
  { id: 'r32_8',  group: 'R32', phase: 'round32', knockout: true, home: { name: '2° Grupo C', flag: '🔵' }, away: { name: '1° Grupo D', flag: '🔴' }, kickoffUTC: '2026-07-02T00:00:00Z' },
  { id: 'r32_9',  group: 'R32', phase: 'round32', knockout: true, home: { name: '2° Grupo E', flag: '🔵' }, away: { name: '1° Grupo F', flag: '🔴' }, kickoffUTC: '2026-07-02T20:00:00Z' },
  { id: 'r32_10', group: 'R32', phase: 'round32', knockout: true, home: { name: '2° Grupo G', flag: '🔵' }, away: { name: '1° Grupo H', flag: '🔴' }, kickoffUTC: '2026-07-03T00:00:00Z' },
  { id: 'r32_11', group: 'R32', phase: 'round32', knockout: true, home: { name: '2° Grupo I', flag: '🔵' }, away: { name: '1° Grupo J', flag: '🔴' }, kickoffUTC: '2026-07-03T20:00:00Z' },
  { id: 'r32_12', group: 'R32', phase: 'round32', knockout: true, home: { name: '2° Grupo K', flag: '🔵' }, away: { name: '1° Grupo L', flag: '🔴' }, kickoffUTC: '2026-07-04T00:00:00Z' },
  { id: 'r32_13', group: 'R32', phase: 'round32', knockout: true, home: { name: '3° mejor 1', flag: '🟡' }, away: { name: '3° mejor 2', flag: '🟡' }, kickoffUTC: '2026-07-04T20:00:00Z' },
  { id: 'r32_14', group: 'R32', phase: 'round32', knockout: true, home: { name: '3° mejor 3', flag: '🟡' }, away: { name: '3° mejor 4', flag: '🟡' }, kickoffUTC: '2026-07-05T00:00:00Z' },
  { id: 'r32_15', group: 'R32', phase: 'round32', knockout: true, home: { name: '3° mejor 5', flag: '🟡' }, away: { name: '3° mejor 6', flag: '🟡' }, kickoffUTC: '2026-07-05T20:00:00Z' },
  { id: 'r32_16', group: 'R32', phase: 'round32', knockout: true, home: { name: '3° mejor 7', flag: '🟡' }, away: { name: '3° mejor 8', flag: '🟡' }, kickoffUTC: '2026-07-06T00:00:00Z' },
  // Octavos
  { id: 'r16_1', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G1 R32', flag: '🔵' }, away: { name: 'G2 R32',  flag: '🔴' }, kickoffUTC: '2026-07-07T20:00:00Z' },
  { id: 'r16_2', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G3 R32', flag: '🔵' }, away: { name: 'G4 R32',  flag: '🔴' }, kickoffUTC: '2026-07-08T00:00:00Z' },
  { id: 'r16_3', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G5 R32', flag: '🔵' }, away: { name: 'G6 R32',  flag: '🔴' }, kickoffUTC: '2026-07-08T20:00:00Z' },
  { id: 'r16_4', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G7 R32', flag: '🔵' }, away: { name: 'G8 R32',  flag: '🔴' }, kickoffUTC: '2026-07-09T00:00:00Z' },
  { id: 'r16_5', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G9 R32', flag: '🔵' }, away: { name: 'G10 R32', flag: '🔴' }, kickoffUTC: '2026-07-09T20:00:00Z' },
  { id: 'r16_6', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G11 R32',flag: '🔵' }, away: { name: 'G12 R32', flag: '🔴' }, kickoffUTC: '2026-07-10T00:00:00Z' },
  { id: 'r16_7', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G13 R32',flag: '🔵' }, away: { name: 'G14 R32', flag: '🔴' }, kickoffUTC: '2026-07-10T20:00:00Z' },
  { id: 'r16_8', group: 'R16', phase: 'round16', knockout: true, home: { name: 'G15 R32',flag: '🔵' }, away: { name: 'G16 R32', flag: '🔴' }, kickoffUTC: '2026-07-11T00:00:00Z' },
  // Cuartos
  { id: 'qf_1', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G1 R16', flag: '🔵' }, away: { name: 'G2 R16', flag: '🔴' }, kickoffUTC: '2026-07-12T20:00:00Z' },
  { id: 'qf_2', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G3 R16', flag: '🔵' }, away: { name: 'G4 R16', flag: '🔴' }, kickoffUTC: '2026-07-13T00:00:00Z' },
  { id: 'qf_3', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G5 R16', flag: '🔵' }, away: { name: 'G6 R16', flag: '🔴' }, kickoffUTC: '2026-07-13T20:00:00Z' },
  { id: 'qf_4', group: 'QF', phase: 'quarter', knockout: true, home: { name: 'G7 R16', flag: '🔵' }, away: { name: 'G8 R16', flag: '🔴' }, kickoffUTC: '2026-07-14T00:00:00Z' },
  // Semis
  { id: 'sf_1', group: 'SF', phase: 'semi', knockout: true, home: { name: 'G1 QF', flag: '🔵' }, away: { name: 'G2 QF', flag: '🔴' }, kickoffUTC: '2026-07-15T23:00:00Z' },
  { id: 'sf_2', group: 'SF', phase: 'semi', knockout: true, home: { name: 'G3 QF', flag: '🔵' }, away: { name: 'G4 QF', flag: '🔴' }, kickoffUTC: '2026-07-16T23:00:00Z' },
  // Tercer lugar
  { id: 'tp_1', group: '3P', phase: 'third', knockout: true, home: { name: 'Perdedor SF-1', flag: '🔵' }, away: { name: 'Perdedor SF-2', flag: '🔴' }, kickoffUTC: '2026-07-19T19:00:00Z' },
  // Final
  { id: 'final', group: 'FINAL', phase: 'final', knockout: true, home: { name: 'Ganador SF-1', flag: '🏆' }, away: { name: 'Ganador SF-2', flag: '🏆' }, kickoffUTC: '2026-07-19T23:00:00Z' },
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

export const GROUP_FILTERS = ['all','A','B','C','D','E','F','G','H','I','J','K','L','R32','R16','QF','SF','FINAL']
export const GROUP_FILTER_LABELS = {
  all: 'Todos', R32: 'Ronda 32', R16: 'Octavos', QF: 'Cuartos', SF: 'Semis', FINAL: 'Final',
}

// ─────────────────────────────────────────────────────
// SISTEMA DE PUNTUACIÓN GolPredictor
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