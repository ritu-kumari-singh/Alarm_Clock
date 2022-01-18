//Add an alarm tune to play when alarm time is reached
var sound = new Audio("http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3");
sound.loop = true;

//Fetch all input elements 
var select_elements = document.getElementById("time_selector").getElementsByTagName('select');

//This function updates current time after every 1 second 
var set_current_time = setInterval( function() {
    var d = new Date().toLocaleTimeString();
    document.getElementById("time").innerHTML = d;

    //flag to check if alarm audio is playing initially set to false
    alarm_ringing = false;
    //fetch the list items containing all the alarms set
    var li = document.getElementsByTagName('li');
    for(var i =0; i < li.length; i++) {
        var time = li[i].getElementsByTagName('h2')[0].getAttribute('data-time');
        if(time == d) {
            alarm_ringing = true;
            sound.play();
            //remove the alarm from list whose alarm time is reached
            li[i].remove();
            i--;
        }
    }
    //if flag is set to true, stop alarm audio from playing after 5 seconds
    if(alarm_ringing) {
        setTimeout(function() {
            sound.pause();
            alert("Alarm Stopped");
        }, 5000);
    }    
},1000);

//function to set dropdown option list for hour input
function hour_list() {
    var select = document.getElementById('hour_selector'),
    option;

    for (i = 1; i <= 12; i ++) {
        option = document.createElement('option');
        option.setAttribute('value', i);
        option.appendChild(document.createTextNode(i));
        select.appendChild(option);
    }
}
hour_list();

//function to set dropdown option list for minute input
function minute_list() {
    var select = document.getElementById('minute_selector'),
    option;

    for (i = 0; i <= 59; i ++) {
        let value = i;
        if(i < 10) { value = "0" + value; }
        option = document.createElement('option');
        option.setAttribute('value', value);
        option.appendChild(document.createTextNode(value));
        select.appendChild(option);
    }
}
minute_list();

//function to set dropdown option list for second input
function second_list() {
    var select = document.getElementById('second_selector'),
    option;

    for (i = 0; i <= 59; i ++) {
        let value = i;
        if(i < 10) { value = "0" + value; }
        option = document.createElement('option');
        option.setAttribute('value', value);
        option.appendChild(document.createTextNode(value));
        select.appendChild(option);
    }
}
second_list();

//onclick for set alarm button
document.getElementById("set_alarm").onclick = function() {
    let hour = select_elements[0].options[select_elements[0].selectedIndex].value;
    let minute = select_elements[1].options[select_elements[1].selectedIndex].value;
    let second = select_elements[2].options[select_elements[2].selectedIndex].value;
    let am_pm = select_elements[3].options[select_elements[3].selectedIndex].value; 

    document.getElementById("alarm_info").innerHTML += '<li class="flex" style="justify-content: space-evenly;">'
                                                            +'<h2 data-time="'+hour+':'+minute+':'+second+' '+am_pm+'">'+hour+' : '+minute+' : '+second+' '+am_pm+'</h2>'
                                                            +'<button class="delete_custom_button"><i class="fa fa-trash-o" title="Delete Alarm"></i>DELETE</button>'
                                                        +'</li>';     
}

//onclick for delete alarm button
document.onclick = function(e) {
    if(e.target.className == "delete_custom_button"){
        e.target.parentElement.remove();
    }
}