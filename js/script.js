
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



    // modal window

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        closeWindow = document.querySelector(".popup-close"),
        descriptionButton = document.querySelectorAll(".description-btn");


    function openModalWiondow(selectorButton) {
        overlay.style.display = "block";
        document.body.style.overflow = "hidden";
        selectorButton.classList.add("more-splash");
    }

    function closeModalWiondow() {
        overlay.style.display = "none";
        document.body.style.overflow = "";
        more.classList.remove("more-splash");
    }

    more.addEventListener("click", function(){
        openModalWiondow(this);
    });
    
    descriptionButton[0].addEventListener("click", function(){
        openModalWiondow(this);
    });
    descriptionButton[1].addEventListener("click", function(){
        openModalWiondow(this);
    });
    descriptionButton[2].addEventListener("click", function(){
        openModalWiondow(this);
    });
    descriptionButton[3].addEventListener("click", function(){
        openModalWiondow(this);
    });


    closeWindow.addEventListener("click", function() {
        closeModalWiondow();
    });

    // let age = document.getElementById('age');
    // function showUser(surname, name) {
    //     alert(`Пользователь ${surname} ${name}, его возраст ${this.value}`);
    // }
    // showUser.bind(age)("dibilich", "dolboebovich");


    // Создание нового блока
    // class Options {
    //     constructor(height = 10, width = 10, bg = "gray", fontSize = 15, textAlign) {
    //         this.height = height;
    //         this.width = width;
    //         this.bg = bg;
    //         this.fontSize = fontSize;
    //         this.textAlign = textAlign; 
    //     }
    //     createNewBlock() {
    //         let newBlock = document.createElement("div");
            
    //         newBlock.textContent = "hello";
    //         document.body.appendChild(newBlock);

    //         newBlock.style.cssText = `
    //             height: ${this.height}px;
    //             width: ${this.width}px;
    //             background-color: ${this.bg};
    //             font-size: ${this.fontSize}px;
    //             text-align: ${this.textAlign};
    //         `;
    //     }
    // }
    // const newBlocked = new Options(100, 500, "gray");
    // newBlocked.createNewBlock();

    // Form
    let mainForm = document.querySelector(".main-form"),
        input = mainForm.getElementsByTagName("input"),
        statusMessage = document.createElement("div"),
        message = {
            loading: "Загрузка...",
            success: "Успех",
            failure: "Что-то пошло не так"
        };

    statusMessage.classList.add("status");

    mainForm.addEventListener("button", function(e) {
        e.preventDefault();
        mainForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader('Content-type', 'application/json; charset=utf8-8');

        let formData = new FormData(mainForm);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener("readystatechange", function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i=0; i < input.length; i++) {
            input[i].value = "";
        }
    });


    // slider

    let slider = document.querySelector(".slider"),
        sliders = slider.querySelectorAll(".slider-item"),
        next = slider.querySelector(".next"),
        prev = slider.querySelector(".prev"),
        dotsWrap = slider.querySelector(".slider-dots"),
        dots = dotsWrap.querySelectorAll(".dot"),
        slideIndex = 1;

    showSlider(slideIndex);
    function showSlider(n) {
        if (n > sliders.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = sliders.length;
        }

        sliders.forEach((item) => item.style.display = "none");
        dots.forEach((item) => item.classList.remove("dot-active"));

        sliders[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active");
    }
    
    function plusSlide(n) {
        showSlider(slideIndex += n);
    }

    function currentSlide(n) {
        showSlider(slideIndex = n);
    }

    next.addEventListener("click", () => {
        plusSlide(1);
    });

    prev.addEventListener("click", () => {
        plusSlide(-1);
    });

    dotsWrap.addEventListener("click", (e) => {
        for (let i = 0; i < dots.length + 1; i++) {
            if (e.target.classList.contains("dot") && e.target == dots[i-1]) {
                currentSlide(i);
            }
        } 
    });

    //calculation

    let calculationBlock = document.getElementById("price"),
        inputHum = calculationBlock.querySelectorAll(".counter-block-input")[0],
        inputDay = calculationBlock.querySelectorAll(".counter-block-input")[1],
        totalBlock = document.getElementById("total"),
        select = document.getElementById("select"),
        total = 0,
        daySum = 0,
        humSum = 0;

    totalBlock.innerHTML = 0;

    inputHum.addEventListener("change", function() {
        humSum = +this.value;
        total = humSum * daySum * 4000;
        if(humSum == "" || daySum == "") {
            totalBlock.value = 0;
        }
        totalBlock.textContent = total;
        
    });

    inputDay.addEventListener("change", function() {
        daySum = +this.value;
        total = humSum * daySum * 4000;
        if(humSum == "" || daySum == "") {
            totalBlock.value = 0;
        }
        totalBlock.textContent = total;
    });

    select.addEventListener("change", function() {
        let fakeTotal = total;
        totalBlock.textContent = fakeTotal * +this.options[this.selectedIndex].value;
    });
    

    

    


   


