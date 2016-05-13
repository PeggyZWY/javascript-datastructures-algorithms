var fibonacci = [];
fibonacci[0] = 0;
fibonacci[1] = 1;

for (var i = 2; i < 20; i++) {
  fibonacci[i] = fibonacci[i-1] + fibonacci[i-2]; 
}

for (var i = 0; i < fibonacci.length; i++) {
  console.log(fibonacci[i]);
}