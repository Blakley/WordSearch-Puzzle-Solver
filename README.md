# Word Search Puzzle Solver

JavaScript Word Search Puzzle Solver

## Description
The goal of a word search puzzle is to find the list of words hidden in the grid.
We discover words horizontally, vertically, diagonally, or backward. 

After coming across a puzzle online, I decided to automate the task of solving such a puzzle.
For the actual game, we are using the online word search [game.](https://api.razzlepuzzles.com/wordsearch)

While there are some optimizations I can make to speed up the finding and solving process, the script does automatically solve the puzzle.
The positions of the solved words will periodically highlight once the entire grid has been solved.
If you want to have this script run automatically, you can use a browser extension such as [Tampermonkey](https://www.tampermonkey.net/)
I've provided a working template you can use in the file named `monkey.js`

## Demo
![solver.gif](https://media.giphy.com/media/8gyucoTQRuIBB2kVVS/giphy.gif?cid=790b7611af60628540aa9ac4a41d64cb268f35153402c89d&rid=giphy.gif&ct=g)
