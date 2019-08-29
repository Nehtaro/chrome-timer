let store;
let numTimers;

const form = document.getElementById('form');
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
  newDatetime.innerHTML = timerDatetime;
  document.getElementById('reminderList').appendChild(newDatetime);

  chrome.storage.sync.set({ [`reminder${numTimers}`]: { title: timerTitle, description: timerDescription, datetime: timerDatetime } }, (reminder) => {
    console.log(`New reminder: ${timerTitle} ${timerDescription} ${timerDatetime}`);
  });

}

/// LOOP THROUGH STORAGE
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(null, (data) => {
    console.log(data);
    store = data;
    const keys = Object.keys(store);
    for (let i = 0; i !== keys.length; i += 1) {
      if (keys[i] === 'numTimers') numTimers = store[keys[i]];
      else {

        const title = document.createElement('div');
        title.innerHTML = store[keys[i]].title;
        document.getElementById('reminderList').appendChild(title);

        const description = document.createElement('div');
        description.innerHTML = store[keys[i]].description;
        document.getElementById('reminderList').appendChild(description);

        const datetime = document.createElement('div');
        datetime.innerHTML = store[keys[i]].datetime;
        document.getElementById('reminderList').appendChild(datetime);
      }
    }
    if (numTimers === undefined) numTimers = 0;
  });
});


/// DATEPICKER
document.addEventListener('DOMContentLoaded', function() {
  var options = {
    minDate: new Date(),
    format: 'mmmm dd, yyyy'
  };
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, options);
});

/// TIMEPICKER
document.addEventListener('DOMContentLoaded', function() {
  var options = {
    twelveHour: false
  }
  var elems = document.querySelectorAll('.timepicker');
  var instances = M.Timepicker.init(elems, options);
});
