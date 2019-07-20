import React from 'react';
import { connect } from 'react-redux';
import './css/LoginForm.css'
import SignUp from './SignUp';

class LoginForm extends React.Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            errors: []
        }
    }

    displayErrors = () => {
        if (this.state.errors.length > 0) {
            return (
                <div className="login-form-errors">
                    <p>Invalid!</p>
                    <ul>
                        {this.state.errors.map(err => <li>{err}</li>)}
                    </ul>
                </div>
            )
        } else {
            return null;
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json())
        .then(data => {
            if (data.errors) {
                this.setState({ errors: data.errors })
            } else {
                localStorage.setItem("token", data.token)
                this.props.dispatch({ type: 'USER_LOGIN' })
                this.props.dispatch({ type: 'USER_CREATED_MSG' })
            }
        })
        e.target.reset()
    }



    render() {
        return (
            <div className='loginform-background'>
                <div className='ui five column grid'>
                    <div className='row'></div>
                    <div className="two wide column"></div>
                    <div className='four wide column'>
                        <div className='ui segment'>
                            { this.displayErrors() }
                            <h2>Login</h2>
                            <form id='login-form' className="ui form" onSubmit={this.handleSubmit}>
                                <label>Username</label>
                                <input className='ui focus input' type="text" name="username" placeholder="username"
                                    onChange={(e)=> this.setState({ username: e.target.value})}></input>
                                <label>Password</label>
                                <input className='ui focus input' type="password" name="password" placeholder="password"
                                    onChange={(e)=> this.setState({ password: e.target.value})}></input>
                                <button className='ui button' type="submit" value="submit">Login</button>
                            </form>
                        </div>
                    </div>
                    <div className="two wide column"></div>
                    <div className='six wide column'>
                        <SignUp />
                    </div>
                    <div className="two wide column"></div>
                </div>
            </div>
        )
    }

}


export default connect()(LoginForm);