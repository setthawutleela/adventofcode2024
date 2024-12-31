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

function findForward(data, pattern, x, y) {
    let size = pattern.length;
    if (x + size > xmax) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y][x+i];
    }

    if (str === pattern) {
        answer++;
    }
}

function findBackward(data, pattern, x, y) {
    let size = pattern.length;
    if (x - size + 1 < 0) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y][x-i];
    }

    if (str === pattern) {
        answer++;
    }
}

function findForwardUp(data, pattern, x, y) {
    let size = pattern.length;
    if ((x + size > xmax) || (y - size + 1 < 0)) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y-i][x+i];
    }

    if (str === pattern) {
        answer++;
    }
}

function findForwardDown(data, pattern, x, y) {
    let size = pattern.length;
    if ((x + size > xmax) || (y + size > ymax)) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y+i][x+i];
    }


    if (str === pattern) {
        answer++;
    }
}

function findBackwardUp(data, pattern, x, y) {
    let size = pattern.length;
    if ((x - size + 1 < 0) || (y - size + 1 < 0)) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y-i][x-i];
    }

    if (str === pattern) {
        answer++;
    }
}

function findBackwardDown(data, pattern, x, y) {
    let size = pattern.length;
    if ((x - size + 1 < 0) || (y + size > ymax)) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y+i][x-i];
    }

    if (str === pattern) {
        answer++;
    }
}

function findUp(data, pattern, x, y) {
    let size = pattern.length;
    if (y - size + 1< 0) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y-i][x];
    }

    if (str === pattern) {
        answer++;
    }
}

function findDown(data, pattern, x, y) {
    let size = pattern.length;
    if (y + size > ymax) {
        return;
    }
    
    let str = "";
    for (let i = 0; i < size; i++) {
        str += data[y+i][x];
    }

    if (str === pattern) {
        answer++;
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
        let pattern = "";
        switch (data[y][x]) {
        case "X":
            pattern = "XMAS";
            break;
        }
        if (pattern != "") {
            findForward(data, pattern, x, y);
            findBackward(data, pattern, x, y);
            findForwardUp(data, pattern, x, y);
            findForwardDown(data, pattern, x, y);
            findBackwardUp(data, pattern, x, y);
            findBackwardDown(data, pattern, x, y);
            findUp(data, pattern, x, y);
            findDown(data, pattern, x, y);
        }
    }
}

console.log("Answer:",answer);