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

### Un alt exemplu de folosire a useEffect()

- Cand folosim useRef pentru a retine referinte catre elemente DOM, useEffect poate fi folosit pentru a adauga sau sterge evenimente de la elementele DOM.
- Aceasta es in regula, pentru ca functia argument din useEffect este executata dupa prima randare a componentei, deci dupa ce prin proprietatea ref, elementul DOM este "legat" de obiectul intors de useRef.

### Observatie: Ce se intampla cans se apasa Esc intr-o fereastra deschisa \<dialog>?

- Apasand Esc browserul va inchide fereastra modala
- Daca nu se capteaza evenimentul onClose pentru a se executa codul asociat, functionalitatea poate fi stricata
- Ex: In Modal.jsx, daca nu se capteaza onClose, argumentul open ramane true si cand se apasa din nou pe un item din sectiunea de locuri care se doresc vizitate, argumentul neschimbandu-se, functia din useEffect nu se mai executa, deci fereastra modala nu se mai deschide.

### useEffect() cu cleanup

- Cand functia argument din useEffect intoarce o functie, aceasta functie este executata inainte de randarea urmatoare a componentei, sau **cand componenta este distrusa** (cand este scoasa din DOM)

Ex: App.jsx
```aiignore
<Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
 </Modal>
```
Modal.jsx

```aiignore
<dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
 </dialog>,
```
Aici se vede ca daca open == false, copiii, daca existau in virtual DOM, sunt scosi (unmounted)
- Este cazul componentei DeleteConfirmation.jsx

DeleteConfirmation.jsx

```aiignore
useEffect(() => {
    console.log("Timer started");
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);
    return () => {
      console.log("Timer cleared");
      clearTimeout(timer);
    };
  }, []);
```
- In acest exemplu, atunci cand userul apasa pe butonul "Cancel" pana sa treaca cele 3 secunde, `handleStopRemovePlace` este executata, aceasta seteaza variabila open pe valoarea false.
- mai departe, aceasta face, ca DeleteConfirmation se fie unmounted din virtual DOM, ceea ce declaseaza functia cleanup inregistrata de useEffect, care apeleaza clearTimeout.

- A se vedea si implementarea conceptuala a lui useEffect() in [../supl/hooks.js](../supl/hooks.js)