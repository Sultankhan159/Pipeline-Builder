import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const toolbarStyle = {
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderBottom: '2px solid #E5E7EB',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    };

    const titleStyle = {
        color: '#FFFFFF',
        fontSize: '20px',
        fontWeight: '700',
        marginBottom: '16px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    };

    const nodesContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px'
    };

    return (
        <div style={toolbarStyle}>
            <div style={titleStyle}>Pipeline Builder</div>
            <div style={nodesContainerStyle}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='aggregator' label='Aggregator' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='validator' label='Validator' />
            </div>
        </div>
    );
};