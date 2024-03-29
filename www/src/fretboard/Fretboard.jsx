import PropTypes from "prop-types";
import React from "react";
import FretboardMenu from "./FretboardMenu.jsx";


class Tile extends React.Component {
    render() {
        let className = "tile";
        if (this.props.highlight) {
            className += " tile-active";
            className += " tile-active-" + this.props.note;
            if (this.props.note === this.props.musicKey) {
                className += " tile-root";
            }
        }

        return (
            <input className={className} type="button" value={this.props.note} onClick={this.props.onClick} />
        );
    }
}

Tile.propTypes = {
    highlight: PropTypes.bool.isRequired,
    note: PropTypes.string.isRequired,
    musicKey: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};


class NoteString extends React.Component {
    render() {
        return (
            <div className="string">
                {this.props.notes.map((note, index) => <Tile note={note} highlight={this.props.highlighted.includes(note)} musicKey={this.props.musicKey} onClick={this.props.changeHighlight(note)} key={index}/>)}
            </div>
        );
    }
}

NoteString.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlighted: PropTypes.arrayOf(PropTypes.string).isRequired,
    changeHighlight: PropTypes.func.isRequired,
    musicKey: PropTypes.string.isRequired
};


class Frets extends React.Component {
    render() {
        var frets = [...Array(this.props.frets).keys()];
        if (this.props.lefty) {
            frets.reverse();
        }

        return (
            <div className="frets">
                {frets.map((val) => <div className="fret" key={val}>{val}</div>)}
            </div>
        );
    }
}

Frets.propTypes = {
    frets: PropTypes.number.isRequired,
    lefty: PropTypes.bool.isRequired
};


class Fretboard extends React.Component {
    /* Return Array */
    orderNotes = (note) => {
        var frets = this.props.frets + 1;
        var i = this.props.notes.indexOf(note);
        var newNotes = this.props.notes.slice(i).concat(this.props.notes.slice(0,i));
        if (frets <= 12) {
            newNotes = newNotes.slice(0, frets);
        } else if (frets <= 24) {
            newNotes = newNotes.concat(newNotes.slice(0, frets - 12));
        } else {
            newNotes = newNotes.concat(newNotes);
            newNotes = newNotes.concat(newNotes.slice(0, frets - 24));
        }

        if (this.props.lefty) {
            newNotes.reverse();
        }

        return newNotes;
    }

    render() {
        var strings = [];
        for (var note of this.props.strings) {
            strings.push(this.orderNotes(note));
        }

        strings.reverse();

        return (
            <div>
                {strings.map( (stringNotes, index) => {
                    return (
                        <NoteString
                            notes={stringNotes}
                            highlighted={this.props.highlighted}
                            musicKey={this.props.musicKey}
                            changeHighlight={this.props.changeHighlight}
                            key={index}
                        />
                    );
                })}
                <Frets frets={this.props.frets + 1} lefty={this.props.lefty}/>
            </div>
        );
    }
}

Fretboard.propTypes = {
    frets: PropTypes.number.isRequired,
    notes: PropTypes.arrayOf(PropTypes.string).isRequired,
    strings: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlighted: PropTypes.arrayOf(PropTypes.string).isRequired,
    musicKey: PropTypes.string.isRequired,
    lefty: PropTypes.bool.isRequired,
    changeHighlight: PropTypes.func.isRequired
};


class FretboardPage extends React.Component {
    #notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    constructor(props) {
        super(props);
        this.state = {
            strings: ["E", "A", "D", "G", "B", "E"], // String tunings from high e to low E
            frets: 17,
            musicKey: "C",
            scale: "majorPent",
            highlighted: ["A", "C", "D", "E", "G"],
            lefty: false
        };
    }

    /* Get a note, return an anonymous function that changes the state of the note. This function then gets passed to tiles. */
    changeHighlight = (note) => {
        return () => {
            this.setState(oldState => {
                if (oldState.highlighted.includes(note)) {
                    oldState.highlighted.splice(oldState.highlighted.indexOf(note), 1);
                    return {highlighted: oldState.highlighted};
                } else {
                    return {highlighted: oldState.highlighted.concat([note])};
                }
            });
        };
    }

    setStringNumber = (event) => {
        var number = event.target.value;
        if (number>=1 && number<=12) {
            this.setState(oldState => {
                var strings = oldState.strings;
                if (strings.length >= number) {
                    strings = strings.slice(strings.length-number);
                    return {strings: strings};
                } else {
                    var full = ["A", "A", "G", "C", "F", "B", "E", "A", "D", "G", "B", "E"];
                    strings = full.slice(full.length-number);
                    return {strings: strings};
                }
            });
        }
    }

    setFretNumber = (event) => {
        var number = Number(event.target.value);
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

    setTuning = (arr) => {
        this.setState({strings: arr});
    }

    getScaleNotes = (scale, key) => {
        var indecies = [];
        var modes = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"];
        
        // --- Diatonic modes ---
        if (modes.includes(scale)) {
            let major = [0, 2, 4, 5, 7, 9, 11];
            let i = modes.indexOf(scale);
            indecies = major.slice(i).concat(major.slice(0, i));
            let x = 12 - indecies[0];
            indecies = indecies.map((num) => {
                return (num + x) % 12;
            });
        } // --- Other scales ---
        else if (scale === "majorPent") {
            indecies = [0, 2, 4, 7, 9];
        } else if (scale === "minorPent") {
            indecies = [0, 3, 5, 7, 10];
        } else if (scale === "majorBlues") {
            indecies = [0, 2, 3, 4, 7, 9];
        } else if (scale === "minorBlues") {
            indecies = [0, 3, 5, 6, 7, 10];
        } else if (scale === "harmonicMinor") {
            indecies = [0, 2, 3, 5, 7, 8, 11];
        } else if (scale === "melodicMinor") {
            indecies = [0, 2, 3, 5, 7, 9, 11];
        } // --- Arpeggios --- 
        else if (scale === "majArp") {
            indecies = [0, 4, 7];
        } else if (scale === "minArp") {
            indecies = [0, 3, 7];
        } else if (scale === "augArp") {
            indecies = [0, 4, 8];
        } else if (scale === "dimArp") {
            indecies = [0, 3, 6];
        } else if (scale === "maj7Arp") {
            indecies = [0, 4, 7, 11];
        } else if (scale === "dom7Arp") {
            indecies = [0, 4, 7, 10];
        } else if (scale === "min7Arp") {
            indecies = [0, 3, 7, 10];
        } else if (scale === "halfdim7Arp") {
            indecies = [0, 3, 6, 10];
        } else if (scale === "dim7Arp") {
            indecies = [0, 3, 6, 9];
        }

        // convert indecies to notes in specified key
        var i = this.#notes.indexOf(key);
        var notes = this.#notes.slice(i).concat(this.#notes.slice(0,i));

        var highlighted = indecies.map((num) => {
            return notes[num];
        });

        return highlighted;
    }

    setMusicKey = (event) => {
        var highlighted = this.getScaleNotes(this.state.scale, event.target.value);
        this.setState({
            musicKey: event.target.value,
            highlighted: highlighted
        });
    }

    setScale = (event) => {
        var highlighted = this.getScaleNotes(event.target.value, this.state.musicKey);
        this.setState({
            scale: event.target.value,
            highlighted: highlighted
        });
    }

    setLefty = () => {
        this.setState((oldState) => {
            return {lefty: !oldState.lefty};
        });
    }

    render() {
        return (
            <div>
                <FretboardMenu
                    {...this.state}
                    setStringNumber={this.setStringNumber}
                    setFretNumber={this.setFretNumber}
                    setStringTuning={this.setStringTuning}
                    setTuning={this.setTuning}
                    setMusicKey={this.setMusicKey}
                    setScale={this.setScale}
                    setLefty={this.setLefty}
                />
                <Fretboard
                    {...this.state}
                    changeHighlight={this.changeHighlight}
                    notes={this.#notes}
                />
            </div>
        );
    }

}


export default FretboardPage;
