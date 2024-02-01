function updateNeighbourhood(){
    neighbourhood_size = parseInt(document.getElementById("neighbourhood-size").value);

    document.getElementById("problem-id").max = 2**(2**neighbourhood_size);
}


function updateProblem(){
    const prob_id = parseInt(document.getElementById("problem-id").value);
    if(!ca.load_problem(prob_id)){
        document.getElementById("problem-id").value = 0;
        return false;
    }
    return true;
}

function updateProblemID(new_id){
    console.log("updating ID");
    document.getElementById('problem-id').value = 0;
}

function updateInvertDisplacement(){
    displacement_factor = document.getElementById('invert-displacement').checked ? 1 : -1;
}

function updateInvertRotation(){
    rotation_factor = document.getElementById('invert-rotation').checked ? 1 : -1;
}

function refreshAutomata(){
    const l1 = document.getElementById('left-tail').value.length;
    const l2 = document.getElementById('central-chunk').value.length;
    const l3 = document.getElementById('right-tail').value.length;

    if(l1+l2+l3>=3){
        updateNeighbourhood();
        ca = new CellularAutomata(neighbourhood_size);
        if(updateProblem()){
            const l = document.getElementById('left-tail').value;
            const c = document.getElementById('central-chunk').value;
            const r = document.getElementById('right-tail').value;

            let irg = new InfiniteRowGenerator(l,c,r);
            ca.set_initial_state(density,density,displacement,depth,irg);
            rows = ca.iterate(density+depth);
        }
    }
}

function resetMovement(){
    depth = -1;
    displacement = 0;
    rot = 0;
}


function printRows(){
    let s = '';
    for(let i=0;i<rows.length;i++){
        for(let j=0;j<rows[i].length;j++){
            s+=rows[i][j]+",";
        }
        s+='\n';
    }
    console.log(s);
}