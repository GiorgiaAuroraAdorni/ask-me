import React, {Component} from "react";

class Vote extends Component {

    handleClick(value) {
        this.props.onVote({ value,
                            user: this.props.currentUser,
                            answer_id: this.props.answerId });
    }

    render() {
        const isLoggedIn = (this.props.currentUser !== null);

        return (
            <div className="Vote">
                <button disabled={!isLoggedIn} onClick={() => this.handleClick(+1)}>⬆︎</button>
                <button disabled={!isLoggedIn} onClick={() => this.handleClick(-1)}>⬇︎</button>

                {this.props.score} votes
            </div>
        );
    }
}

export default Vote;
