/*************************

 ES6中已经实现了Set类
 参考：https://msdn.microsoft.com/zh-cn/library/dn251547(v=vs.94).aspx

 属性有：
 1. constructor
 2. prototype
 3. size

 方法有：
 1. add()
 2. clear()
 3. delete()
 4. forEach()
 5. has()
 6. toString()
 7. valueOf()


 以下是我们自己实现的Set类

 ************************/


function Set() {
  var items = {};


  this.has = function(value) {
    return items.hasOwnProperty(value);
    // return value in items;
  };


  this.add = function(value) {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    } 
    return false;
  };


  this.delete = function(value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };


  this.clear = function() {
    items = {};
  };


  // 现代浏览器中可用：IE9+, FF4+, Chrome5+, Opera12+, Safari5+
  this.size = function() {
    return Object.keys(items).length;
  };


  // 所有都可用
  this.sizeLegacy = function() {
    let count = 0;
    for(let key in items) {
      if (items.hasOwnProperty(key)) {
        ++count;
      }
    }
    return count;
  };


  // 现代浏览器中可用：IE9+, FF4+, Chrome5+, Opera12+, Safari5+
  this.values = function() {
    // 下面这句在书上是这么写的，在作者源代码里面改变了。查了下大概是因为typeof Object.keys(items)是object而不是数组
    // return Object.keys(items);

    let values = [];
    for (let i = 0, keys = Object.keys(items); i < keys.length; i++) {
      values.push(items[keys[i]]);
    }
    return values;
  };


  this.getItems = function() {
    return items;
  };



  // 就是把两个集合加到unionSet里面去，由于add方法已经可以判断重不重复，所以这里不要判断了
  this.union = function(otherSet) {
    var unionSet = new Set();

    var values = this.values();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    values = otherSet.values();
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i]);
    }

    return unionSet;
  };


  this.intersection = function(otherSet) {
    var intersectionSet = new Set();

    var values = this.values();
    // 就是需要同时在两个里面才加到intersectionSet里面去
    for (let i = 0; i < values.length; i++) {
      if(otherSet.has(values[i])) {
        intersectionSet.add(values[i]);
      }
    }

    return intersectionSet;
  };


  this.difference = function(otherSet) {
    var differenceSet = new Set();

    var values = this.values();
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i]);
      }
    }

    return differenceSet;
  };


  this.subset = function(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    } else {
      var values = this.values();
      for (let i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false;
        }
      }
      return true;
    }
  };
}



var set = new Set();

set.add(1);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());

set.add(2);
console.log(set.values()); 
console.log(set.has(2));   
console.log(set.size());   
console.log(set.sizeLegacy()); 

set.delete(1);
console.log(set.values());

set.delete(2);
console.log(set.values());

console.log('------');


//--------- Union ----------

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

let unionAB = setA.union(setB);
console.log(unionAB.values());


//--------- Intersection ----------
// 如果 setA 前面还有 let, 会报错：216 Uncaught SyntaxError: Identifier 'setA' has already been declared
// 
setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());


//--------- Difference ----------

setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

let differenceAB = setA.difference(setB);
console.log(differenceAB.values());


//--------- Subset ----------

setA = new Set();
setA.add(1);
setA.add(2);

setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

let setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log(setA.subset(setB));
console.log(setA.subset(setC));
