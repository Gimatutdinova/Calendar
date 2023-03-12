function Cal(divId) {
    //Сохраняем идентификатор div
    this.divId = divId;
    // Дни недели с понедельника
    this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чт',
        'Пт',
        'Сб',
        'Вс'
    ];
    // Месяцы начиная с января
    this.Months =[
        'Январь', 
        'Февраль', 
        'Март', 
        'Апрель', 
        'Май', 
        'Июнь', 
        'Июль', 
        'Август', 
        'Сентябрь', 
        'Октябрь', 
        'Ноябрь', 
        'Декабрь'
    ];
    
    //Устанавливаем текущий месяц, год
    let d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
    if ( this.currMonth == 11 ) {
      this.currMonth = 0;
      this.currYear = this.currYear + 1;
    }
    else {
      this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};
  
// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
    if ( this.currMonth == 0 ) {
      this.currMonth = 11;
      this.currYear = this.currYear - 1;
    }
    else {
      this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Показать текущий месяц
Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
};

// Показать год, месяц
let event, event_date, event_time, event_city, date_id, date, day, month, year, time, date_id_last;
Cal.prototype.showMonth = function(y, m) {
    let score = 1
    var d = new Date(),
    // Первый день недели в выбранном месяце 
    firstDayOfMonth = new Date(y, m, 7).getDay(),
    // Последний день выбранного месяца
    lastDateOfMonth =  new Date(y, m + 1, 0).getDate(),
    // Последний день предыдущего месяца
    lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table>';
    
    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    
    // Заголовок дней недели
    html += '<tr class="days">';
    for(var i = 0; i < this.DaysOfWeek.length; i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    
    // Записываем дни
    var i=1;
    do {
      var dow = new Date(y, m, i).getDay();
      // Начать новую строку в понедельник
      if ( dow == 1 ) {
        html += '<tr>';
      }

      // Если первый день недели не понедельник показать последние дни предыдущего месяца
      else if ( i == 1 ) {
        html += '<tr>';
        var k = lastDayOfLastMonth - firstDayOfMonth + 1;
        for(var j = 0; j < firstDayOfMonth; j++) {
          id = y + "_" + (m - 1) + "_" + k;
          html += '<td id="'.concat(id, '" class="not-current" >').concat(k), "</td>"
          k++;
        }
      }

      // Записываем текущий день в цикл
      var chk = new Date(); 
      var chkY = chk.getFullYear();
      var chkM = chk.getMonth();
      if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
        id = y + "_" + m + "_" + i;
        html += '<td id="'.concat(id, '" class="today" >').concat(i),"</td>"
      } else {
        id = y + "_" + m + "_" + i;
        html += '<td id="'.concat(id, '" class="normal" >').concat(i),"</td>"
      }

      // Закрыть строку в воскресенье
      if ( dow == 0 ) {
        html += '</tr>';
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if ( i == lastDateOfMonth ) {
        let k = 1;
        for(dow; dow < 7; dow++) {
          id = y + "_" + (m + 1) + "_" + k;
          html += '<td id="'.concat(id, '" class="not-current" >').concat(k),"</td>"
          k++;
        }
      }
      i++;
    } while(i <= lastDateOfMonth);
    // Конец таблицы
    html += '</table>';
    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
  };

// Доавление мероприятий
Cal.prototype.add_id_event = function(x, i) {
    nameDateId(i);
    if (date_id === x) {
        getDay(i)
    }
  }

showevent = function() {
    let score = 0;
    events.sort(byField('date'));
    for (let i = 0; i < events.length; i++) {
        nameDateId(i)
        getDay(i)

        if (date_id_last == date_id) {
          score++;
        } else {
          score = 0;
        }
        $('#'.concat(date_id,'')).append('<div id="'.concat(date_id,'-'.concat(score), '" class="day_info" >'.concat(events[i].title),'</div>'))
        $('#'.concat(date_id,'')).append('<div id="'.concat(date_id,'-event-'.concat(score, '" class="event_info"><div class="event_days"><img src="./assets/img/icons/cal.svg" class="event_cal"><div class="event_day"><p class="event_date">'
        .concat(event_date,'</p><p class="event_time">'
        .concat(event_time,'</p><p class="event_city">'
        .concat(event_city,'</p></div></div><button class="event_btn">'
        .concat('Записаться','</button><p class="event_text">'
        .concat(events[event].text,'</p><img src="./assets/img/icons/user.svg" class="event_user"><p class="event_organizator">'
        .concat(events[event].organizator)))))))),'</p></div>'
        )
        date_id += '-' + score
    }
}

// Всплывающее окно с информацией по мероприятиям

$('#divCal').on('click', '.day_info', function(event) {
    let k = event.target.id;
    let i = k.split('-');
    let items = document.querySelectorAll('.day_info, .event_info, .not-current, .today, .normal');
    let newHeight;

    if($('#'.concat(i[0],'')).hasClass('_active')) {
        clearActiveClasses(items);
    } else {
        clearActiveClasses(items);
        $('#'.concat(i[0],'')).addClass("_active");
        $('#'.concat(k,'')).addClass("_active");
       
        
        function getHeight() {
          newHeight = $('.day_info._active').outerHeight(true) + 5 + 'px';
          $('#'.concat(i[0],'-event-'.concat(i[1],))).addClass("_active");
          $('.event_info._active').css('padding-top', `${newHeight}`);
        }
        
        setTimeout(getHeight, 250)  
    }   
});

function clearActiveClasses(items) {
  items.forEach((item) => {
      item.classList.remove('_active');
  })
}


function Ev(divId) {
    this.divId = divId;
}

Ev.prototype.showlist = function() {
    this.showlist();
}

Ev.prototype.showlist = function() {
  let score = 1;
  let html = '<div class="list__events">';
  events.sort(byField('date'));
  for (let i = 0; i < events.length; i++) {
    nameDateId(i)
    getDay(i)
    html += 
    '<div id="list-'.concat(date_id, '-'.concat(score,'" class="list_info"><button class="list_btn">'
        .concat('Записаться','</button><p id="title-'.concat(date_id,'" class="list_title">'
        .concat(events[i].title,'</p><div class="list_days"><img src="./assets/img/icons/cal.svg" class="list_cal"><p class="list_date">'
        .concat(event_date,'</p><p class="list_time">'
        .concat(event_time,'</p></div><p class="list_city">'
        .concat(event_city,'</p><p class="list_text">'
        .concat(events[i].text,'</p><img src="./assets/img/icons/user.svg" class="list_user"><p class="list_organizator">'
        .concat(events[i].organizator)))))))))),'</p>'
    html +='</div>'
    score++;
    score++;
  }
  html +='</div>'
  document.getElementById(this.divId).innerHTML = html;
}

// Сортировка массива с объектами
function byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

// При загрузке окна
window.onload = function() {
    // Начать календарь
    var c = new Cal("divCal");			
    c.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
      c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
      c.previousMonth();
    };

    // Список мероприятий
    var e = new Ev("divEv");			
    e.showlist();
    showevent()
}

$(document).on('click', '#btnPrev', function() {
  showevent()
});
$(document).on('click', '#btnNext', function() {
  showevent()
});

// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}

function nameDateId(i) {
  date = new Date(events[i].date)
  day = new Date(date).getDate()
  month = new Date(date).getMonth()
  year = new Date(date).getFullYear();
  time = events[i].date.split(' ');
  time = time[1].split(':');
  date_id = year + "_" + month + "_" + day;

  if (i > 0) {
    let date_last = new Date(events[i - 1].date);
    let day_last = new Date(date_last).getDate();
    let month_last = new Date(date_last).getMonth();
    let year_last = new Date(date_last).getFullYear();
    date_id_last = year_last + "_" + month_last + "_" + day_last;
  }
}
function getDay(i) {
  event = i;
  event_date = day + " " + Months_1[month] + " " + year + " г.";
  if (time[0] == '00') {
    event_time = "Время уточняется"
  } else {
    event_time = time[0] + ":" + time[1] + " - " + (Number(time[0]) + events[event].duration) + ":" + time[1];
  }

  if (events[event].type == false) {
    event_city = events[event].city;
  } else {
    event_city = 'online';
  }
}

// Всплывающее модальное окно для записи на мероприятия

$(document).on('click', '.event_btn', function() {
  $('.modal').addClass("_visible");
 
  let id =  $(this).parent().attr("id");

  let text = $('#'.concat((id.split('-'))[0],'-'.concat((id.split('-'))[2],))).text()
  $('.modal__header').text(text);
});

$(document).on('click', '.list_btn', function() {
  $('.modal').addClass("_visible");

  let id =  $(this).parent().attr("id");

  let text = $('#title-'.concat((id.split('-'))[1],)).text()
  $('.modal__header').text(text);
});

$(".modal__close").on("click", function() {
  $(".modal").removeClass("_visible");
});	


// Маска для номера телефона

$("#phone").click(function(){
    $(this).setCursorPosition(3);
}).mask("+7(999) 999-99-99");

$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};
