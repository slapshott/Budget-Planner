import React, { Component } from 'react';
import { addExpense } from '../../api/remote'
import { withRouter } from 'react-router-dom'
import  toastr  from 'toastr'

class AddExpense extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            paymentDate: '',
            name: '',
            category: '',
            cost: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value })
        
    }

    async onSubmit(e){
        e.preventDefault()
        let year = this.props.match.params.year;
        let month = this.props.match.params.month;
        let date = Number(this.state.paymentDate); 
        let name = this.state.name; 
        let category = this.state.category; 
        let amount = Number(this.state.cost)

        const res = await addExpense(year,month,date,name,category,amount)

        if(!res.success){
            toastr.error('Error ocurred')
            return
        }

        if(res.success){
            toastr.success('Expense added successfully!')
            this.props.history.push(`/plan/${year}/${month}`)
        }
    }

    render(){
        let year = this.props.match.params.year;
        let month = this.props.match.params.month

        return(
            <div className="container">
            <div className="row space-top">
                <div className="col-md-12">
                    <h1>Add Expenses</h1>
                    <h3>{month} {year}</h3>
                </div>
            </div>
            <div className="row space-top">
                <div className="col-md-10">
                    <form onSubmit={this.onSubmit}>
                        <legend>Add a new expense</legend>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="name">Name:</label>
                            <input  
                                onChange={this.onChange}
                                value={this.state.name}
                                className="col-md-2" 
                                name="name" 
                                id="2"
                                type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="category">Category:</label>
                            <select 
                                onChange={this.onChange}
                                value={this.state.category}
                                className="col-md-2 pl-2" 
                                name="category">
                                <option>Non-essential</option>
                                <option>Fixed</option>
                                <option>Variable</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="cost">Cost:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.amount}
                                className="col-md-2" 
                                name="cost" 
                                />
                        </div>
                        <div className="form-group">
                            <label className="col-md-2" htmlFor="paymentDate">Payment Date:</label>
                            <input 
                                onChange={this.onChange}
                                value={this.state.date}
                                className="col-md-2" 
                                name="paymentDate" 
                                />
                        </div>
                        <input type="submit" className="btn btn-secondary" value="Add"/>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(AddExpense)