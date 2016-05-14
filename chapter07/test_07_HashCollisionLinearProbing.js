function HashLinearProbing() {
  var table = [];

  var ValuePair = function(key, value) {
    this.key = key;
    this.value = value;

    this.toString = function() {
      return '[' + this.key + ' - ' + this.value + ']';
    }
  };


  var loseloseHashCode = function(key) {
    var hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };


  var hashCode = function(key) {
    return loseloseHashCode(key);
  };


  this.put = function(key, value) {
    var position = hashCode(key);

    if (table[position] == undefined) {
      table[position] = new ValuePair(key, value);
    } else {
      var index = ++position;
      while (table[index] != undefined) {
        index++;
      }
      table[index] = new ValuePair(key, value);
    }
  };


  this.get = function(key) {
    var position = hashCode(key);

    if (table[position] !== undefined) {
      if (table[position].key === key) {
        return table[position].value;
      } else {
        var index = ++position;
        // 跳过空的和不是我们要找的值
        while (table[index] === undefined || table[index].key !== key) {
          index++;
        }
        if (table[index].key === key) {
          return table[index].value;
        }
      }
    }
    return undefined;
  };


  this.remove = function(key) {
    var position = hashCode(key);

    if (table[position] !== undefined) {
      if (table[position].key === key) {
        table[position] = undefined;
      } else {
        var index = ++position;
        while (table[index] === undefined || table[index].key !== key) {
          index++;
        }
        if (table[index].key === key) {
          table[index] = undefined;
        }
      }
    }
  };


  this.print = function() {
    for (let i = 0; i < table.length; ++i) {
      if (table[i] !== undefined) {
        console.log(i + ' -> ' + table[i].toString());
      }
    }
  };
}





var hashLinearProbing = new HashLinearProbing();

hashLinearProbing.put('Gandalf', 'gandalf@email.com');
hashLinearProbing.put('John', 'johnsnow@email.com');
hashLinearProbing.put('Tyrion', 'tyrion@email.com');
hashLinearProbing.put('Aaron', 'aaron@email.com');
hashLinearProbing.put('Donnie', 'donnie@email.com');
hashLinearProbing.put('Ana', 'ana@email.com');
hashLinearProbing.put('Jonathan', 'jonathan@email.com');
hashLinearProbing.put('Jamie', 'jamie@email.com');
hashLinearProbing.put('Sue', 'sue@email.com');
hashLinearProbing.put('Mindy', 'mindy@email.com');
hashLinearProbing.put('Paul', 'paul@email.com');
hashLinearProbing.put('Nathan', 'nathan@email.com');

console.log('**** Printing Hash **** ');

hashLinearProbing.print();

console.log('**** Get **** ');

console.log(hashLinearProbing.get('Nathan'));
console.log(hashLinearProbing.get('Loiane'));

console.log('**** Remove **** ');

hashLinearProbing.remove('Gandalf');
console.log(hashLinearProbing.get('Gandalf'));
hashLinearProbing.print();



