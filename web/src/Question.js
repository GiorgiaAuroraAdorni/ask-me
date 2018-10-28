import React, {Component} from "react";

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

export default Question;
