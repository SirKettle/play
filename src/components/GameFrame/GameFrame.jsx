import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './GameFrame.css';
import IFrame from '../IFrame/IFrame';
import FixedRatioContainer from '../FixedRatioContainer/FixedRatioContainer';

const GameFrame = ({
  className,
  width,
  height,
  src,
  name
}) => (
  <FixedRatioContainer
    className={classnames(styles.GameFrame, className)}
    width={width}
    height={height}
  >
    <IFrame
      className={styles.iFrame}
      src={src}
      name={name}
    />
  </FixedRatioContainer>
);

GameFrame.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired
};

GameFrame.defaultProps = {
  className: null,
  name: 'Amazing game'
};

export default GameFrame;
