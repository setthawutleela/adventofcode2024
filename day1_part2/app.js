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

// List of numbers' occurances
let rightNumberOccurances = {};
for (let i = 0; i < rightNumbers.length; i++) {
    if (rightNumberOccurances[rightNumbers[i]] === undefined) {
        rightNumberOccurances[rightNumbers[i]] = 0;
    } 
    rightNumberOccurances[rightNumbers[i]]++;
}

let answer = 0;
for (let i = 0; i < leftNumbers.length; i++) {
    if (rightNumberOccurances[leftNumbers[i]] === undefined) {
        continue;
    }
    answer += leftNumbers[i] * rightNumberOccurances[leftNumbers[i]];
}

console.log(answer);
