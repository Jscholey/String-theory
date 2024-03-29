import PropTypes from "prop-types";
import React from "react";
import Slider from "../resources/Slider.jsx";
import {Howl, Howler} from "howler";


class Beats extends React.Component {
    render() {
        return (
            <form className="beats-form">
                <label className="beats-form-item">Emphasis</label>
                <div className="beat-container beats-form-item">
                    {this.props.beats.map( (beatType, index) => {
                        var name = "beat";
                        switch (beatType) {
                        case 0:
                            name += " beat-mute";
                            break;
                        case 1:
                            name += " beat-weak";
                            break;
                        case 2:
                            name += " beat-strong";
                            break;
                        default:
                            break;
                        }
                        return (
                            <input
                                type="button"
                                className={name}
                                key={index}
                                onClick={() => {this.props.onUpdate(index);}}
                            />
                        );
                    })}
                </div>
            </form>
        );
    }
}

Beats.propTypes = {
    beats: PropTypes.arrayOf(PropTypes.number).isRequired,
    onUpdate: PropTypes.func.isRequired
};


class SoundMenu extends React.Component {
    render() {
        return (
            <form>
                <label>{this.props.label}</label>
                <select value={this.props.value} onChange={this.props.onUpdate}>
                    <option value="metronome-clap-1.wav">Metronome 1</option>
                    <option value="metronome-click-1.wav">Metronome 2</option>
                    <option value="metronome-digital-1.wav">Metronome 3</option>
                    <option value="metronome-tick-1.wav">Metronome 4</option>
                    <option value="metronome-woodblock.wav">Metronome 5</option>
                    <option value="tama-drum-2.wav">Metronome 6</option>
                    <option value="bass-drum-1.wav">Bass 1</option>
                    <option value="bass-drum-2.wav">Bass 2</option>
                    <option value="bass-drum-3.wav">Bass 3</option>
                    <option value="kick-drum-1.wav">Drum 1</option>
                    <option value="kick-drum-2.wav">Drum 2</option>
                    <option value="kick-drum-3.wav">Drum 3</option>
                    <option value="crash-drum-1.wav">Drum 4</option>
                    <option value="tama-drum-1.wav">Drum 5</option>
                    <option value="snare-drum-1.wav">Snare</option>
                    <option value="button.wav">Click 1</option>
                    <option value="click-deep-1.wav">Click 2</option>
                </select>
            </form>
        );
    }
}

SoundMenu.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
};


class PlayBeats extends React.Component {
    render() {
        return (
            <form className="play-beats-form">
                {this.props.beats.map( (beatType, index) => {
                    var name = "play-beat";
                    if (index === this.props.currentBeat) {
                        name += " play-beat-current";
                    }
                    return (
                        <input
                            type="button"
                            className={name}
                            key={index}
                            onClick={() => {this.props.onUpdate(index);}}
                        />
                    );
                })}
            </form>
        );
    }
}

PlayBeats.propTypes = {
    beats: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentBeat: PropTypes.number.isRequired,
    onUpdate: PropTypes.func.isRequired
};


class PlayButton extends React.Component {
    render() {
        return (
            <form className="play-button-container">
                <input
                    type="button"
                    className={"play-button" + (this.props.play ? " play-button-active" : "")}
                    onClick={this.props.onUpdate}
                />
            </form>
        );
    }
}

PlayButton.propTypes = {
    play: PropTypes.bool.isRequired,
    onUpdate: PropTypes.func.isRequired
};


class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            volume: 1.0,
            tempo: 80,
            beatsPerBar: 4,
            clicksPerBeat: 2,
            beats: [2, 1, 1, 1],
            currentBeat: 0,
            srcWeak: "metronome-click-1.wav",
            srcStrong: "metronome-tick-1.wav",
            srcOff: "metronome-clap-1.wav",
            soundWeak: new Howl({src: ["/sound/short/metronome-click-1.wav"]}),
            soundStrong: new Howl({src: ["/sound/short/metronome-tick-1.wav"]}),
            soundOff: new Howl({src: ["/sound/short/metronome-clap-1.wav"]}),
            play: false,
            timerId: false,
            offBeatId: false
        };
    }

    componentWillUnmount() {
        clearInterval(this.state.timerId);
        clearInterval(this.state.offBeatId);
    }

    setVolume = (event) => {
        var volume = Number(event.target.value);
        Howler.volume(volume);
        this.setState({volume: volume});
    }

    setSound = (beatType) => {
        switch (beatType) {
        case "strong":
            return (event) => {
                this.setState({
                    soundStrong: new Howl({src: ["/sound/short/" + event.target.value]}),
                    srcStrong: event.target.value
                });
            };
        case "weak":
            return (event) => {
                this.setState({
                    soundWeak: new Howl({src: ["/sound/short/" + event.target.value]}),
                    srcWeak: event.target.value
                });
            };
        case "off":
            return (event) => {
                this.setState({
                    soundOff: new Howl({src: ["/sound/short/" + event.target.value]}),
                    srcOff: event.target.value
                });
            };
        default:
            break;
        }
    }

    setTempo = (event) => {
        var t =  Number(event.target.value);
        this.setState({tempo: t});
        if (this.state.play) {
            this.changePlayTempo(t);
        }
    }

    setBPB = (event) => {
        var number = Number(event.target.value);
        if (number>=1 && number <=20) {
            this.setState((oldState) => {
                var beats = oldState.beats;
                var len = number;
                var out = [];
                if (len > beats.length) {
                    out = beats.concat(Array(len-beats.length).fill(1));
                } else {
                    beats.length = len;
                    out = beats;
                }
                var currentBeat = oldState.currentBeat;
                if (currentBeat >= len) {
                    currentBeat = len-1;
                }
                return {
                    beatsPerBar: len,
                    beats: out,
                    currentBeat: currentBeat
                };
            });
        }
    }

    setCPB = (event) => {
        var number  = Number(event.target.value);
        if (number>=1 && number<=8) {
            this.setState({clicksPerBeat: number});
        }
    }

    setBeats = (index) => {
        this.setState((oldState) => {
            var beats = oldState.beats;
            var newBeatType = (beats[index] + 1) % 3;
            beats[index] = newBeatType;
            return {beats: beats};
        });
    }

    setCurrentBeat = (index) => {
        this.setState({currentBeat: index}, () => {
            if (this.state.play) {
                this.playBeat(this.state.tempo);
            }
        });
    }

    togglePlay = () => {
        this.setState((oldState) => {
            if (!oldState.play) {
                this.startPlay();
            } else {
                this.stopPlay();
            }
            return {play: !oldState.play};
        });
    }

    // A whole bunch of methods for starting and stopping the metronome sound
    startPlay = () => {
        this.playBeat(this.state.tempo);
    }

    stopPlay = () => {
        clearInterval(this.state.timerId);
        clearInterval(this.state.offBeatId);
    }

    changePlayTempo = (tempo) => {
        this.playBeat(tempo);
    }

    playBeat = (tempo) => {
        // Set the interval and save id
        var newId = setInterval(() => {
            // increment the currentBeat counter
            this.setState((oldState) => {
                var newBeat = oldState.currentBeat + 1;
                return {currentBeat: newBeat >= oldState.beatsPerBar ? 0 : newBeat};
            });

            // play a sound based on current beat type
            switch (this.state.beats[this.state.currentBeat]) {
            case 1:
                this.state.soundWeak.play();
                this.playOffBeats(tempo, this.state.clicksPerBeat);
                break;
            case 2:
                this.state.soundStrong.play();
                this.playOffBeats(tempo, this.state.clicksPerBeat);
                break;
            default:
                break;
            }
        }, 60000/tempo);

        // clear the old interval id and save the new id in state
        this.setState((oldState) => {
            clearInterval(oldState.timerId);
            clearInterval(oldState.offBeatId);
            return {timerId: newId};
        });

        // play the first sound before the interval
        switch (this.state.beats[this.state.currentBeat]) {
        case 1:
            this.state.soundWeak.play();
            this.playOffBeats(tempo, this.state.clicksPerBeat);
            break;
        case 2:
            this.state.soundStrong.play();
            this.playOffBeats(tempo, this.state.clicksPerBeat);
            break;
        default:
            break;
        }
    }

    playOffBeats = (tempo, CPB) => {
        if (CPB > 1) {
            var clicks = 0;
            this.setState((oldState) => {
                var newId = setInterval(() => {
                    oldState.soundOff.play();
                    if (++clicks >= CPB-1) {
                        clearInterval(newId);
                    }
                }, 60000/(tempo*CPB));
                return {offBeatId: newId};
            });
        }
    }

    // Finally the render method
    render() {
        return (
            <div>
                <Slider
                    number={this.state.volume}
                    min={0.0}
                    max={1.0}
                    step={0.01}
                    onUpdate={this.setVolume}
                >
                    Volume
                </Slider>
                <Slider
                    number={this.state.tempo}
                    min={20}
                    max={280}
                    onUpdate={this.setTempo}
                >
                    Tempo
                </Slider>
                <Slider
                    number={this.state.beatsPerBar}
                    min={1}
                    max={20}
                    onUpdate={this.setBPB}
                >
                    Beats per bar
                </Slider>
                <Slider
                    number={this.state.clicksPerBeat}
                    min={1}
                    max={8}
                    onUpdate={this.setCPB}
                >
                    Clicks per beat
                </Slider>
                <Beats
                    beats={this.state.beats}
                    onUpdate={this.setBeats}
                />
                <SoundMenu
                    label={"Strong beats"}
                    value={this.state.srcStrong}
                    onUpdate={this.setSound("strong")}
                />
                <SoundMenu
                    label={"Weak beats"}
                    value={this.state.srcWeak}
                    onUpdate={this.setSound("weak")}
                />
                <SoundMenu
                    label={"Off beats"}
                    value={this.state.srcOff}
                    onUpdate={this.setSound("off")}
                />
                <PlayBeats
                    beats={this.state.beats}
                    currentBeat={this.state.currentBeat}
                    onUpdate={this.setCurrentBeat}
                />
                <PlayButton
                    play={this.state.play}
                    onUpdate={this.togglePlay}
                />
            </div>
        );
    }
}


export default Metronome;
