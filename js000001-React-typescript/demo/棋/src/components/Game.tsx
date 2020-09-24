import React, { useState, useEffect } from 'react';
import Board from './Board';
import '../public/css/Game.css';
function Game() {
  let [player, setPlayer] = useState(true);
  let [result, setResult] = useState(Array(9));
  let [winner, setWin] = useState('');
  let [history, setHistory] = useState([]);
  const handle = (r: boolean, index: number) => {
    async function getResult() {
      await setResult(() => {
        let ary = result;
        ary[index] = r;
        return [...ary];
      });
      let n = 0;
      setHistory(() => {
        let ary: any = [...history];
        ary.push(result);
        return ary;
      });
      let res = computResult(result);
      if (res) {
        setWin('O');
      } else if (res === false) {
        setWin('X');
      }
      result.forEach((x) => {
        if (x === true || x === false) {
          n++;
        }
      });
      if (n === 9) {
        setWin(`no win`);
      }
    }
    getResult();
    setPlayer(r);
  };
  useEffect(() => {
    // let winner = computResult(result);
  });
  function computResult(ary: boolean[]) {
    let chessAry = ary.map((x) => {
      if (x) {
        return 1;
      } else if (x === false) {
        return 0;
      }
      return 88;
    });
    for (let i = 0; i < 7; i = i + 3) {
      if (chessAry[i] + chessAry[i + 1] + chessAry[i + 2] === 0) {
        return false;
      } else if (chessAry[i] + chessAry[i + 1] + chessAry[i + 2] === 3) {
        return true;
      }
      if (chessAry[i / 3] + chessAry[i / 3 + 3] + chessAry[i / 3 + 6] === 0) {
        return false;
      } else if (
        chessAry[i / 3] + chessAry[i / 3 + 3] + chessAry[i / 3 + 6] ===
        3
      ) {
        return true;
      }
    }
    if (chessAry[0] + chessAry[4] + chessAry[8] === 0) {
      return false;
    } else if (chessAry[0] + chessAry[4] + chessAry[8] === 3) {
      return true;
    }
    if (chessAry[2] + chessAry[4] + chessAry[6] === 0) {
      return false;
    } else if (chessAry[2] + chessAry[4] + chessAry[6] === 3) {
      return true;
    }
  }
  function clearHistory(index?: any) {
    if (index) {
      let ary = history;
      setResult(ary[index]);
      setHistory(ary.slice(0, index));
    } else {
      setHistory([]);
    }
  }
  const elements = Array(9)
    .fill(1)
    .map((e, index) => {
      return (
        <Board
          key={index}
          onStatus={handle}
          status={{ player, index }}
          gDisable={Boolean(winner)}
        />
      );
    });
  let element = winner ? (
    <span className="step">Winner:{winner}</span>
  ) : (
    <span className="step">Next player:{player ? 'X' : 'O'}</span>
  );
  let step = history.map((x, index) => {
    return (
      <div key={index} className="history">
        <span className="step">{index + 2}.</span>
        &nbsp;
        <button className="step" onClick={() => clearHistory(index + 1)}>
          Go To Move #{index + 1}
        </button>
      </div>
    );
  });
  return (
    <div>
      <div className="game">
        <div className="foo">{elements.slice(0, 3)}</div>
        <div className="foo">{elements.slice(3, 6)}</div>
        <div className="foo">{elements.slice(6, 9)}</div>
      </div>
      {element}
      <br />
      <div className="history">
        <span className="step">1.</span>{' '}
        <button onClick={() => clearHistory()}>Go to game start</button>
      </div>
      {step}
    </div>
  );
}
export default Game;
