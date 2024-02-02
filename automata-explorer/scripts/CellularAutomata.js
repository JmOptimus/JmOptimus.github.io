/*
    Cellular Automata whose state is represented in binary base
    @ref: https://mathworld.wolfram.com/ElementaryCellularAutomaton.html
*/

class CellularAutomata{

    /*
        Neighbourhood size must be odd in order to have a central element.
    */
    constructor(neighbourhood_size){
        this.neighbourhood_size = neighbourhood_size;
        this.TOTAL_PROBLEMS = 2**(2**this.neighbourhood_size);
    }

    set_initial_state(w,h,dx,dy,infinite_row_generator){
        const n = (this.neighbourhood_size-1)/2;
        const l0 = w + (2*(h+dy-1)*n)-(2*n);

        let s0 = '';
        for(let i=-(l0-1)/2;i<=(l0-1)/2;i++){
            s0 += infinite_row_generator.f(i+dx);
        }
        this.current_state = s0;
    }

    /*
        Load one of all possible problems represented by a base-10 index
    */

    load_problem(index){

        if(index>=0 && index<this.TOTAL_PROBLEMS){
            this.outputs = Number(index).toString(2).padStart(2**this.neighbourhood_size,"0").split('').reverse().join('');;
        }else{
            //alert("Given an initial state, there are "+this.TOTAL_PROBLEMS+" problems in total.");
            return false;
        }
        
        return true;
    }

    next_state(state){

        let output = "";

        const n = (this.neighbourhood_size-1)/2;

        // Iterate through the current state
        for(let i=n;i<this.current_state.length-n;i++){
            let input = "";
            for(let j=-n;j<=n;j++){
                let a = this.current_state[i+j];
                if(a){
                    input += a;
                }
            }

            let dec_input = parseInt(input, 2);

            output += this.outputs[dec_input];
        }

        return output;
    }


    set_state(new_state){
        this.current_state = new_state;
    }

    iterate(total_iterations){
        let res = [];
        for(let i=0;i<total_iterations;i++){
            res.push(this.current_state);
            this.current_state = this.next_state(this.current_state);
        }
        return res;
    }
}
