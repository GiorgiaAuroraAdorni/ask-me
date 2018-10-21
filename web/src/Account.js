import React, {Component} from "react";

class Account extends Component {
    render() {
        const isLoggedIn = (this.props.currentUser !== null);

        if (isLoggedIn) {
            return <p>
                Welcome back, <strong>{this.props.currentUser}</strong>! {}
                <a href="#" onClick={() => this.props.onLogin(null)}>Log Out</a>
            </p>
        } else {
            return <LoginForm onLogin={this.props.onLogin}/>;
        }
    }
}

export default Account;

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {username: null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        this.props.onLogin(this.state.username);

        event.preventDefault();
    }

    render() {
        return (
            <div className="LoginForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Username" onChange={this.handleChange} required/>
                    <input type="submit" value="Log In"/>
                </form>
            </div>
        )
    }
}
