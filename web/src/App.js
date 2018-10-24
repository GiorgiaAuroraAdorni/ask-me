import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Account from "./Account";
import CreateQuestion from "./CreateQuestion";
import QuestionList from "./QuestionList";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: localStorage.getItem('currentUser') || null,
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(username) {
        this.setState({ currentUser: username });

        if (username === null) {
            localStorage.removeItem('currentUser');
        } else {
            localStorage.setItem('currentUser', username);
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <h1><Link to="/">AskMe</Link></h1>
                    <Account currentUser={this.state.currentUser} onLogin={this.handleLogin} />

                    <Route
                        exact path="/"
                        render={(props) => <Questions {...props} currentUser={this.state.currentUser} />}
                    />
                    <Route
                        path="/questions/:id"
                        render={(props) => <QuestionDetail {...props} currentUser={this.state.currentUser} />}
                    />
                </div>
            </Router>
        );
    }
}

export default App;

class Questions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: null,
        };

        this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    }

    componentDidMount() {
        document.title = 'AskMe';

        this.loadQuestions();
    }

    handleCreateQuestion(question) {
        question['user'] = this.props.currentUser;

        this.createQuestion(question);
    }

    async loadQuestions() {
        const response = await axios.get('http://localhost:5000/questions');

        this.setState({ questions: response.data });
    }

    async createQuestion(question) {
        const response = await axios.post('http://localhost:5000/questions', question);

        const questions = this.state.questions.concat([ response.data ]);
        this.setState({ questions });
    }

    render() {
        let createQuestion;
        let questions;

        if (this.props.currentUser !== null) {
            createQuestion = <CreateQuestion onCreate={this.handleCreateQuestion} />;
        }

        if (this.state.questions === null) {
            questions = "Loading…";
        } else {
            questions = <QuestionList questions={this.state.questions} />;
        }

        return (
            <div>
                {createQuestion}
                {questions}
            </div>
        );
    }
}

class QuestionDetail extends  Component {
    constructor(props) {
        super(props);

        this.state = {
            question: null,
        };
    }

    componentDidMount() {
        this.loadQuestion(this.props.match.params.id);
    }

    async loadQuestion(id) {
        const response = await axios.get('http://localhost:5000/questions/' + id);

        this.setState({ question: response.data });

        document.title = 'AskMe — ' + response.data.title;
    }

    render() {
        let question;

        if (this.state.question === null) {
            question = "Loading…";
        } else {
            question = <QuestionList questions={[this.state.question]} />;
        }

        return question;
    }
}