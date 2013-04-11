var intervalHandle = null;
var x=0,y=0,vx=0,vy=0,ax=0,ay=0,az=0;
var y_accel;
var z_accel;
var time;
var data_array = new Array();
var time_array = new Array();
var velocity_array = new Array();
var distance_array = new Array();
var dynamic_array = new Array();
var myArray = new Array();
var start_array = new Array();
var stop_array = new Array();
var count_array = new Array();
var records_array = new Array();

var velocity;
var distance;
var round_velocity;
var round_distance;

var difference_array = new Array();
var excount = 0;
var btn_array = new Array();
var result;
var repetitions_quick_start = 0;
var repetitions_set_goal = 0;
var count = 0;
var index = 1;
var start_click = 0;
var set_goal = 0;
var quick_start = 0;
var result_set_goal;

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
	

	//document.getElementById('stop_recording_set_goal').style.visibility = 'hidden'; 
	//document.getElementById('start_recording_set_goal').style.visibility = 'visible';
	//document.getElementById('set_goal_start').style.visibility = 'visible';
	//document.getElementById('set_goal_stop').style.visibility = 'hidden';
	accelerometer();
	get_difference();
}

function get_difference(){
	number = start_array - stop_array;	
	
		var result = Math.round(number*100)/100; 
		//var result_set_goal = document.getElementById("difference").innerHTML = Math.round(number*100)/100; 
	
	if(result < 0){
		var result = (Math.round(number*100)/100)*-1; 
	//	var result_set_goal = document.getElementById("difference").innerHTML = (Math.round(number*100)/100)*-1; 
	}

	difference_array.push(result);
	
	stop_array.length = 0;
	start_array.length = 0;
	
	count = count + 1;
	count_array.push(count);
	
//	if(set_goal >= 1){
//	repetitions_set_goal = repetitions_set_goal + 1;//this is needed so quick_start repetitions will start at 1.
//	max_value = document.getElementById("set_goal_max_value").innerHTML = result;
//	}
	
	if(quick_start >= 1){
	repetitions_quick_start = repetitions_quick_start + 1;
			
			if(repetitions_quick_start >= 5){
			document.getElementById('wijlinechart').style.visibility = 'visible';	
			document.getElementById('save_record').style.visibility = 'visible';
			document.getElementById('see_record').style.visibility = 'visible';	
			new_graph();
			
				document.getElementById('stop').style.visibility = 'hidden';	 
				document.getElementById('start').style.visibility = 'hidden';
				document.getElementById('stop_btn').style.visibility = 'hidden'; 
				document.getElementById('start_btn').style.visibility = 'hidden'; 
				document.getElementById('repetitions_header').style.visibility = 'hidden';
				document.getElementById('repetitions_count').style.visibility = 'hidden'; 
				document.getElementById('timer_header').style.visibility = 'hidden'; 
				document.getElementById('show_time').style.visibility = 'hidden'; 
	}
	
	document.getElementById("repetitions_count").innerHTML = repetitions_quick_start;
	//document.getElementById("result_quick_start").innerHTML = result;
//		if(result >= max_value){
//			alert("greater");
//		}
	}
}


function save(){

	//get the date time
	var arraystring = new Date();

	for(i=0; i < difference_array.length; i++) {
		arraystring += ","+difference_array[i];	
		}

	/*if(excount==0) {
	localStorage.setItem('reps1', arraystring);
	}else if(excount==1) {
		localStorage.setItem('reps2', arraystring);
	}*/
	

	var set = "reps"+i;
	localStorage.setItem(set, arraystring);
	
	
		
	//excount++;
}

function getData(){

	//var thediv = document.getElementById("getData");
	
	
	
	var set = "reps"+i;
	
	data = localStorage.getItem(set);
	
	
	
	//var newarray = data.split(",");
	
	
	//var records = records_array.push(newarray);
	document.getElementById("show_data").innerHTML = data;
	//if (data){
	//thediv.innerHTML = data;
	//document.getElementById('repetitions_count').innerHTML = "Repetitions: " + repetitions; 
//}
}


/*
function new_record(){
	difference_array.length = 0;
	stop_array.length = 0;
	start_array.length = 0;
	index++;
	
	document.getElementById('repetitions').innerHTML = null;
	document.getElementById("difference").innerHTML = null;
	document.getElementById("getData").innerHTML = null;
	document.getElementById("start_array").innerHTML = null;
	document.getElementById("stop_array").innerHTML = null;
}
*/



function hide_btn(){
	document.getElementById('see_record').style.visibility = 'hidden';
	document.getElementById('save_record').style.visibility = 'hidden';
	document.getElementById('wijlinechart').style.visibility = 'hidden';
	document.getElementById('results').style.visibility = 'hidden';
	document.getElementById('stop_btn').style.visibility = 'hidden';
	document.getElementById('stop').style.visibility = 'hidden';
	document.getElementById('set_goal_stop').style.visibility = 'hidden';
	//document.getElementById('stop_recording_set_goal').style.visibility = 'hidden'; 
	//document.getElementById('start_array').style.visibility = 'hidden';
	//document.getElementById('stop_array').style.visibility = 'hidden';
	//document.getElementById('left').style.visibility = 'hidden';
	//document.getElementById('right').style.visibility = 'hidden';
	//document.getElementById('top').style.visibility = 'hidden';
	//document.getElementById('bottom').style.visibility = 'hidden';
}


/*
function removeDiv() {
   	document.getElementById("left").innerHTML = remove();
}

function show_div(){
	document.getElementById('left').style.visibility = 'visible';
	document.getElementById('right').style.visibility = 'visible';
	document.getElementById('top').style.visibility = 'visible';
	document.getElementById('bottom').style.visibility = 'visible';
	timeout_init();
}

function hide_div(){
	document.getElementById('left').style.visibility = 'hidden';
	document.getElementById('right').style.visibility = 'hidden';
	document.getElementById('top').style.visibility = 'hidden';
	document.getElementById('bottom').style.visibility = 'hidden';
}
*/

function difference(){
	if(difference_array >= 1)
	alert("greater than");
}

function new_page(){
$.mobile.changePage('#intro', {
    transition: 'pop',
    reverse: false,
    changeHash: true
});

}

/***************************************************/

      $('body').click(function() {
        // do something here like:
        alert('hey! The body click is working!!!')
      });

function add(){

$('#createButton').bind('click', function() {
    $('#buttonPlaceHolder').append('<a href="#" data-role="button">'+$('#buttonText').val()+'</a>');
    
    // refresh jQM controls
    $('#home').trigger('create');
});
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


/**************************************************************************************************************************************/

/*********************************************************Get Graph********************************************************************/

function graph(){

$(document).ready(function () {
	           
var xArray = count_array;        
var yArray = difference_array;        

$("#wijlinechart").wijlinechart({      
     
  axis: {                
  y: {                   
  origin: 0,
    textStyle: {                        
  fill: "#4618BA",                        
  }        
  }            
  },  
 
            
  showChartLabels: false,            
  header: {                             
  text: "Repetitions",
  
  textStyle: {                        
  fill: "#fff",                        
  }        
  },    
          
  hint: {                
  content: function () {                    
  return this.data.lineSeries.label + '\n' +                        
  this.x + '\n' + this.y + '';                
  },   
               
  contentStyle: {                    
  "font-size": 10,       
  },          
        
  offsetY: -10            
  }, 
             
  legend: {                
  visible: true            
  },  
	 
  seriesStyles: [{                        
  stroke: "#06a4fc", 
  "stroke-width": 2, 
  opacity: 1,                   
	//}, {                                               
	//stroke: "#0C2AF0", 
	//"stroke-width": 2, 
	//opacity: 1                    
	}], 
	           
  seriesList: [{                        
  label: "Meters Per Second Squared",                        
  legendEntry: false,    
                      
  data: {                            
  x: xArray,                            
  y: yArray                       
  }, 
                         
  markers: {                           
  visible: true,                            
  type: "circle"                       
  }                    
	  	}                
	  		]        
	  			});   
	   				});

}
/**************************************************************************************************************************************/

/***************************************************Append Button**********************************************************************/

var listCreated = false;
var currentDate = new Date(); 
var appendDate; 
	        
function appendToList(){
                
//Create the listview if not created
//       if(!listCreated){
//   $("#ccc").append("<select name='select-choice-1' id='select-choice-1' data-role='fieldcontain' data-inset='true'></select>");
// listCreated = true;
//$('#ccc').parent().trigger("create");
//   }
var appendDate = $("#select-choice-1").append("<option>"+currentDate+"</option>");
//$("#select-choice-1").listview("refresh");
    localStorage.setItem(1, appendDate);            
}
			
		
function getStorage(){
	 	var thediv = document.getElementById("date");
	d = localStorage.getItem(1,appendDate);
	if (d){
	thediv.innerHTML = d;
	}
}

	
/**************************************************************************************************************************************/


function new_graph(){

 
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
					legendEntry: true,                  
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
					legendEntry: true,
					                       
 						data: {                            
 
 				x: count_array,                            
				y: difference_array                      
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

function clickCounter()

{
if(typeof(Storage)!=="undefined")
  {
  if (localStorage.clickcount)
    {
    localStorage.clickcount=Number(localStorage.clickcount)+1;
    }
  else
    {
    localStorage.clickcount=1;
    }
  document.getElementById("repetition_total").innerHTML=localStorage.clickcount;
  }
else
  {
  document.getElementById("repetition_total").innerHTML="Sorry, your browser does not support web storage...";
  }
}

function get_clickcount(){
	 document.getElementById("repetition_total").innerHTML=localStorage.clickcount;
	 
	var ts = Math.round(new Date().getTime() / 1000);
    var tsYesterday = ts - (1 * 3600);
	

}

