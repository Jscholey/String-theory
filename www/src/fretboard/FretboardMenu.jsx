import PropTypes from "prop-types";
import React from "react";
import Slider from "../resources/Slider.jsx";


class PresetTuningsMenu extends React.Component {
    #tunings = {
        standard: ["E", "A", "D", "G", "B", "E"],
        openA: ["E", "A", "C#", "E", "A", "E"],
        openC: ["C", "G", "C", "G", "C", "E"],
        openD: ["D", "A", "D", "F#", "A", "D"],
        openE: ["E", "B", "E", "G#", "B", "E"],
        openG: ["D", "G", "D", "G", "B", "D"],
        openAminor: ["E", "A", "E", "A", "C", "E"],
        openDminor: ["D", "A", "D", "F", "A", "D"],
        fourths: ["E", "A", "D", "G", "C", "F"],
        dropD: ["D", "A", "D", "G", "B", "E"],
        dropC: ["C", "G", "C", "F", "A", "D"],
        doubleDropD: ["D", "A", "D", "G", "B", "D"],
        doubleDropC: ["C", "G", "C", "F", "A", "C"],
        standardD: ["D", "G", "C", "F", "A", "D"],
        dadgad: ["D", "A", "D", "G", "A", "D"],
        daddad: ["D", "A", "D", "D", "A", "D"],
        ukeStandard: ["G", "C", "E", "A"],
        ukeBaritone: ["D", "G", "B", "E"],
        bass: ["E", "A", "D", "G"],
        bass5: ["B", "E", "A", "D", "G"],
        bass6: ["B", "E", "A", "D", "G", "C"],
        banjo: ["G", "D", "G", "B", "D"],
        mandolin: ["G", "D", "A", "E"],
    };

    render() {
        var currentTuning = "other";

        // Iterate over keys in dictionary
        for (var key in this.#tunings) {
            if (this.#tunings.hasOwnProperty(key)) {
                let value = this.#tunings[key];
                // check if the current tuning array and the one associated with the current key match
                if (this.props.tuning.length === value.length && this.props.tuning.every((v, i) => v === value[i])) {
                    currentTuning = key;
                    break;
                }
            }
        }

        return (
            <form>
                <label>Tuning</label>
                <select value={currentTuning} onChange={(event) => this.props.onUpdate(JSON.parse(JSON.stringify(this.#tunings[event.target.value])))}> {/*use JSON to make a deep copy of array*/}
                    {currentTuning === "other" ? <option value="other">Other</option> : ""}
                    <optgroup label="Guitar">
                        <option value="standard">Standard</option>
                        <option value="standardD">D Standard</option>
                        <option value="dropD">Drop D</option>
                        <option value="dropC">Drop C</option>
                        <option value="doubleDropD">Double Drop D</option>
                        <option value="doubleDropC">Double Drop C</option>
                        <option value="openA">Open A</option>
                        <option value="openC">Open C</option>
                        <option value="openD">Open D</option>
                        <option value="openE">Open E</option>
                        <option value="openG">Open G</option>
                        <option value="openAminor">Open A Minor</option>
                        <option value="openDminor">Open D Minor</option>
                        <option value="fourths">Fourths</option>
                        <option value="dadgad">DADGAD</option>
                        <option value="daddad">DADDAD</option>
                    </optgroup>
                    <optgroup label="Bass">
                        <option value="bass">Bass</option>
                        <option value="bass5">5 String Bass</option>
                        <option value="bass6">6 String Bass</option>
                    </optgroup>
                    <option value="ukeStandard">Ukelele</option>
                    <option value="ukeBaritone">Baritone Ukelele</option>
                    <option value="banjo">Banjo</option>
                    <option value="mandolin">Mandolin</option>
                </select>
            </form>
        );
    }
}

PresetTuningsMenu.propTypes = {
    tuning: PropTypes.arrayOf(PropTypes.string).isRequired,
    onUpdate: PropTypes.func.isRequired
};


class TuningsMenu extends React.Component {
    render() {
        return (
            <form className="form-tunings">
                <div className="tunings-menu">
                    {this.props.strings.map( (stringNote, index) => {
                        return (
                            <select
                                className="tunings-selector"
                                value={stringNote}
                                id={index}
                                key={index}
                                onChange={this.props.onUpdate}
                            >
                                <option value="A">A</option>
                                <option value="A#">A#</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="C#">C#</option>
                                <option value="D">D</option>
                                <option value="D#">D#</option>
                                <option value="E">E</option>
                                <option value="F">F</option>
                                <option value="F#">F#</option>
                                <option value="G">G</option>
                                <option value="G#">G#</option>
                            </select>
                        );
                    })}
                </div>
            </form>
        );
    }
}

TuningsMenu.propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string).isRequired,
    onUpdate: PropTypes.func.isRequired
};


class KeyMenu extends React.Component {
    render() {
        return (
            <form>
                <label>Key</label>
                <select value={this.props.value} onChange={this.props.onUpdate}>
                    <option value="A">A</option>
                    <option value="A#">A#</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="C#">C#</option>
                    <option value="D">D</option>
                    <option value="D#">D#</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="F#">F#</option>
                    <option value="G">G</option>
                    <option value="G#">G#</option>
                </select>
            </form>
        );
    }
}

KeyMenu.propTypes = {
    value: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
};


class ScaleMenu extends React.Component {
    render() {
        return (
            <form>
                <label>Scale</label>
                <select value={this.props.value} onChange={this.props.onUpdate}>
                    <option value="majorPent">Major Pentatonic</option>
                    <option value="minorPent">Minor Pentatonic</option>
                    <option value="majorBlues">Major Blues</option>
                    <option value="minorBlues">Minor Blues</option>
                    <option value="harmonicMinor">Harmonic Minor</option>
                    <option value="melodicMinor">Melodic Minor</option>
                    <optgroup label="Diatonics">
                        <option value="ionian">Ionian/Major</option>
                        <option value="dorian">Dorian</option>
                        <option value="phrygian">Phrygian</option>
                        <option value="lydian">Lydian</option>
                        <option value="mixolydian">Mixolydian</option>
                        <option value="aeolian">Aeolian/Minor</option>
                        <option value="locrian">Locrian</option>
                    </optgroup>
                    <optgroup label="Arpeggios">
                        <option value="majArp">Major</option>
                        <option value="minArp">Minor</option>
                        <option value="augArp">Augmented</option>
                        <option value="dimArp">Diminished</option>
                        <option value="maj7Arp">Major 7th</option>
                        <option value="dom7Arp">Dominant 7th</option>
                        <option value="min7Arp">Minor 7th</option>
                        <option value="halfdim7Arp">Half Diminished 7th</option>
                        <option value="dim7Arp">Diminished 7th</option>
                    </optgroup>
                </select>
            </form>
        );
    }
}

ScaleMenu.propTypes = {
    value: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
};


class FretboardMenu extends React.Component {
    render() {
        return (
            <div className="fretboard-menu">
                <div className="menu-section">
                    <div className="menu-item">
                        <Slider
                            number={this.props.strings.length}
                            min={1}
                            max={12}
                            onUpdate={this.props.setStringNumber}
                        >
                            Strings
                        </Slider>
                        <Slider
                            number={this.props.frets}
                            min={6}
                            max={30}
                            onUpdate={this.props.setFretNumber}
                        >
                            Frets
                        </Slider>
                    </div>
                    <div className="menu-item">
                        <KeyMenu onUpdate={this.props.setMusicKey} value={this.props.musicKey}/>
                        <ScaleMenu className="menu-item" onUpdate={this.props.setScale} value={this.props.scale}/>
                    </div>
                </div>
                <div className="menu-section">
                    <TuningsMenu onUpdate={this.props.setStringTuning} strings={this.props.strings}/>
                    <PresetTuningsMenu tuning={this.props.strings} onUpdate={this.props.setTuning} />
                </div>
                <div className="menu-section">
                    <form>
                        <label htmlFor="lefty">Left handed</label>
                        <input type="checkbox" name="lefty" value={this.props.lefty} onChange={this.props.setLefty}/>
                    </form>
                </div>
            </div>
        );
    }
}
    
FretboardMenu.propTypes = {
    strings: PropTypes.arrayOf(PropTypes.string).isRequired,
    frets: PropTypes.number.isRequired,
    musicKey: PropTypes.string.isRequired,
    scale: PropTypes.string.isRequired,
    lefty: PropTypes.bool.isRequired,
    setStringNumber: PropTypes.func.isRequired,
    setStringTuning: PropTypes.func.isRequired,
    setTuning: PropTypes.func.isRequired,
    setFretNumber: PropTypes.func.isRequired,
    setMusicKey: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
    setLefty: PropTypes.func.isRequired
};


export default FretboardMenu;
