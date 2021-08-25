// url: https://api.razzlepuzzles.com/wordsearch

let word_bank = [];

function bank() {
    let b = document.getElementById("words").children;
    for (let i = 0; i < b.length; i++) {
        let word = b[i].innerHTML;
        word_bank.push(word);
    }

    // sort by largest words first
    word_bank.sort(function(a, b) {
        return b.length - a.length;
    });
}

let word_puzzle = [];
let grid = document.getElementById("wordsearchGrid").children;

function puzzle() {
    for (let i = 0; i < grid.length; i++) {
        let puzzle_rows = [];
        let row = grid[i].children;

        for (let j = 0; j < row.length; j++) {
            let cell = row[j].children[0].innerHTML;
            puzzle_rows.push(cell);
        }
        word_puzzle.push(puzzle_rows);
    }
}

let usable_letters = new Set();

function usable() {
    // store the letters that are the start of our words
    let letters = [];
    for (let i = 0; i < word_bank.length; i++)
        letters.push(word_bank[i][0]);
      
    usable_letters = [...new Set(letters)];
}

// list of found [x,y] coords that make up a word
let letter_positions = []; 

function solve() {
    for (let i = 0; i < word_bank.length; i++) {
        let word = word_bank[i];
        for (let r = 0; r < word_puzzle.length; r++) {
            for (let c = 0; c < word_puzzle[r].length; c++) {
                let letter = word_puzzle[r][c];
                if (!usable_letters.includes(letter))
                    continue;

                let current = "";

                // (1): test right direction
                try {
                    let pos = [];
                    if (word_puzzle[r][c+word.length-1] == word[word.length-1]) {
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r][c+l];
                            pos.push([r,c+l]);
                        }
                        if (current == word) {
                            console.log("right match: ", word);
                            letter_positions.push(pos);
                        }
                        current = "";
                    }
                } 
                catch (error) {}

                // (2): test left direction
                try {
                    let pos = [];
                    if (word_puzzle[r][c-word.length+1] == word[word.length-1]) {
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r][c-l];
                            pos.push([r,c-l]);
                        }
                        if (current == word) {
                            console.log("left match: ", word);
                            letter_positions.push(pos);
                        }   
                        current = ""; 
                    }
                } 
                catch (error) {}
                
                // (3): test up direction
                try {                    
                    let pos = [];
                    if (word_puzzle[r-word.length+1][c] == word[word.length-1]) {
                        
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r-l][c];
                            pos.push([r-l,c]);
                        }

                        if (current == word) {
                            console.log("up match: ", word);
                            letter_positions.push(pos);
                        }
                        current = "";
                    }
                } 
                catch (error) {}

                // (4): test down direction
                try {
                    let pos = [];
                    if (word_puzzle[r+word.length-1][c] == word[word.length-1]) {
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r+l][c];
                            pos.push([r+l,c]);
                        }

                        if (current == word) {
                            console.log("down match: ", word);
                            letter_positions.push(pos);
                            
                        }
                        current = "";
                    }
                } 
                catch (error) {}
                
                // (6): test down-right direction
                try {
                    let pos = [];
                    if (word_puzzle[r+word.length-1][c+word.length-1] == word[word.length-1]) {
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r+l][c+l];
                            pos.push([r+l,c+l]);
                        }
                        if (current == word) {
                            console.log("down right match: ", word);
                            letter_positions.push(pos);
                            
                        }
                        current = "";
                    }
                } 
                catch (error) {}  

                // (7): test up-right direction
                try {
                    let pos = [];
                    if (word_puzzle[r-word.length+1][c+word.length-1] == word[word.length-1]) {
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r-l][c+l];
                            pos.push([r-l,c+l]);
                        }
                        if (current == word) {
                            console.log("up right match: ", word);
                            letter_positions.push(pos);
                            
                        }
                        current = "";
                    }
                } 
                catch (error) {}  

                // (5): test up-left direction
                try {
                    let pos = [];
                    if (word_puzzle[r-word.length+1][c-word.length+1] == word[word.length-1]) {
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r-l][c-l];
                            pos.push([r-l,c-l]);
                        }
                        if (current == word) {
                            console.log("up left match: ", word);
                            letter_positions.push(pos);
                            
                        }
                        current = "";
                    }
                } 
                catch (error) {}   

                // (8): test down-left direction
                try {
                    let pos = [];
                    if (word_puzzle[r+word.length-1][c-word.length+1] == word[word.length-1]) {
                        for (let l = 0; l < word.length; l++) {
                            current += word_puzzle[r+l][c-l];
                            pos.push([r+l,c-l]);
                        }
                        if (current == word) {
                            console.log("down left match: ", word);
                            letter_positions.push(pos);
                        }
                        current = "";
                    }
                } 
                catch (error) {}

  
            }    
        }
    }
}



function highlight() {



    setInterval(() => {
        for (let i = 0; i < letter_positions.length; i++) {
            let pos = letter_positions[i];
            let color = Math.floor(Math.random()*16777215).toString(16);
    
            for (let j = 0; j < pos.length; j++) {
                let r = pos[j][0];
                let c = pos[j][1];
                document.getElementById("wordsearchGrid").children[r].children[c].style.color = "#" + color;            
            }
        }
    }, 5000);    
}


bank();
puzzle();
usable();
// solve();
// highlight();