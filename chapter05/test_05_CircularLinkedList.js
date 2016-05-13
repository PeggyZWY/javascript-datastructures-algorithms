// 跟test_01_LinkedList.js比较

function CircularLinkedList() {
  var Node = function(element) {
    this.element = element;
    this.next = null;
  };

  var length = 0,
      head = null;

  this.append = function(element) {
    var node = new Node(element),
        current;

    if (head === null) {
      head = node;
    } else {
      current = head;
      // 为了找到追加元素前链表的最后一个
      while(current.next !== head) { // NEW
        current = current.next;
      }
      current.next = node;
    }
    node.next = head; // NEW
    length++;
  };


  this.removeAt = function(position) {
    if (position > -1 && position < length) {
      let current = head,
          previous,
          index = 0;

      if (position === 0) { // NEW, 这一坨有点绕
        // 如果当前的current不是链表最后一个元素
        while (current.next !== head) {
          // 为了找到链表最后一个元素
          current = current.next;
        }
          head = head.next; 
          // 把原来链表最后一个元素的next指向head
          current.next = head;
      } else {
        // 为了找到要删除元素前的最后一个，是previous
        while(index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };

  
  // insert()跟removeAt()因为都有参数position，所以实现起来蛮像的，一起记忆
  this.insert = function(position, element) {
    // 注意这里position可以等于length，不要忘了写啊
    if (position > -1 && position <= length) {
      let node = new Node(element),
          current = head,
          previous,
          index = 0;

      if (position === 0) {
        node.next = current;
        // 这一坨和removeAt()那里的一坨相似
        while (current.next !== head) {
          current = current.next;
        }
        head = node;
        current.next = head;
      } else {
        while(index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };


  // 把LinkedList对象转换成字符串
  this.toString = function() {
    var current = head,
        string = current.element;

    while(current.next !== head) {
      current = current.next;
      string += ', ' + current.element;
    }
    return string;
  };


  this.indexOf = function(element) {
    var current = head,
        index = 0;

    // 这一坨改的有点复杂，要兼顾最后一个元素，而且不能是不存在的
    while (current.next !== head) {
      if(element === current.element) {
        return index;
      }
      index++;
      current = current.next;
      if (current.next == head) {
        if(element === current.element) {
          return index;
        }
      }
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

  // 注意链表不是数组啊，length开始是人为设的0，经过insert，remove等操作length变化了
  // 没有 链表.length 这种东西
  this.size = function() {
    return length;
  };


  this.getHead = function() {
    return head;
  };


  this.print = function() {
    console.log(this.toString());
  };
}



// var list = new LinkedList();
let circularLinkedList = new CircularLinkedList();

circularLinkedList.append(15);
circularLinkedList.print();

circularLinkedList.append(16);
circularLinkedList.print();

circularLinkedList.insert(0,14);
circularLinkedList.print();

circularLinkedList.insert(1,14.5);
circularLinkedList.print();

circularLinkedList.insert(4,17);
circularLinkedList.print();

circularLinkedList.removeAt(0);
circularLinkedList.print();

circularLinkedList.removeAt(1);
circularLinkedList.print();

circularLinkedList.removeAt(2);
circularLinkedList.print();

console.log(circularLinkedList.indexOf(14.5));
console.log(circularLinkedList.indexOf(16));
console.log(circularLinkedList.indexOf(15));
