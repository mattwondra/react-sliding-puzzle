const React = require('react');
const SimpleTile = require('./SimpleTile');
const {UP, DOWN, LEFT, RIGHT} = require('../AppConstants');

const TileController = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    coordinates: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
    boardSize: React.PropTypes.number.isRequired,
    movableDirection: React.PropTypes.oneOf([UP, DOWN, LEFT, RIGHT]),
    onMove: React.PropTypes.func.isRequired
  },
  
  render: function() {
    const {id, coordinates, boardSize, movableDirection, onMove} = this.props;
    const styles = {
      position: 'absolute',
      left: `${coordinates[0]/boardSize * 100}%`,
      top: `${coordinates[1]/boardSize * 100}%`,
      width: `${1/boardSize*100}%`,
      height: `${1/boardSize*100}%`,
      transition: 'all 100ms ease-out'
    };
    return (
      <div onClick={this.handleClick} style={styles}>
        <SimpleTile {...{id, coordinates, boardSize, movableDirection}} />
      </div>
    );
  },
  
  handleClick: function() {
    if (this.props.movableDirection) {
      this.props.onMove(this.props.id);
    }
  }
});

module.exports = TileController;