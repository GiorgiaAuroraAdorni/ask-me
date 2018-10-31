import React, {Component} from "react";

class Answer extends Component {
    render() {
        return (
            <article className="Answer">

                <header>
                    <h4>answered by {this.props.user}</h4>
                </header>

                <p>{this.props.body}</p>
            </article>
        );
    }
}

export default Answer;
