import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './ImageButton.css';

const ImageButton = ({
  onClick,
  className,
  imageClassName,
  imageSrc,
  imageAlt
}) => (
  <button
    className={classnames(styles.imageButton, className)}
    onClick={onClick}
  >
    <img
      className={classnames(styles.image, imageClassName)}
      src={imageSrc}
      alt={imageAlt}
    />
  </button>
);

ImageButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string
};

ImageButton.defaultProps = {
  onClick: () => {},
  className: 'image-button',
  imageClassName: 'image',
  imageSrc: null,
  imageAlt: 'image button'
};

export default ImageButton;
