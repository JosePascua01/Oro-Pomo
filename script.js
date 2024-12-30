let oro_PomLib = {
    Orodomop: {
        name: 'Orodomop',
        language: {
            English: {
                play: 'assets/audio alerts/Orodomop/English/EnglishPlay.mp3',
                break: 'assets/audio alerts/Orodomop/English/EnglishBreak.mp3',
            },
            Tagalog: {
                play: 'assets/audio alerts/Orodomop/Tagalog/TagalogPlay.mp3',
                break: 'assets/audio alerts/Orodomop/Tagalog/TagalogBreak.mp3',
            },
            Iloco: {
                play: 'assets/audio alerts/Orodomop/Iloco/IlocoPlay.mp3',
                break: 'assets/audio alerts/Orodomop/Iloco/IlocoBreak.mp3',
            },
        },
    },
    Pomodoro: {
        name: 'Pomodoro',
        language: {
            English: {
                play: 'assets/audio alerts/Pomodoro/English/EnglishPlay.mp3',
                break: 'assets/audio alerts/Pomodoro/English/EnglishBreak.mp3',
            },
            Tagalog: {
                play: 'assets/audio alerts/Pomodoro/Tagalog/TagalogPlay.mp3',
                break: 'assets/audio alerts/Pomodoro/Tagalog/TagalogBreak.mp3',
            },
            Iloco: {
                play: 'assets/audio alerts/Pomodoro/Iloco/IlocoPlay.mp3',
                break: 'assets/audio alerts/Pomodoro/Iloco/IlocoBreak.mp3',
            },
        },
    },
}

// All Elements
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const timer = document.getElementById('timer');
const timerType = document.getElementById('timer-type');
const languageSelector = document.getElementById('Language');
const oro_pomSwitch = document.getElementById('oro-pom-switch');

//Orodomop / Pomodoro Switch Handler
let oro_pomSwitchState;
const changeState = () => {
    if (!oro_pomSwitch.checked) {
        oro_pomSwitchState = oro_PomLib.Orodomop;
    } else {
        oro_pomSwitchState = oro_PomLib.Pomodoro;
    };
    console.log(oro_pomSwitchState.name);
}

//Language Selected Handler
let languageSelected = 'English';
const changeAlertLanguage = () => {
    languageSelected = languageSelector.value;
    console.log(languageSelected);
}

//Timer Logic
const oro_pomTime = 10;
const shortBreakTime = 10;
let timeLeft = oro_pomTime;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `
    ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
    `;
}

const playAlertAudio = (timerTypeDone) => {
    if (timerTypeDone === 'oro_pomDone') {
        switch (languageSelected) {
            case 'English':
                audio.src = oro_pomSwitchState.language.English.break;
                break;
            case 'Tagalog':
                audio.src = oro_pomSwitchState.language.Tagalog.break;
                break;
            case 'Iloco':
                audio.src = oro_pomSwitchState.language.Iloco.break;
                break;
        }
        audio.play();
    }
}

const startShortBreakTimer = () => {
    timerType.innerHTML = "Short Break"
    timeLeft = shortBreakTime;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            timerType.innerHTML = oro_pomSwitchState.name;
            timeLeft = oro_pomTime;
            updateTimer();
        }
    }, 1000);
}

const startOro_PomTimer = () => {
    console.log(oro_pomSwitchState.name)
    playButton.removeEventListener('click', startOro_PomTimer);
    timerType.innerHTML = oro_pomSwitchState.name;
    timeLeft = oro_pomTime;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            playAlertAudio('oro_pomDone');
            startShortBreakTimer();
            updateTimer();
        }
    }, 1000);
}

playButton.addEventListener('click', startOro_PomTimer);

pauseButton.addEventListener(
    'click',
    pauseTimer = () => {
        clearInterval(interval);
        playButton.addEventListener('click', startOro_PomTimer);
    }
);

stopButton.addEventListener(
    'click',
    stopTimer = () => {
        clearInterval(interval);
        playButton.addEventListener('click', startOro_PomTimer);
        timeLeft = oro_pomTime;
        updateTimer();
    });
