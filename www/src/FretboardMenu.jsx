import React from 'react';
import './App.css';


class StringNumber extends React.Component {
    render() {
        return (
            <div>
                <label>Strings</label>
                <input
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
        return;
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
                <StringNumber onUpdate={this.props.setStringNumber}/>
                <FretNumber onUpdate={this.props.setFretNumber}/>
            </div>
        )
    }
}


export default FretboardMenu;
