import React from 'react';
import styles from './Loader.module.css';

import { InfinitySpin } from 'react-loader-spinner';

// import PropTypes from 'prop-types';
const Loader = () => {
  return (
    <div className={styles.loaderSpam}>
      <InfinitySpin width="200" color="white" />
    </div>
  );
};
export default Loader;
