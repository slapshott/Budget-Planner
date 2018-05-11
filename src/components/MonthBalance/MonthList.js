import React, { Component } from 'react'
import { getMonthBalance } from '../../api/remote';

export default class MonthList extends Component {


    async getData(){
        let year = this.props.match.params.year
        let month = this.props.match.params.month 
        await getMonthBalance(year, month)
    }

    render(){
        return(
        <div className="container">
            <h1>Are weeeeeeeeeeee</h1>
        </div>
        
        )
    }
}   
