const fs = require('fs');

// 1. Read and parse the JSON file
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// 2. Extract n and k
const n = data.keys.n;
const k = data.keys.k;

console.log(`n (number of roots): ${n}`);
console.log(`k (minimum roots required): ${k}`);

// 3. Decode the roots
const roots = [];
for (const key in data) {
    if (!isNaN(key)) {
        const x = parseInt(key, 10);
        const base = parseInt(data[key].base, 10);
        const y = parseInt(data[key].value, base);
        roots.push({ x, y });
        console.log(`Decoded root: x = ${x}, y = ${y} (from value "${data[key].value}" in base ${base})`);
    }
}

// If you want to use the roots array for further processing:
console.log('All decoded roots:', roots);
