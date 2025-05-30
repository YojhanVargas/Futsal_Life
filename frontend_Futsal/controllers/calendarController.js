const eventList = document.getElementById('event-list');
const calendarTable = document.getElementById('calendar-table');
const monthName = document.getElementById('month-name');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const newEventNameInput = document.getElementById('new-event-name');
const newEventColorSelect = document.getElementById('new-event-color');
const addEventButton = document.getElementById('add-event');

let currentDate = new Date();
currentDate.setDate(1);

// Arreglo con los nombres de los meses
const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Función para renderizar el calendario
const renderCalendar = () => {
    calendarTable.querySelector('tbody').innerHTML = ''; // Limpia el calendario actual
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDayIndex = new Date(year, month, 1).getDay(); // Índice del primer día del mes actual
    const lastDay = new Date(year, month + 1, 0).getDate(); // Último día del mes actual
    const prevLastDay = new Date(year, month, 0).getDate(); // Último día del mes anterior

    // Actualizar el nombre del mes
    monthName.textContent = `${monthNames[month]} ${year}`;

    let row = document.createElement('tr');

    // Agregar días del mes anterior para completar la primera fila
    for (let i = firstDayIndex; i > 0; i--) {
        const cell = createCalendarCell(prevLastDay - i + 1, true);
        row.appendChild(cell);
    }

    // Agregar días del mes actual
    for (let i = 1; i <= lastDay; i++) {
        const cell = createCalendarCell(i, false);
        row.appendChild(cell);

        if ((i + firstDayIndex) % 7 === 0) {
            calendarTable.querySelector('tbody').appendChild(row);
            row = document.createElement('tr');
        }
    }

    // Completar la última fila con los días del próximo mes
    const nextDays = 7 - row.children.length;
    for (let i = 1; i <= nextDays; i++) {
        const cell = createCalendarCell(i, true);
        row.appendChild(cell);
    }
    calendarTable.querySelector('tbody').appendChild(row);
};

const createCalendarCell = (day, isOtherMonth) => {
    const td = document.createElement('td');
    if (!isOtherMonth) {
        td.classList.add('droppable');
        td.dataset.date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    }
    td.textContent = day;
    td.addEventListener('dragover', e => e.preventDefault());
    td.addEventListener('drop', dropEvent);
    return td;
};

const dropEvent = (e) => {
    const eventData = JSON.parse(e.dataTransfer.getData('text/plain'));
    const targetCell = e.target;
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-inside');
    eventDiv.textContent = eventData.name;
    eventDiv.style.backgroundColor = eventData.color;

    // Agregar botón de eliminar al evento
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-event');
    deleteButton.addEventListener('click', () => {
        targetCell.removeChild(eventDiv);
    });

    eventDiv.appendChild(deleteButton);
    targetCell.appendChild(eventDiv);
};

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

// Manejadores de eventos para cambiar de mes
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});



renderCalendar();