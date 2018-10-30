import React, {Component} from "react";
import {Link} from "react-router-dom";
import Question from "./Question";

class AnswerList extends Component {
    render() {
        const answerList = this.props.answers.map((answer) =>
            <div className="AnswerItem" key={answer.id}>
                <Question {...answer} />
            </div>
        );

        // Display the most recent questions first.
        answerList.reverse();

        return answerList;
    }
}

export default AnswerList;
