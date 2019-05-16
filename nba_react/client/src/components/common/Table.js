import React from 'react';
import './Table.css';

const Table = ({ headers, keys, rows, rowClick }) => {
  const headerCells = headers.map((data, index) => {
    return data.text ? <th key={index} width={data.width}>{data.text}</th> : <th key={index}>{data}</th>;
  });
  const rowCells = rows.map((row, index) => {
    return (
      <tr key={index} onClick={() => rowClick(row)}>
        {keys.map((key, index) => <td width={headers[index].width} key={index}>{row[key]}</td>)}
      </tr>
    );
  });
  return (
      <div id="constrainer">
        <div className="scrolltable">
          <div className="header">
            <table className="table table-bordered table-condensed">
              <thead>
                <tr>{headerCells}</tr>
              </thead>
            </table>
          </div>
          <div className="body">
            <table className="table table-bordered table-condensed table-hover">
              <tbody>
                {rowCells}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
}

export default Table;

