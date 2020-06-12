import React from 'react';
import Slider from '../resources/Slider.jsx'


class TuningsMenu extends React.Component {
    render() {
        return (
            <form className="form-tunings">
                <label>Tuning</label>
                <div className="tunings-menu">
                {this.props.strings.map( (stringNote, index) => {                    return (
                        <select className="tunings-selector"
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
                    )
                })}
                </div>
            </form>
        )
    }
}


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
        )
    }
}


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
        )
    }
}


class FretboardMenu extends React.Component {
    render() {
        return (
            <div className="fretboard-menu">
                <div className="menu-section">
                    <div className="menu-item">
                        <Slider
                            number={this.props.strings.length}
                            min="1"
                            max="12"
                            onUpdate={this.props.setStringNumber}
                        >
                            Strings
                        </Slider>
                        <Slider
                            number={this.props.frets}
                            min="6"
                            max="30"
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
                </div>
            </div>
        )
    }
}


export default FretboardMenu;
