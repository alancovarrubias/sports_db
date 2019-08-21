import React from 'react'
import { Row, Col } from 'react-bootstrap'
import './Index.css'
import { Link } from 'react-router-dom'

// Components
import Table from '../common/Table'
import BetRows from './index/BetRows'

// Constants
import { HEADERS, KEYS } from '../../const/games'

const Index = ({ season, games, period, range, sport, gameClick, onChange, selectPeriod }) => {
  return (
    <div className="game-index">
      <Row>
        <Col lg={12}>
          <div>
            <Link to="/seasons">Seasons</Link>
          </div>
          <h1>{season.year} {sport.toUpperCase()} Games </h1>
        </Col>
      </Row>
      <BetRows games={games} />
      <Row>
        <Col lg={12}>
          <Table headers={HEADERS} keys={KEYS} rows={games} rowClick={gameClick} /> 
        </Col>
      </Row>
    </div>
  )
}

export default Index

