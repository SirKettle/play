import React, { Component, PropTypes } from 'react';
import ReactTimeout from 'react-timeout';
import { connect } from 'react-redux';
import { clamp, equals, times } from 'ramda';
import * as gameActions from '../../domains/game/gameActions';
import * as gameSelectors from '../../domains/game/gameSelectors';
import * as inputActions from '../../domains/input/inputActions';
import * as inputSelectors from '../../domains/input/inputSelectors';
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
    drops: dropsSelectors.dropsSelector(state),
    keysDown: inputSelectors.keysDownCharsSelector(state)
  };
};

const mapDispatchToProps = dispatch => ({
  resetGameClock: () => { dispatch(gameActions.resetGameClock()); },
  updateGameClock: (delta) => { dispatch(gameActions.updateGameClock(delta)); },
  togglePause: () => { dispatch(gameActions.togglePause()); },
  resetDrops: () => { dispatch(dropsActions.resetDrops()); },
  addDrop: (args) => { dispatch(dropsActions.addDrop(args)); },
  onKeyUp: (event) => { dispatch(inputActions.onKeyUp(event)); },
  onKeyDown: (event) => { dispatch(inputActions.onKeyDown(event)); },
  onBlur: (event) => { dispatch(inputActions.onBlur(event)); }
});

class RainDrops extends Component {
  
  state = {
    rate: 20,
    width: 800,
    height: 500
  }

  componentWillMount() {
    this.props.resetGameClock();
    // Start the rain
    this.props.togglePause();
    // start loop
    this.requestNextFrame();
  }

  componentDidMount() {
    // console.log(this);
    window.document.addEventListener('keydown', this.props.onKeyDown);
    window.document.addEventListener('keyup', this.props.onKeyUp);
    // window.addEventListener('blur', this.props.onBlur);
  }
  
  shouldComponentUpdate(nextProps) {
    return this.shouldUpdate(nextProps);
  }
  
  componentDidUpdate(prevProps) {
    if (this.shouldUpdateGame(prevProps)) {
      this.updateGame();
    }
  }
  
  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.props.onKeyDown);
    window.document.removeEventListener('keyup', this.props.onKeyUp);
    // window.removeEventListener('blur', this.props.onBlur);
  }

  //  UTILS

  onRateChange = (event) => { this.setRate(event.target.value); }

  onCanvasClick = (event) => {
    const canvasRect = this.canvas.getBoundingClientRect();
    const xPx = event.clientX - canvasRect.x;
    const yPx = event.clientY - canvasRect.y;
    const canvasCoords = {
      x: xPx / canvasRect.width,
      y: yPx / canvasRect.height
    };
    this.props.addDrop(canvasCoords);
  }

  setRate = (rate) => {
    this.setState({ rate: clamp(0, 1000)(rate) });
  }

  shouldUpdateGame = (otherProps) => {
    if (otherProps.frameIndex !== this.props.frameIndex) {
      return true;
    }
    if (otherProps.isActive !== this.props.isActive) {
      return true;
    }
    return false;
  }

  shouldUpdate = (otherProps) => {
    if (this.shouldUpdateGame(otherProps)) {
      return true;
    }
    if (!equals(otherProps.keysDown, this.props.keysDown)) {
      return true;
    }

    return false;
  }

  canvas = null

  // STATE OF THE GAME

  requestNextFrame = () => {
    const time = Date.now();
    this.props.requestAnimationFrame(() => {
      this.props.updateGameClock(Date.now() - time);
      this.requestNextFrame();
    });
  }

  updateGame() {
    const { clock, addDrop } = this.props;
    const { delta } = clock;
    // update state of game
    times(() => {
      probDoMs(() => {
        addDrop({});
      }, delta, 1000);
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

  drawRing = (ctx, x, y, rawSize, rgba) => {
    const size = Math.max(Math.round(rawSize), 1);
    ctx.beginPath();
    ctx.arc(x, y, size, -1, Math.PI, false);
    ctx.strokeStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] * 0.5})`;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, size, 1, Math.PI, true);
    ctx.strokeStyle = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    ctx.stroke();
  }

  drawDrop = (ctx, drop) => {
    const opacity = clamp(0, 1)((drop.lifeLeft / drop.lifeSpan) * 0.65);
    const x = getPixel(drop.x, this.canvas.width);
    const y = getPixel(drop.y, this.canvas.height);
    this.drawRing(ctx, x, y, (drop.size * 0.95) - 20, [255, 255, 255, opacity * 0.75]);
    this.drawRing(ctx, x, y, drop.size, [255, 255, 255, opacity]);
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

  renderGuage = (max, val) => {
    return (
      <div className={styles.guage}>
        <div className={styles.label}>0</div>
        <div className={styles.track}>
          <div className={styles.bar} style={{ width: `${clamp(0, 100)(Math.round((val / max) * 100))}%` }} />
        </div>
        <div className={styles.label}>{max}</div>
      </div>
    );
  }

  render() {
    const { isActive, togglePause, drops } = this.props;

    const infoMarkdown = `
${isActive ? `**RDS Rate**: ${this.state.rate} (Rain drops / sec)` : 'Paused'}

**Current no**: ${drops.length}
    `;
    /* eslint jsx-a11y/no-static-element-interactions: 0 */
    return (
      <div className={styles.stage}>
        <p>
          <button onClick={togglePause}>{ isActive ? 'Pause' : 'Start' }</button>
          <button onClick={this.resetGame}>{ 'Reset' }</button>
          <input defaultValue={this.state.rate} type="range" min={0} max={250} onChange={this.onRateChange} />
        </p>
        <Content markdown={infoMarkdown} />
        { this.renderGuage(300, drops.length) }
        <FixedRatioContainer width={8} height={5}>
          <canvas
            ref={(el) => { this.canvas = el; }}
            width={this.state.width}
            height={this.state.height}
            className={styles.canvas}
            onClick={this.onCanvasClick}
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
  onKeyUp: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  // onBlur: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  frameIndex: PropTypes.number.isRequired,
  /* eslint react/forbid-prop-types: 0 */
  drops: PropTypes.arrayOf(PropTypes.object).isRequired,
  keysDown: PropTypes.arrayOf(PropTypes.string).isRequired,
  /* eslint react/forbid-prop-types: 0 */
  clock: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactTimeout(RainDrops));
