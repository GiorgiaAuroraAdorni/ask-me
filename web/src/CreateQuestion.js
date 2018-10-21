import React, {Component} from "react";

class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.title = React.createRef();
        this.body = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const question = {
            title: this.title.current.value,
            body: this.body.current.value
        };

        this.props.onCreate(question);

        event.target.reset();
        event.preventDefault();
    }

    render() {
        return (
            <div className="CreateQuestion">
                <h2>Ask a new question</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref={this.title} placeholder="Title…" required/>
                    <br/>
                    <textarea ref={this.body} placeholder="Write something…" required/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default CreateQuestion;
