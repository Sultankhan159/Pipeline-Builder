import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const config = {
    title: 'Filter',
    description: 'Filter data based on conditions',
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        defaultValue: 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'greater', label: 'Greater Than' },
          { value: 'less', label: 'Less Than' }
        ]
      },
      {
        name: 'value',
        label: 'Value',
        type: 'text',
        placeholder: 'Filter value'
      }
    ],
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'output' }],
    style: { backgroundColor: '#DBEAFE', borderColor: '#2563EB' }
  };

  return <BaseNode id={id} data={data} config={config} />;
};