const Button = require('./Button');
const GameBoard = require('./GameBoard');
const MainMenu = require('./MainMenu');
const React = require('react');
const {StyleSheet, css} = require('aphrodite');

const SlidingPuzzle = React.createClass({
  getInitialState: function() {
    return {
      showMenu: true,
      disableControls: false
    };
  },
  
  render: function() {
    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.gamePanel)}>
          <GameBoard ref={(c) => this._gameBoard = c} />
        </div>
        <div className={css(styles.controlPanel)}>
          <Button onClick={this.handleHintClick} disabled={this.state.disableControls}>Hint</Button>
          <Button onClick={this.handleSolveClick} disabled={this.state.disableControls}>Solve</Button>
          <Button onClick={this.handleQuitClick} disabled={this.state.disableControls}>Quit</Button>
        </div>
        
        <MainMenu isOpen={this.state.showMenu} onStart={this.handleStart} />
      </div>
    );
  },
  
  handleHintClick: function() {
    this._gameBoard.showHint();
  },
  
  handleSolveClick: function() {
    this.setState({disableControls: true});
    this._gameBoard.autoSolve();
  },
  
  handleQuitClick: function() {
    // TODO: A custom modal here would be MUCH prettier
    if (confirm('Are you sure you want to give up? I believe in you!')) {
      this.setState({
        showMenu: true
      });
    }
  },
  
  handleStart: function(options) {
    this._gameBoard.resetBoard(options.size);
    this.setState({
      showMenu: false,
      disableControls: false
    });
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
  }
});

module.exports = SlidingPuzzle;