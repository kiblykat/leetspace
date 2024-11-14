//sort in ascending order

let nums=[2,5,3,1,8,6,24,15,10,4,9]


function insertionSort(nums) {
  for(let r = 1; r<nums.length;r++){
    if(nums[r]<nums[r-1]){
      let l = r-1
      while(nums[l]>nums[l+1] && l>=0){
        let tmp = nums[l]
        nums[l] = nums[l+1]
        nums[l+1] = tmp
        l--
      }
    }
  }
  return nums
}

console.log(insertionSort(nums)) 



  // let l = 0;
  // for(let r = 0;r<nums.length;r++){
  //   let l = r;
  //   while(l>0 && nums[l-1]>nums[l]){
  //     let tmp = nums[l]
  //     nums[l] = nums[l-1]
  //     nums[l-1]=tmp
  //     l--
  //   }
  // }
  // console.log(nums)
  // return nums
