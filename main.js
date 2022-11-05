status="";
objects=[];

function preload(){
    
}

function setup() {
    canvas = createCanvas(480, 380)
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380) 
    if(status !=""){
     objectDetector.detect(video, gotResult);
     for (i=0; i < objects.length; i++){
         document.getElementById("status").innerHTML = "Status : Objects Detected";
         document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: "+ objects.length;
 
         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label +" "+ percent + "%", objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke("#FF0000");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if(objects[i].label==input_value){
            video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML=input_value+" found";
        synth=window.speechSynthesis;
        utterthis=new SpeechSynthesisUtterance(input_value+" found");
        synth.speak(utterthis)
         }
         else{
            document.getElementById("status").innerHTML=input_value+" not Found"
         }
     }
    }
 }

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    input_value=document.getElementById("input_box").value;
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelLoaded() {
 console.log("Model Loaded!");
status=true;
}
function gotResult(error, results){
    if (error) {
        console.log(error);
    }else{
        console.log(results)
        objects = results;
    }
}