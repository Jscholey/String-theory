import React from 'react';
import './App.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        if (["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"].includes(props.note)) {
            this.state = {note: props.note,
                          highlight: true};
        } else {
            this.state = {note: "Undefined",
                          highlight: true};
            // TODO, this should error
        }
    }

    changeHighlight = () => {
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
            </form>
        );
    }
}

class Fretboard extends React.Component {
    #notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    constructor(props) {
        super(props);
        this.state = {strings: ["E", "B", "G", "D", "A", "E"], // String tunings from high e to low E
                      frets: 15};
    }

    /* Return Array */
    orderNotes = (note) => {
        var i = this.#notes.indexOf(note);
        return this.#notes.slice(i).concat(this.#notes.slice(0,i));
    }

    render() {
        return (
            <div>
                <Tile note="E" />
                <Tile note="F" />
                <Tile note="F#" />
                <Tile note="G" />
                <Tile note="G#" />
                <Tile note="A" />
            </div>
        );
    }
}

export default Fretboard;