var removeElement = function (nums, val) {
  let l = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[l] = nums[i];
      l++;
      console.log("current nums is: ", nums)
    }
  }
  console.log("FINAL nums is: ", nums)
  return l;
};

numbers = [0,1,2,2,3,0,4,2]
removeElement(numbers,2)
