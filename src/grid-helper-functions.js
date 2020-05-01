/**
* Return the keys of all the other cells in the Col.
* @param {object} cell an object of type "cell".
* @returns {Array} Array of cells keys.
*/
export const returnEntireColKeys = (cell) => {

    const res = []
    for (let i = 0; i < 9; i++) {
        //console.log(cell.y + cell.x * i);
        res.push(cell.x + 9 * i);
    }
    return res;
}


/**
* Return all the cells in the same row
* @param {Array} cells array of cells.
* @param {object} cell object of type cell.
* @returns {Array} Array of cells object.
*/
export const returnEntireRowCells = (cells, cell) => {
    return cells[cell.y];
}


/**
* Return all the cells in the same col
* @param {Array} cells array of cells.
* @param {object} cell object of type cell.
* @returns {Array} Array of cells object.
*/
export const returnEntireColCells = (cells, cell) => {
    const res = [];
    cells.forEach(
        (row)=>{ res.push(row[cell.x])}
    )
    return res;

}



