import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import './styles/bootstrap.min.css';
import './styles/site.css';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import YearList from './components/YearBalance/YearList'
import MonthList from './components/MonthBalance/MonthList'
import AddExpense from './components/MonthBalance/AddExpense';
import ExpenseCard from './components/MonthBalance/ExpenseCard';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authToken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={YearList} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/plan/:year/:month/expense" component={AddExpense} />
                    <Route path="/plan/expense/:expenseId"/>
                    <Route path="/plan/:year/:month" component={MonthList} />
                    <Route path="/plan/:year" component={YearList} />       
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);