import React, { Component, PropTypes } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';
import { clamp, times } from 'ramda';
import * as gameActions from '../../domains/game/gameActions';
import * as gameSelectors from '../../domains/game/gameSelectors';
import * as dropsActions from '../../domains/drops/dropsActions';
import * as dropsSelectors from '../../domains/drops/dropsSelectors';
import FixedRatioContainer from '../FixedRatioContainer/FixedRatioContainer';
import Content from '../Content/Content';
import styles from './RainDrops.css';
import { probDoMs, getPixel } from '../../utils/game';

const mapStateToProps = (state) => {
  return {
    clock: gameSelectors.clockSelector(state),
    frameIndex: gameSelectors.frameIndexSelector(state),
    isActive: gameSelectors.isActiveSelector(state),
    drops: dropsSelectors.dropsSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  resetGameClock: () => { gameActions.resetGameClock(dispatch); },
  updateGameClock: () => { gameActions.updateGameClock(dispatch); },
  togglePause: () => { gameActions.togglePause(dispatch); },
  resetDrops: () => { dropsActions.resetDrops(dispatch); },
  addDrop: () => { dropsActions.addDrop(dispatch); }
});

class RainDrops extends Component {
  
  state = {
    rate: 2
  }

  componentWillMount() {
    this.props.resetGameClock();
    // start loop
    this.requestNextFrame();
  }

  shouldComponentUpdate(nextProps) {
    return this.shouldUpdate(nextProps);
  }

  componentDidUpdate(prevProps) {
    if (this.shouldUpdate(prevProps)) {
      this.updateGame();
    }
  }

  setRate = (rate) => {
    this.setState({ rate: clamp(0, 50)(rate) });
  }

  shouldUpdate = (otherProps) => {
    if (otherProps.frameIndex !== this.props.frameIndex) {
      return true;
    }
    if (otherProps.isActive !== this.props.isActive) {
      return true;
    }
    return false;
  }

  canvas = null

  // CONTROLS

  increaseRate = () => { this.setRate(this.state.rate + 1); }
  decreaseRate = () => { this.setRate(this.state.rate - 1); }

  // STATE OF THE GAME

  requestNextFrame = () => {
    this.props.requestAnimationFrame(() => {
      this.props.updateGameClock();
      this.requestNextFrame();
    });
  }

  updateGame() {
    const { clock, addDrop } = this.props;
    const { delta } = clock;
    // update state of game
    times(() => {
      probDoMs(addDrop, delta, 1);
    }, this.state.rate);
    // draw the game on canvas
    this.updateCanvas();
  }

  resetGame = () => {
    const { resetDrops, resetGameClock } = this.props;
    resetGameClock();
    resetDrops();
  }

  // RENDERING AND DRAWING

  drawDrop = (ctx, drop) => {
    const x = getPixel(drop.x, this.canvas.width);
    const y = getPixel(drop.y, this.canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, Math.round(drop.size), 0, 2 * Math.PI);
    ctx.stroke();
    const opacity = clamp(0, 1)(drop.lifeTime / 10000);
    ctx.strokeStyle = `rgba(0, 50, 100, ${opacity})`;
  }
  
  updateCanvas() {
    const { drops } = this.props;

    if (!this.canvas) {
      return;
    }
    
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    drops.forEach((drop) => {
      this.drawDrop(ctx, drop);
    });
  }

  renderPaused = () => {
    return (
      <Content className={styles.paused} markdown={'## Paused'} />
    );
  }

  render() {
    const { isActive, togglePause } = this.props;

    return (
      <div className={styles.stage}>
        <p>
          <button onClick={togglePause}>{ isActive ? 'Pause' : 'Start' }</button>
          <button onClick={this.resetGame}>{ 'Reset' }</button>
          <button onClick={this.increaseRate}>{ '+' }</button>
          <button onClick={this.decreaseRate}>{ '-' }</button>
          { isActive ? `Rate: ${this.state.rate}` : 'Paused' }
        </p>
        <FixedRatioContainer width={8} height={5}>
          <canvas
            ref={(el) => { this.canvas = el; }}
            width={800}
            height={500}
            className={styles.canvas}
          />
        </FixedRatioContainer>
      </div>
    );
  }
}

RainDrops.propTypes = {
  requestAnimationFrame: PropTypes.func.isRequired,
  resetDrops: PropTypes.func.isRequired,
  addDrop: PropTypes.func.isRequired,
  resetGameClock: PropTypes.func.isRequired,
  updateGameClock: PropTypes.func.isRequired,
  togglePause: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  frameIndex: PropTypes.number.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  drops: PropTypes.arrayOf(PropTypes.object).isRequired,
  /* eslint react/forbid-prop-types: 0 */
  clock: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactTimeout(RainDrops));
