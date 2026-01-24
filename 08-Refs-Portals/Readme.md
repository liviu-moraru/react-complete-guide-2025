## Modulul 8: Working with Refs & Portals

### useRef si atributul ref

- Pentru o implementare conceptuala a lui useRef, a se vedea in `/supl/useRef.js`
- useRef e intr-un fel similar cu useState, in sensul in care inregistreaza (printr-o closure) o "stare"
- in useRef aceasta stare este un obiect de forma : `{current: value}` returnat de functie.
- spre deosebire de useState, nu exista o functie care sa modifice starea. Ea e modificata prin atribuire directa la proprietatea `current`.
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
