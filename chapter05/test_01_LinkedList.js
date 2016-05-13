function LinkedList() {
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
      while(current.next) {
        current = current.next;
      }
      current.next = node;
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
        head = node;
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
        string = '';

    while(current) {
      string += current.element + (current.next ? ', ' : '');
      current = current.next;
    }
    return string;
  };


  this.indexOf = function(element) {
    var current = head,
        index = 0;

    while(current) {
      if(element === current.element) {
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



var list = new LinkedList();
list.append(15);
list.print();
console.log(list.size());
console.log(list.indexOf(15));
list.append(10);
list.print();
list.insert(2,1);
list.print();
console.log("-----");
console.log(list.removeAt(2));
list.print();
list.remove(15);
list.print();
console.log(list.size());
