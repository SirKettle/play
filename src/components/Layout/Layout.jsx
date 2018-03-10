import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Connected as Navigation } from '../../containers/Navigation/Navigation';
import Footer from '../Footer/Footer';
import styles from './Layout.css';

const Layout = ({
  className,
  children
}) => (
  <div className={classnames(styles.layout, className)}>
    <div className={styles.header}>
      ShowCase
    </div>
    <Navigation className={styles.nav} />
    <div className={styles.content}>
      { children }
    </div>
    <div className={styles.border} />
    <Footer className={styles.footer} />
  </div>
);

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Layout.defaultProps = {
  className: null
};

export default Layout;
