/*
    Cellular Automata whose state is represented in binary base
    Ref: Wolfram Automata
*/

class InfiniteRowGenerator{
    
    constructor(left_tail,central_chunk,right_tail){
        this.left_tail = left_tail;
        this.central_chunk = central_chunk;
        this.right_tail = right_tail;
    }

    f(x){
        let mid_index = (this.central_chunk).length/2;
        if(this.central_chunk.length%2!=0){
            mid_index = (this.central_chunk.length-1)/2;
        }

        let L = mid_index;
        let R = this.central_chunk.length-(mid_index+1);

        if(x == 0){
            return this.central_chunk[mid_index];
        }else if(x<-L){ // Left tail
            let left_tail_idx = (((x+L+1+(this.left_tail.length-1))%this.left_tail.length)+this.left_tail.length)%this.left_tail.length;

            return this.left_tail[left_tail_idx];
        }else if(x>R){  // Right tail

            const right_tail_idx = (x-R-1)%this.right_tail.length;

            return this.right_tail[right_tail_idx];
        }else{  // Central chunk
            return this.central_chunk[mid_index+x];
        }
    }


    test(){
        let s = '';
        for(let i=-50;i<50;i++){
            s += this.f(i);
        }
        console.log(s);
    }
}