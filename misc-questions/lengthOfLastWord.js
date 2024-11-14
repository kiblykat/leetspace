/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
  let regex = /\s+/g
  s = s.replace(regex,' ').trim()
  s = s.split(' ')
  console.log(s[s.length-1].length)
  return s[s.length-1].length
};

lengthOfLastWord("   fly me   to   the moon  ")