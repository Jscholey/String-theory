import React from 'react';
import Slider from '../resources/Slider.jsx';
import {Howl, Howler} from 'howler';


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
                                onClick={() => {this.props.onUpdate(index)}}
                            />
                        )
                    })}
                </div>
            </form>
        )
    }
}


class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tempo: 80,
                      beatsPerBar: 4,
                      clicksPerBeat: 2,
                      beats: [2, 1, 1, 1],
                      currentBeat: 0,
                      sound: "drum",
                      play: false}
    }

    setTempo = (event) => {
        var sound = new Howl({src: ['/sound/long/metronome-click-1.wav']});
        sound.play();
        this.setState({tempo: event.target.value});
    }

    setBPB = (event) => {
        var number = event.target.value;
        if (number>=1 && number <=20) {
            this.setState((oldState) => {
                var beats = oldState.beats;
                var len = number;
                var out = []
                if (len > beats.length) {
                    out = beats.concat(Array(len-beats.length).fill(1));
                } else {
                    beats.length = len;
                    out = beats;
                }
                return {beatsPerBar: len,
                        beats: out}
            });
        }
    }

    setCPB = (event) => {
        var number  = event.target.value;
        if (number>=1 && number<=8) {
            this.setState({clicksPerBeat: event.target.value});
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

    render() {
        return (
            <div>
                <Slider
                    number={this.state.tempo}
                    min="20"
                    max="280"
                    onUpdate={this.setTempo}
                >
                    Tempo
                </Slider>
                <Slider
                    number={this.state.beatsPerBar}
                    min="1"
                    max="20"
                    onUpdate={this.setBPB}
                >
                    Beats per bar
                </Slider>
                <Slider
                    number={this.state.clicksPerBeat}
                    min="1"
                    max="8"
                    onUpdate={this.setCPB}
                >
                    Clicks per beat
                </Slider>
                <Beats
                    beats={this.state.beats}
                    onUpdate={this.setBeats}
                />
            </div>
        )
    }
}


export default Metronome;
