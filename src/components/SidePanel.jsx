import React from 'react'

import SolverResult from './SolverResult';

import '../styles/SidePanel.scss';






function SidePanel({handleClickOnSolve, handleClickOnLoadValues, handleClickOnClearAll, solverResult, cellInfo}) {
    
    let DivCellInfo = "";
    if(Object.keys(cellInfo).length > 0){
        DivCellInfo = (
            <div className="cell-info-inner">
            <h3>Cell #{cellInfo.key} [{cellInfo.x}, {cellInfo.y}]</h3>
            <p>Possible values : {cellInfo.possibleValues.join(", ")} </p>
            </div>
        )
    }
    
    
    return (
        <div className="side-panel">
            <div className="side-panel-container">

            

                <div className="button-container button-container-generate">
                    <h3 >Generator</h3>
                    <button onClick={handleClickOnLoadValues}>Load default values</button>
                </div>

                <div className="button-container button-container-solver">
                    <h3 >Solver</h3>
                    <button onClick={() => { handleClickOnSolve(false) }}>Solve</button>
                     <button onClick={() => { handleClickOnSolve(true) }}>Solve (step by step)</button>
                     <SolverResult solverResult={solverResult} />
                </div>

                <div className="cell-info-container">
                    { DivCellInfo}
                </div>

                <div className="button-container button-container-clear">
                    <button onClick={handleClickOnClearAll}>CLEAR ALL</button>
                </div>
              
           </div>
              
        </div>
    )
}

export default SidePanel
