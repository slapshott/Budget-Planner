import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { deleteExpense } from '../../api/remote'
import  toastr  from 'toastr'

class ExpenseCard extends Component{

    constructor(props){
        super(props)
        this.removeExpense = this.removeExpense.bind(this)
    }

    async removeExpense(){
        let {year, month, expenseId, expenses} = this.props
        const res = await deleteExpense(expenseId)
        
        if(!res.success){
            toastr.error(res.errors.date)
            return
        }
        if(res.success){
            toastr.success('Expense deleted successfully!')
            this.props.history.push(`/plan/${year}`)
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
                    <button onClick={this.removeExpense} className="btn btn-secondary">Delete</button>
                </td>
            </tr>
        )
    }
    
}

export default withRouter(ExpenseCard)