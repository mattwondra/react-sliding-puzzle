const React = require('react');
const GameBoard = require('./GameBoard');

const SlidingPuzzle = React.createClass({
  render: function() {
    return (
      <div>
        <GameBoard ref={(c) => this._gameBoard = c}/>
        <button type="button" onClick={this.showHint}>Hint</button>
      </div>
    );
  },
  
  showHint() {
    this._gameBoard.showHint();
  }
});

module.exports = SlidingPuzzle;