jest.unmock('../BoardHelper');

const BoardHelper = require('../BoardHelper');
const {UP, DOWN, LEFT, RIGHT} = require('../../AppConstants');

const SOLVED_BOARD_3x3 = [
  [0,0], [1,0], [2,0],
  [0,1], [1,1], [2,1],
  [0,2], [1,2], [2,2]
];
const SOLVED_BOARD_3x3_MOVABLE_TILES = {
  5: DOWN,
  7: RIGHT
};

const SOLVED_BOARD_4x4 = [
  [0,0], [1,0], [2,0], [3,0],
  [0,1], [1,1], [2,1], [3,1],
  [0,2], [1,2], [2,2], [3,2],
  [0,3], [1,3], [2,3], [3,3]
];
const SOLVED_BOARD_4x4_MOVABLE_TILES = {
  11: DOWN,
  14: RIGHT
};

const UNSOLVED_BOARD_4x4 = [
  [0,0], [1,0], [2,2], [2,0],
  [0,2], [0,1], [2,1], [3,0],
  [1,2], [0,3], [3,2], [3,3],
  [2,3], [3,1], [1,3], [1,1]
];
const UNSOLVED_BOARD_4x4_MOVABLE_TILES = {
  8: UP,
  1: DOWN,
  5: RIGHT,
  6: LEFT
};


describe('BoardHelper', () => {
  describe('generateSolvedBoard', () => {
    it('accurately creates a solved board', () => {
      expect(BoardHelper.generateSolvedBoard(3)).toEqual(SOLVED_BOARD_3x3);
      expect(BoardHelper.generateSolvedBoard(4)).toEqual(SOLVED_BOARD_4x4);
    });
  });
  
  describe('generateRandomBoard', () => {
    // The randomness makes this hard to test! :D
    it('creates a board of the correct dimensions', () => {
      expect(BoardHelper.generateRandomBoard(3).length).toBe(9);
      expect(BoardHelper.generateRandomBoard(6).length).toBe(36);
      expect(BoardHelper.generateRandomBoard(10).length).toBe(100);
    });
    
    it('puts each tile in its own slot', () => {
      const board = BoardHelper.generateRandomBoard(10);
      board.filter((coordinates) => {
        const instances = board.filter((tile) => tile[0] === coordinates[0] && tile[1] === coordinates[1]);
        expect(instances.length).toEqual(1);
      });
    });
  });
  
  describe('isBoardSolved', () => {
    it('returns true for solved boards', () => {
      expect(BoardHelper.isBoardSolved(SOLVED_BOARD_3x3)).toBe(true);
      expect(BoardHelper.isBoardSolved(SOLVED_BOARD_4x4)).toBe(true);
    });
    
    it('returns false for unsolved boards', () => {
      expect(BoardHelper.isBoardSolved(UNSOLVED_BOARD_4x4)).toBe(false);
    });
  });
  
  describe('moveTile', () => {
    it('returns a board with a movable tile moved', () => {
      expect(BoardHelper.moveTile(SOLVED_BOARD_3x3, 5)).toEqual([
        [0,0], [1,0], [2,0],
        [0,1], [1,1], [2,2],
        [0,2], [1,2], [2,1]
      ]);
      expect(BoardHelper.moveTile(SOLVED_BOARD_3x3, 7)).toEqual([
        [0,0], [1,0], [2,0],
        [0,1], [1,1], [2,1],
        [0,2], [2,2], [1,2]
      ]);
      expect(BoardHelper.moveTile(UNSOLVED_BOARD_4x4, 8)).toEqual([
        [0,0], [1,0], [2,2], [2,0],
        [0,2], [0,1], [2,1], [3,0],
        [1,1], [0,3], [3,2], [3,3],
        [2,3], [3,1], [1,3], [1,2]
      ]);
    });
    
    it('throws an error when you try to move an unmovable tile', () => {
      expect(() => BoardHelper.moveTile(SOLVED_BOARD_3x3, 0)).toThrow();
      expect(() => BoardHelper.moveTile(SOLVED_BOARD_4x4, 13)).toThrow();
      expect(() => BoardHelper.moveTile(UNSOLVED_BOARD_4x4, 7)).toThrow();
    });
  });
  
  describe('getTileMovableDirection', () => {
    it('returns the directional constant for the given movable tile', () => {
      expect(BoardHelper.getTileMovableDirection(SOLVED_BOARD_3x3, 5)).toBe(DOWN);
      expect(BoardHelper.getTileMovableDirection(SOLVED_BOARD_3x3, 7)).toBe(RIGHT);
      expect(BoardHelper.getTileMovableDirection(UNSOLVED_BOARD_4x4, 8)).toBe(UP);
    });
    
    it('returns null for unmovable tiles', () => {
      expect(BoardHelper.getTileMovableDirection(SOLVED_BOARD_3x3, 0)).toBeNull();
      expect(BoardHelper.getTileMovableDirection(SOLVED_BOARD_4x4, 13)).toBeNull();
      expect(BoardHelper.getTileMovableDirection(UNSOLVED_BOARD_4x4, 7)).toBeNull();
    });
  });
  
  describe('getMovableTiles', () => {
    it('returns an object with movable ids as keys and directional constants as values', () => {
      expect(BoardHelper.getMovableTiles(SOLVED_BOARD_3x3)).toEqual(SOLVED_BOARD_3x3_MOVABLE_TILES);
      expect(BoardHelper.getMovableTiles(SOLVED_BOARD_4x4)).toEqual(SOLVED_BOARD_4x4_MOVABLE_TILES);
      expect(BoardHelper.getMovableTiles(UNSOLVED_BOARD_4x4)).toEqual(UNSOLVED_BOARD_4x4_MOVABLE_TILES);
    });
  });
  
  describe('getMovableTileIds', () => {
    it('returns an array of the ids of all movable tiles', () => {
      expect(BoardHelper.getMovableTileIds(SOLVED_BOARD_3x3)).toEqual(Object.keys(SOLVED_BOARD_3x3_MOVABLE_TILES));
      expect(BoardHelper.getMovableTileIds(SOLVED_BOARD_4x4)).toEqual(Object.keys(SOLVED_BOARD_4x4_MOVABLE_TILES));
      expect(BoardHelper.getMovableTileIds(UNSOLVED_BOARD_4x4)).toEqual(Object.keys(UNSOLVED_BOARD_4x4_MOVABLE_TILES));
    });
  });
  
  describe('getShortestPath', () => {
    it('', () => {
      // TODO: Test once the algo is faster!
    });
  });
});