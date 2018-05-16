import React, { Component } from 'react'
import { getMonthBalance, updateValues } from '../../api/remote';
import { Link } from 'react-router-dom';
import  ExpenseCard  from './ExpenseCard';
import  toastr  from 'toastr'

export default class MonthList extends Component {

    constructor(props){
        super(props)

        this.state = {
                income: '',
                budget: '',
                expenses: []
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.getData()
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value })
    }

    async onSubmit(e){
        e.preventDefault()
        let income = Number(this.state.income) || 0
        let budget = Number(this.state.budget) || 0
        let year = this.props.match.params.year
        let month = this.props.match.params.month 

        const res = await updateValues(year, month, income, budget)
        
        if(!res.success){
            toastr.error('Error ocurred')
            return
        }
        if(res.success){
            toastr.success('Income and Budget updated successfully')
        }
        this.getData()
    }

    async getData(){
        let year = this.props.match.params.year
        let month = this.props.match.params.month 
        let res = await getMonthBalance(year, month)

        this.setState({
           budget: res.budget,
           income: res.income,
           expenses: res.expenses
        })
        
    }


    render(){
        let month = this.props.match.params.month || 1;
        let year = this.props.match.params.year || 2018;

        return(
            <div className="container">
            <div className="row space-top">
                <div className="col-md-12">
                    <h1>Welcome to Budget Planner</h1>
                </div>
            </div>
            <div className="row space-top ">
                <div className="col-md-12 ">
                    <div className="card bg-secondary">
                        <div className="card-body">
                            <blockquote className="card-blockquote">
                                <h2 id="month"> {month} {year} </h2>
                                <div className="row">
                                    <div className="col-md-3 space-top">
                                        <h4>Planner</h4>
                                        <form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="income">Income:</label>
                                                <input 
                                                    onChange={this.onChange}
                                                    value={this.state.income}
                                                    className="form-control" 
                                                    name="income" 
                                                    type="number" 
                                                    />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-control-label" htmlFor="budget">Budget:</label>
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.budget}  
                                                    className="form-control" 
                                                    name="budget" 
                                                    type="number"  
                                                    />
                                            </div>
                                            <input type="submit" className="btn btn-secondary" value="Save"/>
                                        </form>
                                    </div>
                                    <div className="col-md-8 space-top">
                                        <div className="row">
                                            <h4 className="col-md-9">Expenses</h4>
                                            <Link to={`/plan/${year}/${month}/expense`} className="btn btn-secondary ml-2 mb-2">Add expenses</Link>
                                        </div>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Category</th>
                                                    <th>Cost</th>
                                                    <th>Payment Date</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.state.expenses && this.state.expenses.map(e => {
                                                    return < ExpenseCard
                                                                name={e.name}
                                                                category={e.category}
                                                                amount={e.amount}
                                                                year={e.year}
                                                                month={e.month}
                                                                date={e.date}
                                                                expenseId={e.id}
                                                                expenses={this.state.expenses}
                                                                key={e.id}
                                                                />
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        )
    }
}   
