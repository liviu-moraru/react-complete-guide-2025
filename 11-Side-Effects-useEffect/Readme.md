## Modulul 11 Handling side effects & working with useEffect hook

### useEffect()

- functionalitatea useEffect() este implementata in [../supl/hooks.js](../supl/hooks.js)
- primul argument al functiei este un callback care va fi apelat **la prima randare a componentei**, chiar daca se furnizeaza o dependenta vida ([])
- callback-ul se executa dupa terminarea rularii componentei functionale, cand componenta se randeaza.
- secventa de rulare este urmatoarea:


1.  **Render Phase:** React calls your component function.
2.  **Return:** The function executes its `return` statement (returning JSX).
3.  **Commit Phase:** React updates the browser's DOM based on that JSX.
4.  **Paint:** The browser paints the changes to the screen so the user can see them.
5.  **Effect Phase:** React finally executes the `useEffect` callback function.

### Why is it designed this way?
The "Effect" in `useEffect` stands for **Side Effect**. React purposely delays these functions so they don't block the browser from rendering the UI. If the callback ran before the `return` statement, the user would have to wait for your logic (like fetching data or manual DOM manipulations) to finish before seeing anything on the screen.

### Summary
| Event | Does `useEffect` callback run? |
| :--- | :--- |
| **Component Initialization** | No |
| **Executing `return` statement** | No |
| **Updating the DOM** | No |
| **After browser paints the UI** | **Yes** |

*(Note: If you need an effect to run **before** the paint, React provides a specialized hook called `useLayoutEffect`, but even that runs after the `return` statement and DOM updates.)*

### Cand sa nu se foloseasca useEffect()

- useEffect este bine sa se foloseasca cand sunt de executat evenimente asincrone (fetch, geolocation etc.)
- evenimentele sincrone pot rula fara useEffect