const BoardHelper = require('../helpers/BoardHelper');
const React = require('react');

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
      board: BoardHelper.generateSolvedBoard(this.props.size)
    }
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
          board.map(([x, y], id) => {
            return <div onClick={() => this.handleClick(id)} style={{position: 'absolute', left: `${x/this.props.size * 100}%`, top: `${y/this.props.size * 100}%`, width: `${1/this.props.size*100}%`, height: `${1/this.props.size*100}%`, background: `rgb(${Math.floor(255*id/(this.props.size*this.props.size))}, ${Math.abs(100 - Math.floor(255*id/(this.props.size*this.props.size)))}, ${255 - Math.floor(255*id/(this.props.size*this.props.size))})`}} key={id}>{id+1}</div>
          })
        }
      </div>
    );
  },
  
  handleClick: function(id) {
    this.setState({board: BoardHelper.moveTile(this.state.board, id)});
  }
});

module.exports = GameBoard;