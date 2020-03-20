window.onload = init;

var day = document.getElementById("day");
var week1 = document.getElementById("1week");
var week2 = document.getElementById("2weeks");
var week3 = document.getElementById("3weeks");
var month1 = document.getElementById("1month");
var month2 = document.getElementById("2months");
var month3 = document.getElementById("3months");
var month3D = document.getElementById("3months-3D");
var month3_ani = document.getElementById("3months-ani");

var pic1 = document.getElementById("pic1");
var pic2 = document.getElementById("pic2");
var pic3 = document.getElementById("pic3");
var pic4 = document.getElementById("pic4");
var pic5 = document.getElementById("pic5");
var pic6 = document.getElementById("pic6");
var pic7 = document.getElementById("pic7");
var pic8 = document.getElementById("pic8");

var typeofchart = document.getElementById("typeofchart");

function init(){
    time("Days");
}

function time(timeperiod){
    if (timeperiod=='3months-3D' || timeperiod=='Days'){
        typeofchart.innerHTML = 'Recent ' + timeperiod + ' Trend & Scatter Chart';
    }else{
        typeofchart.innerHTML = 'Recent ' + timeperiod + ' Trend Chart';
    }

    if(timeperiod=='1week'){
        pic1.style.display='inline';
        pic2.style.display='none';
        pic3.style.display='none';
        pic4.style.display='none';
        pic5.style.display='none';
        pic6.style.display='none';
        pic7.style.display='none';
        pic8.style.display='none';
    }else if(timeperiod=='2weeks'){
        pic2.style.display='inline';
        pic1.style.display='none';
        pic3.style.display='none';
        pic4.style.display='none';
        pic5.style.display='none';
        pic6.style.display='none';
        pic7.style.display='none';
        pic8.style.display='none';
    }else if(timeperiod=='3weeks'){
        pic3.style.display='inline';
        pic2.style.display='none';
        pic1.style.display='none';
        pic4.style.display='none';
        pic5.style.display='none';
        pic6.style.display='none';
        pic7.style.display='none';
        pic8.style.display='none';
    }else if(timeperiod=='1month'){
        pic4.style.display='inline';
        pic2.style.display='none';
        pic3.style.display='none';
        pic1.style.display='none';
        pic5.style.display='none';
        pic6.style.display='none';
        pic7.style.display='none';
        pic8.style.display='none';
    }else if(timeperiod=='2months'){
        pic5.style.display='inline';
        pic2.style.display='none';
        pic3.style.display='none';
        pic4.style.display='none';
        pic1.style.display='none';
        pic6.style.display='none';
        pic7.style.display='none';
        pic8.style.display='none';
    }else if(timeperiod=='3months'){
        pic6.style.display='inline';
        pic2.style.display='none';
        pic3.style.display='none';
        pic4.style.display='none';
        pic5.style.display='none';
        pic1.style.display='none';
        pic7.style.display='none';
        pic8.style.display='none';
    }else if(timeperiod=='3months-3D' || timeperiod=='Days'){
        pic7.style.display='inline';
        pic2.style.display='none';
        pic3.style.display='none';
        pic4.style.display='none';
        pic5.style.display='none';
        pic1.style.display='none';
        pic6.style.display='none';
        pic8.style.display='none';
    }else if(timeperiod=='3months-Animation'){
        pic8.style.display='inline';
        pic2.style.display='none';
        pic3.style.display='none';
        pic4.style.display='none';
        pic5.style.display='none';
        pic1.style.display='none';
        pic6.style.display='none';
        pic7.style.display='none';
    }

}

day.addEventListener("click", function(){ time("Days"); });
week1.addEventListener("click", function(){ time("1week"); });
week2.addEventListener("click", function(){ time("2weeks"); });
week3.addEventListener("click", function(){ time("3weeks"); });
month1.addEventListener("click", function(){ time("1month"); });
month2.addEventListener("click", function(){ time("2months"); });
month3.addEventListener("click", function(){ time("3months"); });
month3D.addEventListener("click", function(){ time("3months-3D"); });
month3_ani.addEventListener("click", function(){ time("3months-Animation"); });