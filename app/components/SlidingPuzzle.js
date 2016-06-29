const React = require('react');
const GameBoard = require('./GameBoard');
const {StyleSheet, css} = require('aphrodite');

const SlidingPuzzle = React.createClass({
  render: function() {
    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.gamePanel)}>
          <GameBoard ref={(c) => this._gameBoard = c}/>
        </div>
        <div className={css(styles.controlPanel)}>
          <button type="button" className={css(styles.button)} onClick={this.showHint}>Hint</button>
          <button type="button" className={css(styles.button)} onClick={this.showHint}>Hint</button>
          <button type="button" className={css(styles.button)} onClick={this.showHint}>Hint</button>
        </div>
      </div>
    );
  },
  
  showHint() {
    this._gameBoard.showHint();
  }
});

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    '@media (min-width: 600px)': {
      flexDirection: 'row'
    }
  },
  gamePanel: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '2rem',
    flexDirection: 'column',
    '@media (min-width: 600px)': {
      flexDirection: 'row'
    }
  },
  controlPanel: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'flex-start',
    borderTop: '2px solid #eee',
    paddingTop: '1rem',
    '@media (min-width: 600px)': {
      maxHeight: '80vw',
      flexDirection: 'column',
      borderTop: 'none',
      borderLeft: '2px solid #eee',
      paddingTop: 0,
      paddingLeft: '1rem',
    }
  },
  button: {
    border: 'none',
    background: '#eee',
    padding: '1rem',
    margin: '1rem',
    width: '20vw',
    cursor: 'pointer',
    ':hover': {
      background: 'red',
      width: '14vw',
    }
  }
  
});

module.exports = SlidingPuzzle;