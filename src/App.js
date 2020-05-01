import React, { useEffect, useState } from 'react';
import CellDisplay from './components/CellDisplay';
import Cell from './components/Cell';
import * as GridFunc from './grid-helper-functions.js';
import * as GridValues from './gridValues.js';

import './App.css';

function App() {

  const numRow = 9;
  const numCol = 9;

  // let cells = [];

  const [cells, setCells] = useState([]);

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
    setCells(tempCells);

  }, [])


  const ClearGridValues = () =>{
    const newGrid = [...cells];
    

    newGrid.forEach((row)=>{
      row.forEach((cell)=>{
          cell.actualValue = 0;
          cell.guessedValue = 0;
          cell.isGiven = false;
      });
    });
    setCells(newGrid);

  }

  const LoadGridValues = (values) => {
    ClearGridValues();
    const newGrid = [...cells];

    newGrid.forEach((row)=>{
      row.forEach((cell)=>{
        if(values[cell.key] !== 0){
          cell.actualValue = values[cell.key];
          cell.isGiven = true;
        }
      });
    });
    setCells(newGrid);
  }

// row.find( cell => cell.key === _key)
  const handleClickOnCell = (event, _key, isRightClick = false) => {
    event.preventDefault();
    let newCells = [...cells];
    
    let clickedCell = null;
    newCells.forEach(row => {
      const search = row.find( cell => cell.key === _key) ;
      if (search) clickedCell = search;
    });
    
    if(clickedCell != null){
      console.log(clickedCell);
      //calc new cell value
      let newCellValue = clickedCell.guessedValue + (isRightClick ? -1 : 1);
      newCellValue < 0 && (newCellValue = 9);
      newCellValue > 9 && (newCellValue = 0);

      //assign the new cell value and update de main array;
      clickedCell.guessedValue = newCellValue;
      setCells(newCells);

      
      //GridFunc.returnEntireRowKeys(clickedCell);

      let test = GridFunc.returnEntireColCells(cells,clickedCell)
      console.log(test);
    }




    
  }

  return (
    <div className="App">


      {
        cells.map((row, rowId) => {
          return (
            <div key={rowId*100}> 
              {row.map((cell, cellId)=><CellDisplay key={cell.key}  cell={cell} handleClickOnCell={handleClickOnCell}/>)}
              </div>
          )
        })
      }

      <button onClick={()=>{LoadGridValues(GridValues.arrayA)}}>Load default values</button>
      <button onClick={()=>{ClearGridValues()}}>Clear all</button>

    </div>
  );
}

export default App;
