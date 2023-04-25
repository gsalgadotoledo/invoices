import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Ring } from 'react-spinners-css';
import classnames from 'classnames/bind';
import InvoiceItem from '@/components/InvoiceItem/InvoiceItem';
import fileBlackIcon from '@/assets/file-black-icon.svg'
import plusIcon from '@/assets/plus-icon.svg'
import Header from '@/components/Header/Header';
import {
  fetchInvoiceAction,
  invoiceListSelector,
  invoiceStatusSelector,
} from '@/modules/invoices';
import { PRIMARY_COLOR } from '@/constants';
import styles from './InvoiceList.module.scss';

const cx = classnames.bind(styles)

const InvoiceList = () => {

  const invoiceList = useSelector(invoiceListSelector);
  const invoiceStatus = useSelector(invoiceStatusSelector);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoiceAction());
  }, []);

  return (
    <>
      <Header title="Your Invoices" />
      {invoiceStatus === 'loading' && (
        <div className={cx('center-flex')}>
          <Ring size={180} color={PRIMARY_COLOR} />
        </div>
      )}
      {invoiceStatus !== 'loading' && (<div className={cx('InvoiceList')}>
        {invoiceList.map((invoice) => (
          <div key={invoice.id} className={cx('InvoiceList__item')}>
            <InvoiceItem
              onClickHandler={() => {
                history(`/update-invoice/${invoice.id}`);
              }}
              title={invoice.invoiceName}
              label={invoice.state}
              icon={fileBlackIcon}
            />
          </div>
        ))}
        <div className={cx('InvoiceList__item')}>
          <InvoiceItem onClickHandler={() => {
            history(`/create-invoice`);
          }} icon={plusIcon} />
        </div>
      </div>)}
    </>
  );
};

export default InvoiceList;
