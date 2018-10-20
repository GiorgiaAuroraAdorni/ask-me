import axios from 'axios';
import React, {Component} from 'react';
import './App.css';

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

class Account extends Component {
    render() {
        const isLoggedIn = (this.props.currentUser !== null);

        if (isLoggedIn) {
            return <p>
                Welcome back, <strong>{this.props.currentUser}</strong>! {}
                <a href="#" onClick={() => this.props.onLogin(null)}>Log Out</a>
            </p>
        } else {
            return <LoginForm onLogin={this.props.onLogin} />;
        }
    }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = { username: null };

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
          <input type="text" placeholder="Username" onChange={this.handleChange}/>
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}

class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.title = React.createRef();
        this.body = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const question = {
            title: this.title.current.value,
            body: this.body.current.value
        };

        this.props.onCreate(question);

        event.target.reset();
        event.preventDefault();
    }

    render() {
        return (
            <div className="CreateQuestion">
                <h2>Ask a new question</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={this.title} placeholder="Title…" />
                    <br/>
                    <textarea ref={this.body} placeholder="Write something…" />
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

class QuestionList extends Component {
    render() {
        const questionList = this.props.questions.map((question) =>
            <div className="QuestionItem">
                <Question key={question.id} {...question} />
                 <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Read answers"/>
                 </form>
            </div>
        );

        // Display the most recent questions first.
        questionList.reverse();

        return questionList;
    }
}

class Question extends Component {
    render() {
        return (
            <article className="Question">
                <header>
                    <h3>{this.props.title}</h3>
                    <h4>opened by {this.props.user}</h4>
                </header>

                <p>{this.props.body}</p>
            </article>
        );
    }
}
