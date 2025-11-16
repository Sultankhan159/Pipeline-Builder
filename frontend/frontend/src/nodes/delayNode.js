import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const config = {
    title: 'Delay',
    description: 'Add delay to execution',
    fields: [
      {
        name: 'duration',
        label: 'Duration (ms)',
        type: 'number',
        defaultValue: 1000,
        min: 0,
        max: 10000,
        step: 100
      }
    ],
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'output' }],
    style: { backgroundColor: '#E0E7FF', borderColor: '#6366F1' }
  };

  return <BaseNode id={id} data={data} config={config} />;
};