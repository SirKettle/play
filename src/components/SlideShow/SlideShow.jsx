import React, { Component, PropTypes } from 'react';
import ReactTimeout from 'react-timeout';
import classnames from 'classnames';
import FixedRatioContainer from '../FixedRatioContainer/FixedRatioContainer';
import styles from './SlideShow.css';

class SlideShow extends Component {

  state = {
    currentIndex: 0,
    currentOpacity: 1,
    transition: false
  }

  componentWillMount() {
    this.start();
  }

  getNextIndex = () => {
    const nextIndex = this.state.currentIndex === this.props.images.length - 1
    ? 0 : this.state.currentIndex + 1;
    return nextIndex;
  }

  start = () => {
    if (this.props.images.length > 1) {
      this.props.setTimeout(this.fadeSlide, this.props.displayTime);
    }
  }

  nextSlide = () => {
    this.setState({
      currentIndex: this.getNextIndex(),
      currentOpacity: 1,
      transition: false
    });
    this.start();
  }

  fadeSlide = () => {
    this.props.setTimeout(this.nextSlide, this.props.fadeTime);
    this.setState({
      currentOpacity: 0,
      transition: true
    });
  }

  render() {
    const { className, images, fadeTime } = this.props;

    const nextImageIndex = this.state.transition
      ? this.getNextIndex() : this.state.currentIndex;

    return (
      <FixedRatioContainer
        width={9}
        height={5}
        className={classnames(styles.slideShow, className)}
      >
        <div className={styles.slides}>
          <div
            className={classnames(styles.image, styles.current)}
            style={{
              backgroundImage: `url(${images[this.state.currentIndex]})`,
              transition: `opacity ${fadeTime}ms ease-out`,
              opacity: this.state.currentOpacity
            }}
          />
          <div
            className={classnames(styles.image, styles.next)}
            style={{ backgroundImage: `url(${images[nextImageIndex]})` }}
          />
        </div>
      </FixedRatioContainer>
    );
  }
}

SlideShow.propTypes = {
  setTimeout: PropTypes.func.isRequired,
  className: PropTypes.string,
  displayTime: PropTypes.number,
  fadeTime: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

SlideShow.defaultProps = {
  className: null,
  displayTime: 5000,
  fadeTime: 1500
};

export default ReactTimeout(SlideShow);
