function DoublyLinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  };

  var length = 0,
      head = null,
      tail = null;

  this.append = function(element) {
    var node = new Node(element),
        current;

    if (length === 0) {
      head = node;
      tail = node;
    } else {
      // 因为有tail了，就不必像单向链表里要先找到链表的最后一个
      tail.next = node;
      node.prev = tail;
      tail = node;
    }
    length++;
  };


  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head,
          previous,
          index = 0;

      if (position === 0) {
        head = current.next;
        if (length === 1) {
          tail = null;
        } else {
          head.prev = null; // 这步容易忘
        }
      } else if (position === length - 1) {
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };


  this.insert = function(position, element) {
    if (position > -1 && position <= length) {
      let node = new Node(element),
          current = head,
          previous,
          index = 0;

      if (position === 0) {
        // 这就跟append如果原本是空链表一样的了
        if (!head) {
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;          
        }
      } else if (position === length) {
        // 跟removeAt一样的要考虑position位置所在的三种可能场景
        // 以及这里是length，不是length - 1
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        node.next = current;
        node.prev = previous;
        previous.next = node;
        current.prev = node;
      }

      length++;
      return true;
    } else {
      return false;
    }
  };


  this.toString = function() {
    var current = head,
        string = '';

    while(current) {
      string += current.element + (current.next ? ', ' : '');
      current = current.next;
    }
    return string;
  }; 


  this.inverseToString = function() {
    let current = tail,
      string = current ? current.element : '';
      if (!current) {
        return string;
      }
      current = current.prev;
    // 这一坨原来的代码有问题
    while(current) {
      string += ', ' + current.element;
      current = current.prev;
    }
    return string;
  };


  this.indexOf = function(element) {
    var current = head,
        index = 0;

    while(current) {
      if (element === current.element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };


  this.remove = function(element) {
    var index = this.indexOf(element);
    return this.removeAt(index);
  };


  this.isEmpty = function() {
    return (length === 0);
  };


  this.size = function() {
    return length;
  };


  this.getHead = function() {
    return head;
  };


  this.getTail = function() {
    return tail;
  };


  this.print = function() {
    console.log(this.toString());
  };


  this.printInverse = function() {
    console.log(this.inverseToString());
  };
}



let list = new DoublyLinkedList();

list.append(15);
list.print();
list.printInverse();

list.append(16);
list.print();
list.printInverse();

list.append(17);
list.print();
list.printInverse();

list.insert(0,13);
list.print();
list.printInverse();

list.insert(4,18);
list.print();
list.printInverse();

list.insert(1,14);
list.print();
list.printInverse();

list.removeAt(0);
list.print();
list.printInverse();

list.removeAt(list.size()-1);
list.print();
list.printInverse();

list.removeAt(1);
list.print();
list.printInverse();

list.remove(16);
list.print();
list.printInverse();

list.remove(14);
list.print();
list.printInverse();

list.remove(17);
list.print();
list.printInverse();