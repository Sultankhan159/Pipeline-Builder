import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const config = {
    title: 'Transform',
    description: 'Transform data using operations',
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'reverse', label: 'Reverse' }
        ]
      }
    ],
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'output' }],
    style: { backgroundColor: '#D1FAE5', borderColor: '#10B981' }
  };

  return <BaseNode id={id} data={data} config={config} />;
};