import React from 'react'

function SolverResult({solverResult, step}) {
    if(solverResult !== ""){
        return (
            <div>
                <p><b>Solver result : </b>{solverResult}</p>
                
            </div>
        )
    }
    else return null
    
}

export default SolverResult
