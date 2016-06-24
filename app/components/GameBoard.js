const React = require('react');

const STYLES = {
  board: {
    width: '50vw',
    height: '50vw',
    margin: '10% auto',
    border: '1px solid black',
    position: 'relative'
  }
};

const generateSolvedBoard = (width, height) => {
  let board = [];
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      board.push([x, y]);
    }
  }
  
  return board;
};

const GameBoard = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },
  
  getDefaultProps: function() {
    return {
      width: 4,
      height: 4
    };
  },
  
  getInitialState: function() {
    return {
      board: generateSolvedBoard(this.props.width, this.props.height)
    }
  },
  
  componentDidUpdate: function() {
    if (JSON.stringify(this.state.board) == JSON.stringify(generateSolvedBoard(this.props.width, this.props.height))) {
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
            return <div onClick={() => this.handleClick(id)} style={{position: 'absolute', left: `${x/this.props.width * 100}%`, top: `${y/this.props.height * 100}%`, width: `${1/this.props.width*100}%`, height: `${1/this.props.height*100}%`, background: `rgb(${Math.floor(255*id/(this.props.width*this.props.height))}, ${Math.abs(100 - Math.floor(255*id/(this.props.width*this.props.height)))}, ${255 - Math.floor(255*id/(this.props.width*this.props.height))})`}} key={id}>{id+1}</div>
          })
        }
      </div>
    );
  },
  
  handleClick: function(id) {
    let newBoard = JSON.parse(JSON.stringify(this.state.board));
    [newBoard[id], newBoard[newBoard.length-1]] = [newBoard[newBoard.length-1], newBoard[id]];
    this.setState({board: newBoard});
  }
});

module.exports = GameBoard;