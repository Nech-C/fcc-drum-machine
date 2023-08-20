function DrumPad(props) {
    return React.createElement(
        'div',
        { className: 'drum-pad', onClick: props.handleClick },
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

function DrumMachine() {
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

    const [display, setDisplay] = React.useState('Welcome to Drum Machine!');

    const handlePadClick = (id) => {
        const audio = document.getElementById(pads.find((pad) => pad.id === id).letter);
        setDisplay(id);
        audio.play();
    };

    React.useEffect(() => {
        const handleKeyPress = (event) => {
            const selectedPad = pads.find((pad) => pad.letter === event.key.toUpperCase());
            if (selectedPad) {
                handlePadClick(selectedPad.id);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const drumPadsRows = [];
    for (let i = 0; i < pads.length; i += 3) {
        const row = pads.slice(i, i + 3).map((pad) =>
            React.createElement(DrumPad, {
                letter: pad.letter,
                audioSrc: pad.audioSrc,
                id: pad.id,
                handleClick: () => handlePadClick(pad.id),
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
                    React.createElement('div', { id: 'volume' }),
                ]
            ),
            React.createElement(
                'div',
                { id: 'lowerpanel' },
                [
                    React.createElement('div', { id: 'drum-pads' }, drumPadsRows),
                    React.createElement('div', { id: 'controls' }),
                ]
            ),
        ]
    );
}

ReactDOM.render(
    React.createElement(DrumMachine),
    document.getElementById('root')
);
