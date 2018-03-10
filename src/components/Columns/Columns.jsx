import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Columns.css';

const Columns = ({
  className,
  children
}) => (
  <div className={classnames(styles.columns, className)}>
    { children }
  </div>
);

Columns.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Columns.defaultProps = {
  className: null
};

export default Columns;
