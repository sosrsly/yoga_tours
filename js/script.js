
window.addEventListener("DOMContentLoaded", function() {
    'use strict';
    // Получаем родителя табов, все табы, контент, который должен содержать каждый таб
    let tabsBlock = document.querySelector(".info-header"),
        tabs = document.querySelectorAll(".info-header-tab"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    // Функция для скрытия контента
    // Проходимся по каждому Контенту и прячем его
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1); // изначально скрываем весь контенкт кроме 1 таба

    // функция для открытия класса
    function showTabContent(a) {
            tabContent[a].classList.remove("hide");
            tabContent[a].classList.add("show");
    }

    // Событие, где при нажатии на таб, открывается его контент и прячется остальные
    tabsBlock.addEventListener("click", function(e) {
        let target = e.target; // Получаем ссылку объекта по которому кликнули мышкой
        if (target.classList.contains("info-header-tab")) { // Только при нажатии 
            //на пространство блока с табом, будут выполнятся дальнейшие действия
            for (let i = 0; i < tabs.length; i++) {
                hideTabContent(0);
                if (target == tabs[i]) { // Если ссылка
                    // на клик в конкретное место таба = этому табу тогда 
                    showTabContent(i);
                    break;
                }
            }
        }
        
        
    });


    //timer 

    let deadline = "2020-01-15";
    // функция для расчета часов, минут, секунд из аргумента
    function getTime(deadline) {
        let t = Date.parse(deadline) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60));

            return { // Возвращаем объект
                milliseconds: t,
                secods      : seconds,
                minutes     : minutes,
                hours       : hours
            };
    }

    function changeTime(id, endTime) {

        let clock = document.getElementById(id),
            seconds = clock.querySelector(".seconds"),
            minutes = clock.querySelector(".minutes"),
            hours = clock.querySelector(".hours");
        // Повторение функции ежесекундно
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            //форматер числа
            let formatter = new Intl.NumberFormat("ru", {
                minimumIntegerDigits: 2
            });
            //Более простой вариант форматера числа
            function formatterNumber(num) {
                if (num <10) {
                    num = "0" + num; 
                }
                return num;
            }

            let t = getTime(endTime);
            seconds.innerHTML = formatter.format(t.secods);
            minutes.innerHTML = formatter.format(t.minutes);
            // hours.innerHTML = formatter.format(t.hours);
            hours.innerHTML = formatterNumber(t.hours);

            if (t.milliseconds <= 0) {
                clearTimeout(timeInterval);
                seconds.innerHTML = formatter.format(0);
                minutes.innerHTML = formatter.format(0);
                hours.innerHTML = formatter.format(0);
            }       

        }
        
    }

    changeTime("timer", deadline);
});

