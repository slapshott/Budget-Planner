import React from 'react'
import { Link } from 'react-router-dom'

export default function YearCard({balance, budget, year, month, onChange}){
    return (
        <div className="card text-white bg-secondary">
            <div className="card-body">
                <blockquote className="card-blockquote">
                    <h2>{month}</h2>
                    <h4>Year {year}</h4>
                    <label htmlFor="budget">Budget:</label>
                    <input 
                        onChange={onChange}
                        className="col-md-9" 
                        name="budget" 
                        disabled="" 
                        value={budget} />
                    <label htmlFor="balance">Balance:</label>
                    <input
                        onChange={onChange} 
                        className="col-md-9" 
                        name="balance" 
                        disabled="" 
                        value={balance} />
                    <div className="space-top">
                    <Link to={`/plan/${year}/${month}`} className="btn btn-secondary">Details</Link>
                    </div>
                </blockquote>
            </div>
        </div>
    )
}