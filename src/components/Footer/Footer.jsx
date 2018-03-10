import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Content from '../Content/Content';
import typography from '../../css/typography.css';
import styles from './Footer.css';
import * as site from '../../constants/site';

const renderers = {
  heading: args => (
    <p className={classnames(typography.smallMargins, typography.puppy)}>
      {args.children}
    </p>),
  paragraph: args => (
    <p className={classnames(typography.smallMargins, typography.hattie)}>{args.children}</p>),
  strong: args => (
    <span className={classnames(typography.smallMargins, typography.harvey)}>{args.children}</span>)
};

const markdown = `
### &copy; ${site.name} ${new Date().getUTCFullYear()}
`;

const Footer = ({
  className
}) => (
  <div className={classnames(styles.footer, className)}>
    <div className={classnames(styles.legal, className)}>
      <Content markdown={markdown} renderers={renderers} />
    </div>
  </div>
);

Footer.propTypes = {
  className: PropTypes.string
};

Footer.defaultProps = {
  className: null
};

export default Footer;
