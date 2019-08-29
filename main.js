let store;
let numTimers;

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
  listItem.id = `listItem${numTimers}`;
  listItem.classList.add('collection-item');
  listItem.classList.add('avatar');

  // CREATE NEW ICON
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
  targetDate.id = `target${numTimers}`;
  targetDate.innerHTML = timerDatetime;
  listItem.appendChild(targetDate);

  // APPEND COUNTDOWN TAG TO THE DOM
  const countdown = document.createElement('div');
  countdown.classList.add('secondary-content');
  countdown.id = `reminder${numTimers}`; // MAKE DYNAMIC
  countdown.innerHTML = '00:00:00:00'; // LEAVE EMPTY? OR CALL FUNCTION?
  listItem.appendChild(countdown);

  // CREATE NEW DELETE BUTTON
  const deleteButton = document.createElement('a');
  deleteButton.innerHTML = 'delete';
  deleteButton.classList.add('waves-effect');
  deleteButton.classList.add('waves-light');
  deleteButton.classList.add('btn');
  deleteButton.id = `delete${numTimers}`;
  // deleteButton.addEventListener('click', deleteButton.bind());
  listItem.appendChild(deleteButton);

  // APPEND NEW LIST ITEM TO THE UL
  unorderList.appendChild(listItem);
  document.getElementById('reminderList').appendChild(unorderList);

  chrome.storage.sync.set({ [`reminder${numTimers}`]: { title: timerTitle, description: timerDescription, datetime: timerDatetime } }, () => {
    console.log(`New reminder: ${timerTitle} ${timerDescription} ${timerDatetime}`);
  });
}

// LOOP THROUGH STORAGE
function loadFromStorage() {
  chrome.storage.sync.get(null, (data) => {
    console.log(data);
    store = data;
    const keys = Object.keys(store);
    let counter = 0;
    for (let i = 0; i !== keys.length; i += 1) {
      if (keys[i] === 'numTimers') numTimers = store[keys[i]];
      else {
        counter += 1;
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
        datetime.id = `target${counter}`;
        listItem.appendChild(datetime);

        // APPEND COUNTDOWN TO THE DOM
        const countdown = document.createElement('div');
        countdown.classList.add('secondary-content');
        countdown.id = `reminder${counter}`; // MAKE DYNAMIC
        countdown.innerHTML = '00:00:00:0'; // LEAVE EMPTY? OR CALL FUNCTION?
        listItem.appendChild(countdown);

        // CREATE NEW DELETE BUTTON
        const deleteButton = document.createElement('a');
        deleteButton.innerHTML = 'delete';
        deleteButton.classList.add('waves-effect');
        deleteButton.classList.add('waves-light');
        deleteButton.classList.add('btn');
        deleteButton.id = `delete${counter}`;
        listItem.appendChild(deleteButton);

        unorderList.appendChild(listItem);
        document.getElementById('reminderList').appendChild(unorderList);
      }
    }
    if (numTimers === undefined) numTimers = 0;
  });
}

// DATEPICKER
function datePicker() {
  const options = {
    minDate: new Date(),
    format: 'mmmm dd, yyyy',
  };
  const elems = document.querySelectorAll('.datepicker');
  const instances = M.Datepicker.init(elems, options);
}

// TIMEPICKER
function timePicker() {
  const options = {
    twelveHour: false,
  };
  const elems = document.querySelectorAll('.timepicker');
  const instances = M.Timepicker.init(elems, options);
}

// Update timer
function updateTimer() {
  setInterval(() => {
    for (let i = 0; i !== numTimers; i += 1) {
      const curCountdown = document.getElementById(`reminder${i + 1}`);
      const curTarget = document.getElementById(`target${i + 1}`);
      const curTimeLeft = getTimeToEvent(new Date(curTarget.innerHTML));
      if (JSON.stringify(curTimeLeft) === JSON.stringify([0, 0, 0, 0])) {
        alert('Time to PARTAAAY');
      }
      if (curTimeLeft[0] >= 0) curCountdown.innerHTML = `${curTimeLeft[0]}:${curTimeLeft[1]}:${curTimeLeft[2]}:${curTimeLeft[3]}`;
    }
  }, 1000);
}

/* function deleteReminder() {

} */

const form = document.getElementById('form');
form.addEventListener('submit', addNewTimer);

document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  datePicker();
  timePicker();
  updateTimer();
});
