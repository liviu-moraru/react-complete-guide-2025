## Module 7: Debugging in React

### Componenta StrictMode

- Aceasta componenta este facuta sa "imbrace" o alta componenta X.
- In modul development, aceasta efectueaza asupra componentei X un test de stress.
- Aceasta implica randarea componentei X de doua ori, pentru a detecta eventualele "side effects" ale raandarii
- De asemenea, aceasta componenta este foarte utila pentru a detecta "memory leaks", pentru ca "efectele" inregistrate cu useEffect sunt montate odata, executat cleanup-ul inregistrat si apoi montat din nou, pentru a se asiguta ca cleanup-ul este corect.

> Why React does this
> 
> StrictMode’s double-invocation helps surface issues like:
> 
> Side effects in render (e.g., mutating global variables, calling APIs, changing module-level state).
> 
> Non-idempotent logic (code that behaves differently if run more than once).
> 
> Effects with missing/incorrect cleanup (e.g., subscriptions, timers, event listeners that accumulate).
> 
> Logic that accidentally depends on “runs only once” behavior.
> 
> If your component is “pure” (render only computes UI from props/state, effects clean up correctly), the double run won’t cause real problems—just extra dev-only logs.


- In productie (la build), componenta StrictMode este ignorata.

### React Developer Tools

- Aceasta extensie exista pentru majoritatea browserelor, cat si pentru `React Native`.  [Vezi aici](https://react.dev/learn/react-developer-tools)
- Extensia pentru Chrome [aici](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- Adauga in Development Tools al lui Chrome 2 noi taburi: Components si Profiler.