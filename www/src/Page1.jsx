import React from 'react';
import './App.css';

// Requires 
class Tile extends React.Component {
    constructor(props) {
        super(props);
        if (["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"].includes(props.note)) {
            this.state = {note: props.note,
                    highlight: true};
        } else {
            this.state = {note: "Undefined",
                    highlight: true};
        }
    }

    changeHighlight = (fuck, fucj) => {
        return this.setState(oldState => ({highlight: !oldState.highlight}));
    }

    render() {
        let className = "tile";
        if (this.state.highlight) {
            className += " tile-active";
        }

        return (
            <form>
                <input className={className} type="button" value={this.state.note} onClick={this.changeHighlight} />
                <p>{this.state.highlight ? "True" : "False"}</p>
            </form>
        );
    }
}


class FormExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: 'C'};
    }

    changeState = (event) => {
        return this.setState({username: event.target.value});
    }

    render() {
        return (
            <form>
                <Tile note={this.state.username} />
                <Tile />
                <h2>This is a form, hi {this.state.username}</h2>
                <p>Enter name:</p>
                <input type="text" value={this.state.username} onChange={this.changeState} />
            </form>
        );
    }
}


class Page1 extends React.Component {
    render() {
        return (
            <div>
                <Tile note="casdf"/>
                Hello Everyone!!
                <FormExample />
            </div>
        );
    }
}

export default Page1;