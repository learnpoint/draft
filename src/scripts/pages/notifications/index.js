document.addEventListener(render.ready, () => {

    const togglers = Array.from(document.querySelectorAll('[data-element="expand-btn"]'));
    const collapsebuttons = Array.from(document.querySelectorAll('[data-element="collapse-btn"]'));
    const moveButtons = document.querySelectorAll('[data-element="move-btn"]');
    const markAllAsReadButtun = document.querySelector('[data-element="mark-all-as-read-btn"]');
    const newList = document.getElementById("new");
    const previousList = document.getElementById("previous");

    document.addEventListener('click', (ev) => {

        const elm = ev.target;

        if(elm == markAllAsReadButtun) {
            markAllAsRead();
        }
        
        if (togglers.includes(elm)) {
            const selector = elm.getAttribute('data-target');
            toggle(selector);
        }
        if (collapsebuttons.includes(elm)) {
            const selector = elm.getAttribute('data-target');
            collapse(selector);
        }
    }, false);


    const toggle = (selector) => {
        const target = document.getElementById(selector);
        target.classList.toggle('EXPAND');
    }

    const collapse = (selector) => {
        const target = document.getElementById(selector);
        target.classList.remove('EXPAND');
    }

    function moveItem(e) {
        console.log(e.target);
        e.target.innerText == "Mark as read" ? e.target.innerText = 'Mark as unread' : e.target.innerText = "Mark as read";
        let moveTo = this.closest("#new") == newList ? previousList : newList;
        let itemTobeMoved = this.parentElement.parentElement.parentElement;
        console.log(moveTo);
        moveTo.prepend(itemTobeMoved);
    }

    function markAllAsRead() {
        const listItems = newList.querySelectorAll('.notification');
        console.log(listItems);
        listItems.forEach(li => {
            console.log( li.querySelector('[data-element="move-btn"] > span'));
            li.querySelector('[data-element="move-btn"] > span').innerText = "Mark as unread";
            previousList.prepend(li);
        });
    }

    for (var i = 0; i < moveButtons.length; i++) {
        moveButtons[i].addEventListener("click", moveItem);
    }

});