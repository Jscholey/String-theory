import React from 'react';
import './App.css';

class Tile extends React.Component {
    render() {
        let className = "tile";
        if (this.props.highlight) {
            className += " tile-active";
        }

        return (
            <form className={className}>
                <input className={className} type="button" value={this.props.note} onClick={this.props.onClick} />
            </form>
        );
    }
}


/*gets passed props:
notes: eg ["A", "B" ...]
highlighted: eg ["A#", "B"]
changeHighlight: eg () => this swappes the higlighted status of the note
this includes repeated notes, because the length is controlled from Fretboard.
*/
class String extends React.Component {
    render() {
        return (
            <div>
                {this.props.notes.map((note) => <Tile note={note} highlight={this.props.highlighted.includes(note)} onClick={this.props.changeHighlight(note)}/>)}
            </div>
        )
    }
}


class Fretboard extends React.Component {
    #notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    constructor(props) {
        super(props);
        this.state = {strings: ["E", "B", "G", "D", "A", "E"], // String tunings from high e to low E
                      frets: 17,
                      highlighted: ["A", "B", "C", "D", "E", "F", "G"]};
    }

    /* Return Array */
    orderNotes = (note) => {
        var i = this.#notes.indexOf(note);
        var newNotes = this.#notes.slice(i).concat(this.#notes.slice(0,i));
        if (this.state.frets <= 12) {
            newNotes = newNotes.slice(0, this.state.frets);
        } else if (this.state.frets <= 24) {
            newNotes = newNotes.concat(newNotes.slice(0, this.state.frets - 12));
        } else {
            newNotes = newNotes.concat(newNotes);
            newNotes = newNotes.concat(newNotes.slice(0, this.state.frets - 12));
        }
        return newNotes;
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
                {strings.map( (stringNotes) => {
                return <String notes={stringNotes} highlighted={this.state.highlighted} changeHighlight={this.changeHighlight}/>
                })}
            </div>
        );
    }
}

export default Fretboard;