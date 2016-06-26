const React = require('react');

const SimpleTile = function({id, boardSize}) {
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: `rgb(${Math.floor(255*id/(boardSize*boardSize))}, ${Math.abs(100 - Math.floor(255*id/(boardSize*boardSize)))}, ${255 - Math.floor(255*id/(boardSize*boardSize))})`,
    color: 'rgba(255,255,255,0.6)',
    font: '2vw Helvetica',
    fontWeight: 'bold'
  };
  return <div style={styles}>{id}</div>;
};

SimpleTile.propTypes = {
  id: React.PropTypes.number.isRequired,
  boardSize: React.PropTypes.number.isRequired
};

module.exports = SimpleTile;