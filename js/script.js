
window.addEventListener("DOMContentLoaded", function() {
    'use strict';

    let tabsBlock = document.querySelector(".info-header"),
        tabs = document.querySelectorAll(".info-header-tab"),
        tabContent = document.querySelectorAll(".info-tabcontent");

       
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(a) {
            tabContent[a].classList.remove("hide");
            tabContent[a].classList.add("show");
    }

    tabsBlock.addEventListener("click", function(e) {
        let target = e.target;
        if (target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tabs.length; i++) {
                hideTabContent(0);
                if (target == tabs[i]) {
                    showTabContent(i);
                    break;
                }
            }
        }
        
        
    });
});

