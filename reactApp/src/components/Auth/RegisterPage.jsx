import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { register } from '../../api/remote';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();

        const res = await register(this.state.name, this.state.email, this.state.password);
        if(res.success){
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div className="container">
            <div className="row space-top">
                <div className="col-md-12">
                    <h1>Register</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form onSubmit={this.onSubmitHandler}>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="form-control-label " htmlFor="new-username">Username</label>
                            <input 
                                onChange={this.onChangeHandler}
                                name="name"
                                className="form-control" 
                                id="new-username" 
                                type="text"
                                />
                        </div>
                        <div className="form-group has-success">
                            <label className="form-control-label" htmlFor="new-email">E-mail</label>
                            <input
                                onChange={this.onChangeHandler} 
                                name='email'
                                className="form-control is-valid" 
                                id="new-email" 
                                type="text"
                                />
                            <div className="form-control-feedback">This input value is valid</div>
                        </div>
                        <div className="form-group has-danger">
                            <label className="form-control-label" htmlFor="new-password">Password</label>
                            <input 
                                onChange={this.onChangeHandler}
                                name="password"
                                className="form-control is-invalid" 
                                id="new-password" 
                                type="password"
                                />
                            <div className="form-control-feedback">This input value is invalid</div>
                        </div>
                        <div className="form-group has-danger">
                            <label className="form-control-label" htmlFor="new-repeat-password">Repeat password</label>
                            <input 
                                onChange={this.onChangeHandler}
                                className="form-control is-invalid" 
                                id="new-repeat-password" 
                                type="password"
                                />
                            <div className="form-control-feedback">This input value is invalid</div>
                        </div>
                        <input type="submit" className="btn btn-secondary" value="Register"/>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

export default withRouter(RegisterPage)