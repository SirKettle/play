import React, { Component, PropTypes } from 'react';
import ReactTimeout from 'react-timeout';
import classnames from 'classnames';
import styles from './Game.css';
import Content from '../Content/Content';

const toFixedDecimalPlaces = (num, n = 3) => {
  return parseFloat(Math.round(num * (10 ** n)) / (10 ** n)).toFixed(n);
};

const displayTime = (ms) => {
  return toFixedDecimalPlaces(ms * 0.001, 2);
};

class Game extends Component {

  state = {
    active: false,
    clientTimestampInitial: Date.now(),
    clientTimestamp: Date.now(),
    gameTimeMs: 0,
    gameTimeMsElapsed: 0,
    frameIndex: 0,
    delta: 0
  }

  componentWillMount() {
    this.init();
  }

  start = () => {
    this.setState({ active: true });
  }

  pause = () => {
    this.setState({ active: false });
  }

  toggle = () => {
    this.setState({ active: !this.state.active });
  }

  init = () => {
    // this.props.setInterval(this.update, 100);
    this.props.requestAnimationFrame(this.update);
  }
  
  update = () => {
    const newTime = Date.now();
    const delta = newTime - this.state.clientTimestamp;
    const newState = {
      clientTimestamp: newTime,
      gameTimeMs: newTime - this.state.clientTimestampInitial,
      delta
    };
    if (this.state.active) {
      newState.frameIndex = this.state.frameIndex + 1;
      newState.gameTimeMsElapsed = this.state.gameTimeMsElapsed + delta;
    }
    this.setState(newState);
    this.props.requestAnimationFrame(this.update);
  }

  render() {
    const { className } = this.props;

    const infoMarkdown = `
### _active_: ${this.state.active.toString()}
### _gameTime Elapsed (s)_: ${displayTime(this.state.gameTimeMsElapsed)}
### _frame count_: ${this.state.frameIndex}

_clientTimestampInitial_: ${new Date(this.state.clientTimestampInitial).toUTCString()}

_clientTimestamp_: ${new Date(this.state.clientTimestamp).toUTCString()}

_gameTime (s)_: ${displayTime(this.state.gameTimeMs)}

    `;

    return (
      <div
        className={classnames(styles.Game, className)}
      >
        <div className={styles.actions}>
          <button onClick={this.toggle}>{this.state.active ? 'Pause' : 'Start'}</button>
        </div>
        <div className={styles.info}>
          <Content markdown={infoMarkdown} />
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  // setTimeout: PropTypes.func.isRequired,
  // setInterval: PropTypes.func.isRequired,
  requestAnimationFrame: PropTypes.func.isRequired,
  className: PropTypes.string
};

Game.defaultProps = {
  className: null
};

export default ReactTimeout(Game);
