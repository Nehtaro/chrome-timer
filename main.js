<<<<<<< HEAD
/* eslint-disable no-restricted-syntax */
// Event Listen form submission
// Store form field values into variables
// Pass values into chrome.storage

let store;
let numTimers;
const form = document.getElementById('form');
=======
let store;
let numTimers;

const form = document.getElementById('form');
form.addEventListener('submit', addNewTimer);
>>>>>>> 8a76cdd359b15b432d2ad0a2ea33f0bee9b40fe7

function getTimeToEvent(reminderDate) {
  const now = new Date();
  const diff = reminderDate - now;
  let seconds = diff / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  const days = Math.floor(hours / 24);
  hours = Math.floor(hours - days * 24);
  minutes = Math.floor(minutes - hours * 60 - days * 1440);
  seconds = Math.floor(seconds - minutes * 60 - hours * 3600 - days * 86400);
  return [days, hours, minutes, seconds];
}

<<<<<<< HEAD
form.addEventListener('submit', addNewTimer);
function addNewTimer(event) {
  console.log('hello');
  numTimers += 1;
  chrome.storage.sync.set({ numTimers });
  event.preventDefault();
  const timerTitle = document.getElementById('title').value;
  document.getElementById('title').value = '';
  const timerDescription = document.getElementById('description').value;
  document.getElementById('description').value = '';
  const timerDate = document.getElementById('date').value;
  document.getElementById('date').value = '';
  const timerTime = document.getElementById('time').value;
  document.getElementById('time').value = '';
  const datetime = `${timerDate} ${timerTime}:00`;
  const timerDatetime = datetime; /// NEWEST FORMAT
  const newTitle = document.createElement('div');
  newTitle.innerHTML = timerTitle;
  document.getElementById('reminderList').appendChild(newTitle);
  const newDescription = document.createElement('div');
  newDescription.innerHTML = timerDescription;
  document.getElementById('reminderList').appendChild(newDescription);
  const newDatetime = document.createElement('div');
  newDatetime.classList.add('countdown');
  newDatetime.innerHTML = timerDatetime;
  document.getElementById('reminderList').appendChild(newDatetime);
  chrome.storage.sync.set({ [`reminder${numTimers}`]: { title: timerTitle, description: timerDescription, datetime: timerDatetime } }, (reminder) => {
    console.log(`New reminder: ${timerTitle} ${timerDescription} ${timerDatetime}`);
  });
}

// LOOP THROUGH STORAGE

=======
function getTimeToEvent(reminderDate) {
  const now = new Date();
  const diff = reminderDate - now;
  let seconds = diff / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  const days = Math.floor(hours / 24);
  hours = Math.floor(hours - days * 24);
  minutes = Math.floor(minutes - hours * 60 - days * 1440);
  seconds = Math.floor(seconds - minutes * 60 - hours * 3600 - days * 86400);
  return [days, hours, minutes, seconds];
}


function addNewTimer(event) {
  console.log('hello');

  numTimers += 1;
  chrome.storage.sync.set({ numTimers });

  event.preventDefault();

  // CREATE UL LIST TAG
  const unorderList = document.createElement('ul');
  unorderList.classList.add('collection');
  unorderList.classList.add('collection');

  // CREATE NEW LIST TAG
  const listItem = document.createElement('li');
  listItem.classList.add('collection-item');
  listItem.classList.add('avatar');

  //   <i class="material-icons circle">av_timer</i>
  const icon = document.createElement('i');
  icon.classList.add('material-icons');
  icon.classList.add('circle');
  icon.innerHTML = 'av_timer';
  listItem.appendChild(icon);

  // APPEND TITLE TO THE DOM
  const timerTitle = document.getElementById('title').value;
  const title = document.createElement('span');
  title.classList.add('title');
  title.innerHTML = timerTitle;
  listItem.appendChild(title);
  document.getElementById('title').value = '';

  // APPEND DESCRIPTION TO THE DOM
  const timerDescription = document.getElementById('description').value;
  const description = document.createElement('p');
  description.innerHTML = timerDescription;
  listItem.appendChild(description);
  document.getElementById('description').value = '';

  // CALCULATE DATETIME FORMAT
  const timerDate = document.getElementById('date').value;
  const timerTime = document.getElementById('time').value;

  document.getElementById('date').value = '';
  document.getElementById('time').value = '';

  const datetime = `${timerDate} ${timerTime}:00`;
  const timerDatetime = datetime;

  // APPEND TARGET DATETIME TO THE DOM
  const targetDate = document.createElement('p');
  targetDate.innerHTML = timerDatetime;
  listItem.appendChild(targetDate);

  // APPEND COUNTDOWN TAG TO THE DOM
  const countdown = document.createElement('div');
  countdown.classList.add('secondary-content');
  countdown.id = 'reminder_1'; // MAKE DYNAMIC
  countdown.innerHTML = '00:00:00:0'; // LEAVE EMPTY? OR CALL FUNCTION?
  listItem.appendChild(countdown);

  // APPEND NEW LIST ITEM TO THE UL
  unorderList.appendChild(listItem)
  document.getElementById('reminderList').appendChild(unorderList);


  chrome.storage.sync.set({ [`reminder${numTimers}`]: { title: timerTitle, description: timerDescription, datetime: timerDatetime } }, (reminder) => {
    console.log(`New reminder: ${timerTitle} ${timerDescription} ${timerDatetime}`);
  });

}

/// LOOP THROUGH STORAGE
>>>>>>> 8a76cdd359b15b432d2ad0a2ea33f0bee9b40fe7
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(null, (data) => {
    console.log(data);
    store = data;
    const keys = Object.keys(store);
    for (let i = 0; i !== keys.length; i += 1) {
      if (keys[i] === 'numTimers') numTimers = store[keys[i]];
      else {
<<<<<<< HEAD
        const title = document.createElement('div');
        title.innerHTML = store[keys[i]].title;
        document.getElementById('reminderList').appendChild(title);
        const description = document.createElement('div');
        description.innerHTML = store[keys[i]].description;
        document.getElementById('reminderList').appendChild(description);
        const datetime = document.createElement('div');
        datetime.classList.add('countdown');
        datetime.innerHTML = store[keys[i]].datetime;
        document.getElementById('reminderList').appendChild(datetime);
=======

        // CREATE UL LIST TAG
        const unorderList = document.createElement('ul');
        unorderList.classList.add('collection');
        unorderList.classList.add('collection');

        // CREATE NEW LIST TAG
        const listItem = document.createElement('li');
        listItem.classList.add('collection-item');
        listItem.classList.add('avatar');

        //   <i class="material-icons circle">av_timer</i>
        const icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.classList.add('circle');
        icon.innerHTML = 'av_timer';
        listItem.appendChild(icon);

        // APPEND TITLE TO THE DOM
        const title = document.createElement('span');
        title.classList.add('title');
        title.innerHTML = store[keys[i]].title;
        listItem.appendChild(title);

        // APPEND DESCRIPTION TO THE DOM
        const description = document.createElement('p');
        description.innerHTML = store[keys[i]].description;
        listItem.appendChild(description);

        // APPEND TARGET DATETIME TO THE DOM
        const datetime = document.createElement('p');
        datetime.innerHTML = store[keys[i]].datetime;
        listItem.appendChild(datetime);

        // APPEND COUNTDOWN TO THE DOM
        const countdown = document.createElement('div');
        countdown.classList.add('secondary-content');
        countdown.id = 'reminder_1'; // MAKE DYNAMIC
        countdown.innerHTML = '00:00:00:0'; // LEAVE EMPTY? OR CALL FUNCTION?
        listItem.appendChild(countdown);

        unorderList.appendChild(listItem)
        document.getElementById('reminderList').appendChild(unorderList);
        
>>>>>>> 8a76cdd359b15b432d2ad0a2ea33f0bee9b40fe7
      }
    }
    if (numTimers === undefined) numTimers = 0;
  });
});
<<<<<<< HEAD
=======


>>>>>>> 8a76cdd359b15b432d2ad0a2ea33f0bee9b40fe7
/// DATEPICKER
document.addEventListener('DOMContentLoaded', function() {
  var options = {
    minDate: new Date(),
    format: 'mmmm dd, yyyy'
  };
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, options);
<<<<<<< HEAD
});
/// TIMEPICKER
document.addEventListener('DOMContentLoaded', function() {
  var options = {
    twelveHour: false
  }
  var elems = document.querySelectorAll('.timepicker');
  var instances = M.Timepicker.init(elems, options);
});

=======
});

/// TIMEPICKER
document.addEventListener('DOMContentLoaded', function() {
  var options = {
    twelveHour: false
  }
  var elems = document.querySelectorAll('.timepicker');
  var instances = M.Timepicker.init(elems, options);
});



>>>>>>> 8a76cdd359b15b432d2ad0a2ea33f0bee9b40fe7
document.addEventListener('DOMContentLoaded', () => {
  setInterval(() => {
    const allCountdowns = document.getElementsByClassName('countdown');
    for (const downer of allCountdowns) {
      /* const newCountdown = document.createElement('div');
      newCountdown.innerHTML = JSON.stringify(getTimeToEvent(new Date(downer.innerHTML)));
      document.getElementById('reminderList').appendChild(newCountdown);
      if (newCountdown.innerHTML === '[0,0,0,0]') alert('FUCK YEA');
      //console.log(newCountdown.innerHTML); */
    }
  }, 1000);
});
