window.addEventListener("load",function(){
  startTime();
  document.getElementById("plus").addEventListener("click", addOneAlarm);
});

i=0;

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    seconds = h * 3600 + m * 60 + s;
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 100);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function addOneAlarm() {
    i++;
    var c = document.getElementById('alarm');

    var div = document.createElement("div");
    div.id = 'alarm'+i;
    c.appendChild(div);

    var inputcheck = document.createElement("input");
    inputcheck.setAttribute("type","checkbox");
    inputcheck.name = 'active';
    div.appendChild(inputcheck);

    var inputnumberHour = document.createElement("input");
    inputnumberHour.setAttribute("type","number");
    inputnumberHour.setAttribute("min", "0");
    inputnumberHour.setAttribute("max", "23");
    inputnumberHour.name = 'hour';
    div.appendChild(inputnumberHour);

    var sepH = document.createElement("span");
    sepH.innerHTML = ":";
    div.appendChild(sepH);

    inputnumberMinute = document.createElement("input");
    inputnumberMinute.setAttribute("type","number");
    inputnumberMinute.setAttribute("min", "0");
    inputnumberMinute.setAttribute("max", "59");
    inputnumberMinute.name = 'minute';
    div.appendChild(inputnumberMinute);

    var inputtext = document.createElement("input");
    inputtext.setAttribute("type","text");
    inputtext.setAttribute("placeholder","Optionnel");
    inputtext.name = 'description';
    div.appendChild(inputtext);

    var sound = document.createElement("select");
    sound.name = "musicChoice";
    div.appendChild(sound);

    var option1 = document.createElement("option");
    option1.setAttribute("value", "sound1");
    option1.innerHTML = "sound1";
    sound.appendChild(option1);

    var option2 = document.createElement("option");
    option2.setAttribute("value", "sound2");
    option2.innerHTML = "sound2";
    sound.appendChild(option2);

    var sound1 = document.createElement("audio");
    sound1.id = "sound1";
    sound1.setAttribute("src","sound1.mp3");
    option1.appendChild(sound1);

    var sound2 = document.createElement("audio");
    sound2.id = "sound2";
    sound2.setAttribute("src","sound2.mp3");
    option2.appendChild(sound2);

    var minus = document.createElement("button");
    minus.name = 'minus';
    minus.value = i;
    minus.innerHTML = "-";
    div.appendChild(minus);

    //adding Listener on the checkbox
    checkboxes = document.getElementsByName("active");
    hours = document.getElementsByName("hour");
    minutes = document.getElementsByName("minute");
    descriptions = document.getElementsByName("description");
    musicChoices = document.getElementsByName("musicChoice");
    minus = document.getElementsByName("minus");

    for(j = 0; j < checkboxes.length;j++){
      checkboxes[j].onchange = alarm;
    }
}

function deleteAlarm(alarm){
  var alarmToDelete = alarm.value;
  console.log("alarm"+alarmToDelete);
  var divToDelete = document.getElementById("alarm"+alarmToDelete);
  divToDelete.outerHTML = "";
  delete divToDelete;
}


function alarm(){
  for(j = 0; j < checkboxes.length; j++){
  if(checkboxes[j].checked === true){
    var h = hours[j].value;
    var m = minutes[j].value;
    alarmTime = h * 3600 + m * 60;

    //song loading
    song1 = document.querySelector('#sound1');
    song2 = document.querySelector('#sound2');
    choiceNumber = j;
    sameHour();
  }
}
}

function sameHour(){
  if(alarmTime === seconds){
     clearTimeout(al);
     choice = musicChoices[choiceNumber];
    if(choice[choice.selectedIndex].value === "sound1"){
        song1.play();
    }else if (choice[choice.selectedIndex].value === "sound2") {
        song2.play();
    }

    if(descriptions[choiceNumber].value !== ""){
      alert(descriptions[choiceNumber].value);
    }else{
      alert("Réveille-toi vite !");
    }
    song1.pause();
    song1.currentTime = 0;
    song2.pause();
    song2.currentTime = 0;
    checkboxes[choiceNumber].checked = false;
  }
  al = setTimeout(sameHour, 100);
}
