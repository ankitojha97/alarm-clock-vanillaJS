// The display to show current time in h1 tag
const currentTime = document.querySelector('h1');

// audio for ringing alarm sound
const audio = new Audio('ringtone.mp3');

audio.loop = true;

const alarmList = []; // Stores all the  new alarms being set 



let alarmTime = null;
let alarmTimeout = null;



const upcomingAlarmList = document.getElementById('Upcoming-Alarms-List');

const addAlarm = document.querySelector('.alarm-setting-form');



// function to update time 

function updateLatestTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    currentTime.innerText = `${hour}:${minutes}:${seconds}`;

    //     check if the alarmList includes the current time , "realTime"
    //     if yes, ring() is called
    if (alarmList.includes(now)) {
        playbell(now);
    }
}




// Plays the alarm audio at right time
function playbell(now) {
    audio.play();
    alert(`It's ${now}`);
}


// If the number is less than 10 append 0 before it.
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// function to stop the currently playing alarm
function stopAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
}

// removes the alarm from the upcoming-alarms-list when "Delete Alarm" is clicked
upcomingAlarmList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
});

// removes the alarm from alarmList when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0; // Clear contents
    alarmList.push.apply(alarmList, newList);
}


// Adds newAlarm to the upcoming-alarms-list as a new list item 
function addNewAlarm(newAlarm) {
    const html = 
    `<li class = "a-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    upcomingAlarmList.innerHTML += html
};


// Set a new alarm when form is submitted 
addAlarm.addEventListener('submit', event => {

    event.preventDefault();// prevents default behaviour

    let hour = formatTime(addAlarm.hour.value);
    if (hour === '0') {
        hour = '00'
    }
    let minute = formatTime(addAlarm.minute.value);
    if (minute === '0') {
        minute = '00'
    }
    let second = formatTime(addAlarm.second.value);
    if (second === '0') {
        second = '00'
    }

    const newAlarm = `${hour}:${minute}:${second}`

    // adds newAlarm to alarmList 
    if (isNaN(newAlarm)) {

        if (!alarmList.includes(newAlarm)) {
            alarmList.push(newAlarm);
            addNewAlarm(newAlarm);
            addAlarm.reset();
        } else {
            alert(`you have already set alarm for this time ${newAlarm}`);
        }
    } else {
        alert("Please enter valid time");
    }
})

// updates time every 1 second
setInterval(updateLatestTime, 1000);  

