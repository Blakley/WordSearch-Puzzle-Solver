// url: https://api.razzlepuzzles.com/wordsearch

let grid = document.getElementById("wordsearchGrid").children;
let puzzle = [];
let word_bank = [];
let word_locations = []; // list of [x,y] coords that make up a word
let usable_letters = new Set();

function makeWordBank() {
    let bank = document.getElementById("words").children;
    for (let i = 0; i < bank.length; i++) {
        let word = bank[i].innerHTML;
        word_bank.push(word);
    }

    // sort by largest words first
    word_bank.sort(function(a, b){
        return b.length - a.length;
    });
}

function makePuzzle() {
    for (let i = 0; i < grid.length; i++) {
        let puzzle_rows = [];
        let row = grid[i].children;

        for (let j = 0; j < row.length; j++) {
            let cell = row[j].children[0].innerHTML;
            puzzle_rows.push(cell);
        }
        puzzle.push(puzzle_rows);
    }
}

function printPuzzle() {
    puzzle.forEach(row => {
        row.forEach(cell => {
            console.log(cell);
        });
    });
}

function findUsableLetters() {
    // store the letters that are the start of our words
    let letters = [];
    for (let i = 0; i < word_bank.length; i++)
        letters.push(word_bank[i][0]);
      
    usable_letters = [...new Set(letters)];
}

function direction(row, col, word, direction) {

    let current = ""; // word builder
    let coords = [];  // word coordinates builder
    let last_letter = word[word.length-1];
    w_len = word.length-1;

    current += word[0]; 
    coords.push([row, col]); 
    
    // check if there is enough cells in the direction to make the word
    // check if the last cell in that direction matches the last word letter

    // let right = puzzle[row][col+1];
    if (direction == "right") {
        try {
            if (puzzle[row][col+w_len] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row][col+j]; 
                    if (next_letter == word[j]) {
                        coords.push([row, col+j]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }  
            }            
        } 
        catch (error) {
            // word in this direction wasn't found
        }
    }

    // let left = puzzle[row][col-1];
    if (direction == "left") {
        try {
            if (puzzle[row][col-w_len] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row][col-j]; 
                    if (next_letter == word[j]) {
                        coords.push([row, col-j]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }
                      
            }            
        } 
        catch (error) {
            // word in this direction wasn't found
        }        
    }

    // let up = puzzle[row-1][col];
    if (direction == "up") {
        try {
            if (puzzle[row-w_len][col] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row-j][col]; 
                    if (next_letter == word[j]) {
                        coords.push([row-j, col]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }
                    
            }            
        } catch (error) {
            // word in this direction not found
        }
    }   

    // let down = puzzle[row+1][col];
    if (direction == "down") {
        try {
            if (puzzle[row+w_len][col] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row+j][col]; 
                    if (next_letter == word[j]) {
                        coords.push([row+j, col]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }    
            }            
        } 
        catch (error) {
            // word in this direction wasn't found
        }
    } 

    // let diag_up_left = puzzle[row-1][col-1];
    if (direction == "up_left") {
        try {
            if (puzzle[row-w_len][col-w_len] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row-j][col-j]; 
                    if (next_letter == word[j]) {
                        coords.push([row-j, col-j]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }
                      
            }            
        } 
        catch (error) {
            // word in this direction wasn't found
        }
    }     

    // let diag_up_right = puzzle[row-1][col+1];
    if (direction == "up_right") {
        try {
            if (puzzle[row-w_len][col+w_len] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row-j][col+j]; 
                    if (next_letter == word[j]) {
                        coords.push([row-j, col+j]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }
                      
            }            
        } 
        catch (error) {
            // word in this direction wasn't found
        }
    }  

    // let diag_down_left = puzzle[row+1][col-1];
    if (direction == "down_left") {
        try {
            if (puzzle[row+w_len][col-w_len] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row+j][col-j]; 
                    if (next_letter == word[j]) {
                        coords.push([row+j, col-j]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }
                      
            }            
        } 
        catch (error) {
            // word in this direction wasn't found
        }
    }

    // let diag_down_right= puzzle[row+1][col+1];
    if (direction == "down_right") {
        try {
            if (puzzle[row+w_len][col+w_len] == last_letter) {
                for (let j = 1; j < word.length; j++) {
                    let next_letter = puzzle[row+j][col+j]; 
                    if (next_letter == word[j]) {
                        coords.push([row+j, col+j]);
                        current += next_letter;
                    }
                    else
                        break;
                }
                if (current == word)
                    return coords;
                else {
                    // reset builders
                    current = "";
                    current += word[0];
                    coords = []; 
                    coords.push([row, col]); 
                }       
            }            
        } 
        catch (error) {
            // word in this direction wasn't found
        }
    }

    return false;
}

function checkWord(row, col, word) {    
    // (4) look at all possible directions of the letter to build given word
    // return list of tuples[x, y] (x and y are coordinates for letters in word. first coord is first letter of word)
    
    // check right
    let right = direction(row, col, word, "right");
    if (right != false)
        return right;

    // check left
    let left = direction(row, col, word, "left");
    if (left != false)
        return left;

    // check up
    let up = direction(row, col, word, "up");
    if (up != false)
        return up;

    // check down
    let down = direction(row, col, word, "down");
    if (down != false)
        return down;    

    // check up_right
    let up_right = direction(row, col, word, "up_right");
    if (up_right != false)
        return up_right;

    // check up_left
    let up_left = direction(row, col, word, "up_left");
    if (up_left != false)
        return up_left;

    // check down_right
    let down_right = direction(row, col, word, "down_right");
    if (down_right != false)
        return down_right;

    // check down_left
    let down_left = direction(row, col, word, "down_left");
    if (down_left != false)
        return down_left;        

    return false;
}

function solve() {
    let found_words = []; // list of words that no longer need to be found

    for (let i = 0; i < puzzle.length; i++) {
        let row = puzzle[i];
        for (let j = 0; j < row.length; j++) {
            // (1) for each letter (if letter the letter is the start of any of our words, ie: usable)
            let letter = row[j];
            if (!usable_letters.includes(letter))
                break;
            for (let k = 0; k < word_bank.length; k++) {
                let word = word_bank[k];
                // (2) check if the letter is the first letter of the word & we didnt find the word yet
                if (word[0] == letter && !found_words.includes(word)) {
                    // (3) if so, check if the letter's neighboring letters make up the entire word                    
                    word_coord = checkWord(i, j, word);
                    if (word_coord != false) {
                        found_words.push(word);
                        word_locations.push(word_coord);
                        console.log("found word: " + word);
                    }
                }
            }
        }
    }
}

function drawPuzzle() {
    // iterates our word bank
    // highlights a given work in the bank and highlights the cells that match that word...
    // look in the document.getElementsById("words") has a child element with a class of "wordFound" for that given word
    // after those cells are selected, the next word is given and the cycle continues
}

makeWordBank();
makePuzzle();
findUsableLetters();
// drawPuzzle();