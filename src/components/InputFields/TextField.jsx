import React from 'react';

const TextField = ({
  label,
  error,
  name,
  type = 'text',
  tip = '',
  ...restProps
}) => {

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      {type === 'textarea' && (
        <textarea
          name={name}
          id={name}
          className="form-control"
          {...restProps}
        />
      )}
      {type !== 'textarea' && (
        <input
          type={type}
          name={name}
          id={name}
          className="form-control"
          {...restProps}
        />
      )}
      {!error && tip && (
        <small className="form-text text-muted">{tip}</small>
      )}
      {error && (
        <small className="form-text text-danger">{error}</small>
      )}
    </div>
  )
};

export default TextField;
