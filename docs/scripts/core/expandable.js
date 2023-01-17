document.addEventListener('click', event => {

    const toggleButton = event.target.closest('[data-element="expandable.toggle-button"]');
    if (!toggleButton) {
        collapseAll();
        return;
    }

    const collapseButton = event.target.closest('[data-element="expandable.collapse-button"]');
    if (collapseButton) {
        collapseAll();
        return;
    }

    const expandable = event.target.closest('[data-component="expandable"]');
    if(!expandable) {
        return;
    }

    // if link or button:
    // event.preventDefault();
    // toggleButton.setAttribute('aria-expanded', toggleButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
    expandable.classList.toggle('EXPANDED');  
    // const expandedMenu = expandable.querySelector('[data-element="expandable.menu"]');
    // expandedMenu.focus();
    // document.addEventListener('keydown',TrapFocusOnExpandable);  
  
});



function TrapFocusOnExpandable(e){

  const focusableElements = e.target.matches('[data-element="expandable.menu"]') ? e.target.querySelectorAll(`button`) :  e.target.closest('[data-element="expandable.menu"]').querySelectorAll(`button`) ;

  const focusableElementsArray = [...focusableElements]; 
  console.log(focusableElementsArray);

  const index = focusableElementsArray.indexOf(document.activeElement); 
  let nextIndex = 0;

  if (e.keyCode === 38) {
    // up arrow
    e.preventDefault();
    nextIndex= index > 0 ? index-1 : 0;
    focusableElementsArray[nextIndex].focus();
  }
  else if (e.keyCode === 40) {
    // down arrow
    e.preventDefault();
    nextIndex= index+1 < focusableElementsArray.length ? index+1 : index;
    focusableElementsArray[nextIndex].focus();
  }
}


function collapseAll() {
    const expandables = document.querySelectorAll('[data-component="expandable"]');
    expandables.forEach(expandable => {
        expandable.classList.remove('EXPANDED');
        // expandable.querySelector('[data-element="expandable.toggle-button"]').setAttribute('aria-expanded', "false");
    });
}
