function groupAnagrams(strs) {
  //for each str, generate a key (eg a-1c-1t-1)
  //create hash table of keys, value is array of anagrams with same letters
  let key_hash = {}
  for(let str of strs){
      let key = str;
      key = key.split('').sort().join('-')      //cat -> a-c-t
      if(key_hash[key] == undefined){
        key_hash[key] = [str];
      }else{
        key_hash[key].push(str)
      }
  }
  console.log(Object.values(key_hash))
  return Object.values(key_hash)
}

groupAnagrams(["act","pots","tops","cat","stop","hat"])