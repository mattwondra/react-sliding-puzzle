/**
 * BoardHelper is a helper object containing pure function to assess and
 * manipulate the state of any given board. Most functions accept a `board`
 * parameter, which is an array containing [x, y] coordinates for corresponding
 * tiles on the board ([0,0] is the top left position). By convention, the last
 * array element is reserved for the board's blank tile.
 *
 * Another approach could be to make a "class" object that holds a board's state,
 * but this makes testing more complicated than a pure object, and using standard
 * React hooks is just simpler with a plain old JavaScript array/object representing
 * system state. However, if a board's definition became more complex, an 
 * abstraction like this _could_ make sense.
 */
 
// TODO: Consider looking into expensive functions and memoizing.

const {UP, DOWN, LEFT, RIGHT} = require('../AppConstants');
 
const BoardHelper = {
  /**
   * Create a square `size` x `size` dimension board in the solved state.
   */
  generateSolvedBoard: (size) => {
    // TODO: memoize?
    let board = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        board.push([x, y]);
      }
    }
    return board;
  },
  
  /**
   * Create a square `size` x `size` dimension board in a randomized state
   */
  generateRandomBoard: (size) => {
    let board = BoardHelper.generateSolvedBoard(size);
    // Keep track of the tile moved on the last turn, so we can avoid randomly
    // flipping the same tile back and forth over and over
    let lastMovedTileId;
    
    for (let i = 0; i < 30; i++) {
      // Get all possible moves, _except_ the tile we last moved
      let movableTileIds = BoardHelper.getMovableTileIds(board).filter((id) => id !== lastMovedTileId);
      // Randomly pick one of the remaining tiles and move it
      let tileToMove = movableTileIds[Math.floor(Math.random()*movableTileIds.length)];
      board = BoardHelper.moveTile(board, tileToMove);
      lastMovedTileId = tileToMove;
    }
    
    return board;
  },
  
  /**
   * Check if the given board array is solved, and return true or false.
   */
  isBoardSolved: (board) => {
    return JSON.stringify(board) == JSON.stringify(BoardHelper.generateSolvedBoard(Math.sqrt(board.length)));
  },
  
  /**
   * Take a board array and the tile you want to move, and return a board with
   * that tile moved.
   */
  moveTile: (board, tileId) => {
    if (BoardHelper.getTileMovableDirection(board, tileId) === null) {
      throw new Error(`The tile at ${JSON.stringify(board[tileId])} can't be moved.`);
    }
    
    // Clone board so we don't modify the reference passed in
    let newBoard = JSON.parse(JSON.stringify(board));
    const blankTileId = newBoard.length - 1;
    // Use destructuring assignment to swap the blank tile with the selected one
    // without a swap variable! Hooray ES6! :)
    [newBoard[tileId], newBoard[blankTileId]] = [newBoard[blankTileId], newBoard[tileId]];
    return newBoard;
  },
  
  getTileMovableDirection: (board, tileId) => {
    const emptyTile = board[board.length - 1];
    const tile = board[tileId];
    
    // TODO: Would a `switch` be cleaner?
    if (tile[0] === emptyTile[0]) {
      if (tile[1] + 1 === emptyTile[1]) {
        return DOWN;
      }
      if (tile[1] - 1 === emptyTile[1]) {
        return UP;
      }
    }
    if (tile[1] === emptyTile[1]) {
      if (tile[0] + 1 === emptyTile[0]) {
        return RIGHT;
      }
      if (tile[0] - 1 === emptyTile[0]) {
        return LEFT;
      }
    }
    
    return null;
  },
  
  getMovableTiles: (board) => {
    return board.reduce((movableTiles, tile, id) => {
      let direction = BoardHelper.getTileMovableDirection(board, id);
      if (direction !== null) {
        movableTiles[id] = direction;
      }
      return movableTiles;
    }, {});
  },
  
  getMovableTileIds: (board) => {
    return Object.keys(BoardHelper.getMovableTiles(board));
  },
  
  /**
   * Given a board, return an array of tileIds that represents the fewest moves
   * required to reach a solution.
   */
  getShortestPath: (board) => {
    // TODO: This takes much longer than it could when you are multiple moves 
    // away. Need to figure out how to make this more efficient. Ideas:
    // * Look for a different algorithm (breadth first maybe not best?)
    // * Search from solved to unsolved instead (go backwards)
    // * Go from both directions — solved back and unsolved forwards — and somehow meet in the middle
    let queue = [{board, path: []}];
    let checkedBoards = {};

    while(queue.length > 0) {
      let {board: curBoard, path: curPath} = queue.shift();
      if (BoardHelper.isBoardSolved(curBoard)) {
        return curPath;
      }
      checkedBoards[JSON.stringify(curBoard)]  = true;
      BoardHelper.getMovableTileIds(curBoard).forEach((tileId) => {
        const nextBoard = BoardHelper.moveTile(curBoard, tileId);
        if (!checkedBoards.hasOwnProperty(JSON.stringify(nextBoard))) {
          queue.push({board: nextBoard, path: curPath.concat(parseInt(tileId))});
        }
      });
    }
  },
  
  
};

module.exports = BoardHelper;