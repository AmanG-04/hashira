function horner(array, x_scale, y_scale) {
   function recur(x, i, array) {
      if (i == 0) {
         return array[0];
      } else {
         return array[i] + x*recur(x, --i, array);
      }
   }
   return function(x) {
      return recur(x*x_scale, array.length-1, array)*y_scale;
   };
}

function zeros(n) {
   var array = new Array(n);
   for (var i=n; i--;) {
     array[i] = 0;
   }
   return array;
}

function denominator(i, points) {
   var result = 1;
   var x_i = points[i].x;
   for (var j=points.length; j--;) {
      if (i != j) {
        result *= x_i - points[j].x;
      }
   }
    console.log(result);
   return result;
}

function interpolation_polynomial(i, points) {
   var coefficients = zeros(points.length);
   coefficients[0] = 1/denominator(i,points);
   console.log(coefficients[0]);
   var new_coefficients;

   for (var k = 0; k<points.length; k++) {
      if (k == i) {
        continue;
      }
      new_coefficients = zeros(points.length);
       for (var j= (k < i) ? k+1 : k; j--;) {
         new_coefficients[j+1] += coefficients[j];
         new_coefficients[j] -= points[k].x*coefficients[j];
      }   
      coefficients = new_coefficients;
   }
   console.log(coefficients);
   return coefficients;
}

function Lagrange(points) {
   var polynomial = zeros(points.length);
   var coefficients;
   for (var i=0; i<points.length; ++i) {
     coefficients = interpolation_polynomial(i, points);
     for (var k=0; k<points.length; ++k) {
        polynomial[k] += points[i].y*coefficients[k];
     }
   }
   return polynomial;
}
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data2.json', 'utf8'));

var myPoints = [];
for (const key in data) {
    if (!isNaN(key)) {
        const x = parseInt(key, 10);
        const base = parseInt(data[key].base, 10);
        const y = parseInt(data[key].value, base);
        myPoints.push({ x, y });
    }
}

console.log("Using decoded points:", myPoints);

var polynomialCoefficients = Lagrange(myPoints);

var c_constant = polynomialCoefficients[0];

console.log("The calculated coefficients are: " + polynomialCoefficients);
console.log("The constant 'c' is: " + c_constant); 