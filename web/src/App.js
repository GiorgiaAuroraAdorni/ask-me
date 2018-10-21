import axios from 'axios';
import React, {Component} from 'react';
import './App.css';
import CreateQuestion from "./CreateQuestion";
import QuestionList from "./QuestionList";
import Account from "./Account";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: localStorage.getItem('currentUser') || null,
            questions: null,
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
    }

    componentDidMount() {
        this.loadQuestions();
    }

    componentWillUnmount() {

    }

    handleLogin(username) {
        this.setState({ currentUser: username });

        if (username === null) {
            localStorage.removeItem('currentUser');
        } else {
            localStorage.setItem('currentUser', username);
        }
    }

    handleCreateQuestion(question) {
        question['user'] = this.state.currentUser;

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

        if (this.state.currentUser !== null) {
            createQuestion = <CreateQuestion onCreate={this.handleCreateQuestion} />;
        }

        if (this.state.questions === null) {
            questions = "Loading…";
        } else {
            questions = <QuestionList questions={this.state.questions}/>;
        }

        return (
            <div className="App">
                <h1>AskMe</h1>
                <Account currentUser={this.state.currentUser} onLogin={this.handleLogin} />
                {createQuestion}
                {questions}
            </div>
        );
    }
}

export default App;

