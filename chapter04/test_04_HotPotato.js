function HotPotato(nameList, num) {
  var elimated = '';
  while (nameList.length > 1) {
    for (let i = 0; i < num; i++) {
      // 妙啊，通过这个实现循环队列
      nameList.push(nameList.shift());
    }
    elimated = nameList.shift();
    console.log(elimated + ' is elimated from the game.')
  }
  return nameList.shift();
}

var paticipants = [],
paticipantsNum = 5,
num = 7;

var startASCII = 'A'.charCodeAt(0);
// alert(startASCII);
for (let i = 0; i < paticipantsNum; i++) {
  var p = String.fromCharCode(startASCII)
  paticipants.push(p + p);
  startASCII++;
}
// alert(paticipants);

var winner = HotPotato(paticipants, num);
console.log('The winner is: ' + winner);