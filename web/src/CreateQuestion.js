import React, {Component} from "react";

class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {title: '', body: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const state = {};

        state[event.target.name] = event.target.value;

        this.setState(state);
    }

    handleSubmit(event) {
        this.props.onCreate(this.state);

        this.setState({title: '', body: ''});

        event.preventDefault();
    }

    render() {
        return (
            <div className="CreateQuestion">
                <h2>Ask a new question</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" value={this.state.title} placeholder="Title…" onChange={this.handleChange} required/>
                    <br/>
                    <textarea name="body" value={this.state.body} placeholder="Write something…" onChange={this.handleChange} required/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default CreateQuestion;
