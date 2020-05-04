import * as GridFunc from './gridFunctions.js';
import Cell from './Cell';


export const getPossibleValuesForCell = (cells, cell, considerGuessedValues = true) => {
    const valuesAvailability = new Array(9).fill(1);
    
    //get all the cells in range of the selected one
    let cellsInRange = []
    cellsInRange = cellsInRange.concat(GridFunc.returnSquareCells(cells, cell));
    cellsInRange = cellsInRange.concat(GridFunc.returnEntireRowCells(cells, cell));
    cellsInRange = cellsInRange.concat(GridFunc.returnEntireColCells(cells, cell));

    //filter out the selected cell
    cellsInRange = cellsInRange.filter((item)=>item.key !== cell.key);

    //find which values are already used among all the cells in range
    cellsInRange.forEach((el)=>{
        if(el.actualValue > 0) valuesAvailability[el.actualValue-1] = 0; 
        else if(considerGuessedValues && el.guessedValue > 0) valuesAvailability[el.guessedValue-1] = 0;
    })

    // create an array with only the available values
    const possibleValues = [];
    valuesAvailability.forEach((el,i) => {
        if(el){possibleValues.push(i+1)}
        //index goes from 0 to 8, but we want to return 1 to 9
    });


    return possibleValues;
}


export const solverLoop = (solvedCells, nbOfGuessAllowed) =>{
    let nbOfValueFound = 0;
    let nbOfCellWithSeveralPossibilites = 0;

    solvedCells.forEach(row => {
        row.forEach(cell => {
            //console.log(cell.key);
            if (cell.actualValue === 0) {
                const possibleValues = getPossibleValuesForCell(solvedCells, cell);
                if (possibleValues.length === 0) {
                    console.log("Can't solve cell ", cell.key);
                    return;
                }
                if (possibleValues.length === 1) {
                    cell.actualValue = possibleValues[0];
                    //console.log("new value for cell " , cell.key);
                    nbOfValueFound ++;
                }
                if (possibleValues.length > 1){
                    nbOfCellWithSeveralPossibilites ++;
                }
            }
        })
    })

    return [nbOfValueFound, nbOfCellWithSeveralPossibilites];
}

export const solver = (cells) => {
    let solvedCells = [ ...cells]
    let nbOfValueFound = 0;
    let nbOfCellRemaining = 9*9;
    let nbOfGuessAllowed = 0;
    let status = "";

    let loopCount = 0;
    while (nbOfCellRemaining > 0 && loopCount < 100){
        
        const loopRes = solverLoop(solvedCells, nbOfGuessAllowed);
        nbOfValueFound = loopRes[0]
        if( nbOfValueFound ===0) 
        {
            console.log("break");
            status = "Couldn't resolve with simple solver."
            break;
        }
        nbOfCellRemaining = loopRes[1];

        console.log("loop count : " , loopCount);
        loopCount ++;

    }
    if(nbOfCellRemaining === 0) status = "Solved in " + loopCount + " loops.";
    
    return [solvedCells, status];
}



// return -1 if nothing to solve
// 0->80 if key found
export const getNextCellToSolve = (_cells, _cell) => {
    let keyToFind = _cell.key+1 >= 9*9 ? 0 : _cell.key+1;
    console.log(_cell.key, keyToFind);
    const maxLoop = 9*9;
    let i = 0;
    while(i < maxLoop){
        const coords = GridFunc.KeyToCoord(keyToFind);
        console.log("coords : "+ coords);
        const cellToCheck = _cells[coords[1]][coords[0]];
        
        if(cellToCheck.actualValue <= 0){
            return cellToCheck
        }

        keyToFind = keyToFind+1 >= 9*9 ? 0 : keyToFind+1;
        i++;
    }
    return -1;
}



export const solveGrid = (_cells, addToHistory = null, stepByStep = false) =>{
    const newCells = [ ..._cells];
    
    let res;
    if(stepByStep){
        res = recursiveValidationStepByStep(newCells, 0, addToHistory);
    }
    else{
        res = recursiveValidation(newCells, 0);

    }
    //UpdateCells(newCells);
    const resString = res ? "Success" : "Error"
    return [newCells, resString];
}



export const recursiveValidation = (_cells, key) => {
    const tempCells = [ ..._cells];
    const useGuessedValues = true;
    //console.log("key : ", key);
    if (key >= 9 * 9) { return true }  //Solving finished

    const currentCell = tempCells[key];
    if (currentCell.actualValue > 0 || (useGuessedValues && currentCell.guessedValue > 0)) {
        // this cell is already solved, go to next cell
        return recursiveValidation(tempCells, key + 1);
    }

    const pValues = getPossibleValuesForCell(tempCells, currentCell);
    for (let v = 1; v <= 9; v++) {
        //console.log("key : ", currentCell.key, "v :  ", v, "pValues : ", pValues);
        if (pValues.some(e=> e === v)){
            currentCell.setSolvedValue(v);
            // try to resolve the rest of the array with this value for the current cell
            if ( recursiveValidation (tempCells, key+1) )
                return true; 
        }

    }

    currentCell.setSolvedValue(0); // no value possible for this cell, reset it to 0.
    return false // this grill is not solvable, going back to previous recursion.
}



export const recursiveValidationStepByStep = (_cells, key, addToHistory) => {
    const tempCells = [ ..._cells];

    const useGuessedValues = true;
    //console.log("key : ", key);
    if (key >= 9 * 9) { return true }  //Solving finished

    const currentCell = tempCells[key];
    if (currentCell.actualValue > 0 || (useGuessedValues && currentCell.guessedValue > 0)) {
        // this cell is already solved, go to next cell
        return recursiveValidationStepByStep(_cells, key + 1, addToHistory);
    }



    const pValues = getPossibleValuesForCell(_cells, currentCell);
    for (let v = 1; v <= 9; v++) {
        //console.log("key : ", currentCell.key, "v :  ", v, "pValues : ", pValues);
        if (pValues.some(e=> e === v)){
            currentCell.setSolvedValue(v)
            addToHistory( {
                key:currentCell.key,
                actualValue:v
            } )

            // try to resolve the rest of the array with this value for the current cell
            if ( recursiveValidationStepByStep (_cells, key+1, addToHistory) )
                return true; 
        }

    }

    currentCell.setSolvedValue(0) // no value possible for this cell, reset it to 0.
    addToHistory( {
        key:currentCell.key,
        actualValue:0
    } )

    return false // this grill is not solvable, going back to previous recursion.
}

