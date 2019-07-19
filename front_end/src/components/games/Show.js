import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Stylesheet
import './Show.css'

// Components
import Table from '../common/Table'

// Constants
import { HEADERS, KEYS } from '../../const/games/show'

const Show = ({ season, game, period, sport, rowClick }) => {
  const away_team = game.away_team || { players: {} }
  const home_team = game.home_team || { players: {} }
  const away_players = away_team.players[period] || []
  const home_players = home_team.players[period] || []
  const away_table = <Table headers={HEADERS[sport]} keys={KEYS[sport]} rows={away_players} maxHeight="300px" rowClick={rowClick} />
  const home_table = <Table headers={HEADERS[sport]} keys={KEYS[sport]} rows={home_players} maxHeight="300px" rowClick={rowClick} />
  return (
        <div className="game-show">
          <Row>
            <Col lg={12}>
              <div>
                <Link to={`/seasons/${season.id}/games`}>{season.year} {sport.toUpperCase()} Games</Link>
              </div>
              <h1>{away_team.name} @ {home_team.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col className="away-table" lg={12}>
              <p>{away_team.name} Player Stats</p>
              { away_table }
            </Col>
          </Row>
          <Row>
            <Col className="home-table" lg={12}>
              <p>{home_team.name} Player Stats</p>
              { home_table }
            </Col>
          </Row>
        </div>
      )
}

export default Show
