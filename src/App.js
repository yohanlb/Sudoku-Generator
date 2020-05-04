import React, { useEffect, useState, useRef } from 'react';
import CellDisplay from './components/CellDisplay';
import Cell from './scripts/Cell';
import * as GridFunc from './scripts/gridFunctions.js';
import * as GridValues from './scripts/gridValues.js';
import * as Solver from './scripts/solver.js';
import SidePanel from './components/SidePanel';


import './styles/App.scss';

let history = [];

function App() {


  const [cells, setCells] = useState([]);
  const [solverResult, setSolverResult] = useState("");
  const [cellInfo, setCellInfo] = useState({});
  //const [history, setHistory ] = useState([]);

 

  useInterval(() => {
    Tick()
  }, 20);

  
  const Tick = () => {

    console.log(history.length);
    // PLAY HISTORY
    if(history.length > 0){
      const newCells = [...cells];

      newCells[history[0].key].setSolvedValue(history[0].actualValue);
      setCells(newCells);
      history.shift();

    } 

  }

   
  const addToHistory = (_newStep) =>{
    history = history.concat(_newStep);
  }

  useEffect(() => {

    let tempCells = [];
    for (let i = 0; i < 9*9; i++) {
        tempCells.push(new Cell(i));
    }

    console.log(tempCells);
    //tempCells = LoadGridValues(tempCells, GridValues.arrayA)
    setCells(tempCells);


  }, [])

  const ClearGridValues = (_cells) => {
    let newCells = [ ..._cells];
    history = []; //clear history
    newCells.forEach(cell => {
       cell.clearCell();
    });

    return newCells;

  }

  const LoadGridValues = (_cells, values) => {
    let newCells = [..._cells];
    
    history = []; //clear history
    newCells = ClearGridValues(newCells);
    newCells.forEach(cell => {
      if (values[cell.key] !== 0) {
        cell.setGivenValue(values[cell.key]);
      }
    });
    return newCells
  }
  const handleClickOnClearAll = () =>{
    setCells(ClearGridValues(cells));
  }
  const handleClickOnLoadValues = () =>{
    setCells(LoadGridValues(cells, GridValues.arrayA));
  }

  const UpdateCells = (_cells) =>{
    setCells(_cells);

  }
  

  const handleClickOnSolve = (stepByStep = false) => {
    const solverResult = Solver.solveGrid([ ...cells], addToHistory, stepByStep)

    if(!stepByStep){
      setCells(solverResult[0]);
    }
    setSolverResult(solverResult[1]);
  }

  const handleMouseLeaveGrid = () => {
    setCellInfo({});
  }

  const handleMouseOver = (_cellKey) =>{
    cells[_cellKey].setPossibleValues(Solver.getPossibleValuesForCell(cells, cells[_cellKey]));
    setCellInfo(cells[_cellKey].getCellInfo());

    //const newCells = JSON.parse(JSON.stringify(cells));

    //setCellInfo(_cell.getCellInfo())

    //const possibleVal = Solver.getPossibleValuesForCell(newCells, _cell);
    //setPossibleValues(possibleVal);
/*
    newCells.forEach((row) => {
      row.forEach((cell) => {
        cell.highlighted= false;
      });
    });
    */
    //GridFunc.returnSquareCells(newCells, _cell).forEach((cell)=>{cell.highlighted = true});
    //GridFunc.returnEntireColCells(newCells, _cell).forEach((cell)=>{cell.highlighted = true});
    //GridFunc.returnEntireRowCells(newCells, _cell).forEach((cell)=>{cell.highlighted = true});
    
   // setCells(newCells);
    
  }

  const handleClickOnCell = (event, _key, isRightClick = false) => {
    event.preventDefault();
    const newCells = [...cells];

    let clickedCell = newCells[_key];

    if (clickedCell != null) {
      //calc new cell value
      let newCellValue = clickedCell.guessedValue + (isRightClick ? -1 : 1);
      newCellValue < 0 && (newCellValue = 9);
      newCellValue > 9 && (newCellValue = 0);

      //assign the new cell value and update de main array;
      clickedCell.setGuessedValue(newCellValue);
      setCells(newCells);

  
    }


  }






  return (
    <div className="App">
      <div className="grid-container">
          <div className="grid" onMouseLeave={handleMouseLeaveGrid}>
            {
              cells.map(cell => {
                return (
                  <CellDisplay
                    key={cell.key}
                    cell={cell}
                    handleClickOnCell={handleClickOnCell}
                    handleMouseOver={handleMouseOver}
                  />
                )
              })
            }
          </div>
      </div>
     
      <SidePanel 
        cellInfo={cellInfo}
        handleClickOnSolve={handleClickOnSolve}
        handleClickOnClearAll={handleClickOnClearAll}
        handleClickOnLoadValues={handleClickOnLoadValues}
        solverResult={solverResult}
      />
   
      {/* <PossibleValues possibleValues={possibleValues}/> */}

    </div>
  );
}

export default App;





// Allow to use interval with hooks
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}