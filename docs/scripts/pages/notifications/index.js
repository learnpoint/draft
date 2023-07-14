
document.querySelector('.select-wrapper').addEventListener('click', function() {
    this.querySelector('.select').classList.toggle('open');
})

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select__trigger span').textContent = this.textContent;
        }
    })
}

window.addEventListener('click', function(e) {
    const select = document.querySelector('.select')
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});


document.addEventListener(render.ready, () => {

    var commentsContainer = document.getElementById("comments");
    if(!commentsContainer) {
        return;
    }
    commentsContainer.scrollTo(0, commentsContainer.scrollHeight);

    document.addEventListener('click', (ev) => {

        const elm = ev.target;

        if(elm == document.querySelector('[data-element="mobile-back-button"]')) {

            elm.classList.add('HIDE')

            const leftPanel = document.getElementById("left");
            leftPanel.classList.add('HIDE');

            const rightPanel = document.getElementById("right");
            rightPanel.classList.remove('HIDE');
            return;
        }

        if(elm == document.querySelector('[data-element="modal-open-button"]')) {
            const target = document.getElementById("modal");
            target.classList.add('OPEN');
            return;
        }

        if(elm == document.querySelector('[data-element="modal-close-button"]')) {
            const target = document.getElementById("modal");
            target.classList.remove('OPEN');
            return;
        }

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


