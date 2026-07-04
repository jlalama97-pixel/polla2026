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

export function isToday(kickoffUTC) {
  if (!kickoffUTC) return false
  const now = new Date()
  const match = new Date(kickoffUTC)
  return now.getFullYear() === match.getFullYear()
    && now.getMonth() === match.getMonth()
    && now.getDate() === match.getDate()
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
  { id: '001', home: 'México', away: 'Sudáfrica', group: 'A', kickoffUTC: '2026-06-11T19:00:00Z', city: 'Ciudad de México', stadium: 'Estadio Azteca' },
  { id: '002', home: 'Corea del Sur', away: 'Rep. Checa', group: 'A', kickoffUTC: '2026-06-12T02:00:00Z', city: 'Zapopan', stadium: 'Estadio Akron' },
  { id: '003', home: 'México', away: 'Corea del Sur', group: 'A', kickoffUTC: '2026-06-19T01:00:00Z', city: 'Zapopan', stadium: 'Estadio Akron' },
  { id: '004', home: 'Rep. Checa', away: 'Sudáfrica', group: 'A', kickoffUTC: '2026-06-18T16:00:00Z', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },
  { id: '005', home: 'México', away: 'Rep. Checa', group: 'A', kickoffUTC: '2026-06-25T01:00:00Z', city: 'Ciudad de México', stadium: 'Estadio Azteca' },
  { id: '006', home: 'Sudáfrica', away: 'Corea del Sur', group: 'A', kickoffUTC: '2026-06-25T01:00:00Z', city: 'Monterrey', stadium: 'Estadio BBVA' },
  { id: '007', home: 'Canadá', away: 'Bosnia', group: 'B', kickoffUTC: '2026-06-12T19:00:00Z', city: 'Toronto', stadium: 'BMO Field' },
  { id: '008', home: 'Qatar', away: 'Suiza', group: 'B', kickoffUTC: '2026-06-13T19:00:00Z', city: 'Santa Clara', stadium: 'Levi\'s Stadium' },
  { id: '009', home: 'Canadá', away: 'Qatar', group: 'B', kickoffUTC: '2026-06-18T22:00:00Z', city: 'Vancouver', stadium: 'BC Place' },
  { id: '010', home: 'Suiza', away: 'Bosnia', group: 'B', kickoffUTC: '2026-06-18T19:00:00Z', city: 'Inglewood', stadium: 'SoFi Stadium' },
  { id: '011', home: 'Canadá', away: 'Suiza', group: 'B', kickoffUTC: '2026-06-24T19:00:00Z', city: 'Vancouver', stadium: 'BC Place' },
  { id: '012', home: 'Bosnia', away: 'Qatar', group: 'B', kickoffUTC: '2026-06-24T19:00:00Z', city: 'Seattle', stadium: 'Lumen Field' },
  { id: '013', home: 'Brasil', away: 'Marruecos', group: 'C', kickoffUTC: '2026-06-13T22:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },
  { id: '014', home: 'Haití', away: 'Escocia', group: 'C', kickoffUTC: '2026-06-14T01:00:00Z', city: 'Foxborough', stadium: 'Gillette Stadium' },
  { id: '015', home: 'Brasil', away: 'Haití', group: 'C', kickoffUTC: '2026-06-20T00:30:00Z', city: 'Filadelfia', stadium: 'Lincoln Financial Field' },
  { id: '016', home: 'Escocia', away: 'Marruecos', group: 'C', kickoffUTC: '2026-06-19T22:00:00Z', city: 'Foxborough', stadium: 'Gillette Stadium' },
  { id: '017', home: 'Brasil', away: 'Escocia', group: 'C', kickoffUTC: '2026-06-24T22:00:00Z', city: 'Miami Gardens', stadium: 'Hard Rock Stadium' },
  { id: '018', home: 'Marruecos', away: 'Haití', group: 'C', kickoffUTC: '2026-06-24T22:00:00Z', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },
  { id: '019', home: 'Estados Unidos', away: 'Paraguay', group: 'D', kickoffUTC: '2026-06-13T01:00:00Z', city: 'Inglewood', stadium: 'SoFi Stadium' },
  { id: '020', home: 'Australia', away: 'Turquía', group: 'D', kickoffUTC: '2026-06-14T04:00:00Z', city: 'Vancouver', stadium: 'BC Place' },
  { id: '021', home: 'Estados Unidos', away: 'Australia', group: 'D', kickoffUTC: '2026-06-19T19:00:00Z', city: 'Seattle', stadium: 'Lumen Field' },
  { id: '022', home: 'Turquía', away: 'Paraguay', group: 'D', kickoffUTC: '2026-06-20T03:00:00Z', city: 'Santa Clara', stadium: 'Levi\'s Stadium' },
  { id: '023', home: 'Estados Unidos', away: 'Turquía', group: 'D', kickoffUTC: '2026-06-26T02:00:00Z', city: 'Inglewood', stadium: 'SoFi Stadium' },
  { id: '024', home: 'Paraguay', away: 'Australia', group: 'D', kickoffUTC: '2026-06-26T02:00:00Z', city: 'Santa Clara', stadium: 'Levi\'s Stadium' },
  { id: '025', home: 'Alemania', away: 'Curazao', group: 'E', kickoffUTC: '2026-06-14T17:00:00Z', city: 'Houston', stadium: 'NRG Stadium' },
  { id: '026', home: 'C. de Marfil', away: 'Ecuador', group: 'E', kickoffUTC: '2026-06-14T23:00:00Z', city: 'Filadelfia', stadium: 'Lincoln Financial Field' },
  { id: '027', home: 'Alemania', away: 'C. de Marfil', group: 'E', kickoffUTC: '2026-06-20T20:00:00Z', city: 'Toronto', stadium: 'BMO Field' },
  { id: '028', home: 'Ecuador', away: 'Curazao', group: 'E', kickoffUTC: '2026-06-21T00:00:00Z', city: 'Kansas City', stadium: 'Arrowhead Stadium' },
  { id: '029', home: 'Alemania', away: 'Ecuador', group: 'E', kickoffUTC: '2026-06-25T20:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },
  { id: '030', home: 'Curazao', away: 'C. de Marfil', group: 'E', kickoffUTC: '2026-06-25T20:00:00Z', city: 'Filadelfia', stadium: 'Lincoln Financial Field' },
  { id: '031', home: 'Países Bajos', away: 'Japón', group: 'F', kickoffUTC: '2026-06-14T20:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },
  { id: '032', home: 'Túnez', away: 'Suecia', group: 'F', kickoffUTC: '2026-06-15T02:00:00Z', city: 'Monterrey', stadium: 'Estadio BBVA' },
  { id: '033', home: 'Países Bajos', away: 'Túnez', group: 'F', kickoffUTC: '2026-06-25T23:00:00Z', city: 'Kansas City', stadium: 'Arrowhead Stadium' },
  { id: '034', home: 'Suecia', away: 'Japón', group: 'F', kickoffUTC: '2026-06-25T23:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },
  { id: '035', home: 'Países Bajos', away: 'Suecia', group: 'F', kickoffUTC: '2026-06-20T17:00:00Z', city: 'Houston', stadium: 'NRG Stadium' },
  { id: '036', home: 'Japón', away: 'Túnez', group: 'F', kickoffUTC: '2026-06-21T04:00:00Z', city: 'Monterrey', stadium: 'Estadio BBVA' },
  { id: '037', home: 'Bélgica', away: 'Irán', group: 'G', kickoffUTC: '2026-06-21T19:00:00Z', city: 'Inglewood', stadium: 'SoFi Stadium' },
  { id: '038', home: 'Nueva Zelanda', away: 'Egipto', group: 'G', kickoffUTC: '2026-06-22T01:00:00Z', city: 'Vancouver', stadium: 'BC Place' },
  { id: '039', home: 'Bélgica', away: 'Nueva Zelanda', group: 'G', kickoffUTC: '2026-06-27T03:00:00Z', city: 'Vancouver', stadium: 'BC Place' },
  { id: '040', home: 'Egipto', away: 'Irán', group: 'G', kickoffUTC: '2026-06-27T03:00:00Z', city: 'Seattle', stadium: 'Lumen Field' },
  { id: '041', home: 'Bélgica', away: 'Egipto', group: 'G', kickoffUTC: '2026-06-15T19:00:00Z', city: 'Seattle', stadium: 'Lumen Field' },
  { id: '042', home: 'Irán', away: 'Nueva Zelanda', group: 'G', kickoffUTC: '2026-06-16T01:00:00Z', city: 'Inglewood', stadium: 'SoFi Stadium' },
  { id: '043', home: 'España', away: 'Cabo Verde', group: 'H', kickoffUTC: '2026-06-15T16:00:00Z', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },
  { id: '044', home: 'Arabia Saudita', away: 'Uruguay', group: 'H', kickoffUTC: '2026-06-15T22:00:00Z', city: 'Miami Gardens', stadium: 'Hard Rock Stadium' },
  { id: '045', home: 'España', away: 'Arabia Saudita', group: 'H', kickoffUTC: '2026-06-21T16:00:00Z', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },
  { id: '046', home: 'Uruguay', away: 'Cabo Verde', group: 'H', kickoffUTC: '2026-06-21T22:00:00Z', city: 'Miami Gardens', stadium: 'Hard Rock Stadium' },
  { id: '047', home: 'España', away: 'Uruguay', group: 'H', kickoffUTC: '2026-06-27T00:00:00Z', city: 'Zapopan', stadium: 'Estadio Akron' },
  { id: '048', home: 'Cabo Verde', away: 'Arabia Saudita', group: 'H', kickoffUTC: '2026-06-27T00:00:00Z', city: 'Houston', stadium: 'NRG Stadium' },
  { id: '049', home: 'Francia', away: 'Senegal', group: 'I', kickoffUTC: '2026-06-16T19:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },
  { id: '050', home: 'Noruega', away: 'Irak', group: 'I', kickoffUTC: '2026-06-16T22:00:00Z', city: 'Foxborough', stadium: 'Gillette Stadium' },
  { id: '051', home: 'Francia', away: 'Noruega', group: 'I', kickoffUTC: '2026-06-26T19:00:00Z', city: 'Foxborough', stadium: 'Gillette Stadium' },
  { id: '052', home: 'Senegal', away: 'Irak', group: 'I', kickoffUTC: '2026-06-26T19:00:00Z', city: 'Toronto', stadium: 'BMO Field' },
  { id: '053', home: 'Francia', away: 'Irak', group: 'I', kickoffUTC: '2026-06-22T21:00:00Z', city: 'Filadelfia', stadium: 'Lincoln Financial Field' },
  { id: '054', home: 'Noruega', away: 'Senegal', group: 'I', kickoffUTC: '2026-06-23T00:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },
  { id: '055', home: 'Argentina', away: 'Argelia', group: 'J', kickoffUTC: '2026-06-17T01:00:00Z', city: 'Kansas City', stadium: 'Arrowhead Stadium' },
  { id: '056', home: 'Austria', away: 'Jordania', group: 'J', kickoffUTC: '2026-06-17T04:00:00Z', city: 'Santa Clara', stadium: 'Levi\'s Stadium' },
  { id: '057', home: 'Argentina', away: 'Austria', group: 'J', kickoffUTC: '2026-06-22T17:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },
  { id: '058', home: 'Jordania', away: 'Argelia', group: 'J', kickoffUTC: '2026-06-23T03:00:00Z', city: 'Santa Clara', stadium: 'Levi\'s Stadium' },
  { id: '059', home: 'Argentina', away: 'Jordania', group: 'J', kickoffUTC: '2026-06-28T02:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },
  { id: '060', home: 'Argelia', away: 'Austria', group: 'J', kickoffUTC: '2026-06-28T02:00:00Z', city: 'Kansas City', stadium: 'Arrowhead Stadium' },
  { id: '061', home: 'Portugal', away: 'Congo DR', group: 'K', kickoffUTC: '2026-06-17T17:00:00Z', city: 'Houston', stadium: 'NRG Stadium' },
  { id: '062', home: 'Uzbekistán', away: 'Colombia', group: 'K', kickoffUTC: '2026-06-18T02:00:00Z', city: 'Ciudad de México', stadium: 'Estadio Azteca' },
  { id: '063', home: 'Portugal', away: 'Uzbekistán', group: 'K', kickoffUTC: '2026-06-23T17:00:00Z', city: 'Houston', stadium: 'NRG Stadium' },
  { id: '064', home: 'Colombia', away: 'Congo DR', group: 'K', kickoffUTC: '2026-06-24T02:00:00Z', city: 'Zapopan', stadium: 'Estadio Akron' },
  { id: '065', home: 'Portugal', away: 'Colombia', group: 'K', kickoffUTC: '2026-06-27T23:30:00Z', city: 'Miami Gardens', stadium: 'Hard Rock Stadium' },
  { id: '066', home: 'Congo DR', away: 'Uzbekistán', group: 'K', kickoffUTC: '2026-06-27T23:30:00Z', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },
  { id: '067', home: 'Ghana', away: 'Panamá', group: 'L', kickoffUTC: '2026-06-17T23:00:00Z', city: 'Toronto', stadium: 'BMO Field' },
  { id: '068', home: 'Inglaterra', away: 'Croacia', group: 'L', kickoffUTC: '2026-06-17T20:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },
  { id: '069', home: 'Inglaterra', away: 'Ghana', group: 'L', kickoffUTC: '2026-06-23T20:00:00Z', city: 'Foxborough', stadium: 'Gillette Stadium' },
  { id: '070', home: 'Panamá', away: 'Croacia', group: 'L', kickoffUTC: '2026-06-23T23:00:00Z', city: 'Toronto', stadium: 'BMO Field' },
  { id: '071', home: 'Inglaterra', away: 'Panamá', group: 'L', kickoffUTC: '2026-06-27T21:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },
  { id: '072', home: 'Croacia', away: 'Ghana', group: 'L', kickoffUTC: '2026-06-27T21:00:00Z', city: 'Filadelfia', stadium: 'Lincoln Financial Field' },
]

function buildTeamMap() {
  const map = {}
  Object.values(GRUPOS).flat().forEach(t => { map[t.name] = t })
  return map
}

function genGroupMatches() {
  const teamMap = buildTeamMap()
  return GROUP_MATCHES_DATA.map((m) => ({
    id: m.id,
    group: m.group,
    home: teamMap[m.home] || { name: m.home, flag: '🏳️' },
    away: teamMap[m.away] || { name: m.away, flag: '🏳️' },
    kickoffUTC: m.kickoffUTC,
    city: m.city,
    stadium: m.stadium,
    phase: 'group',
    knockout: false,
  }))
}

// ─────────────────────────────────────────────────────
// PARTIDOS ELIMINATORIOS - MUNDIAL 2026
// Horarios en UTC (Madrid CEST = UTC+2, restamos 2h)
// IDs r32_1 … r32_16 preservados para no invalidar pronósticos
// ─────────────────────────────────────────────────────

export const KNOCKOUT_MATCHES = [
  // ── RONDA DE 32 (Resultados reales del sorteo) ────
  { id: 'r32_1',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Sudáfrica', flag: '🇿🇦' }, away: { name: 'Canadá', flag: '🇨🇦' },
    kickoffUTC: '2026-06-28T19:00:00Z', city: 'Inglewood', stadium: 'SoFi Stadium' },

  { id: 'r32_2',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Brasil', flag: '🇧🇷' }, away: { name: 'Japón', flag: '🇯🇵' },
    kickoffUTC: '2026-06-29T17:00:00Z', city: 'Houston', stadium: 'NRG Stadium' },

  { id: 'r32_3',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Alemania', flag: '🇩🇪' }, away: { name: 'Paraguay', flag: '🇵🇾' },
    kickoffUTC: '2026-06-29T20:30:00Z', city: 'Foxborough', stadium: 'Gillette Stadium' },

  { id: 'r32_4',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'C. de Marfil', flag: '🇨🇮' }, away: { name: 'Noruega', flag: '🇳🇴' },
    kickoffUTC: '2026-06-30T17:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },

  { id: 'r32_5',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Francia', flag: '🇫🇷' }, away: { name: 'Suecia', flag: '🇸🇪' },
    kickoffUTC: '2026-06-30T21:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },

  { id: 'r32_6',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Países Bajos', flag: '🇳🇱' }, away: { name: 'Marruecos', flag: '🇲🇦' },
    kickoffUTC: '2026-06-30T01:00:00Z', city: 'Monterrey', stadium: 'Estadio BBVA' },

  { id: 'r32_7',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'México', flag: '🇲🇽' }, away: { name: 'Ecuador', flag: '🇪🇨' },
    kickoffUTC: '2026-07-01T01:00:00Z', city: 'Ciudad de México', stadium: 'Estadio Azteca' },

  { id: 'r32_8',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, away: { name: 'Congo DR', flag: '🇨🇩' },
    kickoffUTC: '2026-07-01T16:00:00Z', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },

  { id: 'r32_9',  group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Bélgica', flag: '🇧🇪' }, away: { name: 'Senegal', flag: '🇸🇳' },
    kickoffUTC: '2026-07-01T20:00:00Z', city: 'Seattle', stadium: 'Lumen Field' },

  { id: 'r32_10', group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Estados Unidos', flag: '🇺🇸' }, away: { name: 'Bosnia', flag: '🇧🇦' },
    kickoffUTC: '2026-07-02T00:00:00Z', city: 'Santa Clara', stadium: "Levi's Stadium" },

  { id: 'r32_11', group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'España', flag: '🇪🇸' }, away: { name: 'Austria', flag: '🇦🇹' },
    kickoffUTC: '2026-07-02T19:00:00Z', city: 'Inglewood', stadium: 'SoFi Stadium' },

  { id: 'r32_12', group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Portugal', flag: '🇵🇹' }, away: { name: 'Croacia', flag: '🇭🇷' },
    kickoffUTC: '2026-07-02T23:00:00Z', city: 'Toronto', stadium: 'BMO Field' },

  { id: 'r32_13', group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Suiza', flag: '🇨🇭' }, away: { name: 'Argelia', flag: '🇩🇿' },
    kickoffUTC: '2026-07-03T03:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },

  { id: 'r32_14', group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Australia', flag: '🇦🇺' }, away: { name: 'Egipto', flag: '🇪🇬' },
    kickoffUTC: '2026-07-03T18:00:00Z', city: 'Kansas City', stadium: 'Arrowhead Stadium' },

  { id: 'r32_15', group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Argentina', flag: '🇦🇷' }, away: { name: 'Cabo Verde', flag: '🇨🇻' },
    kickoffUTC: '2026-07-03T22:00:00Z', city: 'Miami Gardens', stadium: 'Hard Rock Stadium' },

  { id: 'r32_16', group: 'R32', phase: 'round32', knockout: true,
    home: { name: 'Colombia', flag: '🇨🇴' }, away: { name: 'Ghana', flag: '🇬🇭' },
    kickoffUTC: '2026-07-04T01:30:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },

  // ── OCTAVOS DE FINAL ─────────────────────────────
  { id: 'r16_1', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'Canadá', flag: '🇨🇦' }, away: { name: 'Marruecos', flag: '🇲🇦' },
    kickoffUTC: '2026-07-04T17:00:00Z', city: 'Houston', stadium: 'NRG Stadium' },
 
  { id: 'r16_2', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'Paraguay', flag: '🇵🇾' }, away: { name: 'Francia', flag: '🇫🇷' },
    kickoffUTC: '2026-07-04T21:00:00Z', city: 'Filadelfia', stadium: 'Lincoln Financial Field' },
 
  { id: 'r16_3', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'Brasil', flag: '🇧🇷' }, away: { name: 'Noruega', flag: '🇳🇴' },
    kickoffUTC: '2026-07-05T20:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },
 
  { id: 'r16_4', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'México', flag: '🇲🇽' }, away: { name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    kickoffUTC: '2026-07-06T00:00:00Z', city: 'Ciudad de México', stadium: 'Estadio Azteca' },
 
  { id: 'r16_5', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'Portugal', flag: '🇵🇹' }, away: { name: 'España', flag: '🇪🇸' },
    kickoffUTC: '2026-07-06T19:00:00Z', city: 'Arlington', stadium: 'AT&T Stadium' },
 
  { id: 'r16_6', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'Estados Unidos', flag: '🇺🇸' }, away: { name: 'Bélgica', flag: '🇧🇪' },
    kickoffUTC: '2026-07-07T01:00:00Z', city: 'Seattle', stadium: 'Lumen Field' },
 
  { id: 'r16_7', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'Argentina', flag: '🇦🇷' }, away: { name: 'Egipto', flag: '🇪🇬' },
    kickoffUTC: '2026-07-07T16:00:00Z', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium' },
 
  { id: 'r16_8', group: 'R16', phase: 'round16', knockout: true,
    home: { name: 'Suiza', flag: '🇨🇭' }, away: { name: 'Colombia', flag: '🇨🇴' },
    kickoffUTC: '2026-07-07T20:00:00Z', city: 'Vancouver', stadium: 'BC Place' },

  // ── CUARTOS ──────────────────────────────────────
  { id: 'qf_1', group: 'QF', phase: 'quarter', knockout: true,
    home: { name: 'G1 R16', flag: '🔵' }, away: { name: 'G2 R16', flag: '🔴' },
    kickoffUTC: '2026-07-12T20:00:00Z', city: 'TBD', stadium: 'TBD' },
  { id: 'qf_2', group: 'QF', phase: 'quarter', knockout: true,
    home: { name: 'G3 R16', flag: '🔵' }, away: { name: 'G4 R16', flag: '🔴' },
    kickoffUTC: '2026-07-13T00:00:00Z', city: 'TBD', stadium: 'TBD' },
  { id: 'qf_3', group: 'QF', phase: 'quarter', knockout: true,
    home: { name: 'G5 R16', flag: '🔵' }, away: { name: 'G6 R16', flag: '🔴' },
    kickoffUTC: '2026-07-13T20:00:00Z', city: 'TBD', stadium: 'TBD' },
  { id: 'qf_4', group: 'QF', phase: 'quarter', knockout: true,
    home: { name: 'G7 R16', flag: '🔵' }, away: { name: 'G8 R16', flag: '🔴' },
    kickoffUTC: '2026-07-14T00:00:00Z', city: 'TBD', stadium: 'TBD' },

  // ── SEMIS ─────────────────────────────────────────
  { id: 'sf_1', group: 'SF', phase: 'semi', knockout: true,
    home: { name: 'G1 QF', flag: '🔵' }, away: { name: 'G2 QF', flag: '🔴' },
    kickoffUTC: '2026-07-15T23:00:00Z', city: 'TBD', stadium: 'TBD' },
  { id: 'sf_2', group: 'SF', phase: 'semi', knockout: true,
    home: { name: 'G3 QF', flag: '🔵' }, away: { name: 'G4 QF', flag: '🔴' },
    kickoffUTC: '2026-07-16T23:00:00Z', city: 'TBD', stadium: 'TBD' },

  // ── TERCER LUGAR ──────────────────────────────────
  { id: 'tp_1', group: '3P', phase: 'third', knockout: true,
    home: { name: 'Perdedor SF-1', flag: '🔵' }, away: { name: 'Perdedor SF-2', flag: '🔴' },
    kickoffUTC: '2026-07-19T19:00:00Z', city: 'TBD', stadium: 'TBD' },

  // ── FINAL ─────────────────────────────────────────
  { id: 'final', group: 'FINAL', phase: 'final', knockout: true,
    home: { name: 'Ganador SF-1', flag: '🏆' }, away: { name: 'Ganador SF-2', flag: '🏆' },
    kickoffUTC: '2026-07-19T23:00:00Z', city: 'East Rutherford', stadium: 'MetLife Stadium' },
]

export const ALL_MATCHES = [...genGroupMatches(), ...KNOCKOUT_MATCHES]

export const PHASE_LABELS = {
  group:   'Fase de Grupos',
  round32: 'Ronda de 32',
  round16: 'Octavos de Final',
  quarter: 'Cuartos de Final',
  semi:    'Semifinales',
  third:   'Tercer Lugar',
  final:   '⭐ Gran Final',
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