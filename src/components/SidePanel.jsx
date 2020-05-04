import React from 'react'

import SolverResult from './SolverResult';

import '../styles/SidePanel.scss';


function SidePanel({SolveBacktracking, handleClickOnLoadValues, handleClickOnClearAll, solverResult}) {
    return (
        <div className="side-panel">
            <div className="side-panel-container">
                <div className="button-container button-container-generate">
                    <h3 >Generator</h3>
                    <button onClick={handleClickOnLoadValues}>Load default values</button>
                </div>

                <div className="button-container button-container-solver">
                    <h3 >Solver</h3>
                    <button onClick={() => { SolveBacktracking(false) }}>Solve</button>
                     <button onClick={() => { SolveBacktracking(true) }}>Solve (step by step)</button>
                     <SolverResult solverResult={solverResult} />
                </div>

                <div className="button-container button-container-clear">
                    <button onClick={handleClickOnClearAll}>CLEAR ALL</button>
                </div>
              
           </div>
              
        </div>
    )
}

export default SidePanel
