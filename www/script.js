var intervalHandle = null;
var x=0,y=0,vx=0,vy=0,ax=0,ay=0,az=0;
var y_accel;
var z_accel;
var time;
var data_array = new Array();
var time_array = new Array();
min_time_array = new Array();
var velocity_array = new Array();
var distance_array = new Array();
var dynamic_array = new Array();
var myArray = new Array();
var start_array = new Array();
var stop_array = new Array();
var count_array = new Array();
var time_records_array = new Array();
var records_array = new Array();
var value_array = new Array();
var btn_array = new Array();
var btn_dynamic_array = new Array();

var velocity;
var distance;
var round_velocity;
var round_distance;

var difference_array = new Array();
var excount = 0;
var btn_array = new Array();
var result;

var repetitions = 0;
var repetitions_set_goal = 0;
var repetitions_total = 0;
var repetitions_month = 0;
var repetitions_day = 0;

var count = 0;
var index = 1;
var start_click = 0;
var set_goal = 0;
var quick_start = 0;
var result_set_goal;

$( '#results_page' ).live( 'pageinit',function(event){ 
alert( 'This page was just enhanced by jQuery Mobile!' );
 });

/******************Accelerometer*********************/

function accelerometer(){

var sphere=document.getElementById("sphere");
	if(window.DeviceMotionEvent!=undefined){

	window.ondevicemotion=function(e)
	
	
		{ax=event.accelerationIncludingGravity.x;
		ay=event.accelerationIncludingGravity.y;
		az=event.accelerationIncludingGravity.z;
		
		//var x_accel = e.accelerationIncludingGravity.x;
		var y_accel = e.accelerationIncludingGravity.y
		var z_accel = e.accelerationIncludingGravity.z;
		
		var round_ax = Math.round(ax*100)/100; 
		var round_ay = Math.round(ay*100)/100;
		var round_az = Math.round(az*100)/100;
		
		var round_y = Math.round(y_accel*100)/100; 
		var round_z = Math.round(z_accel*100)/100; 


		//document.getElementById("outcome_a").innerHTML= "Y axis is: " + round_y + " m/s2.";
		
		}}
}

function start_recording_quick_start(){
	quick_start = quick_start + 1;
	start_recording();
}

function start_recording_set_goal(){
	set_goal = set_goal + 1;
	start_recording();
}


function start_recording(){

	
	document.getElementById('start').style.visibility = 'hidden';
	document.getElementById('start_btn').style.visibility = 'hidden'; 
	document.getElementById('stop').style.visibility = 'visible';
	document.getElementById('stop_btn').style.visibility = 'visible';

	
	start_array.push(ay);
	
	//start_click = start_click + 1;
	

	//document.getElementById('start_recording_set_goal').style.visibility = 'hidden'; 
	//document.getElementById('stop_recording_set_goal').style.visibility = 'visible'; 
	//document.getElementById('set_goal_start').style.visibility = 'hidden';
	//document.getElementById('set_goal_stop').style.visibility = 'visible';
	
	//document.getElementById("outcome_y").innerHTML = round_y;
	//window.ondevicemotion=function(e){
		
	document.getElementById("outcome_z").innerHTML = e.accelerationIncludingGravity.z;
	//}
	


}

function stop_recording(){
	window.ondevicemotion = null;
	stop_array.push(ay);
	
	
	document.getElementById('stop').style.visibility = 'hidden'; 
	document.getElementById('start').style.visibility = 'visible';
	document.getElementById('stop_btn').style.visibility = 'hidden'; 
	document.getElementById('start_btn').style.visibility = 'visible';

	time_array.push(seconds + "." + millisec);

	//add_item();
	get_total_reps();
	get_month_reps();
	get_day_reps();
	accelerometer();
	get_difference();
}

function get_difference(){
	number = start_array - stop_array;	
	
		var result = Math.round(number*100)/100; 
	
	if(result < 0){
		var result = (Math.round(number*100)/100)*-1; 
	}


	difference_array.push(result);
	
	stop_array.length = 0;
	start_array.length = 0;
	
	count = count + 1;
	count_array.push(count);
	//repetitions = repetitions + 1;
	document.getElementById("repetitions_count").innerHTML = repetitions;
	document.getElementById("show_distance").innerHTML = result + "m/s&sup2";

	
	
	if(quick_start >= 1){
	repetitions = repetitions + 1;
	

			
			if(repetitions == value){
			document.getElementById('wijlinechart').style.visibility = 'visible';	
			document.getElementById('save_record').style.visibility = 'visible';
			new_graph();
			getData();
			show_the_date();
		
			//var addReps = value + track;
			//document.getElementById("repetition_total").innerHTML = document.cookie = "MyTracker="+value+";expires=1 Jan 2050 23:59:59 UTC; path=/";


				document.getElementById('stop').style.visibility = 'hidden';	 
				document.getElementById('start').style.visibility = 'hidden';
				document.getElementById('stop_btn').style.visibility = 'hidden'; 
				document.getElementById('start_btn').style.visibility = 'hidden'; 
				document.getElementById('repetitions_header').style.visibility = 'hidden';
				document.getElementById('repetitions_count').style.visibility = 'hidden'; 
				document.getElementById('timer_header').style.visibility = 'hidden'; 
				document.getElementById('show_time').style.visibility = 'hidden'; 
				document.getElementById('distance_header').style.visibility = 'hidden'; 
				document.getElementById('show_distance').style.visibility = 'hidden';
	}
	
	document.getElementById("repetitions_count").innerHTML = repetitions;
	document.getElementById("show_distance").innerHTML = result + "&nbsp;m/s&sup2";

	}
}

function show_the_date(){
		var now = new Date();
		var month = now.getMonth()+1; 
		var day = now.getDate(); 
		var year = now.getYear()-100;
		
		var hours=now.getHours();
		var minutes=now.getMinutes();
		var seconds=now.getSeconds();
		var format ="AM";
		if(hours>11){format="PM";
		}if (hours   > 12) { 
		hours = hours - 12; 
		}if (hours   == 0) { 
		hours = 12; }  
		if (minutes < 10){    
		minutes = "0" + minutes;
		}
		var label = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds +" " + format;
		document.getElementById("show_date").innerHTML = label;
}




function refreshPage(){
/*	difference_array = 0;
	quick_start = 0;
	repetitions = value;
	stop_array.length = 0;
	start_array.length = 0;
	millisec = 0;
	seconds = 0;
	document.getElementById('start').style.visibility = 'visible';
	document.getElementById('start_btn').style.visibility = 'visible'; 
	document.getElementById('stop').style.visibility = 'hidden';
	document.getElementById('stop_btn').style.visibility = 'hidden';
	document.getElementById('wijlinechart').style.visibility = 'hidden';	
	document.getElementById('save_record').style.visibility = 'hidden';
	document.getElementById('repetitions_header').style.visibility = 'visible';
	document.getElementById('repetitions_count').style.visibility = 'visible'; 
	document.getElementById('timer_header').style.visibility = 'visible'; 
	document.getElementById('show_time').style.visibility = 'visible'; 
	
	document.getElementById("repetitions_count").innerHTML = repetitions;
	document.getElementById("show_time").innerHTML = seconds + "." + millisec;
	start_recording();
	accelerometer();*/
	
	window.location.href += "#quick_start";
location.reload();
	
}




function saveData() {
		var now = new Date();
		var month = now.getMonth()+1; 
		var day = now.getDate(); 
		var year = now.getYear()-100;
		
		var hours=now.getHours();
		var minutes=now.getMinutes();
		var seconds=now.getSeconds();
		var format ="AM";
		if(hours>11){format="PM";
		}if (hours   > 12) { 
		hours = hours - 12; 
		}if (hours   == 0) { 
		hours = 12; }  
		if (minutes < 10){    
		minutes = "0" + minutes;
		}
			

var keyDate = month + "/" + day + "/" + year + "-" + hours + ":" + minutes + ":" + seconds +format;

/*
for(i=0;i<difference_array.length; i++) {
	if(i==(difference_array.length-1)) {
		stringdata += difference_array[i];
	}else{
	stringdata += difference_array[i]+",";
	}
}
*/



var stringdata = keyDate+",";//btn_array.push(keyDate);
for(i=0;i<time_array.length; i++) {
	if(i==(time_array.length-1)) {
		stringdata += time_array[i];
	}else{
	stringdata += time_array[i]+",";
	}
}

//loop through your doff vslues and make

localStorage.setItem(keyDate, stringdata);


}


function getData(){
		var now = new Date();
		var month = now.getMonth()+1; 
		var day = now.getDate(); 
		var year = now.getYear()-100;
		
		
		var hours=now.getHours();
		var minutes=now.getMinutes();
		var seconds=now.getSeconds();
		var format ="AM";
		if(hours>11){format="PM";
		}if (hours   > 12) { 
		hours = hours - 12; 
		}if (hours   == 0) { 
		hours = 12; }  
		if (minutes < 10){    
		minutes = "0" + minutes;
		}
		
	for (var i = 0; i < localStorage.length; i++) {
	var records = localStorage.getItem(localStorage.key(i));
		
	var label = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds +" " + format;
	$('#buttonPlaceHolder').append('<a href="#show" data-role="button">'+ label +'</a>');
	
	}
	
	var newarray = records.split(",");

		
	

	
	//var key = localStorage.key(i);

	//var second = localStorage.getItem(stringdata);

	//document.getElementById("show_data").innerHTML = newarray;
	
		var time_array_new = newarray.slice(1);
		var fastest_time = Math.min.apply(Math, time_array_new);
		document.getElementById("show_data").innerHTML = "The fastest time is: " + fastest_time + " seconds";
		document.getElementById("best_time").innerHTML = fastest_time;
		
		//"The greatest distance is: " + largest_distance + " m/s&sup2";
	
	//if(records == keyDate){
		//alert();
	//}
	
	/*
	count_array = records.split(",");
	time_array = records.split(",");
	difference_array = records.split(",");*/

}


function make_new_graph(){
	var slice = newarray.slice(1,3);
	alert(slice);
}


function show_graph(){
	
	document.getElementById('show_graph').style.visibility = 'visible';
	
	new_graph();
}
	
	

function hide_btn(){
	document.getElementById('show_graph').style.visibility = 'hidden';
	document.getElementById('save_record').style.visibility = 'hidden';
	document.getElementById('wijlinechart').style.visibility = 'hidden';
	document.getElementById('results').style.visibility = 'hidden';
	document.getElementById('stop_btn').style.visibility = 'hidden';
	document.getElementById('stop').style.visibility = 'hidden';
	document.getElementById('set_goal_stop').style.visibility = 'hidden';
}


/***************************************************/

function add(){

    $('#buttonPlaceHolder').append('<a href="#" data-role="button">'+ "keyDate" +'</a>');

}

/********************************************************Timer***********************************************************************/

var millisec = 0;
var seconds = 0;
var timer;

function display(){

  if (millisec>=9){
     millisec=0
     seconds+=1
  }
  else
     millisec+=1
     document.getElementById("show_time").innerHTML = seconds + "." + millisec;
     timer = setTimeout("display()",100);
  }

function starttimer() {
	resettimer();
  if (timer > 0) {
	return;
  }
  display();	
}
function stoptimer() {
  clearTimeout(timer);
  timer = 0;
}

function startstoptimer() {
  if (timer > 0) {
     clearTimeout(timer);
     timer = 0;
  } else {
     display();
  }
}

function resettimer() {
	stoptimer();
	millisec = 0;
	seconds = 0;
}


/**************************************************************************************************************************************/


/*********************************************************Get Month********************************************************************/

function get_date()
{
var month=new Array();
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";

var d = new Date();
var month_name = document.getElementById("month");
month_name.innerHTML="This month (" + month[d.getMonth()] + ")";
}

/*********************************************************Get Date**********************************************************************/

	function returnDate(){
		var now = new Date(); // this returns the amount of milliseconds since 1/1/1970, which is how we'll get the current date
		var month = now.getMonth()+1; // just to get the month, all we do is use the date object we've initialized, and call the getMonth function. But, because the months are indexed to 0 (meaning months are numbered 0-11), we have to add 1
		var day = now.getDate(); // get the day
		var year = now.getYear()-100; // get the year
		
		return month + "/" + day + "/" + year;
		
	}

/*********************************************************Get Graph********************************************************************/


function new_graph(){
//var aaa = [2,7,6.5,5,8];
 //var bbb = [3.7,4,3.9,4.5,4.3];
$(document).ready(function () {         
$("#wijlinechart").wijlinechart({             
showChartLabels: false,             
hint: {                 
content: function () {                     
return this.y;                 
}             
},             
	header: {                 
		text: "Repetitions"             
		},             
			seriesList: [                 
			{                    
				label: "Time",                    
					legendEntry: false,
		              
						data: {                        
			
			x: count_array,                        
			y: time_array,  
             
			},                    
			
				markers: {                        
					visible: true,                        
						type: "circle"                    
						}                
						},                    
						{                        

				label: "Distance",                    
					legendEntry: false,
						                      
 						data: {                            
 
 				x: count_array,                            
				y: difference_array,                      
 				},                       
 
 				 markers: {                            
  					visible: true,                            
  						type: "circle"                       
  						}                    
 						}                       
	  	 				], 
				       
						               
	   seriesStyles: [{                        
	   stroke: "#06a4fc", "stroke-width": 5, opacity: 0.8                   
	    }, {                        
		stroke: "#AE65BE", "stroke-width": 5, opacity: 0.8                                   
		    }],                    
			seriesHoverStyles: [{                       
			 "stroke-width": 8, opacity: 1                 
			    }, {                        
				"stroke-width": 8, opacity: 1             
				       }, {                       
					    "stroke-width": 8, opacity: 1                    
						}]                
						});
						
						                
		var resizeTimer = null;                
		$(window).resize(function () {                    
		window.clearTimeout(resizeTimer);                    
			resizeTimer = window.setTimeout(function () {                        
				var jqLine = $("#wijlinechart"),                   
					width = jqLine.width(),                    
					height = jqLine.height();                        
						 if (!width || !height) {                            
						 window.clearTimeout(resizeTimer);                           
						  return;                        
						  }                        
					jqLine.wijlinechart("redraw", width, height);                    
				}, 250);                
			});             
		}) 
		
}

/***********************************************************Click Count*********************************************************************/

function get_total_reps(){
	
if(typeof(Storage)!=="undefined"){
  if (localStorage.clickcount_total){
    localStorage.clickcount_total=Number(localStorage.clickcount_total)+1;
    }else{
    localStorage.clickcount_total=1;
    }
  	document.getElementById("repetition_total").innerHTML=localStorage.clickcount_total;
	}else{
  	document.getElementById("repetition_total").innerHTML="Sorry, your browser does not support web storage...";
  }
}


function get_month_reps(){

var todays_month = new Date().getMonth();
var d = new Date();
d.setDate(d.getDate() - 1);
var yest_month = d.getMonth();

if (todays_month > yest_month){
	clickcount_month = 0;
}
	
if(typeof(Storage)!=="undefined"){
  if (localStorage.clickcount_month){
    localStorage.clickcount_month=Number(localStorage.clickcount_month)+1;
    }else{
    localStorage.clickcount_month=1;
    }
  	document.getElementById("repetition_month_total").innerHTML=localStorage.clickcount_month;
  	}else{
  	document.getElementById("repetition_month_total").innerHTML="Sorry, your browser does not support web storage...";
  }
}


function get_day_reps(){

var todays_date = new Date().getDate();

var d = new Date();
d.setDate(d.getDate() - 1);
var yest_date = d.getDate();

if (yest_date > todays_date){
	clickcount_day = 0;
}else{

if(typeof(Storage)!=="undefined"){
  if (localStorage.clickcount_day){
    localStorage.clickcount_day=Number(localStorage.clickcount_day)+1;
    }else{
    localStorage.clickcount_day=1;
    }
  	document.getElementById("repetition_day_total").innerHTML=localStorage.clickcount_day;
  	}else{
  	document.getElementById("repetition_day_total").innerHTML="Sorry, your browser does not support web storage...";
  }
}
}

function get_total(){
	localStorage.getItem(clickcount_total);
	document.getElementById("repetition_total").innerHTML=localStorage.clickcount_total;
}

/*
	function add_item(){
	min_time = seconds + "." + millisec;
	min_time_array.push(min_time);
			var time_storage = min_time_array;
				localStorage.setItem('time_storage', JSON.stringify(time_storage));
				min_time_array.length = 0;
	}
	
		function displayDetails() {
		var time_storage = JSON.parse(localStorage.getItem('time_storage'));
			if (time_storage != null) {
				var displayTime = time_storage;
					min_time_array.push(displayTime);
					var result_t = min_time_array.toString();
					var output_t = result_t.split(",")*1;
					var min_value = Math.min(output_t);
				
				}
		}*/
		
		/*
	function add_item(){
	min_time = seconds + "." + millisec;
	lowest_value = document.getElementById("best_time").innerHTML = min_time;
	}
	
		function displayDetails() {
		var time_storage = JSON.parse(localStorage.getItem('time_storage'));
			if (time_storage != null) {
				var displayTime = time_storage;
					min_time_array.push(displayTime);
					var result_t = min_time_array.toString();
					var output_t = result_t.split(",")*1;
					var min_value = Math.min(output_t);
				
				}
		}
		
	*/
/*
function clearStorage(){
	
	
	
	localStorage.clear();
	alert("Records have been deleted");
	//var cookies = document.cookie.split(";");
//for (var i = 0; i < cookies.length; i++)
 //eraseCookie(cookies[i].split("=")[0]);localStorage.clear();
}*/