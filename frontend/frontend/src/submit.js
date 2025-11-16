import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(state => ({
        nodes: state.nodes,
        edges: state.edges
    }));

    const handleSubmit = async () => {
        try {
            const pipelineData = {
                nodes: nodes,
                edges: edges
            };

            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            const alertMessage = `
Pipeline Analysis Results:
━━━━━━━━━━━━━━━━━━━━━━
📊 Number of Nodes: ${result.num_nodes}
🔗 Number of Edges: ${result.num_edges}
${result.is_dag ? '✅' : '❌'} Is DAG: ${result.is_dag ? 'Yes' : 'No'}

${result.is_dag 
    ? 'Your pipeline is a valid Directed Acyclic Graph!' 
    : 'Warning: Your pipeline contains cycles and is not a DAG.'}
            `.trim();

            alert(alertMessage);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`Error: Failed to submit pipeline.\n${error.message}`);
        }
    };

    const buttonStyle = {
        padding: '12px 32px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#FFFFFF',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        outline: 'none'
    };

    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: '#F9FAFB'
    };

    return (
        <div style={containerStyle}>
            <button 
                type="button" 
                onClick={handleSubmit}
                style={buttonStyle}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
            >
                Submit Pipeline
            </button>
        </div>
    );
};