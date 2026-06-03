import React from 'react';

const FormField = ({ label, name, type = 'text', value, onChange, placeholder, options, fullWidth }) => {
  const isTextArea = type === 'textarea';
  const isSelect = type === 'select';

  return (
    <div className={`form-field ${fullWidth ? 'full-width' : ''}`}>
      {label && <label htmlFor={name}>{label}</label>}
      
      {isTextArea ? (
        <textarea
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
        />
      ) : isSelect ? (
        <select id={name} name={name} value={value || ''} onChange={onChange}>
          <option value="">Seleziona...</option>
          {options && options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
