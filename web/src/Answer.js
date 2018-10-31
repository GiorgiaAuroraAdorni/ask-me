import React, {Component} from "react";
import Vote from "./Vote";

class Answer extends Component {
    render() {
        return (
            <article className="Answer">

                <header>
                    <h4>answered by {this.props.user}</h4>
                </header>

                <p>{this.props.body}</p>

                <Vote currentUser={this.props.currentUser} answerId={this.props.id} votes={this.props.votes} score={this.props.score} onVote={this.props.onVote} />

            </article>
        );
    }
}

export default Answer;
