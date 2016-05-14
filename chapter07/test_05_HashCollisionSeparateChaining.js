function HashTableSeparateChaining() {
  var table = [];


  var ValuePair = function(key, value) {
    this.key = key;
    this.value = value;

    this.toString = function() {
      return '[' + this.key + '-' + this.value + ']';
    } 
  };


  var loseloseHashCode = function (key) {
      var hash = 0;
      for (var i = 0; i < key.length; i++) {
          hash += key.charCodeAt(i);
      }
      return hash % 37;
  };


  var hashCode = function(key){
      return loseloseHashCode(key);
  };


  // 对于分离链接和线性探查来说，只需要重写三个方法：put,get,remove。这三个方法在每种技术中的实现是不同的
  
  this.put = function(key, value) {
    var position = hashCode(key);

    if (table[position] == undefined) {
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value));
  };


  this.get = function(key) {
    var position = hashCode(key);

    if(table[position] !== undefined && !table[position].isEmpty()) {
      // 遍历链表来寻找键/值
      var current = table[position].getHead();

      do {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      } while (current);
    }
    return undefined;
  };


  this.remove = function(key) {
    var position = hashCode(key);

    if (table[position] !== undefined) {
      var current = table[position].getHead();

      do {
        if (current.element.key === key) {
          table[position].remove(current.element);
          if (table[position].isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
      } while (current);
    }
    return false;
  };


  this.print = function() {
    for (let i = 0; i < table.length; ++i) {
      if (table[i] !== undefined) {
        console.log(table[i].toString());
      }
    }
  };
}




var hashTableSeparateChaining = new HashTableSeparateChaining();

hashTableSeparateChaining.put('Gandalf', 'gandalf@email.com');
hashTableSeparateChaining.put('John', 'johnsnow@email.com');
hashTableSeparateChaining.put('Tyrion', 'tyrion@email.com');
hashTableSeparateChaining.put('Aaron', 'aaron@email.com');
hashTableSeparateChaining.put('Donnie', 'donnie@email.com');
hashTableSeparateChaining.put('Ana', 'ana@email.com');
hashTableSeparateChaining.put('Jonathan', 'jonathan@email.com');
hashTableSeparateChaining.put('Jamie', 'jamie@email.com');
hashTableSeparateChaining.put('Sue', 'sue@email.com');
hashTableSeparateChaining.put('Mindy', 'mindy@email.com');
hashTableSeparateChaining.put('Paul', 'paul@email.com');
hashTableSeparateChaining.put('Nathan', 'nathan@email.com');

console.log('**** Printing Hash **** ');

hashTableSeparateChaining.print();

console.log('**** Get **** ');

console.log(hashTableSeparateChaining.get('Jamie'));
console.log(hashTableSeparateChaining.get('Sue'));
console.log(hashTableSeparateChaining.get('Jonathan'));
console.log(hashTableSeparateChaining.get('Loiane'));

console.log('**** Remove **** ');

console.log(hashTableSeparateChaining.remove('Gandalf'));
console.log(hashTableSeparateChaining.get('Gandalf'));
hashTableSeparateChaining.print();

console.log(hashTableSeparateChaining.remove('Sue'));
hashTableSeparateChaining.print();

console.log(hashTableSeparateChaining.remove('Jamie'));
hashTableSeparateChaining.print();

console.log(hashTableSeparateChaining.remove('Donnie'));
hashTableSeparateChaining.print();
