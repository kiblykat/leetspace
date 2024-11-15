var addBinary = function(a, b) {

  console.log(getDecimal(a))
  console.log(getDecimal(b))
  console.log(getBinary(getDecimal(a) + getDecimal(b)))
  
  function getDecimal(x){
      let arr = x.split('')
      let sum = 0
      for(let i = arr.length-1;i>=0;i--){
        let j=arr.length-i-1
        sum+=Math.pow(2,j)*arr[i]
      }
      return sum
  };

  function getBinary(x){
    let biStr = ""
    while(x>0){
        let remainder = x%2
        biStr=String(remainder)+biStr
        x= Math.floor(x/2)
    }
    return biStr
  }
};

addBinary("1010","1011")