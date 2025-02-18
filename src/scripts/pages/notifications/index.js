
// document.querySelector('.select-wrapper').addEventListener('click', function() {
//     this.querySelector('.select').classList.toggle('open');
// })

// for (const option of document.querySelectorAll(".custom-option")) {
//     option.addEventListener('click', function() {
//         if (!this.classList.contains('selected')) {
//             this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
//             this.classList.add('selected');
//             this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
//         }
//     })
// }

// window.addEventListener('click', function(e) {
//     const select = document.querySelector('.select')
//     if (!select.contains(e.target)) {
//         select.classList.remove('open');
//     }
// });


document.addEventListener(render.ready, () => {

    // var commentsContainer = document.getElementById("comments");
    // if(!commentsContainer) {
    //     return;
    // }
    // commentsContainer.scrollTo(0, commentsContainer.scrollHeight);

    // var checkbox = document.getElementById("indeterminate-checkbox");
    // checkbox.indeterminate = true;


    document.addEventListener('click', (ev) => {
        const elm = ev.target;

        if (elm == document.querySelector('[data-element="check-all"]')) {
            checkUncheck(elm);
        }

        if (elm.matches('[data-element="check-all-toggler"]')) {
            var checkbox = document.getElementById("check-all");
            if(elm.checked) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            
        }

        if (elm == document.querySelector('[data-element="mobile-back-button"]')) {

            elm.classList.add('HIDE')

            const leftPanel = document.getElementById("left");
            leftPanel.classList.add('HIDE');

            const rightPanel = document.getElementById("right");
            rightPanel.classList.remove('HIDE');
            return;
        }

        if (elm == document.querySelector('[data-element="modal-student-close-button"]')) {
            const target = document.getElementById("modal-student");
            document.body.classList.remove("DISABLE-SCROLL");
            target.classList.remove('OPEN');
            return;
        }


        if (elm == document.querySelector('[data-element="modal-student-open-button"]')) {
            const target = document.getElementById("modal-student");
            document.body.classList.add("DISABLE-SCROLL");
            target.classList.add('OPEN');
            return;
        }

        if (elm == document.querySelector('[data-element="modal-quiz-history-close-button"]')) {
            const target = document.getElementById("modal-quiz-history");
            document.body.classList.remove("DISABLE-SCROLL");
            target.classList.remove('OPEN');
            return;
        }


        if (elm == document.querySelector('[data-element="modal-quiz-history-open-button"]')) {
            const target = document.getElementById("modal-quiz-history");
            document.body.classList.add("DISABLE-SCROLL");
            target.classList.add('OPEN');
            return;
        }

        if (elm == document.querySelector('[data-element="modal-student-results-open-button"]')) {
            const target = document.getElementById("modal-student-results");
            document.body.classList.add("DISABLE-SCROLL");
            target.classList.add('OPEN');
            return;
        }

         
        if (elm == document.querySelector('[data-element="modal-student-results-close-button"]')) {
            const target = document.getElementById("modal-student-results");
            document.body.classList.remove("DISABLE-SCROLL");
            target.classList.remove('OPEN');
            return;
        }


        if (elm == document.querySelector('[data-element="modal-close-button"]')) {
            const target = document.getElementById("modal");
            document.body.classList.remove("DISABLE-SCROLL");
            target.classList.remove('OPEN');
            return;
        }


        if (elm == document.querySelector('[data-element="modal-open-button"]')) {
            const target = document.getElementById("modal");
            document.body.classList.add("DISABLE-SCROLL");
            target.classList.add('OPEN');
            return;
        }

        if (elm == document.querySelector('[data-element="notification-icon"]')) {
            const target = document.getElementById("header-meta");
            target.classList.toggle('OPEN');
            return;
        }

        if (elm == document.querySelector('[data-element="mark-all-as-read-btn"]')) {
            markAllAsRead(elm);
            return;
        }

        const togglers = Array.from(document.querySelectorAll('[data-element="expand-btn"]'));
        if (togglers.includes(elm)) {
            const selector = elm.getAttribute('data-target');
            toggle(selector);
            return;
        }

        const collapsebuttons = Array.from(document.querySelectorAll('[data-element="collapse-btn"]'));
        if (collapsebuttons.includes(elm)) {
            const selector = elm.getAttribute('data-target');
            collapse(selector);
        }

        if (elm == document.querySelector('[data-element="save-uppgift-btn"]')) {
            const uppgiftInput = document.querySelector('input[name="uppgift"]:checked')
           const quizTab = document.getElementById('quiz-tab');
           const visibility = document.getElementById('visibility-setting');

           if (uppgiftInput.value === 'Ingen') {
            quizTab.style.display = 'none';
            visibility.style.display = 'flex';
           } else {
            quizTab.style.display = 'block';
            visibility.style.display = 'none';
           }
        }



    }, false);


    const toggle = (selector) => {
        const target = document.getElementById(selector);
        target.classList.toggle('EXPAND');
    }

    function checkUncheck(checkBox) {
        get = document.getElementsByName('group-all');
        for (var i = 0; i < get.length; i++) {
            get[i].checked = checkBox.checked;
        }

    }

    const collapse = (selector) => {
        const target = document.getElementById(selector);
        target.classList.remove('EXPAND');
    }

    const moveItem = (e) => {
        e.target.innerText == "Mark as read" ? e.target.innerText = 'Mark as unread' : e.target.innerText = "Mark as read";
        const newList = document.getElementById("new");
        const previousList = document.getElementById("previous");
        let moveTo = e.target.closest("#new") == newList ? previousList : newList;
        let itemTobeMoved = e.target.closest(".notification");
        moveTo.prepend(itemTobeMoved);
    }

    const markAllAsRead = (readButton) => {

        const newList = document.getElementById("new");
        const previousList = document.getElementById("previous");

        const emptyMessage = document.getElementById("empty");
        emptyMessage.classList.add("SHOW");

        const groupItem = document.getElementById("group");
        // groupItem.classList.add("HIDE");
        readButton.classList.add("HIDE");

        const listItems = newList.querySelectorAll('.notification');
        listItems.forEach(li => {
            li.querySelector('[data-element="move-btn"] > span').innerText = "Mark as unread";
            previousList.prepend(li);
        });

    }

    const moveButtons = document.querySelectorAll('[data-element="move-btn"]');
    moveButtons.forEach(moveButton => {
        moveButton.addEventListener("click", moveItem);
    });

});


