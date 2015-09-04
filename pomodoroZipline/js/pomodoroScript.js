var timerID,
 seconds,
 numBreaks,
 nextType,
 notifTitle, notifText,
 paused

$(document).ready(function(){
    clearInterval(timerID);
    seconds = 60;
    displayTime();
    paused = true;
    $('#timer-wrapper').click(function(){
        if(paused){
            runTimer(seconds);
            paused = false;
        }
        else {
            pause();
            paused = true;
        }
    });
    
})

function runTimer(seconds) {
    clearInterval(timerID);
    timer(seconds);
    timerID = setInterval('timer(seconds)', 1000);
}

function pause() {
    if(paused)
    {
        paused = 0;
        runTimer(seconds);
        text = 'Pause';
        
    }
    else {
        paused = 1;
        clearInterval(timerID);
        text = 'Continue';
    }
    //document.getElementById('stop').value = text;
    
}

function timer(){
    displayTime();
    if(seconds > 0) {
        seconds--;      
    }
    else {
        clearInterval(timerID);
        pomodoro(nextType);
        playSound("bell");
    }
}

function displayTime(){
    var minutes = Math.round((seconds - 30)/60);
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    var remainingSeconds = seconds % 60;
    if(remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }
    $('.pomodoro-timer').text(minutes + ':' + seconds);
}

function convertToSeconds(minutes, seconds){
    return minutes * 60 + seconds;
}

