import React from 'react';
import FormField from './FormField';

const DynamicForm = ({ fields, formData, onInputChange }) => {
  return (
    <div className="dynamic-form">
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={formData[field.name]}
          onChange={(e) => onInputChange(field.name, e.target.value)}
        />
      ))}
    </div>
  );
};

export default DynamicForm;
