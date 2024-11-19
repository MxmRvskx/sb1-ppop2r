export const ruLocale = {
  code: 'ru',
  week: {
    dow: 1,
    doy: 4
  },
  buttonText: {
    prev: 'Пред',
    next: 'След',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    list: 'Повестка дня'
  },
  weekText: 'Нед',
  allDayText: 'Весь день',
  moreLinkText: function(n: number) {
    return '+ ещё ' + n;
  },
  noEventsText: 'Нет событий для отображения',
  dayHeaderFormat: { weekday: 'long' },
  slotLabelFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  },
  monthNames: [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ],
  monthNamesShort: [
    'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'
  ],
  dayNames: [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда',
    'Четверг', 'Пятница', 'Суббота'
  ],
  dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
};