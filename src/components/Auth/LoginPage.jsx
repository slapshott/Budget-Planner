import React, { Component } from 'react';
import { login } from '../../api/remote';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const res = await login(this.state.email, this.state.password);
        if (!res.success) {
            this.setState({error: res.message});
            return;
        }
        localStorage.setItem('authToken', res.token);
        this.props.history.push('/');
    }

    render() {
        return (
        <div className="container">
            <div className="row space-top">
                <div className="col-md-12">
                    <h1>Login</h1>
                </div>
            </div>
            <form onSubmit={this.onSubmitHandler}>
                <div className="row space-top">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="email">E-mail</label>
                            <input
                                onChange={this.onChangeHandler} 
                                name="email"
                                className="form-control" 
                                id="email" 
                                type="text"
                                />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onChangeHandler}
                                name="password"
                                className="form-control" 
                                id="password" 
                                type="password"
                                />
                        </div>
						<input type="submit" className="btn btn-secondary" value="Login"/>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}