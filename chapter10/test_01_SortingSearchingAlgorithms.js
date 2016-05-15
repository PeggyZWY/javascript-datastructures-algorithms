function ArrayList() {
  var array = [];

  this.insert = function(item) {
    array.push(item);
  };


  var swap = function(array, index1, index2) {
    var tem = array[index1];
    array[index1] = array[index2];
    array[index2] = tem;
  };


  this.toString = function() {
    return array.join();
  };


  this.array = function() {
    return array;
  };



  /*************
  以下为排序
  *************/
  this.modifiedBubbleSort = function() {
    var length = array.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (array[j] > array[j+1]) {
          swap(array, j, j + 1);
        }
      }
    }
  };


  this.selectionSort = function() {
    var length = array.length,
        indexMin;

    for (let i = 0; i < length - 1; i++) {
      indexMin = i;
      for (let j = i; j < length; j++) {
        if (array[indexMin] > array[j]) {
          indexMin = j;
        }
      }
      if (i !== indexMin) {
        swap(array, i, indexMin);
      }
    }
  };


  this.insertionSort = function() {
    var length = array.length,
        j, tem;

    for (let i = 1; i < length; i++) {
      j = i;
      tem = array[i];
      while (j > 0 && (array[j-1] > tem)) {
        array[j] = array[j-1];
        j--;
      }
      array[j] = tem;
    }
  };


  /********
   归并排序
   *******/
  var merge = function(left, right) {
    // 天啦，开始把下面声明result后面的这个逗号写成分好了，然后debug还没发现，搞了好久。。。
    var result = [],
        il = 0,
        ir = 0;

    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }

    while (il < left.length) {
      result.push(left[il++]);
    }

    while (ir < right.length) {
      result.push(right[ir++]);
    }

    console.log('result: ' + result);
    return result;
  };



  var mergeSortRec = function(array) {
    var length = array.length;
    console.log('length: ' + length);

    if (length === 1) {
      return array;
    }

    var mid = Math.floor(length / 2),
        left = array.slice(0, mid),
        right = array.slice(mid, length);
    // console.log('left&right: ' + left +'~~~' + right);
    return merge(mergeSortRec(left), mergeSortRec(right));
  };


  // 声明一个主方法来调用递归函数
  this.mergeSort = function() {
    array = mergeSortRec(array);
  };
  
  
 
  /********
   快速排序
   *******/
  var partition = function(array, left, right) {
    var pivot = array[Math.floor((left + right) / 2)],
        i = left,
        j = right;

    while (i <= j) {
      while (array[i] < pivot) {
        i++;
      }
      while (array[j] > pivot) {
        j--;
      }

      if (i <= j) {
        swap(array, i, j);
        i++;
        j--;
      }
    }
    return i;
  };


  var quick = function(array, left, right) {
    var index;

    if (array.length > 1) {
      index = partition(array, left, right);

      if (left < index - 1) {
        quick(array, left, index - 1);
      } 

      if (index < right) {
        quick(array, index, right);
      }
    }
    return array;
  };


  // 声明一个主方法来调用递归函数
  this.quickSort = function() {
    quick(array, 0, array.length - 1);
  };







  /*************
  以下为搜索
  *************/

  this.sequentialSearch = function(item) {
    for (let i = 0; i < array.length; i++) {
      if (item === array[i]) {
        return i;
      }
    }
    return -1;
  };


  this.binarySearch = function(item) {
    this.quickSort();

    var low = 0,
        high = array.length - 1,
        mid, element;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      element = array[mid];

      if (element < item) {
        low = mid + 1;
      } else if (element > item) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  };


  this.findMaxValue = function() {
    var max = array[0];
    for (let i = 0; i < array.length; i++) {
      if (max < array[i]) {
        max = array[i];
      }
    }
    return max;
  };


  this.findMinValue = function() {
    var min = array[0];
    for (let i = 0; i < array.length; i++) {
      if (min > array[i]) {
        min = array[i];
      }
    }
    return min;
  };
}






function createNonSortedArray(size) {
  var array = new ArrayList();

  for (let i = size; i >0; i--) {
    array.insert(i);
  }

  return array;
}


function createRandomNonSortedArray(){
    var array = new ArrayList();

    array.insert(3);
    array.insert(5);
    array.insert(1);
    array.insert(6);
    array.insert(4);
    array.insert(7);
    array.insert(2);

    return array;
}


function printArray(array) {
  console.log(array.toString());
}


function createNonSortedArrayAndPrint(size) {
  var array = createNonSortedArray(size);
  printArray(array);

  return array;
}






console.log('********** Modified Bubble Sort **********');

var array = createNonSortedArrayAndPrint(5);
array.modifiedBubbleSort();
printArray(array);

console.log('********** Selection Sort **********');

array = createNonSortedArrayAndPrint(5);
array.selectionSort();
printArray(array);

console.log('********** Insertion Sort **********');

array = createNonSortedArrayAndPrint(5);
array.insertionSort();
printArray(array);

console.log('********** Merge Sort **********');

array = createNonSortedArrayAndPrint(8);
array.mergeSort();
printArray(array);

console.log('********** Quick Sort **********');

array = createRandomNonSortedArray();
printArray(array);
array.quickSort();
printArray(array);



console.log('********** 以上是排序，以下是搜索 **********');

function createNonSortedArray(items){
    var array = new ArrayList();

    for (var i = items; i> 0; i--){
        array.insert(i);
    }

    return array;
}

var array = createNonSortedArray(5);

console.log('********** Sequential Sort #3 **********');

console.log(array.sequentialSearch(3));

console.log('********** Min **********');

console.log(array.findMinValue());

console.log('********** Max **********');

console.log(array.findMaxValue());

console.log('********** Binary Search #3 **********');

console.log(array.binarySearch(3));

console.log('********** Binary Search #2 **********');

var array = createNonSortedArray(8);

console.log(array.binarySearch(2));
