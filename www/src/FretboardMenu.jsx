import React from 'react';
import './App.css';


class StringNumber extends React.Component {
    render() {
        return (
            <div>
                <label>Strings</label>
                <input
                    value={this.props.number}
                    type="number"
                    min="1"
                    max="12"
                    onChange={this.props.onUpdate}
                />
            </div>
        )
    }
}


class FretNumber extends React.Component {
    render() {
        return (
            <div>
                <label>Frets</label>
                <input
                    value={this.props.number}
                    type="number"
                    min="6"
                    max="30"
                    onChange={this.props.onUpdate}
                />
            </div>
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
                            {/*TODO, reverse this list in css with flexbox*/}
                        </select>
                    )
                })}
            </form>
        )
    }
}


class StringsMenu extends React.Component {
    render() {
        return;
    }
}


class KeyMenu extends React.Component {
    render() {
        return;
    }
}


class ScaleMenu extends React.Component {
    render() {
        return;
    }
}


class FretboardMenu extends React.Component {
    render() {
        return (
            <div>
                <StringNumber onUpdate={this.props.setStringNumber} number={this.props.strings.length}/>
                <FretNumber onUpdate={this.props.setFretNumber} number={this.props.frets}/>
                <TuningsMenu onUpdate={this.props.setStringTuning} strings={this.props.strings}/>
            </div>
        )
    }
}


export default FretboardMenu;
