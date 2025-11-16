import { BaseNode } from './BaseNode';

export const ValidatorNode = ({ id, data }) => {
  const config = {
    title: 'Validator',
    description: 'Validate input data',
    fields: [
      {
        name: 'validationType',
        label: 'Type',
        type: 'select',
        defaultValue: 'email',
        options: [
          { value: 'email', label: 'Email' },
          { value: 'url', label: 'URL' },
          { value: 'number', label: 'Number' },
          { value: 'required', label: 'Required' }
        ]
      }
    ],
    inputs: [{ id: 'input' }],
    outputs: [{ id: 'valid' }, { id: 'invalid' }],
    style: { backgroundColor: '#FCE7F3', borderColor: '#EC4899' }
  };

  return <BaseNode id={id} data={data} config={config} />;
};
                                        