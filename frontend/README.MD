# VectorShift Frontend - Pipeline Builder

A modern React-based visual pipeline builder with drag-and-drop functionality, dynamic node creation, and real-time backend integration.

---

## 🎨 Features

### Part 1: Node Abstraction ✅
- **BaseNode Component**: Reusable abstraction for all node types
- **9 Node Types**: Input, Output, LLM, Text, Filter, Transform, Aggregator, Delay, Validator
- **Easy Extension**: Add new nodes with simple configuration objects

### Part 2: Modern Styling ✅
- **Gradient Toolbar**: Purple gradient header with node palette
- **Color-Coded Nodes**: Each node type has unique colors
- **Professional Design**: Rounded corners, shadows, smooth animations
- **Responsive Layout**: Works on different screen sizes

### Part 3: Text Node Logic ✅
- **Dynamic Sizing**: Node grows/shrinks based on content
- **Variable Detection**: Automatically creates handles for `{{variable}}` patterns
- **Real-time Updates**: Instant feedback as you type

### Part 4: Backend Integration ✅
- **RESTful Communication**: POST requests to backend API
- **DAG Validation**: Real-time cycle detection
- **User-Friendly Alerts**: Beautiful result display

---

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm
- Backend server running on `http://localhost:8000`

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Application opens at:**
   ```
   http://localhost:3000
   ```

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "reactflow": "^11.8.3",
  "zustand": "^4.4.1",
  "react-scripts": "5.0.1"
}
```

---

## 🏗️ Project Structure

```
frontend/src/
├── nodes/
│   ├── BaseNode.js          # Reusable node abstraction
│   ├── inputNode.js         # Input node component
│   ├── outputNode.js        # Output node component
│   ├── llmNode.js           # LLM node component
│   ├── textNode.js          # Text node with variables
│   ├── filterNode.js        # Filter node
│   ├── transformNode.js     # Transform node
│   ├── aggregatorNode.js    # Aggregator node
│   ├── delayNode.js         # Delay node
│   └── validatorNode.js     # Validator node
├── App.js                   # Main application component
├── ui.js                    # ReactFlow canvas
├── toolbar.js               # Node palette toolbar
├── draggableNode.js         # Draggable node component
├── submit.js                # Submit button with API call
├── store.js                 # Zustand state management
├── index.js                 # Entry point
└── index.css                # Global styles
```

---

## 🎯 Usage Guide

### Creating a Pipeline

1. **Drag Nodes** from the toolbar to canvas
2. **Connect Nodes** by dragging from output handle to input handle
3. **Configure Nodes** by editing fields inside each node
4. **Submit Pipeline** to analyze with backend

### Using Text Node Variables

Type in the Text node:
```
Hello {{name}}, welcome to {{city}}!
```

**Result:**
- Two input handles appear (for `name` and `city`)
- Node automatically resizes
- Variables displayed below text input

### Valid Variable Patterns

✅ **Valid:**
- `{{name}}`
- `{{user_id}}`
- `{{firstName}}`
- `{{ email }}` (spaces allowed)

❌ **Invalid:**
- `{{123name}}` (starts with number)
- `{{user-name}}` (hyphens not allowed)
- `{name}` (single brackets)

---

## 🎨 Node Types

| Node | Color | Inputs | Outputs | Description |
|------|-------|--------|---------|-------------|
| Input | Blue | 0 | 1 | Data input source |
| Output | Yellow | 1 | 0 | Data output destination |
| LLM | Purple | 2 | 1 | Language model processing |
| Text | Violet | Dynamic | 1 | Text with variables |
| Filter | Blue | 1 | 1 | Data filtering |
| Transform | Green | 1 | 1 | Data transformation |
| Aggregator | Red | 3 | 1 | Combine multiple inputs |
| Delay | Indigo | 1 | 1 | Add execution delay |
| Validator | Pink | 1 | 2 | Validate data |

---

## 🔧 Creating Custom Nodes

### Using BaseNode Abstraction

```javascript
import { BaseNode } from './BaseNode';

export const CustomNode = ({ id, data }) => {
  const config = {
    title: 'Custom Node',
    description: 'My custom node description',
    fields: [
      {
        name: 'fieldName',
        label: 'Field Label',
        type: 'text', // or 'select', 'number', 'textarea'
        defaultValue: 'default',
        placeholder: 'Enter value...'
      }
    ],
    inputs: [{ id: 'input1' }],
    outputs: [{ id: 'output1' }],
    style: { 
      backgroundColor: '#F0F9FF', 
      borderColor: '#3B82F6' 
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};
```

### Field Types

- **text**: Single-line text input
- **textarea**: Multi-line text input
- **select**: Dropdown with options
- **number**: Number input with min/max/step

---

## 📡 API Integration

### Submit Pipeline

When clicking Submit, the frontend sends:

```javascript
{
  "nodes": [
    {
      "id": "customInput-1",
      "type": "customInput",
      "position": {"x": 100, "y": 100},
      "data": {...}
    }
  ],
  "edges": [
    {
      "source": "customInput-1",
      "target": "text-1",
      "id": "reactflow__edge-..."
    }
  ]
}
```

Backend responds:
```javascript
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

---

## 🎨 Styling System

### Color Palette

```css
Primary Purple: #667eea - #764ba2 (gradient)
Input Nodes: #F0F9FF (blue)
Output Nodes: #FEF3C7 (yellow)
LLM Nodes: #F3E8FF (purple)
Text Nodes: #FAF5FF (violet)
```

### Node Styling

All nodes follow consistent design:
- Border radius: 12px
- Shadow: 0 4px 6px rgba(0,0,0,0.1)
- Border width: 2px
- Padding: 16px

### Handle Styling

- Input handles: Blue (#3B82F6)
- Output handles: Green (#10B981)
- Size: 12px × 12px
- Border: 2px solid white

---

## 🔄 State Management

Uses Zustand for global state:

```javascript
const { nodes, edges, addNode, onConnect } = useStore();
```

### Store Actions

- `getNodeID(type)`: Generate unique node ID
- `addNode(node)`: Add node to canvas
- `onNodesChange(changes)`: Handle node updates
- `onEdgesChange(changes)`: Handle edge updates
- `onConnect(connection)`: Create new connection
- `updateNodeField(id, field, value)`: Update node data

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Drag all 9 node types to canvas
- [ ] Connect nodes with edges
- [ ] Type `{{var}}` in Text node - handles appear
- [ ] Type long text - node expands
- [ ] Click Submit - alert shows results
- [ ] Create cycle - alert shows "not a DAG"
- [ ] Check console - no errors

### Test Scenarios

**Scenario 1: Variable Detection**
```
Input: "Hello {{name}}"
Expected: 1 handle appears, variable shown
```

**Scenario 2: Dynamic Sizing**
```
Input: Type 5 lines of text
Expected: Node height increases
```

**Scenario 3: DAG Validation**
```
Input: A → B → C (no cycle)
Expected: Alert shows "Is DAG: Yes"
```

---

## 🐛 Troubleshooting

### Issue: Nodes not appearing
**Solution:** Check browser console for import errors

### Issue: Can't connect nodes
**Solution:** Make sure handles are visible (check node definitions)

### Issue: Submit button not working
**Solution:** 
1. Verify backend is running
2. Check browser console for CORS errors
3. Verify fetch URL is correct

### Issue: Text node not resizing
**Solution:** Clear browser cache and reload

### Issue: Variables not detected
**Solution:** Use valid format `{{variable_name}}`

---

## 🎬 Demo Flow

1. **Open Application**
   - See toolbar with 9 node types
   - Empty canvas with grid background

2. **Create Pipeline**
   - Drag Input node
   - Drag Text node
   - Drag Output node
   - Connect them

3. **Add Variables**
   - Click in Text node
   - Type: `Process {{data}} with {{method}}`
   - See 2 handles appear

4. **Submit**
   - Click Submit Pipeline button
   - See alert with analysis

---

## 🚀 Performance

- **Rendering**: Optimized with React.memo
- **State Updates**: Minimal re-renders with Zustand
- **Canvas**: Hardware-accelerated with ReactFlow
- **Handles**: Dynamic positioning with CSS transforms

---

## 🔐 Security

- No sensitive data stored in frontend
- All validation done on backend
- CORS-compliant requests
- Input sanitization for node fields

---

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🎓 Key Concepts

### ReactFlow
- Canvas library for node-based UIs
- Handles drag-and-drop automatically
- Built-in zoom, pan, minimap

### Zustand
- Lightweight state management
- No boilerplate like Redux
- Hook-based API

### Component Abstraction
- BaseNode eliminates code duplication
- Config-driven node creation
- Easy to maintain and extend

---

## 📚 Resources

- [ReactFlow Documentation](https://reactflow.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [FastAPI Integration Guide](https://fastapi.tiangolo.com/)

---

## 🎯 Assessment Completion

### Part 1: Node Abstraction ✅
- BaseNode created
- 5 new nodes implemented
- All nodes refactored

### Part 2: Styling ✅
- Modern design system
- Color-coded nodes
- Professional UI/UX

### Part 3: Text Node Logic ✅
- Dynamic width/height
- Variable detection
- Dynamic handles

### Part 4: Backend Integration ✅
- API communication
- DAG detection
- User alerts

---

## 🤝 Contributing

To add a new node:

1. Create new file in `src/nodes/`
2. Use BaseNode abstraction
3. Add to `nodeTypes` in `ui.js`
4. Add to toolbar in `toolbar.js`

---

## 📝 Scripts

```bash
npm start        # Start development server
npm build        # Build for production
npm test         # Run tests
npm eject        # Eject from Create React App
```

---

## 👤 Author

VectorShift Technical Assessment

---

## 📞 Support

For issues:
- Check browser console
- Verify backend is running
- Review network tab in DevTools

---

**Last Updated:** November 2024

**Status:** ✅ Production Ready