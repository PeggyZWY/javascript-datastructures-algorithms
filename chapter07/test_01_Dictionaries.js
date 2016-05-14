/*************************

 ES6中已经实现了Map类
 参考：https://msdn.microsoft.com/zh-cn/library/dn263029(v=vs.94).aspx

 属性有：
 1. constructor
 2. prototype
 3. size

 方法有：
 1. clear()
 2. delete()
 3. forEach()
 4. get()
 5. has()
 6. set()
 7. toString()
 8. valueOf()


 以下是我们自己实现的类似于原生Set类的Dictionary类

 ************************/



function Dictionary() {
  var items = {};


  this.has = function(key) {
    return items.hasOwnProperty(key);
    // return key in items;
  };


  this.set = function(key, value) {
    items[key] = value;
  };


  this.delete = function(key) {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };


  this.get = function(key) {
    return (this.has(key)) ? items[key] : undefined;
  };


  this.values = function() {
    let values = [];
    for (let k in items) {
      if (this.has(k)) {
        values.push(items[k]);
      }
    }
    return values;
  };


  this.clear = function() {
    items = {};
  };


  this.size = function() {
    return Object.keys(items).length;
  };


  this.keys = function() {
    return Object.keys(items);
  };


  // 这个好！
  this.each = function(fn) {
    for (let k in items) {
      if (this.has(k)) {
        fn(k, items[k]);
      }
    }
  }


  this.getItems = function() {
    return items;
  }
}



var dictionary = new Dictionary();

dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.has('Gandalf'));
console.log(dictionary.size());   

console.log(dictionary.keys()); 
console.log(dictionary.values()); 
console.log(dictionary.get('Tyrion')); 

dictionary.delete('John');

console.log(dictionary.keys()); 
console.log(dictionary.values()); 

console.log(dictionary.getItems()); 

