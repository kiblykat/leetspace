matrix=[[1,3,5,7],[10,11,16,20],[23,30,34,60]]
target=3


function searchMatrix(matrix, target) {
    for(const arr of matrix){
        let l = 0;
        let r = arr.length-1;
        let m =0;
        while(l<=r){
            m=Math.floor((r+l)/2)
            if(target>arr[m]){
                l=m+1
            }
            else if(target<arr[m]){
                r=m-1
            }
            else{
                return true
            }
        }
    }
    return false
}

searchMatrix(matrix,target)