import React, { Component }from 'react';
import { getYearBalance } from '../../api/remote'
import YearCard from './YearCard';

export default class YearList extends Component {

    constructor(props){
        super(props)

        this.state = {
           data: ''
        }
    }

    componentDidMount(){
        this.getData()
    }

    async getData(){
        const res = await getYearBalance(Number(this.props.match.params.year) || 2018)
        this.setState({data: res})
    }


    render(){
        if(this.state.data){
        let year = Number(this.props.match.params.year) || 2018
        let data = Object.values(this.state.data)
    
        return(
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Yearly Balance</h1>
                        </div>
                    </div>
                    <div className="row space-top col-md-12">
                        <div className="col-md-3">
                            {data.map((d,i) => {
                            return <YearCard
                                    budget={d.budget}
                                    balance={d.balance}
                                    year={year}
                                    month={i}
                                    key={i}
                                    />
                            })}    
                        </div>
                    </div>
                </div>
            </main>
        )
        }else{
            return null
        }
        
    }
}