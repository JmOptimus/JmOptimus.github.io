

const latin_grids = 
[
    [
        [4,1,2,3],
        [3,4,1,2],
        [2,3,4,1],
        [1,2,3,4]
    ],
    [
        [1,2,3,4],
        [4,1,2,3],
        [3,4,1,2],
        [2,3,4,1]
    ],
    [
        [2,3,4,1],
        [1,2,3,4],
        [4,1,2,3],
        [3,4,1,2]
    ],
    [
        [3,4,1,2],
        [2,3,4,1],
        [1,2,3,4],
        [4,1,2,3]
    ]
];

const vs =
[
    [-1,1,1,1],
    [1,1,1,1],
    [1,-1,1,1],
    [-1,-1,1,1],
    [-1,-1,-1,1],
    [1,-1,-1,1],
    [1,1,-1,1],
    [-1,1,-1,1],
    [-1,1,1,-1],
    [1,1,1,-1],
    [1,-1,1,-1],
    [-1,-1,1,-1],
    [-1,-1,-1,-1],
    [1,-1,-1,-1],
    [1,1,-1,-1],
    [-1,1,-1,-1],
];


function projectTo3D(vector4D,distance){
    //console.log(vector4D);
    let w = 1/(distance - vector4D.cols[0].elems[3]);

    // Projection Matrix
    let P = new Matrix(
        [
            [100*w,0,0,0],
            [0,100*w,0,0],
            [0,0,100*w,0]
        ]
    );

    //P.printMatrix();
    //vector4D.printMatrix();
    return P.mul(vector4D);
}



const Rotations = {
    YZ: 0,
    XY: 1,
    YW: 2,
    ZX: 3,
    XW: 4,
    ZW: 5
}



function rotateTransform(rotation_id, vector4D,theta){
    let rotationMatrix;
    switch(rotation_id){
        case Rotations.YZ:
            rotationMatrix = new Matrix(
                [
                    [1,0,0,0],
                    [0,cos(theta),-sin(theta),0],
                    [0,sin(theta),cos(theta),0],
                    [0,0,0,1]
                ]);
        break;
        case Rotations.XY:
            rotationMatrix = new Matrix(
                [
                    [cos(theta),-sin(theta),0,0],
                    [sin(theta),cos(theta),0,0],
                    [0,0,1,0],
                    [0,0,0,1]
                ]);
        break;
        case Rotations.YW:
            rotationMatrix = new Matrix(
                [
                    [1,0,0,0],
                    [0,cos(theta),0,-sin(theta)],
                    [0,0,1,0],
                    [0,sin(theta),0,cos(theta)]
                ]);
        break;
        case Rotations.ZX:
            rotationMatrix = new Matrix(
                [
                    [cos(theta),0,sin(theta),0],
                    [0,1,0,0],
                    [-sin(theta),0,cos(theta),0],
                    [0,0,0,1]
                ]);
        break;
        case Rotations.XW:
            rotationMatrix = new Matrix(
                [
                    [cos(theta),0,0,-sin(theta)],
                    [0,1,0,0],
                    [0,0,1,0],
                    [sin(theta),0,0,cos(theta)]
                ]);
        break;
        case Rotations.ZW:
            rotationMatrix = new Matrix(
                [
                    [1,0,0,0],
                    [0,1,0,0],
                    [0,0,cos(theta),-sin(theta)],
                    [0,0,sin(theta),cos(theta)]
                ]);
    }

    return rotationMatrix.mul(vector4D);
}