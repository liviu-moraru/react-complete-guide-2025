## Modulul 8: Working with Refs & Portals

### useRef si atributul ref

- Pentru o implementare conceptuala a lui useRef, a se vedea in `/supl/useRef.js`
- useRef e intr-un fel similar cu useState, in sensul in care inregistreaza (printr-o closure) o "stare"
- in useRef aceasta stare este un obiect de forma : `{current: value}` returnat de functie.
- spre deosebire de useState, nu exista o functie care sa modifice starea. Ea e modificata prin atribuire directa la proprietatea `current`. 
- De fapt se pastreaza intre randari obiectul, deci de ex. se pot adauga proprietati noi in obiect care vor exista intre randari.
- De asemenea modificarea starii nu produce re-renderizarea componentei.
- La prima randare a componentei, `current` va fi setat la valoarea initiala.

```aiignore
const playerRef = useRef(10);
console.log(playerRef.current); // 10
```
- Dupa useRef(), playerRef.current === undefined

- Cand un element nativ html are atributul `ref`, aceasta este folosita pentru a accesa elementul DOM asociat componentei.
- Aceasta atribuire are loc **dupa prima randare** a componentei. Ea este vizibila si in interiorul functiei definite de `useEffect`

```aiignore
<input type="text" ref={playerRef} />
```
-Dupa prima randare playerRef.current === HTMLInputElement

### Componenta modala

#### Elementul HTML \<dialog>

- [Documentatia MDB](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- Elementul dialog nu apare decat daca contine atributul `open`.
  - Daca elementul contine o forma avand atributul `method="dialog"` si un buton in interior, atunci dialogul se inchide odata cu apasarea butonului
  - Butonul trebuie sa fie de tip `submit` (default) (`type="submit"`)
  - Mai precis, apasarea butonului sterge atributul `open` din elementul dialog.
```aiignore
<dialog open>
  <p>Greetings, one and all!</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```
- Deschderea/inchiderea unei ferestre modale cu elementul \dialog>

HTML:
```aiignore
<dialog>
  <button autofocus>Close</button>
  <p>This modal dialog has a groovy backdrop!</p>
</dialog>
<button>Show the dialog</button>
```

JavaScript:
```aiignore
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
```
CSS
```aiignore
::backdrop {
  background-color: salmon;
}
```
Pseudo-elementul `::backdrop` permite stilizarea fundalului modalului.

#### forwardRef
- Permite accesarea referintei la componenta copil din componenta parinte. Este util pentru comunicarea intre componente in React.
- Se foloseste cand avem de referentiat un element HTML existent intr-o componenta copil, din componenta parinte.

TimerChallenge.jsx

```aiignore
const dialog = useRef();

return (
 <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result={"lost"}
></ResultModal>
)
```
ResultModal.jsx
```aiignore
import { forwardRef } from "react";

function ResultModal({ result, targetTime }, ref) {
  return (
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
}

const ResultModalRef = forwardRef(ResultModal);
export default ResultModalRef;
```

#### Cum functioneaza forwardRef?

- O implementare conceptuala a lui forwardRef este :

```aiignore
function conceptualForwardRef(render) {
  // It returns a special object that React recognizes as a "ForwardRef" type
  return {
    $$typeof: Symbol.for('react.forward_ref'),
    render: render
  };
}
```
- Deci forwardRef intoarce un obiect cu proprietatea `render` care este o functie (o componenta functionala React)
- Cum distinge functia render intre o componenta functionala React si o referinta forward?
- functia React.createElement (inlocuita in ultimele versiuni de React cu jsx) intoarce un obiect de forma

```aiignore
{
  type: App, // This is the 'Component' we discussed!
  props: { title: "Win" },
  key: null,
  ref: someRef,
  $$typeof: Symbol.for('react.element'), // This marks it as an ELEMENT
}
```
- render apoi se uita la proprietatea `$$typeof` si urmeaza logica urmatoare:

```aiignore
function processElement(element) {
  const Component = element.type; // This is App (the function or object)
  const props = element.props;
  const ref = element.ref;

  if (Component.$$typeof === Symbol.for('react.forward_ref')) {
    // It's the object returned by forwardRef()
    return Component.render(props, ref);
  } else if (typeof Component === 'function') {
    // It's a standard function component
    return Component(props);
  }
}
```
- Deci, render observa daca `element` este o functie sau un obiect Symbol.for('react.forward_ref')
- In al doilea caz apeleaza componenta React pe care forwardRef a primit-o ca parametru, dar cu 2 argumente (props si ref)

#### useImperativeHandle

- Problema de rezolvat: Cu forwardRef, o componenta React parinte poate trimite referinta catre un element HTML dintr-o componenta React copil.
- Dar aceasta "leaga" cumva utilizarea in componenta parinte de implementarea componentei copil.
- De ex in componenta parinte trebuie sa 'stie' ca referinta este un element HTML dialog, asa ca daca implementarea componentei copil se schimba, legatura se strica

```aiignore
dialog.current.showModal();
```
- De aceea, este mai bine ca aceasta componenta copil sa defineasca o "interfata"(contract), independenta de implementarea interna, pe care componenta parinte sa o foloseasca
- Aceasta se face prin `useImperativeHandle`
- Iata o implementare conceptuala a lui useImperativeHandle:

```aiignore
function useImperativeHandle(ref, createHandle) {
  // Inside React's internal lifecycle:
  // It calls your function to get the "handle"
  const handle = createHandle();
  
  // It then assigns that handle to the ref's current property
  if (typeof ref === 'function') {
    ref(handle);
  } else if (ref) {
    ref.current = handle;
  }
}
```
- Ce se modifica fata de implementarea doar cu forwardRef:
- In componenta copil, se defineaza o referinta localata cu `const dialog = useRef();`
- Apoi se apeleaza `useImperativeHandle` cu referinta primita de la parinte, ca prim argument si functia care returneaza "interfata" (un obiect)

```aiignore
const dialog = useRef(); // Internal ref to the DOM

  useImperativeHandle(ref, () => {
    // This is the ONLY thing the parent can see
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      }
    };
  });
```
- Referinta locala se foloseste in atributul `ref` pentru componenta HTML care trebuie referentiata.

ResultModal.jsx
```aiignore
// ResultModal.jsx
const ResultModal = forwardRef(function ResultModal(props, ref) {
  const dialog = useRef(); // Internal ref to the DOM

  useImperativeHandle(ref, () => {
    // This is the ONLY thing the parent can see
    return {
      open() {
        dialog.current.showModal();
      },
      close() {
        dialog.current.close();
      }
    };
  });

  return <dialog ref={dialog}>...</dialog>;
});
```
- Cum o utilizeaza parinte?
- Parintele foloseste interfata si ii transmite componentei copil, referinta locala intoarsa de useRef()

```aiignore
// TimerChallenge.jsx
const dialog = useRef();

function handleStart() {
  // Instead of dialog.current.showModal() (Native DOM)
  // We use our custom "open" method
  dialog.current.open(); 
}

return <ResultModal ref={dialog} />;
```
