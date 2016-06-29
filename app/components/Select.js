const React = require('react');
const {StyleSheet, css} = require('aphrodite');

const Select = React.createClass({
  propTypes: {
    options: React.PropTypes.object
  },
  
  render: function() {
    return (
      <div className={css(styles.wrapper)}>
        <div className={css(styles.arrow)}></div>
        <select {...this.props} className={css(styles.select)} ref={(c) => this._select = c}>
          {Object.keys(this.props.options).map((key) => 
            <option key={key} value={this.props.options[key]}>{key}</option>
          )}
        </select>
      </div>
    );
  },
  
  value: function() {
    return this._select.value;
  }
});

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    width: '20vw',
    background: '#fff',
    position: 'relative',
    fontSize: '6vw',
  },
  select: {
    border: 'none',
    background: 'transparent',
    width: '130%',
    display: 'block',
    fontSize: '6vw',
    fontWeight: 'bold',
    color: 'rgb(45,204,156)',
    textIndent: '0.2em',
    position: 'relative'
  },
  arrow: {
    border: '0.2em solid transparent',
    borderTop: '0.25em solid rgb(45,204,156)',
    position: 'absolute',
    right: '0.2em',
    top: '45%'
  }
});

module.exports = Select;