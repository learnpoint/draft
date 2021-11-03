console.log("Hello!");

// var acc = document.getElementsByClassName("expandable-button");
var acc = document.getElementsByClassName("expandable-btn");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    const panel = document.getElementById("expandable-panel");
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


document.addEventListener("click", function() {
  console.log("Document is clicked");
});
