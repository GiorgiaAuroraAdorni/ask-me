import React, {Component} from "react";

class CreateAnswer extends Component {
    constructor(props) {
        super(props);

        this.state = {body: ''};

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

        this.setState({body: ''});

        event.preventDefault();
    }

    render() {
        return (
            <div className="CreateAnswer">
                <form onSubmit={this.handleSubmit}>
                    <textarea name="body"
                              value={this.state.body}
                              placeholder="Write something…"
                              onChange={this.handleChange}
                              required/>
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default CreateAnswer;
