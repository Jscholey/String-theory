import React from 'react';


class Metronome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tempo: 80,
                      beatsPerBar: 4,
                      clicksPerBeat: 2,
                      beats: [2, 1, 1, 1],
                      sound: "drum",
                      play: false}
    }

    render() {
        return <div>hi</div>;
    }
}


export default Metronome;
