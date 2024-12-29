const fs = require('fs')

function readFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf8');
        return content;
    } catch (err) {
        console.log(err)
        return "";
    }
}

// Get arguemnt values
const args = process.argv.slice(2);

if (args.length != 1) {
    throw "Unexpected error!";
}

let data = readFile(args[0]);

let leftNumbers = [];
let rightNumbers = [];

// Prepare data by separating it into arrays
data.split("\n").forEach((val) => {
    let [l, r] = val.split("   ");
    leftNumbers.push(parseInt(l));
    rightNumbers.push(parseInt(r));
});

// Sorted array
leftNumbers = leftNumbers.sort();
rightNumbers = rightNumbers.sort();

// Find distance of each pairs
let distances = leftNumbers.map((val, idx) => {
    return Math.abs(val - rightNumbers[idx]);
})

let answer = distances.reduce((a, b) => a + b);

console.log(answer);
