import React from 'react';


class StringNumber extends React.Component {
    render() {
        return (
            <form className="form-number">
                <label>Strings</label>
                <input
                    value={this.props.number}
                    type="number"
                    min="1"
                    max="12"
                    onChange={this.props.onUpdate}
                />
                <input
                    value={this.props.number}
                    type="range"
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
            <form className="form-number">
                <label>Frets</label>
                <input
                    value={this.props.number}
                    type="number"
                    min="6"
                    max="30"
                    onChange={this.props.onUpdate}
                />
                <input
                    value={this.props.number}
                    type="range"
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
                <div className="menu-section">
                    <div className="menu-item">
                        <StringNumber onUpdate={this.props.setStringNumber} number={this.props.strings.length}/>
                        <FretNumber onUpdate={this.props.setFretNumber} number={this.props.frets}/>
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
