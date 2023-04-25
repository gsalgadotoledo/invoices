import React from 'react';
import classnames from 'classnames/bind';
import styles from './InvoiceItem.module.scss'

const cx = classnames.bind(styles)

const InvoiceItem = ({ title, icon, label, onClickHandler }) => {

  return (
    <div className={cx('InvoiceItem')} onClick={onClickHandler}>
      <div className={cx('InvoiceItem__image-container')}>
        <img className={cx('InvoiceItem__image')} src={icon} alt="Invoice" />
      </div>
      { label && (
          <div className={cx('InvoiceItem__label-container')}>
            <span className={cx('InvoiceItem__label')}>{label}</span>
          </div>
        )
      }
      {title && <h5 className={cx('InvoiceItem__title')}>{title}</h5>}
    </div>
  );
};

export default InvoiceItem;
