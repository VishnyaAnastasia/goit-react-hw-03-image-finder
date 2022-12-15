import React from 'react';
import styles from './Searchbar.module.css';

// import PropTypes from 'prop-types';
const Searchbar = ({ onSubmit }) => {
  return (
    <header className={styles.searchbar}>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          name="input"
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={styles.button}>
          <span className={styles.buttonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
