let museum_elem;

function setup(){
    
    var myCanvas = createCanvas(windowWidth,windowHeight,WEBGL);
    myCanvas.parent("frame");
    
    camera(-230, -250, ((height/2) / tan(PI/6))+1300, -230, -250, 0, 0, 1, 0)
}


const colors = ["#6441a77f","#728dfc7f","#70ffc27f","#e63b687f"];
let angle = 0;

const SIZE = 100;

let j=3;



function draw(){
    
    orbitControl();
    //background("#f2f3f4");
    background("#f7f6ef");

    noStroke();
    for(let i=0;i<vs.length;i++){
       // 4x1 matrix
        let v = new Matrix(
            [
                [vs[i][0]],
                [vs[i][1]],
                [vs[i][2]],
                [vs[i][3]]
            ]
        );

        let vp1 = rotateTransform(Rotations.ZW,v,angle);
        
        let rp1 = projectTo3D(vp1,2);

        // Block-1
        if(i==11){
            fill(colors[latin_grids[0][0][0]-1]);
        }else if(i==10){
            fill(colors[latin_grids[0][0][1]-1]);
        }else if(i==8){
            fill(colors[latin_grids[0][1][0]-1]);
        }else if(i==9){
            fill(colors[latin_grids[0][1][1]-1]);
        }else if(i==12){
            fill(colors[latin_grids[1][0][0]-1]);
        }else if(i==13){
            fill(colors[latin_grids[1][0][1]-1]);
        }else if(i==15){
            fill(colors[latin_grids[1][1][0]-1]);
        }else if(i==14){
            fill(colors[latin_grids[1][1][1]-1]);
        }else if(i==4){
            fill(colors[latin_grids[2][0][0]-1]);
        }else if(i==5){
            fill(colors[latin_grids[2][0][1]-1]);
        }else if(i==7){
            fill(colors[latin_grids[2][1][0]-1]);
        }else if(i==6){
            fill(colors[latin_grids[2][1][1]-1]);
        }if(i==3){
            fill(colors[latin_grids[3][0][0]-1]);
        }else if(i==2){
            fill(colors[latin_grids[3][0][1]-1]);
        }else if(i==0){
            fill(colors[latin_grids[3][1][0]-1]);
        }else if(i==1){
            fill(colors[latin_grids[3][1][1]-1]);
        }

         push();
             translate(rp1.cols[0].elems[0]-450, rp1.cols[0].elems[1]-450, rp1.cols[0].elems[2]);
             box(50,50,50);
         pop();


         // Block-2
        if(i==11){
            fill(colors[latin_grids[0][0][2]-1]);
        }else if(i==10){
            fill(colors[latin_grids[0][0][3]-1]);
        }else if(i==8){
            fill(colors[latin_grids[0][1][2]-1]);
        }else if(i==9){
            fill(colors[latin_grids[0][1][3]-1]);
        }if(i==12){
            fill(colors[latin_grids[1][0][2]-1]);
        }else if(i==13){
            fill(colors[latin_grids[1][0][3]-1]);
        }else if(i==15){
            fill(colors[latin_grids[1][1][2]-1]);
        }else if(i==14){
            fill(colors[latin_grids[1][1][3]-1]);
        }if(i==4){
            fill(colors[latin_grids[2][0][2]-1]);
        }else if(i==5){
            fill(colors[latin_grids[2][0][3]-1]);
        }else if(i==7){
            fill(colors[latin_grids[2][1][2]-1]);
        }else if(i==6){
            fill(colors[latin_grids[2][1][3]-1]);
        }if(i==3){
            fill(colors[latin_grids[3][0][2]-1]);
        }else if(i==2){
            fill(colors[latin_grids[3][0][3]-1]);
        }else if(i==0){
            fill(colors[latin_grids[3][1][2]-1]);
        }else if(i==1){
            fill(colors[latin_grids[3][1][3]-1]);
        }


         push();
             translate(rp1.cols[0].elems[0], rp1.cols[0].elems[1]-450, rp1.cols[0].elems[2]);
             box(50,50,50);
         pop();


         // Block-3
        if(i==11){
            fill(colors[latin_grids[0][2][0]-1]);
        }else if(i==10){
            fill(colors[latin_grids[0][2][1]-1]);
        }else if(i==8){
            fill(colors[latin_grids[0][3][0]-1]);
        }else if(i==9){
            fill(colors[latin_grids[0][3][1]-1]);
        }if(i==12){
            fill(colors[latin_grids[1][2][0]-1]);
        }else if(i==13){
            fill(colors[latin_grids[1][2][1]-1]);
        }else if(i==15){
            fill(colors[latin_grids[1][3][0]-1]);
        }else if(i==14){
            fill(colors[latin_grids[1][3][1]-1]);
        }if(i==4){
            fill(colors[latin_grids[2][2][0]-1]);
        }else if(i==5){
            fill(colors[latin_grids[2][2][1]-1]);
        }else if(i==7){
            fill(colors[latin_grids[2][3][0]-1]);
        }else if(i==6){
            fill(colors[latin_grids[2][3][1]-1]);
        }if(i==3){
            fill(colors[latin_grids[3][2][0]-1]);
        }else if(i==2){
            fill(colors[latin_grids[3][2][1]-1]);
        }else if(i==0){
            fill(colors[latin_grids[3][3][0]-1]);
        }else if(i==1){
            fill(colors[latin_grids[3][3][1]-1]);
        }

        push();
            translate(rp1.cols[0].elems[0]-450, rp1.cols[0].elems[1], rp1.cols[0].elems[2]);
            box(50,50,50);
        pop();


        // Block-4
        if(i==11){
            fill(colors[latin_grids[0][2][2]-1]);
        }else if(i==10){
            fill(colors[latin_grids[0][2][3]-1]);
        }else if(i==8){
            fill(colors[latin_grids[0][3][2]-1]);
        }else if(i==9){
            fill(colors[latin_grids[0][3][3]-1]);
        }if(i==12){
            fill(colors[latin_grids[1][2][2]-1]);
        }else if(i==13){
            fill(colors[latin_grids[1][2][3]-1]);
        }else if(i==15){
            fill(colors[latin_grids[1][3][2]-1]);
        }else if(i==14){
            fill(colors[latin_grids[1][3][3]-1]);
        }if(i==4){
            fill(colors[latin_grids[2][2][2]-1]);
        }else if(i==5){
            fill(colors[latin_grids[2][2][3]-1]);
        }if(i==3){
            fill(colors[latin_grids[3][2][2]-1]);
        }else if(i==2){
            fill(colors[latin_grids[3][2][3]-1]);
        }else if(i==0){
            fill(colors[latin_grids[3][3][2]-1]);
        }else if(i==1){
            fill(colors[latin_grids[3][3][3]-1]);
        }

        push();
            translate(rp1.cols[0].elems[0], rp1.cols[0].elems[1], rp1.cols[0].elems[2]);
            box(50,50,50);
        pop();
    }

    angle+=0.007;
}

function reloadCanvas(){

}
