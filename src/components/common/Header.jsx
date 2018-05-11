import React, { Component } from 'react';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <nav className="navbar navbar-dark bg-secondary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <a className="nav-link" href="/">Monthly Balance</a>
                                <a className="nav-link" href="/">Yearly Balance</a>
                                {loggedIn && <a className="nav-link" href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                                {!loggedIn && <a className="nav-link" href="/login">Login</a>}
                                {!loggedIn && <a className="nav-link active" href="/register">Register</a>}
                            </div>
                        </div>
                    </div>
                 </nav>
            </header>
        );
    }
}