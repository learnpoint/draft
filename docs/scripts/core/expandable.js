document.addEventListener('click', event => {

    if (!event.target.matches('[data-element="expandable.toggle-button"]')) {
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
