const oro_pomLib = [
    {
        name: 'Orodomop',
        catchphrase: 'Rest, Break, Repeat',
        colorscheme: {
            background: '#212121',
            text: '#e8e8e8',
        },
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
    {
        name: 'Pomodoro',
        catchphrase: 'Work, Break, Repeat',
        colorscheme: {
            background: '#e8e8e8',
            text: '#212121',
        },
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
]

// // All Elements
const oro_pomSwitch = document.getElementById('oro-pom-switch');
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const timer = document.getElementById('timer');
const timerType = document.getElementById('timer-type');
const languageSelector = document.getElementById('Language');

//Setup Initial values for triggers
let oro_pomSwitchState = 0;
let languageSelected = 'English';
let isPause = false;

//Initialize webpage and elements
window.addEventListener(
    'load',
    (event) => {
        oro_pomSwitchState = Number(oro_pomSwitch.checked);
        const { name, catchphrase, colorscheme, language } = oro_pomLib[oro_pomSwitchState];
        document.querySelector('body').style.backgroundColor = colorscheme.background;
        document.querySelector('body').style.color = colorscheme.text;
        document.querySelector('title').innerText = name;
        document.querySelector('header h1').innerText = name;
        document.querySelector('header p').innerText = catchphrase;
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
        stopButton.style.display = 'none';

        timerType.innerText = name;
    })

//Orodomop / Pomodoro Switch Handler
const changeState = () => {
    //console.log(Number(oro_pomSwitch.checked));
    oro_pomSwitchState = Number(oro_pomSwitch.checked);
    const { name, catchphrase, colorscheme, } = oro_pomLib[oro_pomSwitchState];
    document.querySelector('body').style.backgroundColor = colorscheme.background;
    document.querySelector('body').style.color = colorscheme.text;
    document.querySelector('title').innerText = name;
    document.querySelector('header h1').innerText = name;
    document.querySelector('header p').innerText = catchphrase;
    timerType.innerText = name;
}

const playAlertAudio = (timerTypeDone) => {
    changeAudioLanguage();
    const { language, } = oro_pomLib[oro_pomSwitchState];
    if (timerTypeDone === 'oro_pomDone') {
        switch (languageSelected) {
            case 'English':
                audio.src = language.English.break;
                break;
            case 'Tagalog':
                audio.src = language.Tagalog.break;
                break;
            case 'Iloco':
                audio.src = language.Iloco.break;
                break;
        }
    } else if (timerTypeDone === 'shortBreakDone') {
        switch (languageSelected) {
            case 'English':
                audio.src = language.English.play;
                break;
            case 'Tagalog':
                audio.src = language.Tagalog.play;
                break;
            case 'Iloco':
                audio.src = language.Iloco.play;
                break;
        }
    }
    audio.play();
}

//Language Selected Handler
const changeAudioLanguage = () => {
    languageSelected = languageSelector.value;
    console.log(languageSelected);
}

//Timer Logic
const oro_pomTime = 10;
const shortBreakTime = 5;
let timeLeft = oro_pomTime;
let interval;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `
    ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}
    `;
}

const startShortBreakTimer = () => {
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    stopButton.style.display = 'block';
    timerType.innerText = "Short Break";
    timeLeft = shortBreakTime;
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            playAlertAudio('shortBreakDone');
            updateTimer();
            timerType.innerHTML = oro_pomLib[oro_pomSwitchState].name;
            timeLeft = oro_pomTime;
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
            stopButton.style.display = 'none';
        }
    }, 1000);
}

const startOro_PomTimer = () => {
    playButton.style.display = 'none';
    pauseButton.style.display = 'block';
    stopButton.style.display = 'block';
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft === 0) {
            clearInterval(interval);
            playAlertAudio('oro_pomDone'); // Play the break alert
            startShortBreakTimer(); // Starting short break
            updateTimer();
        }
    }, 1000);
};


pauseButton.addEventListener(
    'click',
    pauseTimer = () => {
        clearInterval(interval);
        isPause = true;
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
    }
);

playButton.addEventListener('click', () => {
    console.log(timerType.innerText);
    if (timerType.innerText === 'Orodomop' || timerType.innerText === 'Pomodoro') {
        timeLeft = oro_pomTime;
        startOro_PomTimer();
    } else if (timerType.innerText === 'Short Break') {
        timeLeft = shortBreakTime;
        startShortBreakTimer();
    }
});


// stopButton.addEventListener(
//     'click',
//     stopTimer = () => {
//         clearInterval(interval);
//         isClickedOnce = false;
//         if(isOroPomTime){
//             timeLeft = oro_pomTime;
//             playButton.addEventListener('click', startOro_PomTimer);
//         } else{
//             timeLeft = shortBreakTime;
//             playButton.addEventListener('click', startShortBreakTimer);
//         }
//         updateTimer();
//     });

/*
      _______
     /       \
    |  O   O  |
   (    . .    )   ME NO LIKEY
    \   ___   /
     \_______/
     //     \\
    //       \\
   //         \\
  ||           ||
   \\_________//
      //   \\
     //     \\
*/
