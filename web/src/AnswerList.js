import React, {Component} from "react";
import {Link} from "react-router-dom";
import Question from "./Question";
import Answer from "./Answer";

class AnswerList extends Component {
    render() {
        const answerList = this.props.answers.map((answer) =>
            <div className="AnswerItem" key={answer.id}>
                <Answer {...answer} currentUser={this.props.currentUser} onVote={this.props.onVote} />
            </div>
        );

        // Display the most recent questions first.
        answerList.reverse();

        return answerList;
    }
}

export default AnswerList;
