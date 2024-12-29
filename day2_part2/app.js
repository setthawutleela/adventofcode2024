const fs = require('fs')

var safe = 0;

function readFile(filename) {
    try {
        const content = fs.readFileSync(filename, 'utf8');
        return content;
    } catch (err) {
        console.log(err)
        return "";
    }
}

function valid(a) {
    let bOk = true;
    let inc = true;
    let dec = true;

    let size = a.length;
    
    for (let i = 0; i < size - 1; i++) {
        let diff = a[i+1] - a[i];
        
        if (diff > 0) {
            dec = false;
        }
        
        if (diff < 0) {
            inc = false;
        }

        if ((Math.abs(diff) < 1) || (Math.abs(diff) > 3)) {
            bOk = false;
            break;
        }
    }

    return bOk && (inc || dec)
}


// Get arguemnt values
const args = process.argv.slice(2);

if (args.length != 1) {
    throw "Unexpected error!";
}

let data = readFile(args[0]);

// Separate data into rows
let rows = data.split("\n");


rows.forEach(r => {
    let a = r.split(" ");
    
    if (valid(a)) {
        safe++;
    } else {
        let size = a.length;
        someok = false;
        for (let i = 0; i < size; i++) {
            let newArray = a.slice(0, i).concat(a.slice(i+1))
            if (valid(newArray)) {
                safe++;
                break;
            }
        }
    }
})

console.log(safe);