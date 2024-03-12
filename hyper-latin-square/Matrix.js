class Matrix{

    constructor(rows){
        this.rows = [];
        this.cols = [];
        

        let total_rows = rows.length;
        let total_cols = rows[0].length;

        for(let row_idx=0;row_idx<total_rows;row_idx++){
            let elems = [];
            for(let col_idx=0;col_idx<total_cols;col_idx++){
                elems.push(rows[row_idx][col_idx]);
            }
            this.rows.push(new Vector(elems));    
        }

        for(let col_idx=0;col_idx<total_cols;col_idx++){
            let elems = [];
            for(let row_idx=0;row_idx<total_rows;row_idx++){
                elems.push([rows[row_idx][col_idx]]);
            }

            this.cols.push(new Vector(elems));
        }
    }


    mul(B){
        let rows = [];

        for(let i=0;i<this.rows.length;i++){
            //console.log(this.rows);
            let current_row_a = this.rows[i];
            //console.log(current_row_a);
            let row_res = [];
            for(let j=0;j<B.cols.length;j++){
                let current_col_b = B.cols[j];
                row_res.push(current_row_a.mul(current_col_b));
            }
            //console.log(row_res);
            rows.push(row_res);
        }

        //console.log(rows);
        return new Matrix(rows);
    }

    printMatrix(){

        console.log("Rows");
        for(let i=0;i<this.rows.length;i++){
            console.log(this.rows[i].elems);
        }

        console.log("Cols");
        for(let j=0;j<this.cols.length;j++){
            console.log(this.cols[j].elems);
        }
    }
}