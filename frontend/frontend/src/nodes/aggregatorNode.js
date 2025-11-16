import { BaseNode } from './BaseNode';

export const AggregatorNode = ({ id, data }) => {
  const config = {
    title: 'Aggregator',
    description: 'Combine multiple inputs',
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'concat',
        options: [
          { value: 'concat', label: 'Concatenate' },
          { value: 'merge', label: 'Merge' },
          { value: 'join', label: 'Join' }
        ]
      },
      {
        name: 'separator',
        label: 'Separator',
        type: 'text',
        defaultValue: ', ',
        placeholder: 'e.g., , or space'
      }
    ],
    inputs: [{ id: 'input1' }, { id: 'input2' }, { id: 'input3' }],
    outputs: [{ id: 'output' }],
    style: { backgroundColor: '#FEE2E2', borderColor: '#EF4444' }
  };

  return <BaseNode id={id} data={data} config={config} />;
};