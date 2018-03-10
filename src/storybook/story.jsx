import React from 'react';
import classnames from 'classnames';
import '../css/reset.css';
import typography from '../css/typography.css';
import styles from './story.css';

const Story = ({
  title,
  summary,
  children,
  className,
  displayInfo
}) => {
  return (
    <div className={classnames(styles.story, className)}>
      {
        displayInfo &&
        (<div className={styles.info}>
          {title && (
            <h1
              className={classnames(typography.bottomMargin, typography.phil)}
            >{title}</h1>)
          }
          {summary && <p className={typography.harrison}>{summary}</p>}
        </div>)
      }
      <div className={styles.contents}>
        {children}
      </div>
    </div>
  );
};

Story.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  summary: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
  displayInfo: React.PropTypes.bool
};

Story.defaultProps = {
  className: 'some-story',
  title: null,
  summary: null,
  displayInfo: true
};

export default Story;
