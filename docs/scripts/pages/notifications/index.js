document.addEventListener(render.ready, () => {

    document.addEventListener('click', (ev) => {

        const elm = ev.target;

        if(elm == document.querySelector('[data-element="notification-icon"]')) {
            const target = document.getElementById("header-meta");
            target.classList.toggle('OPEN');
            return;
        }

        if(elm == document.querySelector('[data-element="mark-all-as-read-btn"]')) {
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

      

    }, false);


    const toggle = (selector) => {
        const target = document.getElementById(selector);
        target.classList.toggle('EXPAND');
    }

    const collapse = (selector) => {
        const target = document.getElementById(selector);
        target.classList.remove('EXPAND');
    }

    const  moveItem = (e) => {
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