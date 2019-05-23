import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Index.css';
import { Link } from 'react-router-dom';

// Components
import Table from '../common/Table';
import BetRows from './index/BetRows';

// Constants
import { HEADERS, KEYS } from '../../const/games';

const Index = ({ season, games, period, range, sport, rowClick, onChange, selectPeriod }) => {
  const ROWS = games[period] || [];
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
      <BetRows games={games[period]} />
      <Row>
        <Col lg={12}>
          <Table headers={HEADERS} rows={ROWS} keys={KEYS} rowClick={rowClick} /> 
        </Col>
      </Row>
    </div>
  );
};

export default Index;

