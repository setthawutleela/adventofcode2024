const fs = require('fs')

var answer = 0;

function readFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf8');
        return content;
    } catch (err) {
        console.log(err)
        return "";
    }

}

function findXMAS(data, x, y) {
    if (x + 3 < xmax + 1 && y + 3 < ymax + 1) {
        let str = data[y][x]+data[y][x+2]+data[y+2][x]+data[y+2][x+2];
        ((data[y+1][x+1] === "A") && ((str === "MSMS") || (str === "MMSS") || (str === "SMSM") || (str === "SSMM")))? answer++: 0;
    }
}
// Get arguemnt values
const args = process.argv.slice(2);

if (args.length != 1) {
    throw "Unexpected error!";
}

let data = readFile(args[0]);

data = data.split("\n");
var ymax = data.length;
var xmax = 0;
if (ymax > 0) {
    xmax = data[0].length;
}


for (let y = 0; y < ymax; y++) {
    for (let x = 0; x < xmax; x++) {
        findXMAS(data, x, y)
    }
}

console.log("Answer:",answer);