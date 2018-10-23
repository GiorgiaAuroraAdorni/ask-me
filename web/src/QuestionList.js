import React, {Component} from "react";

class QuestionList extends Component {
    render() {
        const questionList = this.props.questions.map((question) =>
            <div className="QuestionItem" key={question.id}>
                <Question {...question} />
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

export default QuestionList;

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
