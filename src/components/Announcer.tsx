import './Announcer.scss';

import React from 'react';

interface AnnProps {
  player: string;
  restart: () => void;
}

const Announcer = ({ player, restart }: AnnProps) => {
  return (
    <div className="announce" onClick={restart}>
      {player && (
        <div className="statement">
          🎉 <span className={player}>{player}</span> wins ✨
        </div>
      )}
      {!player && <div className="statement">It's a draw 😑</div>}
    </div>
  );
};

export default Announcer;
