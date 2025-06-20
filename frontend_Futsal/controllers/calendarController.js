const eventList = document.getElementById('event-list');
const calendarTable = document.getElementById('calendar-table');
const monthName = document.getElementById('month-name');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const newEventNameInput = document.getElementById('new-event-name');
const newEventColorSelect = document.getElementById('new-event-color');
const addEventButton = document.getElementById('add-event');

const userRole = localStorage.getItem('userRole') || 'jugador'; // Por defecto es jugador

let currentDate = new Date();
currentDate.setDate(1);

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const renderCalendar = () => {
  calendarTable.querySelector('tbody').innerHTML = '';
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const prevLastDay = new Date(year, month, 0).getDate();

  monthName.textContent = `${monthNames[month]} ${year}`;
  let row = document.createElement('tr');

  for (let i = firstDayIndex; i > 0; i--) {
    const cell = createCalendarCell(prevLastDay - i + 1, true);
    row.appendChild(cell);
  }

  for (let i = 1; i <= lastDay; i++) {
    const cell = createCalendarCell(i, false);
    row.appendChild(cell);

    if ((i + firstDayIndex) % 7 === 0) {
      calendarTable.querySelector('tbody').appendChild(row);
      row = document.createElement('tr');
    }
  }

  const nextDays = 7 - row.children.length;
  for (let i = 1; i <= nextDays; i++) {
    const cell = createCalendarCell(i, true);
    row.appendChild(cell);
  }
  calendarTable.querySelector('tbody').appendChild(row);
};

const createCalendarCell = (day, isOtherMonth) => {
  const td = document.createElement('td');
  td.textContent = day;

  if (!isOtherMonth) {
    td.classList.add('droppable');
    td.dataset.date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;

    if (userRole !== 'jugador') {
      td.addEventListener('dragover', e => e.preventDefault());
      td.addEventListener('drop', dropEvent);
    }
  }

  return td;
};

const dropEvent = (e) => {
  const eventData = JSON.parse(e.dataTransfer.getData('text/plain'));
  const targetCell = e.target;
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event-inside');
  eventDiv.textContent = eventData.name;
  eventDiv.style.backgroundColor = eventData.color;

  if (userRole !== 'jugador') {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-event');
    deleteButton.addEventListener('click', () => {
      targetCell.removeChild(eventDiv);
    });
    eventDiv.appendChild(deleteButton);
  }

  targetCell.appendChild(eventDiv);
};

if (userRole !== 'jugador') {
  eventList.addEventListener('dragstart', e => {
    if (e.target.classList.contains('event')) {
      const eventColor = getComputedStyle(e.target).backgroundColor;
      const eventName = e.target.textContent;
      e.dataTransfer.setData('text/plain', JSON.stringify({ name: eventName, color: eventColor }));
    }
  });

  addEventButton.addEventListener('click', () => {
    const eventName = newEventNameInput.value.trim();
    const eventColor = newEventColorSelect.value;
    if (eventName) {
      const li = document.createElement('li');
      li.classList.add('event');
      li.style.backgroundColor = eventColor;
      li.textContent = eventName;
      li.setAttribute('draggable', true);
      eventList.appendChild(li);
      newEventNameInput.value = '';
      li.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ name: eventName, color: eventColor }));
      });
    }
  });
} else {
  // Ocultar campos de creación de evento
  if (addEventButton) addEventButton.style.display = 'none';
  if (newEventNameInput) newEventNameInput.style.display = 'none';
  if (newEventColorSelect) newEventColorSelect.style.display = 'none';

  // Quitar drag de eventos existentes
  document.querySelectorAll('#event-list .event').forEach(event => {
    event.removeAttribute('draggable');
  });

  // Quitar botones eliminar (si los hay)
  document.querySelectorAll('#event-list .event button').forEach(btn => {
    btn.remove();
  });
}

// Navegación del mes
prevMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
