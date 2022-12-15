import React from 'react';

import styles from './ImageGalleryItem.module.css';

// import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, small, large, alt, onClickModal }) => {
  return (
    <li onClick={() => onClickModal(large, alt)} key={id}>
      <img className={styles.galleryImg} src={small} alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
