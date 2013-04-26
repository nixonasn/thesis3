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

var velocity;
var distance;
var round_velocity;
var round_distance;

var difference_array = new Array();
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
	document.getElementById('start').style.visibility = 'hidden';
	//start_recording();
}

function start_recording_set_goal(){
	set_goal = set_goal + 1;
	start_recording();
}


function start_recording(){
	starttimer();
		document.getElementById("set_goal_time_value").innerHTML = seconds + "." + millisec + " seconds";
	
	start_array.push(ay);
		document.getElementById("start_array").innerHTML = start_array;
	
	start_click = start_click + 1;
	
	document.getElementById('start_btn').style.visibility = 'hidden'; 
	document.getElementById('stop_btn').style.visibility = 'visible'; 
	document.getElementById('start_recording_set_goal').style.visibility = 'hidden'; 
	document.getElementById('stop_recording_set_goal').style.visibility = 'visible'; 
	document.getElementById('start').style.visibility = 'hidden';
	document.getElementById('set_goal_start').style.visibility = 'hidden';
	document.getElementById('stop').style.visibility = 'visible';
	document.getElementById('set_goal_stop').style.visibility = 'visible';
	//document.getElementById("outcome_y").innerHTML = round_y;
	//window.ondevicemotion=function(e){
	document.getElementById("outcome_z").innerHTML = e.accelerationIncludingGravity.z;
	//}
	


}

function stop_recording(){
	window.ondevicemotion = null;
	stop_array.push(ay);
	stoptimer();
	document.getElementById("set_goal_time_value").innerHTML = seconds + "." + millisec + " seconds";
	
	document.getElementById("stop_array").innerHTML = stop_array;
	document.getElementById('stop_btn').style.visibility = 'hidden'; 
	document.getElementById('start_btn').style.visibility = 'visible';
	document.getElementById('stop_recording_set_goal').style.visibility = 'hidden'; 
	document.getElementById('start_recording_set_goal').style.visibility = 'visible';
	document.getElementById('start').style.visibility = 'visible';
	document.getElementById('set_goal_start').style.visibility = 'visible';
	document.getElementById('stop').style.visibility = 'hidden'; 
	document.getElementById('set_goal_stop').style.visibility = 'hidden';
	accelerometer();
	get_difference();
	save();
	
}

function get_difference(){
	number = start_array - stop_array;
	var result = document.getElementById("difference").innerHTML = Math.round(number*100)/100; 
	var result_set_goal = document.getElementById("difference").innerHTML = Math.round(number*100)/100; 
	
	if(result < 0){
		var result = document.getElementById("difference").innerHTML = (Math.round(number*100)/100)*-1; 
		var result_set_goal = document.getElementById("difference").innerHTML = (Math.round(number*100)/100)*-1; 
	}
	
	
	difference_array.push(result);
    document.getElementById("difference").innerHTML = difference_array + '<br>';
	count = count + 1;
	stop_array.length = 0;
	start_array.length = 0;

	
	if(set_goal >= 1){
	repetitions_set_goal = repetitions_set_goal + 1;//this is needed so quick_start repetitions will start at 1.
	max_value = document.getElementById("set_goal_max_value").innerHTML = result;
	}
	
	if(quick_start >= 1){
	repetitions_quick_start = repetitions_quick_start + 1;
	
			if(repetitions_quick_start >= 3){
				//alert("Asdfadsf");
		//$("#popupPanel").popup(); 
			document.getElementById('results').style.visibility = 'visible';
	}
	
	document.getElementById("repetitions_count").innerHTML = repetitions_quick_start;
	document.getElementById("result_quick_start").innerHTML = result;
		if(result >= max_value){
			alert("greater");
		}
	}
}


function save(){
	localStorage.setItem(index, difference_array);
	//make_btn();
	//disablebutton();
}

function getData(){

	var thediv = document.getElementById("getData");
	d = localStorage.getItem(index);
	if (d){
	thediv.innerHTML = d;
	document.getElementById('repetitions_count').innerHTML = "Repetitions: " + repetitions; 
}
}

function make_btn(){
var btn=document.createElement("button");
var t=document.createTextNode(Date());
btn.appendChild(t);
document.body.appendChild(btn);
btn.onclick = function(){getData();}; 
btn_array.push(btn);
//difference_array.length = 0;
}

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

function close(){
	document.getElementById('cvs').innerHTML = null;
}

function hide_btn(){
	document.getElementById('stop_btn').style.visibility = 'hidden';
	document.getElementById('stop').style.visibility = 'hidden';
	document.getElementById('set_goal_stop').style.visibility = 'hidden';
	document.getElementById('stop_recording_set_goal').style.visibility = 'hidden'; 
	document.getElementById('results').style.visibility = 'hidden';
	document.getElementById('start_array').style.visibility = 'hidden';
	document.getElementById('stop_array').style.visibility = 'hidden';
	document.getElementById('left').style.visibility = 'hidden';
	document.getElementById('right').style.visibility = 'hidden';
	document.getElementById('top').style.visibility = 'hidden';
	document.getElementById('bottom').style.visibility = 'hidden';
}

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

function difference(){
	if(difference_array >= 1)
	alert("greater than");
}

/***************************************************/

      $('body').click(function() {
        // do something here like:
        alert('hey! The body click is working!!!')
      });
	  
	  

/********************Graph**************************/

	function graph(){
	
    $(function() {

        /* Sparklines can also take their values from the first argument 
        passed to the sparkline() function */
        var myvalues = ([10,8,5,7,4,4,1],[2,7,8,11,3,9,4]);
		var myvalue = [2,7,8,11,3,9,4];
		//var myvalues = difference_array;
        $('.dynamicsparkline').sparkline(myvalues, {	
 		type: 'line',
    	width: '400',
    	height: '150',
    	lineColor: '#06a4fc',
    	fillColor: '#191919',
    	lineWidth: 5,
    	spotColor: '#cccccc',
    	minSpotColor: '#cccccc',
    	maxSpotColor: '#cccccc',
    	highlightSpotColor: '#4c4c4c',
    	highlightLineColor: '#4c4c4c',
    	spotRadius: 7});
    });



	}


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
var timer = 0;


function display(){

  if (millisec>=9){
     millisec=0
     seconds+=1
  }
  else
     millisec+=1
     document.getElementById("time").innerHTML = seconds + "." + millisec + " seconds";
     timer = setTimeout("display()",100);
  }

function starttimer() {
	
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
	hide();
	hide_progress()
	clear_it();
	document.d.time.value = "";
}

/**************************************************************************************************************************************/


        //function draw_graph(){
			//var output = difference_array.toString();
			//var output_split = output.split(",");
			
			//var num = parseInt(output, 10);
			
			//difference_array.push(result);


			
		//{
       //     var line = new RGraph.Line('cvs', [difference_array]);
		//	line.Set('chart.labels', []);
      //      line.Draw();

    //    }
	//	
	//	}