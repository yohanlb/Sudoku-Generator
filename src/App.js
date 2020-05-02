import React, { useEffect, useState } from 'react';
import CellDisplay from './components/CellDisplay';
import Cell from './components/Cell';
import * as GridFunc from './grid-helper-functions.js';
import * as GridValues from './gridValues.js';

import './App.css';
import PossibleValues from './components/PossibleValues';
import SolverResult from './components/SolverResult';

function App() {

  const numRow = 9;
  const numCol = 9;

  // let cells = [];

  const [cells, setCells] = useState([]);
  const [possibleValues, setPossibleValues] = useState([]);
  const [solverResult, setSolverResult] = useState("");

  // const addCell = (newCell) =>{
  //   console.log("Adding cell : ", newCell);
  //   setCells([...cells, newCell]);
  // }

  useEffect(() => {

    const tempCells = [];
    let key = 0;
    for (let row = 0; row < numRow; row++) {
      const currentRow = [];
      for (let col = 0; col < numCol; col++) {
        currentRow.push(new Cell(key, col, row));
        key++;
      }
      tempCells.push(currentRow);
    }

    console.log(tempCells);
    LoadGridValues(tempCells, GridValues.arrayA)
    setCells(tempCells);

  }, [])


  const ClearGridValues = (_cells) => {
    const newGrid = [..._cells];

    newGrid.forEach((row) => {
      row.forEach((cell) => {
        cell.actualValue = 0;
        cell.guessedValue = 0;
        cell.isGiven = false;
      });
    });
    return newGrid;

  }

  const LoadGridValues = (_cells, values) => {
    let newGrid = [..._cells];

    newGrid = ClearGridValues(newGrid);
    newGrid.forEach((row) => {
      row.forEach((cell) => {
        if (values[cell.key] !== 0) {
          cell.actualValue = values[cell.key];
          cell.isGiven = true;
        }
      });
    });
    return newGrid
    //setCells(newGrid);
  }


  const Solve = () =>{
    const solverResult = GridFunc.solver(cells)
    
    setCells(solverResult[0]);
    setSolverResult(solverResult[1]);
  }

  const handleMouseLeaveGrid = () => {
    setPossibleValues([]);
  }

  const handleMouseOver = (_cell) =>{
    const newCells = [ ...cells];
    //console.log("mouseOver");

    const possibleVal = GridFunc.getPossibleValuesForCell(newCells, _cell);
    setPossibleValues(possibleVal);

    newCells.forEach((row) => {
      row.forEach((cell) => {
        cell.highlighted= false;
      });
    });
    GridFunc.returnSquareCells(newCells, _cell).forEach((cell)=>{cell.highlighted = true});
    GridFunc.returnEntireColCells(newCells, _cell).forEach((cell)=>{cell.highlighted = true});
    GridFunc.returnEntireRowCells(newCells, _cell).forEach((cell)=>{cell.highlighted = true});
    
    setCells(newCells);
  }

  // row.find( cell => cell.key === _key)
  const handleClickOnCell = (event, _key, isRightClick = false) => {
    event.preventDefault();
    let newCells = [...cells];

    let clickedCell = null;
    newCells.forEach(row => {
      const search = row.find(cell => cell.key === _key);
      if (search) clickedCell = search;
    });

    if (clickedCell != null) {
      //console.log(clickedCell);
      //calc new cell value
      let newCellValue = clickedCell.guessedValue + (isRightClick ? -1 : 1);
      newCellValue < 0 && (newCellValue = 9);
      newCellValue > 9 && (newCellValue = 0);

      //assign the new cell value and update de main array;
      clickedCell.guessedValue = newCellValue;
      setCells(newCells);

      //GridFunc.returnEntireRowKeys(clickedCell);
  
    }





  }

  return (
    <div className="App">

      <div className="grid" onMouseLeave={handleMouseLeaveGrid}>
        {
          cells.map((row, rowId) => {
            return (
              <div className="row" key={rowId * 100}>
                {row.map((cell, cellId) => <CellDisplay key={cell.key} cell={cell} handleClickOnCell={handleClickOnCell} handleMouseOver={handleMouseOver}/>)}
              </div>
            )
          })
        }
      </div>
      <button onClick={() => { setCells(LoadGridValues(cells, GridValues.arrayA)) }}>Load default values</button>
      <button onClick={() => { setCells(ClearGridValues(cells)) }}>Clear all</button>
      <button onClick={() => { Solve() }}>Solve</button>
      <PossibleValues possibleValues={possibleValues}/>
      <SolverResult solverResult={solverResult} />

    </div>
  );
}

export default App;
