import React, { useState } from 'react';
import '../public/css/board.css';
function Board(props: any) {
  const [result, setResult] = useState('O');

  const handle = () => {
    setDisable(true);
    if (props.status.player) {
      setResult('X');
    }
    props.onStatus(!props.status.player, props.status.index);
  };
  const [isDisable, setDisable] = useState(false);
  // console.log(props.gDisable);

  return (
    <button
      className="row"
      onClick={handle}
      disabled={isDisable || props.gDisable}
    >
      {isDisable ? result : false}
    </button>
  );
}
export default Board;
