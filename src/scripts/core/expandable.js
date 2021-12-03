document.addEventListener('click', event => {

    if (!event.target.matches('[data-element="expandable.toggle-button"]')) {
        collapseAll();
        return;
    }

    const expandable = event.target.closest('[data-component="expandable"]');
    if(!expandable) {
        return;
    }

    // if link or button:
    event.preventDefault();

    expandable.classList.toggle('EXPANDED');

    
});


function collapseAll() {
    const expandables = document.querySelectorAll('[data-component="expandable"]');
    expandables.forEach(expandable => {
        expandable.classList.remove('EXPANDED');
    });
}
