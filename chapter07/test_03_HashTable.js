function HashTable() {
  var table = [];


  var loseloseHashCode = function(key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };


  var djb2HashCode = function(key) {
    var hash = 5381;
    for (var i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  };


  var hashCode = function(key) {
    return loseloseHashCode(key);
  };


  this.put = function(key, value) {
    var position = hashCode(key);
    table[position] = value;
  };


  this.get = function(key) {
    return table[hashCode(key)];
  };


  this.remove = function(key) {
    table[hashCode(key)] = undefined;
  };


  this.print = function() {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ': ' + table[i]);
      }
    }
  };
}




var hash = new HashTable();

hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
hash.put('Aaron', 'aaron@email.com');
hash.put('Donnie', 'donnie@email.com');
hash.put('Ana', 'ana@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Mindy', 'mindy@email.com');
hash.put('Paul', 'paul@email.com');
hash.put('Nathan', 'nathan@email.com');

console.log('**** Printing Hash **** ');

hash.print();


console.log('**** Get **** ');

console.log(hash.get('Gandalf'));
console.log(hash.get('Loiane'));

console.log('**** Remove **** ');

hash.remove('Gandalf');
console.log(hash.get('Gandalf'));
hash.print();
