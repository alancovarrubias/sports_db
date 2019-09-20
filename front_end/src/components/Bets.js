import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { BET_HEADERS, BET_DATA } from '../const'

const BetComponent = ({ bet_counts, range, rangeChange, calculate }) => {
  const all = bet_counts.all
  const rows = BET_DATA.map((data, index) => {
    const bet_count = bet_counts[data.value]
    const wins = bet_count.wins
    const losses = bet_count.losses
    const total = wins + losses
    return (
      <tr key={index}>
        <td>{data.text}</td>
        <td>{wins}</td>
        <td>{losses}</td>
        <td>{total === 0 ? 0.0 : ((wins/total).toFixed(4) * 100).toFixed(2)}</td>
        <td>{all - total}</td>
      </tr>
    )
  })
  return (
    <div>
      <Row>
        <Col lgOffset={5} lg={2} className="mb-3">
          <label>
            Range:
            <div className="input-group input-group-sm">
              <input type="number" className="form-control" value={range} onChange={rangeChange} step="0.1" />
              <div className="input-group-btn">
                <button className="btn btn-outline-secondary" type="button" onClick={calculate}>Calculate</button>
              </div>
            </div>
          </label>
        </Col>
      </Row>
      <Row>
        <Col lgOffset={4} lg={4} className="mb-3">
          <table className="table table-bordered table-condensed">
            <thead>
              <tr>
                {BET_HEADERS.map((header, index) => <th key={index}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}

const winOrLoss = (line, prediction, actual, range) => {
  const prediction_diff = prediction - line
  const actual_diff = actual - line
  const flag = Math.abs(prediction_diff) > range
  if (flag) {
    if (prediction_diff > 0) {
      return (actual_diff > 0) ? 1 : -1
    } else if (prediction_diff < 0) {
      return (actual_diff < 0) ? 1 : -1
    } else {
      return 0
    }
  } else {
    return 0
  }
}

class Bets extends Component {
  constructor(props) {
    super(props)
    const bet_counts = {
      all: 0,
      spread: {
        wins: 0,
        losses: 0,
      },
      total: {
        wins: 0,
        losses: 0,
      }
    }
    const range = 0
    this.state = { range, bet_counts }
  }

  rangeChange = (event) => {
    const range = event.target.value < 0 ? 0 : event.target.value
    this.setState({ range })
  }

  calculate = () => {
    const total_count = {
      wins: 0,
      losses: 0,
    }
    const spread_count = {
      wins: 0,
      losses: 0,
    }
    let all = 0
    const { range } = this.state
    const { bets } = this.props
    bets.forEach(bet => {
      const away_prediction = bet.away_prediction
      const home_prediction = bet.home_prediction
      const away_score = bet.away_score
      const home_score = bet.home_score
      const total = bet.total
      const spread = bet.spread
      if (away_prediction !== "N/A" && home_prediction !== "N/A") {
        all += 1
        const total_prediction = home_prediction + away_prediction
        const total_actual = home_score + away_score
        const total_win_or_loss = winOrLoss(total, total_prediction, total_actual, range)
        if (total_win_or_loss === 1) {
          total_count.wins += 1
        } else if (total_win_or_loss === -1) {
          total_count.losses += 1
        }
        const spread_prediction = away_prediction - home_prediction
        const spread_actual = away_score - home_score
        const spread_win_or_loss = winOrLoss(spread, spread_prediction, spread_actual, range)
        if (spread_win_or_loss > 0) {
          spread_count.wins += 1
        } else if (spread_win_or_loss < 0) {
          spread_count.losses += 1
        }
      }
    })
    const bet_counts = {
      total: total_count,
      spread: spread_count,
      all,
    }
    this.setState({ bet_counts })
  }

  render() {
    return <BetComponent bet_counts={this.state.bet_counts} range={this.state.range} rangeChange={this.rangeChange} calculate={this.calculate}/>
  }
}

export default Bets
