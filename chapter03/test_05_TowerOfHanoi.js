function towerOfHanoi(n, from, to, helper) {
  if (n > 0) {
    towerOfHanoi(n - 1, from, helper, to);
    to.push(from.pop());
    console.log('-----');
    console.log('Start: ' + start.toString());
    console.log('Helper: ' + helper.toString());
    console.log('End: ' + end.toString());
    towerOfHanoi(n - 1, helper, to, from);
  }
  return false;
}


var start = [],
end = [],
helper = [],
startNum = 3;

function initStart(num) {
  for (let i = num; i >= 1; i--) {
    start.push(i);
  }
  return start;
}

initStart(startNum);
// alert(start);
towerOfHanoi(startNum, start, end, helper);