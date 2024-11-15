function mergeLists(list_1,list_2){
  let l=0;
  let r=0;
  let list_3=[]
  while(l<list_1.length && r<list_2.length){
    if(list_1[l]<list_2[r]){
      list_3.push(list_1[l])
      l++
    }
    else if(list_1[l]>list_2[r]){
      list_3.push(list_2[r])
      r++
    }
  }
  while(list_1[l] !== undefined){
    list_3.push(list_1[l])
    l++;
  }
  while(list_2[r] !== undefined){
    list_3.push(list_2[r])
    r++;
  }
  return list_3 
}

mergeLists([1,3,4,7],[2,5,8,9])