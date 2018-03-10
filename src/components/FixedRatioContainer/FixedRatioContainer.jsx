import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './FixedRatioContainer.css';

const FixedRatioContainer = ({
  className,
  width,
  height,
  children
}) => (
  <div
    className={classnames(styles.fixedRatioContainer, className)}
    style={{ paddingTop: `${(height / width) * 100}%` }}
  >
    <div className={styles.fixedRatioContainerInner}>
      { children }
    </div>
  </div>
);

FixedRatioContainer.propTypes = {
  className: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

FixedRatioContainer.defaultProps = {
  className: null,
  image: null,
  tag: null,
  label: null
};

export default FixedRatioContainer;
