import React from 'react';
import ReactDOM from 'react-dom';

import Container from './Container.jsx';

import './normalise.css';
import './index.css';
import './fretboard/fretboard.css';
import './metronome/metronome.css';


// import {Howl, Howler} from 'howler';

// var sound = new Howl({
//     src: ['/sound/short/button.wav'],
//     autoplay: true,
//     loop: true,
//     volume: 1.0,
//     html5: true
// });
// sound.play();

ReactDOM.render(
    <Container />,
    document.getElementById('root')
);
