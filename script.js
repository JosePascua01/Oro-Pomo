//Audio Alarm
let audioAlarm = {
    Pomodoro: {
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
    Orodomop: {
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
}

console.log(audioAlarm.Pomodoro.language.English.play);

//Control Buttons
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const timer = document.getElementById('timer');
const timerType = document.getElementById('timer-type');

//Timer Logic
const pomodoroTime = 10;
const shortBreakTime = 10;
let timeLeft = pomodoroTime;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `
    ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
    `;
}

const startPomodoroTimer = () => {
    timerType.innerHTML = "Pomodoro"
    timeLeft = pomodoroTime;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            startShortBreakTimer();
            updateTimer();
        }
    }, 1000);
}

const startShortBreakTimer = () => {
    timerType.innerHTML = "Short Break"
    timeLeft = shortBreakTime;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            timerType.innerHTML = "Pomodoro"
            timeLeft = pomodoroTime;
            updateTimer();
        }
    }, 1000);
}

const pauseTimer = () => clearInterval(interval);

const stopTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

playButton.addEventListener('click', startPomodoroTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);

const languageSelected = document.getElementById('Language');

//console.log(languageSelected.value);

const changeAlertVoice = () => { alert(`The voice that reminds you should be in ${language.value}`) }