import './Game.scss';

import React from 'react';

import { cellClass } from '../util';

interface GameProps {
  len: number;
  board: string[];
  select(i: number): void;
  winners: number[];
}

const Game = ({ len, board, select, winners }: GameProps) => {
  return (
    <div
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${len}, clamp(1rem, calc(100vw/${len}), 4rem))`,
        gridTemplateRows: `repeat(${len}, clamp(1rem, calc(80vh/${len}), 3.5rem))`,
      }}
    >
      {board.map((cell, i) => (
        <div
          className={
            cellClass(i, len, cell) + `${winners.includes(i) ? ' winner' : ''}`
          }
          key={i}
          onClick={() => select(i)}
          style={{
            fontSize: `clamp(1rem, calc(80vh/${len}), 2.2rem)`,
          }}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default Game;
