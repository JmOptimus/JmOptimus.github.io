const CANVAS_SIZE = 777;

// Number of elements(dots) per row
const density = 77;

// Pixels between dots
const GAP_SIZE = CANVAS_SIZE/density;

// Dots aspect
const DOT_SIZE = 5;
const DOT_COLOR = "#9381FF";

// Cellular automata variables
let ca;
let neighbourhood_size;

// Optimization: Store calculated rows
// to avoid recalculating every frame
// in a static situation
let rows;

// Movement variables
let depth = -1;
let displacement = 0;
let rot=0;

let displacement_factor = -1;
let rotation_factor = -1;


function setup(){
    
    const canvas_div = document.getElementById("canvas-container");
    
    let canvas= createCanvas(CANVAS_SIZE, CANVAS_SIZE);
    canvas.parent(canvas_div);

    refreshAutomata();
}

function draw(){
    
    if(checkKeyEvents()){
        refreshAutomata();
    }

    background("#080808");

    noStroke();
    fill(DOT_COLOR);

    const tail_length = (neighbourhood_size-1)/2;
    let offset = tail_length*(density+depth-1);

    for(let i=0;i<rows.length;i++){
        let row = rows[i];
        
        for(let j=0;j<density;j++){
            if(row[j+offset] === '1'){
                ellipse((j)*GAP_SIZE,(i-depth)*GAP_SIZE,DOT_SIZE);
            }
        }
        offset -= tail_length;
    }
}

function testAutomata(ns,prob_id){
    let ca2 = new CellularAutomata(ns);
    ca2.load_problem(prob_id);

    let igr = new InfiniteRowGenerator("0","1","0");
    ca2.set_initial_state(11,11,0,0,igr);

    let rs = ca2.iterate(11);
    let s = '';
    for(let i=0;i<rs.length;i++){
        for(let j=0;j<rs[i].length;j++){
            s+=rs[i][j]+",";
        }
        s+='\n';
    }
    console.log(s);
}

