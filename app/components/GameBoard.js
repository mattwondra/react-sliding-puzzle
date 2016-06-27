const BoardHelper = require('../helpers/BoardHelper');
const React = require('react');
const TileController = require('./TileController');
const {UP, DOWN, LEFT, RIGHT} = require('../AppConstants');

const STYLES = {
  board: {
    width: '80vh',
    height: '80vh',
    margin: '5% auto',
    border: '1px solid black',
    position: 'relative'
  }
};

const GameBoard = React.createClass({
  propTypes: {
    size: React.PropTypes.number
  },
  
  getDefaultProps: function() {
    return { 
      size: 4
    };
  },
  
  getInitialState: function() {
    return {
      board: BoardHelper.generateRandomBoard(this.props.size),
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
              boardSize={this.props.size}
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
  
  showHint() {
    this.setState({
      hintTileId: BoardHelper.getShortestPath(this.state.board)[0]
    });
  },
  
  hideHint() {
    this.setState({
      hintTileId: undefined
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