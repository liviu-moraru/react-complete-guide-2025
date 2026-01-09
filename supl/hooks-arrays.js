let _state = [];
let currentIndex = 0;// Our internal storage 📦
let isBatching = false;


function hasChanged(oldDeps, newDeps) {
    if (!oldDeps) return true;

    return oldDeps.length !== newDeps.length || oldDeps.some((dep, index) => dep !== newDeps[index]);
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

let initialArray = [1,2,3];
let history = [];
//history.push(initialArray);

// Imagine this is your React component
function MyComponent() {
    const [array, setArray] = useState(initialArray);
    const [hist, setHistory] = useState(history);

    console.log(`Current Array: ${array}. History: ${hist}`);

    // Simulate a user click
    return {
        click: () => {

            setArray(prevArray => {
                const newArray = [...prevArray];
                newArray[1] = newArray[1] + 100;
                setHistory(prevHist => {
                    return [...prevHist, prevArray]
                });
               return newArray;

            });


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
app.click();
setTimeout(() => app.click(), 1000);
//app.click();// This will trigger the re-render