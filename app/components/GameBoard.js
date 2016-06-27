const BoardHelper = require('../helpers/BoardHelper');
const React = require('react');
const TileController = require('./TileController');

const STYLES = {
  board: {
    width: '40vw',
    height: '40vw',
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
      board: BoardHelper.generateSolvedBoard(this.props.size),
      hintTileId: undefined
    };
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
  }
});

module.exports = GameBoard;