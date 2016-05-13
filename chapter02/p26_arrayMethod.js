000o

var isEven = function(x) {
  console.log(x);
  return (x % 2 == 0)? true : false;
  // 也可以直接写成 return (x % 2 == 0);
};


// forEach()
var forEachResult = numbers.forEach(function(x) {
  console.log(x + " % 2 == 0 : " + (x % 2 == 0));
});


// filter()
var filterResult = numbers.filter(isEven);
console.log(filterResult);


// map()
var mapResult = numbers.map(isEven);
console.log(mapResult);


// reduce()
var reduceResult = numbers.reduce(function(previous, current, index) {
  return previous + current;
});
console.log(reduceResult);

// the same as following
var sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(sum);


// sort()调用toString()转型方法，即使数组每一项都是数字，sort()方法比较的也是字符串
console.log(numbers.sort());
console.log(typeof numbers[0]); // [1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9]




// Sorting objects
var friends = [
    {name: 'John', age: 30, pet: 2},
    {name: 'Ana', age: 20, pet: 3},
    {name: 'Chris', age: 25, pet: 2.5}
];
// 用这个函数可以指定属性更好啊
function comparePerson(prop) {
  return function(a, b) {
    return a[prop] - b[prop];
  }
}
// the same as following
function test(a, b) {
  return a.age - b.age;
}

// var sortResult = friends.sort(test);
var sortResult1 = friends.sort(comparePerson("age"));
console.log(sortResult1);
for(let i = 0; i < sortResult1.length; i++) {
  console.log(sortResult1[i]);
}

var sortResult2 = friends.sort(comparePerson("pet"));
console.log(sortResult2);
for(let i = 0; i < sortResult2.length; i++) {
  console.log(sortResult2[i]);
}




