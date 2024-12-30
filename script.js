const language = document.getElementById('Language');

console.log(language.value);

const changeAlertVoice = () => { alert(`The voice that reminds you should be in ${language.value}`) }