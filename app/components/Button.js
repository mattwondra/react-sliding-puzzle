const React = require('react');
const {StyleSheet, css} = require('aphrodite');

const Button = function(props) {
  console.log(props);
  return (
    <button {...props} type="button" className={css(styles.button)}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element)
  ])
};

const styles = StyleSheet.create({
  button: {
    border: 'none',
    background: 'rgb(45,204,156)',
    color: '#fff',
    padding: '1rem 2rem',
    margin: '0.5em',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    cursor: 'pointer',
    boxShadow: `
      0 0 0 rgba(0, 100, 255, 0.7),
      0 0 0 rgba(56, 44, 199, 0.7),
      0 0 0 rgba(113, 13, 142, 0.7),
      0 0 0 rgba(170, 70, 75, 0.7)
    `,
    transition: 'all 100ms ease-in-out',
    ':hover': {
      background: 'rgba(255,255,255,0.9)',
      color: 'rgb(45, 204, 156)',
      boxShadow: `
        0.5rem 0.3rem 0 rgba(0, 100, 255, 0.7),
        -0.3rem 0.5rem 0 rgba(56, 44, 199, 0.7),
        -0.5rem -0.3rem 0 rgba(113, 13, 142, 0.7),
        0.3rem -0.5rem 0 rgba(170, 70, 75, 0.7)
      `
    }
  }
});

module.exports = Button;