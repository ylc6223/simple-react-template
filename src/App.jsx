import React from 'react';
import '@/assets/normalize.scss';
import styles from './App.module.scss';
import logo from '@/assets/logo.svg';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img src={logo} className={styles['App-logo']} alt="logo" />
        <h1> Webpack V5 + React </h1>
      </header>
    </div>
  );
}

export default App;
