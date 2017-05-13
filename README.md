# Minesweeper
Minesweeper Example on Angular

### Rules of the game:
1.	Board should be of configurable width, height and mines number.
2.	The board should support width and height of up to 300 (300x300 cells),
3.	Should display an indication of the number of remaining flags above the board.
4.	Click on cell reveals the value underneath it:

    * If it is a mine, you lose.

    * Otherwise, display the number of mines around the cell (or empty if there are no mines around)

    * If there are no mines around the cell, reveal all cells around it and and all cells around any adjacent empty cell.
5.	Shift button + Left Mouse Click puts or removes a flag on that cell. (and updates the number of remaining flags)
6.	Display alert if player tries to add a flag but he does not have any remaining flags.
7.	A flagged cell cannot be revealed (click does nothing) until the flag is removed.
8.	If all mines are flagged correctly, you win.

-Superman mode that reveals the location of the flags

### Working Example:
Here : https://yakirzana.github.io/minesweeper/
