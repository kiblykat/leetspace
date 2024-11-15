function groupAnagrams(strs) {
  const ans = {};

  for (const s of strs) {
      const count = Array(26).fill(0);
      for (const c of s) {
          count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
      }

      const key = count.join('');
      if (!ans[key]) {
          ans[key] = [];
      }

      ans[key].push(s); //for each key(1#0#...#0), the value will contain list of words with same keys
  }

  console.log(Object.values(ans));
  return Object.values(ans);  //returns an array

}

groupAnagrams(["bdddddddddd","bbbbbbbbbbc"])