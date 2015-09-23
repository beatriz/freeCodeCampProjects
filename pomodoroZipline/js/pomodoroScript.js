var timerID,
 seconds,
 numBreaks,
 nextType,
 notifTitle, notifText,
 paused,
 pomodoroTime,
 breakTime,
 onBreak

$(document).ready(function(){
    clearInterval(timerID);
    seconds = 60;
    pomodoroTime = 1;
    breakTime = 1;
    displayTime();
    paused = true;
    onBreak = false;

    updateTime('pomodoro-time', pomodoroTime);
    updateTime('break-time', breakTime);

    $('#minus-pom').click(function(){
      if(pomodoroTime > 1){
        pomodoroTime--;
        updateTime('pomodoro-time', pomodoroTime);
        if(!onBreak){
          seconds = minToSec(pomodoroTime);
          displayTime();
        }
      }
    });

    $('#plus-pom').click(function(){
      pomodoroTime++;
      updateTime('pomodoro-time', pomodoroTime);
      if(!onBreak){
        seconds = minToSec(pomodoroTime);
        displayTime();
      }
    });

    $('#minus-break').click(function(){
      if(breakTime > 1){
        breakTime--;
        updateTime('break-time', breakTime);
        if(onBreak){
          seconds = minToSec(breakTime);
          displayTime();
        }
      }
    });

    $('#plus-break').click(function(){
      breakTime++;
      updateTime('break-time', breakTime);
      if(onBreak){
        seconds = minToSec(breakTime);
        displayTime();
      }
    });

    $('#timer-wrapper').click(function(){
        pomodoro();
    });
});

function pomodoro(){
  if(!onBreak){
    $('#background').css('background-color', '#0a0');
    runTimer(seconds);
  } else{
    $('#background').css('background-color', '#a00');
    runTimer(seconds);
  }
}

function runTimer(seconds) {
    if(paused){
      clearInterval(timerID);
      $('.not-button').prop('disabled', true);
      timer(seconds);
      timerID = setInterval('timer(seconds)', 1000);
    } else {
      $('.not-button').prop('disabled', false);
      clearInterval(timerID);
    }
    paused = !paused;
}

function timer(){
    displayTime();
    if(seconds > 0) {
        seconds--;
    }
    else {
        clearInterval(timerID);
        paused = true;
        onBreak = !onBreak;
        seconds = minToSec(onBreak ? breakTime : pomodoroTime);
        pomodoro();
        //playSound("bell");
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
    $('.pomodoro-timer').text(minutes + ':' + remainingSeconds);
    if(onBreak){
      //$('#timer-wrapper').css('background-size', ((seconds / minToSec(breakTime))*100) + '%');
      $('#background').css('top', ((seconds / minToSec(breakTime))*100) + '%')
    } else {
      //$('#timer-wrapper').css('background-size', ((seconds / minToSec(pomodoroTime))*100) + '%');
      $('#background').css('top', ((seconds / minToSec(pomodoroTime))*100) + '%')
    }
}

function updateTime(id, minutes){
  $('#' + id).text(minutes);
}

function increaseTime(id, minutes, time){

}

function minToSec(minutes){
  return minutes * 60;
}
