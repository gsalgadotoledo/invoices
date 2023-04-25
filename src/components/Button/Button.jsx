import React from 'react';
import classnames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classnames.bind(styles);

const Button = ({
  children,
  className,
  ...props
}) => (
  <button
    type="submit"
    className={cx(['Button', { 'disabled' : props.disabled }, className])} {...props}>
    {children}
  </button>
);

export default Button;
                  