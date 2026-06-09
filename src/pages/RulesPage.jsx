import './RulesPage.css'

const GRUPO_PTS = [
  ['Acertar ganador o empate', '5 pts'],
  ['Goles exactos equipo local', '2 pts'],
  ['Goles exactos equipo visitante', '2 pts'],
  ['Diferencia de goles exacta', '1 pt'],
]

const KNOCKOUT_PTS = [
  ['Acertar ganador o empate', '10 pts'],
  ['Goles exactos equipo local', '4 pts'],
  ['Goles exactos equipo visitante', '4 pts'],
  ['Diferencia de goles exacta', '2 pts'],
]

export default function RulesPage() {
  return (
    <div className="rules-page">
      <div className="rules-intro">
        El sistema de puntuación es en base al resultado y a los goles. Los partidos eliminatorios valen el doble que los de grupos.
      </div>

      <div className="pts-grid">
        <div className="pts-card">
          <div className="pts-card-title">🏟️ Fase de Grupos</div>
          {GRUPO_PTS.map(([label, pts]) => (
            <div className="pts-row" key={label}>
              <span>{label}</span>
              <span className="pts-value">{pts}</span>
            </div>
          ))}
          <div className="pts-max">Máximo por partido: <strong>10 puntos</strong></div>
        </div>

        <div className="pts-card knockout">
          <div className="pts-card-title">🔥 Fases Eliminatorias</div>
          {KNOCKOUT_PTS.map(([label, pts]) => (
            <div className="pts-row" key={label}>
              <span>{label}</span>
              <span className="pts-value">{pts}</span>
            </div>
          ))}
          <div className="pts-max">Máximo por partido: <strong>20 puntos</strong></div>
        </div>
      </div>

      <div className="example-card">
        <div className="example-title">Ejemplo práctico</div>
        <p>Partido: <strong>España vs Francia</strong> — Resultado real: <strong>2-1</strong></p>
        <div className="example-grid">
          {[
            ['2 – 1', 'Resultado exacto', '10 pts', true],
            ['2 – 0', 'Ganador ✓, local exacto ✓', '7 pts', false],
            ['1 – 0', 'Ganador ✓, diferencia exacta ✓', '6 pts', false],
            ['3 – 1', 'Ganador ✓, visitante exacto ✓, diferencia exacta ✓', '8 pts', false],
            ['1 – 1', 'Todo incorrecto', '0 pts', false],
          ].map(([pred, desc, pts, best]) => (
            <div className={`example-row ${best ? 'best' : ''}`} key={pred}>
              <span className="ex-pred">Pronosticaste <strong>{pred}</strong></span>
              <span className="ex-desc">{desc}</span>
              <span className="ex-pts">{pts}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="notes-card">
        <div className="notes-title">📌 Notas importantes</div>
        <ul>
          <li>⏱️ Los pronósticos <strong>cierran 10 min antes</strong> del inicio de cada partido</li>
          <li>⚽ Solo cuentan los <strong>90 minutos reglamentarios</strong> más tiempo de descuento (NO penales ni prórroga)</li>
          <li>🔄 Los resultados se <strong>actualizan automáticamente</strong> desde una API</li>
          <li>🏅 En caso de empate en la tabla: gana quien tenga <strong>más pronósticos perfectos</strong></li>
        </ul>
      </div>
    </div>
  )
}
