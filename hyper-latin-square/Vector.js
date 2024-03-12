class Vector{
    constructor(elems){
        this.elems = elems;
    }


    mul(v2){
        let res = 0;
        for(let i=0;i<this.elems.length;i++){
            res += (this.elems[i]*v2.elems[i]);
        }
        return res;
    }
}