let _state = [];
let currentIndex = 0;// Our internal storage 📦
let isBatching = false;


function hasChanged(oldDeps, newDeps) {
    if (!oldDeps) return true;

    return oldDeps.length !== newDeps.length || oldDeps.some((dep, index) => dep !== newDeps[index]);
}

function useEffect(callback, dependencies) {
    const index = currentIndex++;
    const oldDeps = _state[index]?.dependencies;

    const changed = hasChanged(oldDeps, dependencies);

    if (changed) {
        if (_state[index]?.cleanup) {
            _state[index].cleanup();
        }
        const cleanup = callback();
        _state[index] = {
            dependencies,
            cleanup
        }
    }
}
function useState(initialValue) {
    const index = currentIndex++;
    _state[index] = _state[index] === undefined ? initialValue : _state[index];

    const setState = (newValue) => {
        if (typeof newValue === "function") {
            _state[index] = newValue(_state[index]);
        } else {
            _state[index] = newValue;
        }

        if (!isBatching) {
            isBatching = true;

            queueMicrotask(() => {
                render();
                isBatching = false;
            });
        }

    };

    return [_state[index], setState];
}

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return state + (action.payload ? action.payload : 1);
        case "decrement":
            return state - (action.payload ? action.payload : 1);
        default:
            throw new Error();
    }
}

function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);
    function dispatch(action) {
        // 3. Update state by passing the current state and action to the reducer
        setState((prevState) => reducer(prevState, action));
    }
    return [state, dispatch];
}
// Imagine this is your React component
function MyComponent() {
    const [count, dispatch] = useReducer(reducer, 0);
    const [name, setName] = useState("React");

    console.log(`Current Count: ${count}. Name: ${name}`);
    useEffect(() => {
        console.log(`Effect: Name has changed: ${name}`);
        return () => console.log("Cleanup");
    }, [name]);


    // Simulate a user click
    return {
        click: () => {

            // La randare valoarea 3. Corect
            dispatch({type: "increment"});
            dispatch({type: "increment"});
            dispatch({type: "increment", payload: 2});
            dispatch({type: "decrement", payload: 3});

            // La randare valoarea 1. Gresit
            // setCount(count + 1);
            // setCount(count + 1);
            // setCount(count + 1);

            setName("ReactX");
        }
    };
}

// A basic "Render" loop
function render() {
    currentIndex = 0;
    const component = MyComponent();
    return component;
}

// Let's run it!
const app = render();
app.click(); // This will trigger the re-render