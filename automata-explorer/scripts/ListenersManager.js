const DISPLACEMENT_STEP = 1;
const ROTATION_STEP = 1;

/*
    Change css property to change ring color gradient dynamically
*/
let a = document.querySelector('#outer-ring');
a.onmousemove = function (e) {
    let x = e.pageX - a.offsetLeft;
    let y = e.pageY - a.offsetTop;
    a.style.setProperty('--x', x + 'px');
    a.style.setProperty('--y', y + 'px');
}

/*
    Force allowed values to be binary (0|1)
*/
function check_binary(event){
    return (event.key=='0' || event.key=='1' || event.key=='Backspace' || event.key=='ArrowLeft' || event.key=='ArrowRight');
}

function checkKeyEvents(){
    let transformed = false;

    // W
    if (keyIsDown(87) || keyIsDown(119)) { 
        if(displacement_factor == 1){
            if(depth-1>=-density){
                depth -= (displacement_factor*DISPLACEMENT_STEP);
                transformed = true;
            }
        }else{
            depth -= (displacement_factor*DISPLACEMENT_STEP);
                transformed = true;
        }
    } 
  
    // S
    if (keyIsDown(83) || keyIsDown(115)) { 
        if(displacement_factor==-1){
            if(depth-1>=-density){
                depth += (displacement_factor*DISPLACEMENT_STEP); 
                transformed = true;
            }
        }else{
            depth += (displacement_factor*DISPLACEMENT_STEP); 
            transformed = true;
        }
    }

    document.getElementById('depth-value').innerHTML=(depth+1);


    // A
    if (keyIsDown(65) || keyIsDown(97)) { 
        displacement -= (displacement_factor*DISPLACEMENT_STEP);
        transformed = true;
    } 
  
    // D
    if (keyIsDown(68) || keyIsDown(100)) { 
        displacement += (displacement_factor*DISPLACEMENT_STEP);
        transformed = true;
    }

    document.getElementById('displacement-value').innerHTML=displacement;
    
    // J
    if (keyIsDown(74) || keyIsDown(106)) { 
        rot += (rotation_factor*ROTATION_STEP);
        transformed = true;
    }

    // K
    if (keyIsDown(75) || keyIsDown(107)) { 
        rot -= (rotation_factor*ROTATION_STEP);;
        transformed = true;
    }

    let compass_ring = document.querySelector('#compass-ring');
    compass_ring.style.setProperty('--rot', rot + 'deg');

    return transformed;
}

document.getElementById('neighbourhood-size').addEventListener('input', function (evt) {
    updateProblemID(this.value);
    refreshAutomata();
    transformed = true;
});

document.getElementById('problem-id').addEventListener('change', function (evt) {
    resetMovement();
    updateProblem();
    refreshAutomata();
});
