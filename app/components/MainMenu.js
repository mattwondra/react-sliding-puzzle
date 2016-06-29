const Button = require('./Button');
const React = require('react');
const Select = require('./Select');
const {StyleSheet, css} = require('aphrodite');

const MainMenu = React.createClass({
  propTypes: {
    isOpen: React.PropTypes.bool.isRequired,
    onStart: React.PropTypes.func.isRequired
  },
  
  render: function() {
    return (
      <div className={css(styles.backdrop, this.props.isOpen && styles.backdrop__show)}>
        <h1 className={css(styles.heading)}>Sliding Puzzle</h1>
        <Select options={{'3x3': 3, '4x4': 4}} ref={(c) => this._select = c}/>
        <Button onClick={this.handleStartClick} style={{fontSize: '5vw'}}>
          Start
        </Button>
      </div>
    );
  },
  
  handleStartClick: function() {
    this.props.onStart({
      size: this._select.value()
    });
  }
});

const styles = StyleSheet.create({
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: '100%',
    left: 0,
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to bottom right, rgba(0,100,255, 0.9), rgba(255,123,100,0.9))',
    textAlign: 'center',
    transition: 'top 600ms ease-in-out'
  },
  backdrop__show: {
    top: 0
  },
  heading: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '12vw',
    marginBottom: '0.33em',
    textShadow: `
      0.2em 0.1em 0 rgba(0, 100, 255, 0.7),
      -0.1em 0.2em 0 rgba(56, 44, 199, 0.7),
      -0.2em -0.1em 0 rgba(113, 13, 142, 0.7),
      0.1em -0.2em 0 rgba(170, 70, 75, 0.7)
    `
  }
});

module.exports = MainMenu;