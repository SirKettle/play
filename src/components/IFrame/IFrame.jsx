import React, { PropTypes } from 'react';

const IFrame = ({
  className,
  src,
  name,
  width,
  height,
  scrollable
}) => (
  <iframe
    className={className}
    name={name}
    src={src}
    width={width}
    height={height}
    frameBorder="0"
    scrolling={scrollable ? 'yes' : 'no'}
  >
    <p>Your browser does not support iframes.</p>
  </iframe>
);

IFrame.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  scrollable: PropTypes.bool
};

IFrame.defaultProps = {
  className: null,
  width: undefined,
  height: undefined,
  scrollable: false
};

export default IFrame;
