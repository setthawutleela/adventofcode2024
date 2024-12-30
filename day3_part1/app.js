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

let pattern = /mul\([0-9]+,[0-9]+\)/g;
let answer = 0;

data.match(pattern).forEach(m => {
    m = m.replaceAll("mul", "").replaceAll("(", "").replaceAll(")", "");
    let [l, r] = m.split(",");
    answer += l * r;
})

console.log(answer);