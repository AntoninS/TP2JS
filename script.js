window.addEventListener("load",function(){
  startTime();
  document.getElementById("plus").addEventListener("click", addDisplay());
});

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 100);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function addDisplay(evt) {
    var msg = document.getElementById("msg");
    if (evt.target.tagName === "BUTTON") {
        msg.textContent = "Vous avez cliqué sur " +
           evt.target.textContent;
    } else {
        console.log(evt.target);
        msg.textContent = "Vous avez raté les boutons...";
    }
}
