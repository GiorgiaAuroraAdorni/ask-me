import React, {Component} from "react";

class Vote extends Component {

    handleClick(value) {
        this.props.onVote({ value,
                            user: this.props.currentUser,
                            answer_id: this.props.answerId });
    }

    formattedScore() {
        const score = this.props.score;

        if (score > 0) {
            return <span>+{score}</span>;
        } else if (score === 0) {
            return <span>&nbsp;&nbsp;0</span>;
        } else {
            return <span>−{-score}</span>;
        }
    }

    render() {
        const isLoggedIn = (this.props.currentUser !== null);

        let upvote;
        let downvote;

        if (isLoggedIn) {
            const vote = this.props.votes.find((v) => v.user === this.props.currentUser);

            if (vote) {
                upvote = (vote.value === +1) ? 'selected' : '';
                downvote = (vote.value === -1) ? 'selected' : '';
            }
        }

        return (
            <div className="Vote">
                <button className={upvote} disabled={!isLoggedIn} onClick={() => this.handleClick(+1)}>⬆︎</button>
                <button className={downvote} disabled={!isLoggedIn} onClick={() => this.handleClick(-1)}>⬇︎</button>

                {this.formattedScore()} votes
            </div>
        );
    }
}

export default Vote;
