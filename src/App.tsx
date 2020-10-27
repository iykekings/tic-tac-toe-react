import './App.scss';

import React, { useState } from 'react';

import Announcer from './components/Announcer';
import Game from './components/Game';
import { genWinState } from './util';

function App() {
  function handleclick(i: number) {
    setBoard((pre) => {
      pre[i] = pre[i] ? pre[i] : turn;
      return pre;
    });
    setTurn((pre) => {
      check(pre);
      return pre === 'X' ? 'O' : 'X';
    });
  }
  function start() {
    const len = parseInt(N);
    setBoard(Array(len ** 2).fill(''));
    setWinState([...genWinState(len)].flat(1));
  }

  function same(inp: number[]) {
    return inp.every((item) => board[item] && board[item] === board[inp[0]]);
  }

  function gameOver() {
    setOver(true);
    setTurn('X');
  }

  function check(p: 'X' | 'O') {
    const winLines = winState.filter(same);
    console.log({ p });
    if (winLines.length) {
      setWinningLine(winLines[0]);
      console.log(winLines);
      // setTimeout(() => {
      setWinner(p);
      gameOver();
      // }, 1000);
      return;
    }

    if (board.filter((cell) => cell.length === 0).length === 0) {
      setWinner('');
      gameOver();
    }
  }
  function restart(full: boolean) {
    setTurn('X');
    setOver(false);
    setWinner('');
    setWinningLine([]);
    if (full) {
      setBoard([]);
    } else {
      setBoard((pre) => pre.map(() => ''));
    }
  }

  const [N, setN] = useState('');
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | ''>('');
  const [over, setOver] = useState(false);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [board, setBoard] = useState<Array<'X' | 'O' | ''>>([]);
  const [winState, setWinState] = useState<number[][]>([]);
  return (
    <main className="app">
      {over && <Announcer player={winner} restart={() => restart(false)} />}
      <h1>Tic Tac Toe</h1>
      {board.length < 1 && (
        <div className="input-container">
          <input
            type="number"
            name="N"
            placeholder="Enter size"
            min={2}
            value={N}
            onChange={(e) => setN(e.currentTarget.value)}
          />
          <button disabled={!(parseInt(N) > 1)} onClick={start}>
            Start
          </button>
        </div>
      )}
      {board.length > 0 && (
        <>
          <Game
            board={board}
            len={parseInt(N)}
            select={handleclick}
            winners={winningLine}
          />
          <div className="btns">
            <button onClick={() => restart(false)}>Reset Play</button>
            <button className="danger" onClick={() => restart(true)}>
              Restart Game
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
