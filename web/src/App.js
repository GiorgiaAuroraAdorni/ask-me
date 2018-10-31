import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import api from "./API";
import Account from "./Account";
import CreateQuestion from "./CreateQuestion";
import QuestionList from "./QuestionList";
import Question from "./Question";
import AnswerList from "./AnswerList";
import CreateAnswer from "./CreateAnswer";
import Vote from "./Vote";

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

    async componentDidMount() {
        document.title = 'AskMe';

        const questions = await api.loadQuestions();

        this.setState({ questions });
    }

    async handleCreateQuestion(question) {
        question['user'] = this.props.currentUser;

        const newQuestion = await api.createQuestion(question);

        const questions = this.state.questions.concat([ newQuestion ]);
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

class QuestionDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: null,
            answers: null,
        };

        this.handleCreateAnswer = this.handleCreateAnswer.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const question = await api.loadQuestion(id);
        const answers = question.answers;

        this.setState({ question, answers });
        document.title = 'AskMe — ' + question.title;
    }

    async handleCreateAnswer(answer) {
        answer['user'] = this.props.currentUser;
        answer['question_id'] = this.state.question.id;

        const newAnswer = await api.createAnswer(answer);

        const answers = this.state.answers.concat([ newAnswer ]);
        this.setState({ answers });
    }

    async handleVote(vote) {
        const newVote = await api.createVote(vote);
    }

    render() {
        if (this.state.question === null) {
            return "Loading…";

        } else {
            const question = <Question {...this.state.question} />;
            const answers = <AnswerList answers={this.state.answers} currentUser={this.props.currentUser} onVote={this.handleVote}/>;
            let createAnswer;

            if (this.props.currentUser !== null) {
                createAnswer = <CreateAnswer onCreate={this.handleCreateAnswer} />;
            }

        return (
            <div>
                {question}
                <h2>Answers</h2>
                {createAnswer}
                {answers}
            </div>
            );
        }
    }
}
