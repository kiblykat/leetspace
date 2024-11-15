function isPalindrome(s) {
      //remove all white spaces
      //make all small letters
      s = s.toLowerCase().split("")
      let arr = []
      for(let char of s){
          if(isAlphaNum(char)){
              arr.push(char)
          }
      }
      s = arr.join("")
      //get length of half of string
      let l_ptr = 0
      let r_ptr = s.length-1
      //compare forward pointer with backward pointer
      while(l_ptr<r_ptr){
          if(s[l_ptr] !== s[r_ptr]){
              return false
          }
          l_ptr++
          r_ptr--
      }
      return true
  }

function isAlphaNum(char){
      if(char.charCodeAt() >=48 && char.charCodeAt()<=57 ||
      char.charCodeAt()>=65 && char.charCodeAt()<=90 ||
      char.charCodeAt()>=97 && char.charCodeAt()<=122 ){
          return true
      }
      return false
  }

  isPalindrome("Was it a car or a cat I saw?")