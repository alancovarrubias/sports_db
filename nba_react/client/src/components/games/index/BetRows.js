import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

const BetComponent = ({ bets, range, rangeChange, calculate }) => {
  const headers = ["", "Wins", "Losses", "Win Percentage",  "Skipped Bets"];
  const rowData = [{ text: "Spread", value: "spread" }, { text: "Total", value: "total" }];;
  const rows = rowData.map((data, index) => {
    const wins = bets[data.value].wins;
    const losses = bets[data.value].losses;
    const total = wins + losses;
    return (
      <tr key={index}>
        <td>{data.text}</td>
        <td>{wins}</td>
        <td>{losses}</td>
        <td>{total === 0 ? 0.0 : ((wins/total).toFixed(4) * 100).toFixed(2)}</td>
        <td>{bets.count - wins - losses}</td>
      </tr>
    );
  });
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
                {headers.map((header, index) => <th key={index}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

class BetRows extends Component {
  constructor(props) {
    super(props);
    this.rangeChange = this.rangeChange.bind(this);
    this.calculate = this.calculate.bind(this);
    const bets = {
      count: 0,
      spread: {
        wins: 0,
        losses: 0
      },
      total: {
        wins: 0,
        losses: 0
      }
    };
    const range = 0;
    this.state = { range, bets };
  }

  rangeChange(event) {
    const range = event.target.value;
    this.setState({ range });
  }

  calculate() {
    const games = this.props.games || [];
    const winOrLoss = (line, pred, game, range) => {
      const pred_diff = pred - line;
      const game_diff = game - line;
      const flag = Math.abs(pred_diff) > range;
      if (flag) {
        if (pred_diff > 0) {
          return (game_diff > 0) ? 1 : -1;
        } else if (pred_diff < 0) {
          return (game_diff < 0) ? 1 : -1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    };
    let count = 0;
    const total = {
      wins: 0,
      losses: 0
    };
    const spread = {
      wins: 0,
      losses: 0
    };
    games.forEach(game => {
      if (game.away_pred !== "N/A" && game.home_pred !== "N/A") {
        count += 1;
        const pred_total = game.home_pred + game.away_pred;
        const game_total = game.home_score + game.away_score;
        const total_win_or_loss = winOrLoss(game.total, pred_total, game_total, this.state.range);
        if (total_win_or_loss > 0) {
          total.wins += 1;
        } else if (total_win_or_loss < 0) {
          total.losses += 1;
        }
        const pred_spread = game.away_pred - game.home_pred;
        const game_spread = game.away_score - game.home_score;
        const spread_win_or_loss = winOrLoss(game.spread, pred_spread, game_spread, this.state.range);
        if (spread_win_or_loss > 0) {
          spread.wins += 1;
        } else if (spread_win_or_loss < 0) {
          spread.losses += 1;
        }
      }
    });
    const bets = {
      count,
      total,
      spread
    };
    this.setState({ bets });
  }

  render() {
    return <BetComponent bets={this.state.bets} range={this.state.range} rangeChange={this.rangeChange} calculate={this.calculate}/>;
  }
}

export default BetRows;
