import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, config }) => {
  const {
    title,
    fields = [],
    inputs = [],
    outputs = [],
    description,
    style = {}
  } = config;

  const [fieldValues, setFieldValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    setFieldValues(initialValues);
  }, []);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({ ...prev, [fieldName]: value }));
  };

  const defaultStyle = {
    minWidth: 200,
    minHeight: 100,
    border: '2px solid #4A5568',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    ...style
  };

  const headerStyle = {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#2D3748',
    borderBottom: '1px solid #E2E8F0',
    paddingBottom: '8px'
  };

  const fieldStyle = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#4A5568'
  };

  const inputStyle = {
    padding: '6px 8px',
    border: '1px solid #CBD5E0',
    borderRadius: '6px',
    fontSize: '12px',
    outline: 'none',
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const descriptionStyle = {
    fontSize: '11px',
    color: '#718096',
    marginTop: '8px',
    fontStyle: 'italic'
  };

  return (
    <div style={defaultStyle}>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: inputs.length === 1 ? '50%' : `${((index + 1) * 100) / (inputs.length + 1)}%`,
            background: '#3B82F6',
            width: '12px',
            height: '12px',
            border: '2px solid #FFFFFF'
          }}
        />
      ))}

      <div style={headerStyle}>
        <span>{title}</span>
      </div>

      {fields.map((field, index) => (
        <div key={index} style={fieldStyle}>
          <label style={labelStyle}>
            {field.label}:
          </label>
          {field.type === 'text' && (
            <input
              type="text"
              value={fieldValues[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={inputStyle}
              placeholder={field.placeholder}
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              value={fieldValues[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }}
              placeholder={field.placeholder}
            />
          )}
          {field.type === 'select' && (
            <select
              value={fieldValues[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={selectStyle}
            >
              {field.options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {field.type === 'number' && (
            <input
              type="number"
              value={fieldValues[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={inputStyle}
              min={field.min}
              max={field.max}
              step={field.step}
            />
          )}
        </div>
      ))}

      {description && (
        <div style={descriptionStyle}>
          {description}
        </div>
      )}

      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: outputs.length === 1 ? '50%' : `${((index + 1) * 100) / (outputs.length + 1)}%`,
            background: '#10B981',
            width: '12px',
            height: '12px',
            border: '2px solid #FFFFFF'
          }}
        />
      ))}
    </div>
  );
};