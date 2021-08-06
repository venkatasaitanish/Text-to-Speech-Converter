let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "Page refresh stopping.";
    window.speechSynthesis.cancel();
});


let voices = [];
window.speechSynthesis.addEventListener("voiceschanged", () => {
    voices = window.speechSynthesis.getVoices();
    //console.log(voices);
    speech.voice = voices[0];
    let voiceSelect = document.getElementById("voices");
    voices.forEach((voice, i) => {
        if(voice.default){
            voiceSelect.options[i] = new Option(voice.name + ' (' + voices[i].lang + ') ' + '--DEFAULT', i)
        }
        else{
            voiceSelect.options[i] = new Option(voice.name + ' (' + voices[i].lang + ')', i)
        }
    });
});

document.getElementById("volume").addEventListener("input", () => {
    const volume = document.getElementById("volume").value;
    speech.volume = volume;
    document.getElementById("volume-label").innerHTML = volume;
});

document.getElementById("rate").addEventListener("input", () => {
    const rate = document.getElementById("rate").value;
    speech.rate = rate;
    document.getElementById("rate-label").innerHTML = rate;
});

document.getElementById("pitch").addEventListener("input", () => {
    const pitch = document.getElementById("pitch").value;
    speech.pitch = pitch;
    document.getElementById("pitch-label").innerHTML = pitch;
});

document.getElementById("voices").addEventListener("change", () => {
    //console.log(document.getElementById("voices").value);
    speech.voice = voices[document.getElementById("voices").value];
    if(window.speechSynthesis.speaking === true){
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    }
});

document.getElementById("start").addEventListener("click", () => {
    speech.voice = voices[document.getElementById("voices").value];
    speech.text = document.querySelector("textarea").value;
    if(speech.text){
        if(window.speechSynthesis.speaking === false || window.speechSynthesis.paused === true){
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(speech);
        }
    }
    else{
        alert("Enter text");
    }
});

document.getElementById("pause").addEventListener("click", () => {
    if(window.speechSynthesis.speaking === false){
        //alert("Invalid");
        window.speechSynthesis.cancel();
    }
    else{
        window.speechSynthesis.pause();
    }
});

document.getElementById("resume").addEventListener("click", () => {
    window.speechSynthesis.resume();
});

document.getElementById("cancel").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});