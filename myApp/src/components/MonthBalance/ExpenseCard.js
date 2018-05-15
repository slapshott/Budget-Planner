import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { deleteExpense } from '../../api/remote'

class ExpenseCard extends Component{

    constructor(props){
        super(props)
        
        this.removeElement = this.removeElement.bind(this)
    }

    async removeElement(){
        let {year, month, expenseId, expenses} = this.props
        const res = await deleteExpense(expenseId)
        console.log(res)
        if(res.success){
            this.props.history.push(`/plan/${year}/${month}`)
        }
    }
    

    render(){
        let { year, month, name, category, amount, date } = this.props
        return (
            <tr>
                <td>{name}</td>
                <td>{category}</td>
                <td>{amount.toFixed(2)}</td>
                <td>{date}-{month}-{year}</td>
                <td>
                    <button onClick={this.removeElement} className="btn btn-secondary">Delete</button>
                </td>
            </tr>
        )
    }
    
}

export default withRouter(ExpenseCard)