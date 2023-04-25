import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Formik, FieldArray, getIn } from 'formik';
import * as Yup from 'yup';
import { Ring } from 'react-spinners-css';
import classnames from 'classnames/bind';
import TextField from '@/components/InputFields/TextField';
import Button from '@/components/Button/Button';
import Header from '@/components/Header/Header';
import { PRIMARY_COLOR } from '@/constants';
import {
  fetchInvoiceByIdAction,
  fetchCreateInvoiceAction,
  fetchUpdateInvoiceAction,
  swipeCurrentInvoiceAction,
  invoiceSelector
} from '@/modules/invoices';
import styles from './InvoiceForm.module.scss';

const cx = classnames.bind(styles);

const InvoiceFormValidations = Yup.object().shape({
  invoiceName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long! 50 charactes max')
    .required('Please enter an invoice name.'),
  invoiceTo: Yup.string()
    .min(2, 'Too Short!')
    .required('You forgot to fill out this!'),
  payTo: Yup.string()
    .min(2, 'Too Short!')
    .required('Oh! one more thing here ^'),
});

const calculateTotal = (values) => {
  return values.items.reduce((acc, item) => {
    const unitPrice = parseInt(item.unitPrice, 10) || 0;
    const amount = parseInt(item.amount, 10) || 0;
    return acc + unitPrice * amount;
  }, 0)
}

const InvoiceForm = () => {
  const params = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const currentInvoice = useSelector(invoiceSelector);
  const isNewRecord = !params.id;
  
  useEffect(() => {
    if (!isNewRecord) {
      dispatch(fetchInvoiceByIdAction(params.id));
    } else {
      dispatch(swipeCurrentInvoiceAction());
    }
  }, []);
  
  return (
    <>
      <Header title={`${isNewRecord ? 'Create' : 'Update'} Invoice`} />
      <div className={cx('InvoiceForm')}>
        <Formik
          enableReinitialize={true}
          initialValues={currentInvoice}
          validationSchema={InvoiceFormValidations}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(async () => {
              if (isNewRecord) {
                const {id, ...newInvoice} = values
                await dispatch(fetchCreateInvoiceAction(newInvoice));
              } else {
                await dispatch(fetchUpdateInvoiceAction(values));
              }
              setSubmitting(false);
              history('/');
            }, 1000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <div className={cx('InvoiceForm__form')}>
                <TextField
                  label="Invoice Name"
                  name="invoiceName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.invoiceName}
                  error={errors.invoiceName && touched.invoiceName && errors.invoiceName}
                  tip="Enter an invoice name, e.g January 2020 Invoice"
                />
                <div className="row">
                  <div className="col">
                    <TextField
                      type="textarea"
                      label="Invoice to:"
                      name="invoiceTo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.invoiceTo}
                      error={errors.invoiceTo && touched.invoiceTo && errors.invoiceTo}
                      tip="The company to be invoiced"
                    />
                  </div>
                  <div className="col">
                    <TextField
                      type="textarea"
                      label="Pay to:"
                      name="payTo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.payTo}
                      error={errors.payTo && touched.payTo && errors.payTo}
                      tip="Bank name, Account number, etc"
                    />
                  </div>
                </div>
                <FieldArray
                  name="items"
                  render={arrayHelpers => (
                    <table className={cx('InvoiceForm__items', 'table', 'table-borderless')}>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Description</th>
                          <th scope="col">Unit Cost/Rate</th>
                          <th scope="col">Amount</th>
                          <th scope="col" className="text-center">Total</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                      {values.items && values.items.length > 0 && (
                        values.items.map((item, index) => {
                          const itemPrice = parseInt(getIn(values, `items.${index}.unitPrice`), 10);
                          const itemAmount = parseInt(getIn(values, `items.${index}.amount`), 10);
                          const totalItem = itemAmount * itemPrice || '';

                          return (
                            <tr key={index}>
                              <th scope="row">#{index + 1}</th>
                              <td>
                                <TextField
                                  name={`items.${index}.description`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={getIn(values, `items.${index}.description`)}
                                  error={getIn(errors, `items.${index}.description`)}
                                />
                              </td>
                              <td>
                                <TextField
                                  name={`items.${index}.unitPrice`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={getIn(values, `items.${index}.unitPrice`)}
                                  error={getIn(errors, `items.${index}.unitPrice`)}
                                />
                              </td>
                              <td>
                                <TextField
                                  name={`items.${index}.amount`}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={getIn(values, `items.${index}.amount`)}
                                  error={getIn(errors, `items.${index}.amount`)}
                                />
                              </td>
                              <td className="text-center">{totalItem}</td>
                              <td>
                                <Button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="d-flex"
                                >
                                  <span className="material-icons">delete</span>
                                </Button></td>
                            </tr>
                          );
                        })
                      )}
                        <tr>
                          <td colSpan="2">
                            <Button
                              type="button"
                              onClick={() => arrayHelpers.push({})}
                            >
                              Add item
                            </Button>
                          </td>
                          <td colSpan="2" className="text-right">Amount Due (USD)</td>
                          <td className="text-center">{calculateTotal(values)}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                />
                <TextField
                  type="textarea"
                  name="notes"
                  label="Notes"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.notes}
                  error={errors.notes && touched.notes && errors.notes}
                  tip="Enter a optional note, e.g Please use a mask (▀̿Ĺ̯▀̿ ̿)"
                />
                <div className="d-flex justify-content-end">
                  <div className="center-flex mr-4 font-weight-bold">
                    <Link className={cx('InvoiceForm__link')} to="/">Back</Link>
                  </div>
                  {!isSubmitting && <Button>{isNewRecord ? 'Create' : 'Update'}</Button>}
                  {isSubmitting && <Ring color={PRIMARY_COLOR} />}
                </div>
              </div>
            </form>
          )}
        </Formik>
        {currentInvoice.state && !isNewRecord && (
          <div className={cx('InvoiceForm__state')}>
            <span className={cx('InvoiceForm__label')}>{currentInvoice.state}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default InvoiceForm;
