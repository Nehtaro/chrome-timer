let store = [];
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

function deleteReminder(parentID, childID) {
  return () => {
    const parent = document.getElementById(parentID);
    const child = document.getElementById(childID);
    parent.removeChild(child);
    const storedIdx = Number(`${childID.slice(8)}`);
    store.splice(storedIdx, 1);
    chrome.storage.sync.set({ reminders: store }, () => console.log(`${store}`));
    numTimers -= 1;
  };
}

function addNewTimer(event) {
  event.preventDefault();

  // GRAB UL LIST TAG
  const unorderList = document.getElementById('listContainer');

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
  countdown.id = `reminder${numTimers}`;
  listItem.appendChild(countdown);

  // CREATE NEW DELETE BUTTON
  const deleteButton = document.createElement('a');
  deleteButton.innerHTML = 'x';
  deleteButton.classList.add('waves-effect');
  deleteButton.classList.add('waves-light');
  deleteButton.classList.add('btn');
  deleteButton.id = `delete${numTimers}`;
  deleteButton.addEventListener('click', deleteReminder(unorderList.id, listItem.id));
  listItem.appendChild(deleteButton);

  // APPEND NEW LIST ITEM TO THE UL
  unorderList.appendChild(listItem);
  document.getElementById('reminderList').appendChild(unorderList);
  store.push({ title: timerTitle, description: timerDescription, datetime: timerDatetime });
  chrome.storage.sync.set({ reminders: store }, () => console.log(store));
  numTimers += 1;
}

// LOOP THROUGH STORAGE
function loadFromStorage() {
  chrome.storage.sync.get(null, (data) => {
    store = data.reminders || [];
    numTimers = store.length;
    for (let i = 0; i !== store.length; i += 1) {
      // GRAB UL LIST TAG
      const unorderList = document.getElementById('listContainer');

      // CREATE NEW LIST TAG
      const listItem = document.createElement('li');
      listItem.id = `listItem${i}`;
      listItem.classList.add('collection-item');
      listItem.classList.add('avatar');

      // CREATE NEW ICON
      const icon = document.createElement('i');
      icon.classList.add('material-icons');
      icon.classList.add('circle');
      icon.innerHTML = 'av_timer';
      listItem.appendChild(icon);

      // APPEND TITLE TO THE DOM
      const title = document.createElement('span');
      title.classList.add('title');
      title.innerHTML = store[i].title;
      listItem.appendChild(title);

      // APPEND DESCRIPTION TO THE DOM
      const description = document.createElement('p');
      description.innerHTML = store[i].description;
      listItem.appendChild(description);

      // APPEND TARGET DATETIME TO THE DOM
      const datetime = document.createElement('p');
      datetime.innerHTML = store[i].datetime;
      datetime.id = `target${i}`;
      listItem.appendChild(datetime);

      // APPEND COUNTDOWN TO THE DOM
      const countdown = document.createElement('div');
      countdown.classList.add('secondary-content');
      countdown.id = `reminder${i}`;
      listItem.appendChild(countdown);

      // CREATE NEW DELETE BUTTON
      const deleteButton = document.createElement('a');
      deleteButton.innerHTML = 'x';
      deleteButton.classList.add('waves-effect');
      deleteButton.classList.add('waves-light');
      deleteButton.classList.add('btn');
      deleteButton.id = `delete${i}`;
      deleteButton.addEventListener('click', deleteReminder(unorderList.id, listItem.id));
      listItem.appendChild(deleteButton);

      unorderList.appendChild(listItem);
      document.getElementById('reminderList').appendChild(unorderList);
    }
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
    for (let i = 0; i !== store.length; i += 1) {
      const curCountdown = document.getElementById([`reminder${i}`]);
      const curTarget = document.getElementById([`target${i}`]);
      const curTimeLeft = getTimeToEvent(new Date(curTarget.innerHTML));
      if (JSON.stringify(curTimeLeft) === JSON.stringify([0, 0, 0, 0])) alert('Time to PARTAAAY');
      if (curTimeLeft[0] >= 0) curCountdown.innerHTML = `${curTimeLeft[0]}:${curTimeLeft[1]}:${curTimeLeft[2]}:${curTimeLeft[3]}`;
    }
  }, 1000);
}

const form = document.getElementById('form');
form.addEventListener('submit', addNewTimer);

document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  datePicker();
  timePicker();
  updateTimer();
});
