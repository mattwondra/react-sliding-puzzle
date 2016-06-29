const BoardHelper = require('../helpers/BoardHelper');
const React = require('react');
const TileController = require('./TileController');
const {UP, DOWN, LEFT, RIGHT} = require('../AppConstants');

const STYLES = {
  board: {
    width: '60vw',
    height: '60vw',
    maxWidth: '60vh',
    maxHeight: '60vh',
    border: '4px solid #aaa, 1px solid pink',
    position: 'relative'
  }
};

const GameBoard = React.createClass({
  getInitialState: function() {
    return this.getResetState(3);
  },
  
  getResetState: function(size) {
    return {
      board: BoardHelper.generateRandomBoard(size),
      hintTileId: undefined
    };
  },
  
  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  
  componentDidUpdate: function() {
    if (BoardHelper.isBoardSolved(this.state.board)) {
      console.log("SOLVED");
    }
  },
  
  render: function() {
    // By convention, the last slot in the board array is reserved for the empty
    // space. So when we're displaying tiles, we'll throw it out first so nothing
    // renders in that space.
    const board = this.state.board.slice(0, -1);
    return (
      <div style={STYLES.board}>
        {
          board.map((coordinates, id) =>
            <TileController
              id={id}
              coordinates={coordinates}
              boardSize={Math.sqrt(this.state.board.length)}
              movableDirection={BoardHelper.getTileMovableDirection(this.state.board, id)}
              onMove={this.moveTile}
              isHinting={id === this.state.hintTileId}
              key={id}
            />
          )
        }
      </div>
    );
  },
  
  moveTile: function(id) {
    this.setState({
      board: BoardHelper.moveTile(this.state.board, id)
    });
    this.hideHint();
  },
  
  showHint: function() {
    this.setState({
      hintTileId: BoardHelper.getShortestPath(this.state.board)[0]
    });
  },
  
  hideHint: function() {
    this.setState({
      hintTileId: undefined
    });
  },
  
  resetBoard: function(size) {
    this.setState(this.getResetState(size));
  },
  
  autoSolve: function() {
    BoardHelper.getShortestPath(this.state.board).forEach((tileId, idx) => {
      setTimeout(() => {
        this.setState({
          board: BoardHelper.moveTile(this.state.board, tileId)
        });
      }, 250 * idx);
    });
  },
  
  handleKeydown: function(evt) {
    let direction;
    switch(evt.keyCode) {
      case 37:  // left arrow
        direction = LEFT;
        break;
      case 38:  // up arrow
        direction = UP;
        break;
      case 39:  // right arrow
        direction = RIGHT;
        break;
      case 40:  // down arrow
        direction = DOWN;
        break;
      case 72:  //  H key
        this.showHint();
        break;
    }

    if (direction !== undefined) {
      let movableTiles = BoardHelper.getMovableTiles(this.state.board);
      Object.keys(movableTiles).forEach((id) => {
        if (movableTiles[id] === direction) {
          this.moveTile(id);
        }
      });
    }
  }
});

module.exports = GameBoard;