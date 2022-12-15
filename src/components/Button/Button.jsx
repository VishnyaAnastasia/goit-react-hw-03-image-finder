import React from 'react';

import styles from './Button.module.css';

// import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <section className={styles.loadMoreBox}>
      <button onClick={onClick} type="button" className={styles.loadMore}>
        Load More
      </button>
    </section>
  );
};

export default Button;
