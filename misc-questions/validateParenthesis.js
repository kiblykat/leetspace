function isValid(s) {
  let openChar = ['(','[','{']
  let stack = []
  for(let char of s){
      if(openChar.includes(char)){
          stack.push(char)
      }else{
          if(stack.pop(char) !== char){
            console.log('false')
              return false
          } 
      }
  }
  if(stack.length !== 0){
    console.log('false')
    return false
  }
  console.log('true')
  return true
}


isValid("([{}])")