function devidedBy2(decNum) {
  var rem, sign,
  remList = [];
  if (decNum == 0) {
    return false;
  }
  absDecNum = Math.abs(decNum);
  sign = absDecNum / decNum;
  while (absDecNum !== 0) {
    rem = absDecNum % 2;
    remList.push(rem);
    absDecNum = Math.floor(absDecNum / 2);
  }
  remList.reverse();
  return (remList.join("") * sign);
}

console.log(devidedBy2(-18));

// 下面这个记得18后面两个点啊，一个点报错
console.log(-18..toString(2));



function baseConverter(decNum, base = 2) {
  var rem, sign,
  refer = '0123456789ABCDEF',
  baseString = '',
  remList = [];
  if (decNum == 0) {
    return false;
  }
  absDecNum = Math.abs(decNum);
  sign = absDecNum / decNum;
  while (absDecNum !== 0) {
    rem = absDecNum % base;
    remList.push(rem);
    absDecNum = Math.floor(absDecNum / base);
  }
  
  while (remList.length != 0) {
    baseString += refer[remList.pop()];
  }
  return (baseString * sign);
  
}

console.log(baseConverter(18));
console.log(baseConverter(-18, 16));