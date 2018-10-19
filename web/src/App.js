import axios from 'axios';
import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            questions: null,
        };
    }

    componentDidMount() {
        this.loadQuestions();
    }

    componentWillUnmount() {

    }

    async loadQuestions() {
        const response = await axios.get('http://localhost:5000/questions');

        this.setState({questions: response.data});
    }

    render() {
        let questions;

        if (this.state.questions === null) {
            questions = "Loading…";
        } else {
            questions = <QuestionList questions={this.state.questions}/>;
        }

        return (
            <div className="App">
                <h1>AskMe</h1>
                <CreateQuestion/>
                {questions}
            </div>
        );
    }
}

export default App;

class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.title = React.createRef();
        this.body = React.createRef();
    }

    handleSubmit(event) {
        const title = this.title.current.value;
        const body = this.body.current.value;

        event.preventDefault();
    }

    render() {
        return (
            <div className="CreateQuestion">
                <h2>Add a new question</h2>
                <form onSubmit={() => this.handleSubmit()}>
                    <label>
                        <input type="text" ref={this.title} placeholder="Title.."/>
                    </label>
                    <br/>
                    <textarea ref={this.body} placeholder="Write something..">

          </textarea>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

class QuestionList extends Component {
    render() {
        return this.props.questions.map((question) =>
            <Question key={question.id} {...question} />
        );
    }
}

class Question extends Component {
    render() {
        return (
            <div className="Question">
                <h3>{this.props.title} </h3>
                <body>opened by {this.props.user}</body>
                <h1>{this.props.body}</h1>
            </div>
        );
    }
}
