import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 250, height: 100 });

  useEffect(() => {
    const regex = /\{\{(\s*[\w_][\w\d_]*\s*)\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const extractedVars = matches.map(match => match[1].trim()).filter(v => v);
    const uniqueVars = [...new Set(extractedVars)];
    setVariables(uniqueVars);
  }, [currText]);

  useEffect(() => {
    const lines = currText.split('\n').length;
    const maxLineLength = Math.max(...currText.split('\n').map(line => line.length));
    
    const newWidth = Math.max(250, Math.min(500, maxLineLength * 8 + 50));
    const newHeight = Math.max(100, Math.min(400, lines * 25 + 80));
    
    setDimensions({ width: newWidth, height: newHeight });
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const nodeStyle = {
    width: `${dimensions.width}px`,
    minHeight: `${dimensions.height}px`,
    border: '2px solid #8B5CF6',
    borderRadius: '12px',
    padding: '16px',
    backgroundColor: '#FAF5FF',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease'
  };

  const headerStyle = {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#2D3748',
    borderBottom: '1px solid #E9D5FF',
    paddingBottom: '8px'
  };

  const textareaStyle = {
    width: '100%',
    minHeight: '60px',
    padding: '8px',
    border: '1px solid #CBD5E0',
    borderRadius: '6px',
    fontSize: '13px',
    fontFamily: 'monospace',
    outline: 'none',
    resize: 'vertical',
    backgroundColor: '#FFFFFF'
  };

  const variableLabelStyle = {
    fontSize: '10px',
    color: '#6B7280',
    marginTop: '8px',
    fontStyle: 'italic'
  };

  const handleStyle = (index) => ({
    top: variables.length === 1 ? '50%' : `${((index + 1) * 100) / (variables.length + 1)}%`,
    background: '#8B5CF6',
    width: '12px',
    height: '12px',
    border: '2px solid #FFFFFF'
  });

  return (
    <div style={nodeStyle}>
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={handleStyle(index)}
        />
      ))}

      <div style={headerStyle}>
        <span>Text</span>
      </div>

      <div>
        <label style={{ fontSize: '12px', fontWeight: '500', color: '#4A5568', display: 'block', marginBottom: '6px' }}>
          Text:
        </label>
        <textarea
          value={currText}
          onChange={handleTextChange}
          style={textareaStyle}
          placeholder="Enter text. Use {{variable_name}} for variables..."
        />
      </div>

      {variables.length > 0 && (
        <div style={variableLabelStyle}>
          Variables: {variables.join(', ')}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: '#10B981',
          width: '12px',
          height: '12px',
          border: '2px solid #FFFFFF'
        }}
      />
    </div>
  );
};