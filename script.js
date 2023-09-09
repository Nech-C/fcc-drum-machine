function DrumPad(props) {
    return React.createElement(
        'div',
        { className: 'drum-pad', onClick: () => props.handleClick(props.id, props.letter) },
        [
            React.createElement(
                'audio',
                {
                    className: 'clip',
                    id: props.letter,
                    src: props.audioSrc,
                }
            ),
            props.letter
        ]
    );
}

function InfoPanel() {
    return React.createElement(
        'div',
        { id: 'info-panel' },
        [
            'Welcome to the Drum Machine!',
            React.createElement('br'),
            'Here is how you can use this machine:',
            React.createElement('ul', null, [
                React.createElement('li', null, 'Press the displayed letters on the drum pads to produce sound.'),
                React.createElement('li', null, 'Use the volume bars to adjust the sound level.'),
                React.createElement('li', null, 'The display at the top shows the name of the last played sound.'),
                React.createElement('li', null, 'You can also use keyboard keys corresponding to the letters on the drum pads.')
            ])
        ]
    );
}



function VolumeBar(props) {
    return React.createElement('div', { onClick: () => props.handleClick(props.keyNum), className: `${props.on} volume-bar` });
}

function VolumeDisplay(props) {
    const [volume, setVolume] = React.useState(5);
    
    const changeVolume = (newVolume) => {
        setVolume(newVolume);
        props.handleVolumeChange(newVolume / 10);
    };
    
    let volumeBars = [];
    for (let i = 1; i <= 10; i++) {
        volumeBars.push(React.createElement(VolumeBar, { on: i <= volume ? 'on' : 'off', keyNum: i, handleClick: changeVolume }));
    }

    return React.createElement('div', { id: 'volume-bars' }, volumeBars);
}

function DrumMachine() {
    const [display, setDisplay] = React.useState('Welcome to Drum Machine!');
    
    const [volume, setVolume] = React.useState(0.5);

    React.useEffect(() => {
        const handleKeyPress = (event) => {
          const selectedPad = pads.find((pad) => pad.letter === event.key.toUpperCase());
          if (selectedPad) {
            handlePadClick(selectedPad.id, selectedPad.letter);
          }
        };
        
        window.addEventListener('keydown', handleKeyPress);
        
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, []);
      
    const handlePadClick = (id, letter) => {
        const audio = document.getElementById(letter);
        audio.volume = volume;
        audio.play();
        setDisplay(id);
    };

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    };

    const pads = [
        { letter: 'Q', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', id: 'Heater-1' },
        { letter: 'W', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', id: 'Heater-2' },
        { letter: 'E', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', id: 'Heater-3' },
        { letter: 'A', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', id: 'Heater-4' },
        { letter: 'S', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', id: 'Heater-6' },
        { letter: 'D', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', id: 'Dsc-Oh' },
        { letter: 'Z', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', id: 'Kick-n-Hat' },
        { letter: 'X', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', id: 'RP4-KICK-1' },
        { letter: 'C', audioSrc: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', id: 'Cev-H2' },
    ];

    const drumPadsRows = [];
    for (let i = 0; i < pads.length; i += 3) {
        const row = pads.slice(i, i + 3).map((pad) =>
            React.createElement(DrumPad, {
                letter: pad.letter,
                audioSrc: pad.audioSrc,
                id: pad.id,
                handleClick: handlePadClick,
            })
        );
        drumPadsRows.push(React.createElement('div', { className: 'pad-row' }, row));
    }

    return React.createElement(
        'div',
        { id: 'drum-machine' },
        [
            React.createElement(
                'div',
                { id: 'displays' },
                [
                    React.createElement('div', { id: 'display' }, display),
                    React.createElement(VolumeDisplay, { handleVolumeChange: handleVolumeChange }),
                ]
            ),
            React.createElement(
                'div',
                { id: 'lower-panel' },
                [
                    React.createElement('div', { id: 'drum-pads' }, drumPadsRows),
                    React.createElement(InfoPanel) // InfoPanel added here
                ]
            ),
        ]
    );
}


ReactDOM.render(
    React.createElement(DrumMachine),
    document.getElementById('root')
);
