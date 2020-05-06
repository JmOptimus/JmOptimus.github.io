let len1 = 0;
let remArray = [];
let circles = [];
let circlesBg = [];
let circlesAvailable;

/*
  Function called when the server response is received
*/
let nanoTime;
function success(data){
    $("#waitMessage").hide();
    nanoTime = parseFloat(data.nanoTime/(Math.pow(10,9))).toFixed(2);

    let steps = data.steps;
    if(data.steps.length==0){
      $("#history").css("font-size","2em");
      $("#history").css("color","red");
      $("#history").html("Problem<br>unsolvable");
      unsuccessfulSound.play();
    }else{
        iterateSteps(steps,0);
        //successSound.play();
      //console.log("Steps: "+steps[0]);

      //$("#timeElapsed").html("Time elapsed : "+(data.nanoTime/(Math.pow(10,9))).toFixed(2)+" s");
      //$("#totalSteps").html("Total steps : "+steps.length);

    }
}

let last_target = -1;
let moveHistory = "";
let stepsCount = 1;
/*
  Automatically execute a particular steps
*/
function iterateSteps(steps,index){
  $("#history").css("color","black");
  let source = steps[index].source;
  let target = steps[index].target;
  let mid = steps[index].mid;


  if(last_target == source){  //Combined moved
    moveHistory +="-"+target;
  }else if(moveHistory.length>0){
    let html = $("#history").html();

    $("#history").html("<p>"+stepsCount+" : "+moveHistory+"</p>"+html);
    stepsCount++;
    moveHistory = source+"-"+target;
  }else{
    moveHistory = source+"-"+target;
  }
  last_target = target;

  let circleSrc = $(circles[source]);
  let circleTarget = $(circlesBg[target]);

  let circleMid = circles[mid];

  let topTarget = circleTarget.css("top");
  topTarget = parseInt(topTarget.substring(0,topTarget.length-2)); //Remove px termination

  let leftTarget = circleTarget.css("left");
  leftTarget = parseInt(leftTarget.substring(0,leftTarget.length-2)); //Remove px termination


  $(circles[source]).animate({
    top: topTarget,
    left: leftTarget
  },2000,
  ()=>
  {
    $(circles[mid]).fadeOut("fast",()=>{circles[target]= circles[source];if((index+1)<steps.length){iterateSteps(steps,index+1)}else{successSound.play();$("#history").html("<p id='nanoTime'>"+nanoTime+" s</p>"+$("#history").html());}});
  }
  );

}
/*
  Animates one peg movement
*/
function move(source,target,mid){

  let circleSrc = circles[source];
  let circleTarget = circlesBg[target];
  let circleMid = circles[mid];

  let topTarget = circleTarget.css("top");
  topTarget = parseInt(topTarget.substring(0,topTarget.length-2)); //Remove px termination

  let leftTarget = circleTarget.css("left");
  leftTarget = parseInt(leftTarget.substring(0,leftTarget.length-2)); //Remove px termination

  circleSrc.animate({
    top: topTarget,
    left: leftTarget
  },'fast',
  ()=>
  {
    circleMid.fadeOut("fast",()=>{circles[target]= circles[source];});
  }
  );
  return true;
}




//

function updateTriangle(){

  remArray = [];
  circles = [];
  circlesBg = [];
  circlesAvailable;

  //let len = 4;

  let triangleContainerWidth = $("#triangleContainer").css("width");
  let triangleContainerHeight = $("#triangleContainer").css("height");

  triangleContainerHeight = 480;
  triangleContainerWidth = 640;

  let v = 0;
  let s = (triangleContainerHeight-((len1-1)*v))/len1;


  let h = ((2*(triangleContainerHeight-s))/((len1-1)*Math.sqrt(3)))-s;

  let left_offset = ((triangleContainerWidth-s)/2);
  let top_offset = 0;

  if(len1 % 2 == 0){
    circlesAvailable = (len1+1)*(len1/2);
  }else{
    circlesAvailable = ((len1+1)*((len1-1)/2))+((len1+1)/2);
  }

  let circle_id = 1;
  let circle2_id = "1b";

  //let allrows = "";
  let count = 1;
  for(let i=1;i<=len1;i++){ // Iterate rows
    left_offset = ((triangleContainerWidth-s)/2)-((i-1)*(h+s)/2);
    let lengthPx = ((len1-1)*h)+(len1*s);

    let w = $("#triangleContainer").css("width");

    w = w.substring(0,w.length-2);

    left_offset = left_offset+((w-lengthPx)/2);

    for(let j=1;j<=i;j++){  //Iterate pegs inside each row

      if(len1>11){
        count = "";
      }
      let content = "<div class='circle' id='"+circle_id+"' style='position: absolute'></div><div class='circlebg' id='"+circle2_id+"' style='position: absolute'>"+count+"</div>";

      let html = $("#triangleContainer").html();
      html += content;
      $("#triangleContainer").html(html);

      count++;


      $("#"+circle_id).css("width",s);
      $("#"+circle_id).css("height",s);


      $("#"+circle_id).css("left",left_offset);
      $("#"+circle_id).css("top",top_offset);

      $("#"+circle2_id).css("width",(s-2));
      $("#"+circle2_id).css("height",(s-2));
      $("#"+circle2_id).css("line-height",s+"px");
      $("#"+circle2_id).css("left",(left_offset));
      $("#"+circle2_id).css("top",(top_offset));

      circles[""+circle_id]="#"+circle_id;
      circlesBg[""+circle_id]="#"+circle2_id;

      left_offset += (s+h);
      circle_id ++;
      circle2_id = circle_id+"b";
    }
    top_offset += (s+v);
  }
}

function setEventHandlers(){

  $('#lengthInput').on('input', function(e) {
     stepsCount = 1;
     last_target = -1;
     moveHistory = "";
     //$("#history").html("");

     let value = $('#lengthInput').val();

     if(isNaN(value)){
       value = $('#lengthInput').val(value.substring(0,value.length-1));
     }
     len1 = parseInt(value);

     $("#triangleContainer").html("<div><input type='text' id='lengthInput'><button type='button' id='solveBtn'>Solve</button></div><div><button type='button' id='solveBtn'>Solve</button></div>");


     updateTriangle();
     setEventHandlers();
     $("#lengthInput").focus();
     if(!isNaN(len1)){
       $("#lengthInput").val(len1);
     }

  });

  $(".circle").click(function(){
    stepsCount = 1;
    last_target = -1;
    moveHistory = "";
    $("#history").html("");

    $opacity = $(this).css("opacity");
    if($opacity == 1){ // visible -> hidden

      if(circlesAvailable ==2){
        $("#solveBtn").hide();
      }

      if(remArray.length==0){
        $("#solveBtn").show();
      }

      remArray.push($(this).attr("id"));
      circlesAvailable --;
      $(this).animate({"opacity":0});
    }else if($opacity == 0){ //hidden -> visible
      if(circlesAvailable == 1){
        $("#solveBtn").show();
      }


      remArray.splice(remArray.indexOf($(this).attr("id")),1);
      circlesAvailable ++;
      $(this).animate({"opacity":1});
      if(remArray.length == 0){
        $("#solveBtn").hide();
      }
    }


  });

  $("#solveBtn").click(function(){

      let remStr = "";
      for(let i=0;i<remArray.length;i++){
        remStr += ("&rem[]="+remArray[i]);
      }

      let url1 = 'http://jmoptimus.ddns.net:8080/metric-ff-service/metric-ff.php?len='+len1+remStr;

      $("#waitMessage").html("<p>Please wait</p><img id = 'loadinggif' src='./imgs/loadinggif.gif' alt='Loading ...'/>");

      $.ajax(
        {
          dataType: 'json',
          url: url1,
          success: success,
          error: e=>{console.log(e)}
        }
      );
    }
    );
}
$(document).ready(function(){
  updateTriangle();
  setEventHandlers();
});


let successSound,unsuccessfulSound;

function setup(){
}

function preload(){
  successSound = loadSound('./sounds/success.mp3');
  unsuccessfulSound = loadSound('./sounds/unsuccessful.mp3');
  unsuccessfulSound.setVolume(0.5);
  successSound.setVolume(0.5);
}
