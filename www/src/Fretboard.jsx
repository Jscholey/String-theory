import React from 'react';
import './App.css';
import FretboardMenu from './FretboardMenu.jsx';


class Tile extends React.Component {
    render() {
        let className = "tile";
        if (this.props.highlight) {
            className += " tile-active";
        }

        return (
            <input className={className} type="button" value={this.props.note} onClick={this.props.onClick} />
        );
    }
}


/* Gets passed props:
notes: eg ["A", "B" ...]
highlighted: eg ["A#", "B"]
changeHighlight: eg () => this swappes the higlighted status of the note
this includes repeated notes, because the length is controlled from Fretboard.
*/
class String extends React.Component {
    render() {
        return (
            <div className="string">
                {this.props.notes.map((note) => <Tile note={note} highlight={this.props.highlighted.includes(note)} onClick={this.props.changeHighlight(note)}/>)}
            </div>
        )
    }
}


/* Gets passed props:
strings:
frets:
highlighted:
changeHighlight:
*/
class Fretboard extends React.Component {
    #notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    /* Return Array */
    orderNotes = (note) => {
        var i = this.#notes.indexOf(note);
        var newNotes = this.#notes.slice(i).concat(this.#notes.slice(0,i));
        if (this.props.frets <= 12) {
            newNotes = newNotes.slice(0, this.props.frets);
        } else if (this.props.frets <= 24) {
            newNotes = newNotes.concat(newNotes.slice(0, this.props.frets - 12));
        } else {
            newNotes = newNotes.concat(newNotes);
            newNotes = newNotes.concat(newNotes.slice(0, this.props.frets - 12));
        }
        return newNotes;
    }

    render() {
        var strings = [];
        for (var note of this.props.strings) {
            strings.push(this.orderNotes(note));
        }

        return (
            <div>
                {strings.map( (stringNotes) => {
                return <String notes={stringNotes} highlighted={this.props.highlighted} changeHighlight={this.props.changeHighlight}/>
                })}
            </div>
        );
    }
}


class FretboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {strings: ["E", "B", "G", "D", "A", "E"], // String tunings from high e to low E
                      frets: 17,
                      highlighted: ["A", "B", "C", "D", "E", "F", "G"],
                      key: "C",
                      scale: "Major"};
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

    setStringNumber = (event) => {
        var number = event.target.value;
        if (number>=1 && number<=12) {
            this.setState(oldState => {
                var strings = oldState.strings;
                if (strings.length >= number) {
                    strings.length = number;
                    return {strings: strings};
                } else {
                    var full = ["E", "B", "G", "D", "A", "E", "B", "F", "C", "G", "A", "A"];
                    strings = strings.concat(full.slice(strings.length));
                    strings.length = number;
                    return {strings: strings};
                }
            });
        }
    }

    setFretNumber = (event) => {
        var number = event.target.value;
        if (number>=6 && number<=30) {
            this.setState({frets: number});
        }
    }

    setStringTuning = (event) => {
        var value = event.target.value;
        var index = event.target.id;
        this.setState(oldState => {
            var tuning = oldState.strings;
            tuning[index] = value;
            return {strings: tuning};
        });
    }

    render() {
        return (
            <div>
                <FretboardMenu {...this.state}
                               setStringNumber={this.setStringNumber}
                               setFretNumber={this.setFretNumber}
                               setStringTuning={this.setStringTuning}
                />
                <Fretboard {...this.state} changeHighlight={this.changeHighlight}/>
            </div>
        )
    }

}


export default FretboardPage;
