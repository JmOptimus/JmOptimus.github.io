let window_pointer = -1;
let WINDOW_SIZE = 3;
const STATE_LENGTH = 10;
let first_time = true;
// Sliding window functions

function turnOnCell(cell_id){
    document.getElementById(cell_id).classList.remove("off");
    document.getElementById(cell_id).classList.add("on");
}

function turnOffCell(cell_id){
    document.getElementById(cell_id).classList.add("off");
    document.getElementById(cell_id).classList.remove("on");
}


function turnOnCell2(cell_id){
    document.getElementById(cell_id).classList.remove("off2");
    document.getElementById(cell_id).classList.add("on2");
}

function turnOffCell2(cell_id){
    document.getElementById(cell_id).classList.add("off2");
    document.getElementById(cell_id).classList.remove("on2");
}



function setWindowSize(size){

    WINDOW_SIZE = size;
    if(size == 1){
        for(let i=6;i>=0;i--){
            document.getElementById("p-"+i).style.visibility="hidden";
        }
    }else{
        for(let i=6;i>=0;i--){
            document.getElementById("p-"+i).style.visibility="visible";
        }
    }
        const LIMIT = 2**size;
        let e1 = document.getElementById("limit-1");
        e1.innerHTML="$$a_{"+(LIMIT-1)+"}$$";
        let e2 = document.getElementById("limit-2");
        e2.innerHTML="$$a_{"+(LIMIT-2)+"}$$";
        MathJax.typeset([e1]);
        MathJax.typeset([e2]);
}

function slideWindow(dir){

    if((dir==1 && window_pointer < 10-WINDOW_SIZE) || (dir==-1 && window_pointer>0)){
        window_pointer+=dir;
    
        let p = (STATE_LENGTH-1)-(window_pointer);                

        const n = (WINDOW_SIZE-1)/2;

        let e = document.getElementById("s-t-1-"+(p-(n)));
        e.innerHTML = "$$s^{t+1}_{"+(p-(2*n))+"}$$";
        MathJax.typeset([e]);

        if(dir==1 && window_pointer==0){
            for(let i=0;i<WINDOW_SIZE;i++){
                turnOnCell("s-t-"+(p-i));
            }
        }else{
            let a = "s-t-"+(p+1);
            let b = "s-t-"+(p-(WINDOW_SIZE-1));

            if(dir == -1){
                a = "s-t-"+(p-(WINDOW_SIZE));
                b = "s-t-"+(p);
            }

            turnOffCell(a);
            turnOnCell(b);
        }

        let id = p - n;
        if(dir == -1){
            id--;
        }
        const cell_id = "s-t-1-" + id;
        const cell2_id = "s-t-1-" + (id+1);

        t1 = setTimeout(()=>{
            toggleCell(cell_id);
            if(dir==-1){
                turnOnCell2(cell2_id);
                turnOffCell2(cell_id);
            }else{
                if(window_pointer > 0){
                    turnOffCell2(cell2_id);
                }
                turnOnCell2(cell_id);
            }
            
            if(first_time){
                first_time = false;
                toggleCell("explanation");
            }
            updateExplanation();
            },1200);
    }
}

//---------------------------------

function toggleCell(id){
    if(document.getElementById(id).classList.contains("hidden-cell")){
        document.getElementById(id).classList.remove("hidden-cell");
        document.getElementById(id).classList.add("visible-cell");
    }else{
        document.getElementById(id).classList.remove("visible-cell");
        document.getElementById(id).classList.add("hidden-cell");
    }
}

function updateExplanation(){
    let p = (STATE_LENGTH-1)-(window_pointer);

    let s1 = "";
    const n = (WINDOW_SIZE-1)/2; 
    for(let i=0;i<WINDOW_SIZE;i++){
        s1 +="s^t_"+(p-i);
    }
    let s = "$$s^{t+1}_"+(p-(n*2))+" = a_{("+s1+")_{10}}$$";

    let e = document.getElementById("explanation");
    e.innerHTML = s;
    MathJax.typeset([e]);

    e.classList.remove("hidden_cell");
    e.classList.add("show_cell");
}

function restart(){

    for(let i=0;i<10;i++){
        const e = document.getElementById("s-t-"+i);

        const e2 = document.getElementById("s-t-1-"+i);
        if(e2.classList.contains("visible-cell")){
            toggleCell("s-t-1-"+i);
        }

        if(e.classList.contains("on")){
            e.classList.remove("on");
            e.classList.add("off");
        }
    }

    const e3 = document.getElementById("explanation");
    e3.classList.remove("visible-cell");
    e3.classList.add("hidden-cell");

    window_pointer = -1;
    first_time = true;
}