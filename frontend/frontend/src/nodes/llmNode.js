import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    description: 'Large Language Model node',
    inputs: [
      { id: 'system' },
      { id: 'prompt' }
    ],
    outputs: [{ id: 'response' }],
    style: { backgroundColor: '#F3E8FF', borderColor: '#A855F7' }
  };

  return <BaseNode id={id} data={data} config={config} />;
};