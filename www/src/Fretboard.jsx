import React from 'react';
import './App.css';

class Tile extends React.Component {
    render() {
        let className = "tile";
        if (this.props.highlight) {
            className += " tile-active";
        }

        return (
            <form>
                <input className={className} type="button" value={this.props.note} onClick={this.props.onClick} />
            </form>
        );
    }
}

class Fretboard extends React.Component {
    #notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    constructor(props) {
        super(props);
        this.state = {strings: ["E", "B", "G", "D", "A", "E"], // String tunings from high e to low E
                      frets: 15,
                      highlighted: ["A", "B", "C", "D", "E", "F", "G"]};
    }

    /* Return Array */
    orderNotes = (note) => {
        var i = this.#notes.indexOf(note);
        return this.#notes.slice(i).concat(this.#notes.slice(0,i));
    }

    /* Get a note, return an anonymous function that changes the state of the note. This function then gets passed to tiles. */
    changeHighlight = (note) => {
        return (event) => {
            this.setState(oldState => {
                if (oldState.highlighted.includes(note)) {
                    oldState.highlighted.splice(oldState.highlighted.indexOf(note), 1);
                    return {highlighted: oldState.highlighted};
                } else {
                    return {highlighted: oldState.highlighted.concat([note])};
                }
            });
        }
    }


    render() {
        var strings = [];
        for (var note of this.state.strings) {
            strings.push(this.orderNotes(note));
        }

        return (
            <div>
                {strings}
                {this.#notes.map( (note) => <Tile note={note} highlight={this.state.highlighted.includes(note)} onClick={this.changeHighlight(note)}/>)}
                <Tile note="E" highlight={this.state.highlighted.includes("E")} onClick={this.changeHighlight("E")}/>
                <Tile note="F" highlight={this.state.highlighted.includes("F")} onClick={this.changeHighlight("F")}/>
                <Tile note="F#" highlight={this.state.highlighted.includes("F#")} onClick={this.changeHighlight("F#")}/>
                <Tile note="G" highlight={this.state.highlighted.includes("G")} onClick={this.changeHighlight("G")}/>
                <Tile note="G#" highlight={this.state.highlighted.includes("G#")} onClick={this.changeHighlight("G#")}/>
                <Tile note="A" highlight={this.state.highlighted.includes("A")} onClick={this.changeHighlight("A")}/>
                <Tile note="G" highlight={this.state.highlighted.includes("G")} onClick={this.changeHighlight("G")}/>
                <Tile note="G#" highlight={this.state.highlighted.includes("G#")} onClick={this.changeHighlight("G#")}/>
                <Tile note="F" highlight={this.state.highlighted.includes("F")} onClick={this.changeHighlight("F")}/>
                <p>{this.state.highlighted}</p>
            </div>
        );
    }
}

export default Fretboard;