// Ultra-simplified useRef implementation
let hookIndex = 0;
let componentHooks = [];
let currentComponentKey = null;

function useRefSimple(initialValue) {
    // Get hooks for current component
    if (!componentHooks[hookIndex]) {
        // First render - create ref object
        componentHooks[hookIndex] = {
            type: 'ref',
            value: { current: initialValue }
        };
    }

    const hook = componentHooks[hookIndex];
    hookIndex++;

    return hook.value;
}

function renderComponent(component, key) {
    // Setup for new render
    hookIndex = 0;
    currentComponentKey = key;

    // Call component
    const result = component();

    return result;
}

// Usage
function MyComponent() {
    const ref1 = useRefSimple('first');
    const ref2 = useRefSimple({ data: 'second' });

    console.log(`Ref1: ${ref1.current}, Ref2:`, ref2.current);

    // Mutate ref
    ref1.current = 'updated';

    return { ref1, ref2 };
}

// Simulating renders
console.log('First render:');
const instance1 = renderComponent(MyComponent, 'comp1');

console.log('\nSecond render:');
const instance2 = renderComponent(MyComponent, 'comp1'); // Same key = reuse hooks