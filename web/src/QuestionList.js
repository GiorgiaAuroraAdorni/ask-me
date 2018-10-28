import React, {Component} from "react";
import {Link} from "react-router-dom";

import Question from "./Question";

class QuestionList extends Component {
    render() {
        const questionList = this.props.questions.map((question) =>
            <div className="QuestionItem" key={question.id}>
                <Question {...question} />
                <Link to={question._links.self}>
                    <button>Read answers</button>
                </Link>
            </div>
        );

        // Display the most recent questions first.
        questionList.reverse();

        return questionList;
    }
}

export default QuestionList;
