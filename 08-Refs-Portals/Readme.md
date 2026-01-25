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