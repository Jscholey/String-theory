import React from 'react';
import './App.css';


class StringNumber extends React.Component {
    render() {
        return (
            <form>
                <label>Strings</label>
                <input
                    value={this.props.number}
                    type="number"
                    min="1"
                    max="12"
                    onChange={this.props.onUpdate}
                />
            </form>
        )
    }
}


class FretNumber extends React.Component {
    render() {
        return (
            <form>
                <label>Frets</label>
                <input
                    value={this.props.number}
                    type="number"
                    min="6"
                    max="30"
                    onChange={this.props.onUpdate}
                />
            </form>
        )
    }
}


class TuningsMenu extends React.Component {
    render() {
        return (
            <form>
                {this.props.strings.map( (stringNote, index) => {
                    return (
                        <select value={stringNote} id={index} onChange={this.props.onUpdate}>
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
                    {/*TODO, reverse this list in css with flexbox*/}
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
                    <option value="ionian">Ionian/Major</option>
                    <option value="dorian">Dorian</option>
                    <option value="phrygian">Phrygian</option>
                    <option value="lydian">Lydian</option>
                    <option value="mixolydian">Mixolydian</option>
                    <option value="aeolian">Aeolian/Minor</option>
                    <option value="locrian">Locrian</option>
                    <option value="blues">Blues</option>
                    <option value="majorPent">Major Pentatonic</option>
                    <option value="minorPent">Minor Pentatonic</option>
                </select>
            </form>
        )
    }
}


class FretboardMenu extends React.Component {
    render() {
        return (
            <div className="fretboard-menu">
                <div className="string-menu menu-item">
                    <StringNumber onUpdate={this.props.setStringNumber} number={this.props.strings.length}/>
                    <FretNumber onUpdate={this.props.setFretNumber} number={this.props.frets}/>
                    <TuningsMenu onUpdate={this.props.setStringTuning} strings={this.props.strings}/>
                </div>
                <KeyMenu className="menu-item" onUpdate={this.props.setKey} value={this.props.musicKey}/>
                <ScaleMenu className="menu-item" onUpdate={this.props.setScale} value={this.props.scale}/>
            </div>
        )
    }
}


export default FretboardMenu;
