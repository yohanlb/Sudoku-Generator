import React, { useEffect, useState } from "react";

function Cell({ cell, handleClickOnCell,handleMouseOver }) {
  const [clickedOn, setClickedOn] = useState(false);

  const handleClick = (e, isRightClick = false) => {
    handleClickOnCell(e, cell.key, isRightClick);
    setClickedOn(true);
  };

  const displayCellValue = () => {
    if (cell.isGiven){
      const cellClass = "cell isGiven " + (cell.highlighted ? " highlighted" : "");
      return (
        <div className={cellClass}>
          <span className="cell-number">{cell.actualValue}</span>
        </div>
      );
    }

    else {
      const cellClass = "cell notGiven " + (clickedOn ? " clicked" : "") + (cell.highlighted ? " highlighted" : "");
      return (
        <div
          className={cellClass}
          onMouseOver={() => {handleMouseOver(cell)}}
          onTransitionEnd={() => {setClickedOn(false)}}
          onClick={(e) => {
            handleClick(e);
          }}
          onContextMenu={(e) => {
            handleClick(e, true);
          }}
        >
          <span className="cell-number">
            {cell.guessedValue === 0 ? "" : cell.guessedValue}
          </span>
        </div>
      );
    }
  };

  return displayCellValue();
}

export default Cell;
