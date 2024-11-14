var strStr = function(haystack, needle) {
  let isFound = true
  //iterate through haystack (i)
  for(let i=0;i<(haystack.length - needle.length +1);i++){
      //if letter in haystack matches first letter in needle, iterate through needle (j)
      if(haystack[i] === needle[0]){
          isFound = true
          for(let j=0;j<needle.length;j++){
              let hayLetter = haystack[i+j]
              let needLetter = needle[j]
              if(hayLetter !== needLetter){
                  //break inner loop and continue searching in haystack if inconsistency detected
                  isFound = false
                  break
              }
          }
          //if needle is iterated to end, without breaking: return outer index i
          if(isFound){
            console.log(i)
            return i

          }
      }
  }
  //return -1
  console.log('-1')
  return -1
};

strStr("leetcode","leeto")