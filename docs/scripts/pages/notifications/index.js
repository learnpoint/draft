document.addEventListener(render.ready, () => {

    const togglers = Array.from(document.querySelectorAll('[data-element="expand-btn"]'));
    const collapsebuttons = Array.from(document.querySelectorAll('[data-element="collapse-btn"]'));


    document.addEventListener('click', (ev) => {
        const elm = ev.target;
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


});