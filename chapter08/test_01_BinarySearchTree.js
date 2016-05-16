function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  var root = null;

  this.getRoot = function() {
    return root;
  };


  var insertNode = function(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };


  this.insert = function(key) {
    var newNode = new Node(key);

    if (root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };


  /************
  前序遍历
  ************/
  var inOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
    return null;
  };


  this.inOrderTraverse = function(callback) {
    inOrderTraverseNode(root, callback);
  };


  /************
  先序遍历
  ************/
  var preOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
    return null;
  };


  this.preOrderTraverse = function(callback) {
    preOrderTraverseNode(root, callback);
  };


  /************
  后序遍历
  ************/
  var postOrderTraverseNode = function(node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
    return null;
  };


  this.postOrderTraverse = function(callback) {
    postOrderTraverseNode(root, callback);
  };


  /************
  搜索最小值和最大值
  ************/
  var minNode = function(node) {
    if (node) {
      while (node && node.left) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };


  this.min = function() {
    return minNode(root);
  };


  var maxNode = function(node) {
    if (node) {
      while (node && node.right) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };


  this.max = function() {
    return maxNode(root);
  };


  /************
  搜索特定的值
  ************/
  var searchNode = function(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  };


  this.search = function(key) {
    return searchNode(root, key);
  };


  /************
  移除一个节点
  ************/
  var findMinNode = function(node) {
    if (node) {
      while (node && node.left) {
        node = node.left;
      }
      return node;
    }
    return null;
  };


  var removeNode = function(node, element) {
    if (node === null) {
      return null;
    }

    if (element < node.key) {
      node.left = removeNode(node.left, element);
      return node;
    } else if (element > node.key) {
      node.right = removeNode(node.right, element);
      return node;
    } else {
      // 第一种情况：一个叶节点
      if (node.left === null && node.right === null) {
        node = null;
        // 学习了链表之后应该知道，只给node赋一个null还不够，还需要处理指针
        // 通过返回null将父节点的指针赋予null值
        return node;
      }

      // 第二种情况：一个只有一个子节点的节点
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // 第三种情况：一个有两个子节点的节点
      // 第一步：当找到了需要移除的节点后，需要找到他右边子树中最小的节点（即他的继承者）
      var aux = findMinNode(node.right);
      // 第二步：用他右侧子树中最小节点的键去更新这个节点的值（同时他自己也就被移除了）
      node.key = aux.key;
      // 第三步：要把右侧子树中的最小节点移除，因为他已经被移至要移除的节点的位置了。于是要用到递归
      node.right = removeNode(node.right, aux.key);
      // 第四步：向他的父节点返回更新后节点的引用
      return node;
    }
  };


  this.remove = function(element) {
    return removeNode(root, element);
  };
}





var tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

function printNode(value){
    console.log(value);
}

console.log('********* in-order transverse ***********');
tree.inOrderTraverse(printNode);

console.log('********* pre-order transverse ***********');
tree.preOrderTraverse(printNode);

console.log('********* post-order transverse ***********');
tree.postOrderTraverse(printNode);

console.log('********* min and max ***********');
console.log(tree.min());
console.log(tree.max());

console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');

console.log('********* remove 6 ***********');
tree.remove(6);
tree.inOrderTraverse(printNode);

console.log('********* remove 5 ***********');
tree.remove(5);
tree.inOrderTraverse(printNode);

console.log('********* remove 15 ***********');
tree.remove(15);
tree.inOrderTraverse(printNode);

console.log('********* raw data structure ***********');
console.log(tree.getRoot());
