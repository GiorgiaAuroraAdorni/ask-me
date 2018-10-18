import axios from 'axios';
import React, { Component } from 'react';
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

    this.setState({ questions: response.data });
  }

  render() {
    let questions;

    if (this.state.questions === null) {
      questions = "Loading…";
    } else {
      questions = <QuestionList questions={this.state.questions} />;
    }

    return (
      <div className="App">
        <h1>AskMe</h1>
        {questions}
      </div>
    );
  }
}

export default App;

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
          <h2>{this.props.title} by {this.props.user}</h2>
          <div>{this.props.body}</div>
        </div>
    );
  }
}
