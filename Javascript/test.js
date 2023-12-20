var polopopo = document.getElementById("p-polopopo");
var palapapa= document.getElementById("p-palapapa");
var boutonToggle = document.getElementById("boutonToggle");


boutonToggle.onclick=toggling;




function toggling() {
    polopopo.classList.toggle("d-none");
    palapapa.classList.toggle("d-none");
}