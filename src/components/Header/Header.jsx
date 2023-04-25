import React from 'react';
import classnames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classnames.bind(styles)

const Header = ({ title }) => (
  <h3 className={cx('Header')}>
    <span className={cx('Header__text')}>{title}</span>
  </h3>
);

export default Header;
