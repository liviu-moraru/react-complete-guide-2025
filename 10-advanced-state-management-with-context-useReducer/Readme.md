## Modulul 10  React Context API & useReducer - Advanced State Management

**Problema**: 
- Daca avem mai multe componente care trebuie sa se integreze cu o singura stare si starea si handlerele trebuie sa se transmita in adancime catre o componenta care nu este un descendent direct al componentei ce geestioneaza starea
- Clasis acea stare trebuie trimise "la vale" catre componenta care o utilizeaza.
- La fel, daca un eveniment e generat in componenta copil, dar procesat in componenta care gestioneaza starea, handlerul trebuie pasat din nou "la vale" catre componenta copil
- Aceasta implica mult cod de umplutura si destul de neelegant.

### Solutia 1: Component Composition

- Componenta copil imbricata in componenta parinte, astfel ca sa fie vizibila din componenta principala.

In App.jsx
```aiignore
<Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
</Shop>
```
- Aici am "ridicat" componenta Product in componenta Shop pentru a fi vizibila in componenta principala (App).

### Solutia 2 - React's Context API

- Solutia este o aplicare a patternului "Provider/Consumer". 
- In structura ierarhica de componente, componentele care trebuie sa se integreze cu starea sunt "Provider" si componentele care le utilizeaza sunt "Consumer".
- Contextul este un obiect care contine starea si handlerele necesare pentru a gestiona starea.
- Provider-ul este componenta care furnizeaza contextul si Consumer-ul este componenta care utilizeaza contextul.
- Contextul este folosit pentru a transmite starea si handlerele in adancime in structura ierarhica de componente, fara a fi nevoie sa se transmita explicit prin props.
- Un exemplu de utilizare pe [situl oficial React](https://react.dev/learn/passing-data-deeply-with-context)

LevelContext.jsx
```aiignore
import { createContext } from 'react';

export const LevelContext = createContext(0);
```
Section.jsx

```aiignore
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
```
Section functioneaza atat ca un Provider (pentru ca contine componenta \<LevelContext>, cat si ca un Consumer (pentru ca citeste contextul prin useContext).

Headings.jsx

```aiignore
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Heading({ children }) {
  const level = useContext(LevelContext);
  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}

```

App.jsx

```aiignore
mport Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section>
      <Heading>Title</Heading>
      <Section>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Heading>Heading</Heading>
        <Section>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Heading>Sub-heading</Heading>
          <Section>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
            <Heading>Sub-sub-heading</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}

```

Header functioneaza doar ca un Consumenr, citind valoarea primei componente parinte (adica a celui mai direct ascendent) de tip LevelContext. Citirea se face prin useContext.

### Cum este implementat?

- createContext() - creaza un obiect, care creaza 2 componente specifice: Provider si Consumer.
- modelul este acela al unei subscrieri. Cand Providerul primeste o noua valoare, el notifica pe toti cei care s-au abonat, astfel ca acestia sa se re-randeze.
- o implementare conceptuala simplificata ar fi:

```aiignore
function createContext(defaultValue) {
  // A set of update functions to notify subscribers
  const subscribers = new Set();
  let currentValue = defaultValue;

  return {
    // The Provider component logic
    Provider: ({ value, children }) => {
      // If the value changes, we notify everyone on the list
      if (value !== currentValue) {
        currentValue = value;
        subscribers.forEach((callback) => callback(currentValue));
      }
      return children;
    },

    // The logic used by useContext() or Consumer
    _subscribe: (callback) => {
      subscribers.add(callback);
      // Return an unsubscribe function to prevent memory leaks
      return () => subscribers.delete(callback);
    },

    _getCurrentValue: () => currentValue,
  };
}

```
- useContext() - este un Consumer, care primeste prop value a celui mai direct ascendent Provider.
- [Sursa React Fiber](https://github.com/facebook/react/blob/f765f022534958bcf49120bf23bc1aa665e8f651/packages/react-reconciler/src/ReactFiber.js)

- Cum se navigheaza prin arborele de Fiber nodes in subarborele unui Provider?
- Functia `propagateContextChange` navigheaza prin arborele de Fiber nodes folosind recursivitatea.
- [Sursa aici](https://github.com/facebook/react/blob/f765f022534958bcf49120bf23bc1aa665e8f651/packages/react-reconciler/src/ReactFiberNewContext.js)

Funcția `propagateContextChange` joacă un rol crucial în mecanismul de actualizare a componentelor care consumă context în React, fiind direct legată de procesul de reconciliere a arborelui de Fiber nodes.

Iată legătura principală între această funcție și procesul de randare:

### 1. Detecția Schimbării de Context
Când un `Context.Provider` primește o valoare nouă (`value` prop se schimbă), React trebuie să identifice rapid toate componentele descendente care "ascultă" (consumă) acel context pentru a le marca pentru re-randare. Aceasta este sarcina funcției `propagateContextChange`.

### 2. Navigarea în Arborele Fiber
Spre deosebire de fluxul normal de randare (care este de sus în jos, componentă cu componentă), `propagateContextChange` pornește de la Fiber-ul corespunzător Provider-ului și parcurge recursiv sub-arborele de Fiber nodes. Ea caută nodurile care au o dependență înregistrată de acel context specific (verificând câmpul `dependencies` al fiecărui Fiber).

### 3. Marcarea nodurilor pentru "Bypass" de optimizare
React folosește optimizări precum `shouldComponentUpdate` sau `React.memo` pentru a sări peste randarea componentelor ale căror props nu s-au schimbat. Totuși, dacă un context se schimbă, componentele consumatoare **trebuie** să se re-randeze chiar dacă props-urile lor au rămas identice.
*   `propagateContextChange` marchează nodurile consumatoare (și toți părinții lor până la rădăcină) cu un flag de prioritate (update lane).
*   Acest lucru îi spune algoritmului de reconciliere: *"Chiar dacă această componentă pare că nu are nevoie de update conform props-urilor, trebuie să o vizitezi și să o re-randezi pentru că s-a schimbat contextul"*.

### 4. Eficiența
În loc să declanșeze o re-randare completă și necondiționată a întregului sub-arbore (ceea ce ar fi costisitor), `propagateContextChange` permite React să fie selectiv. Doar componentele care au apelat `useContext(MyContext)` sau `Context.Consumer` vor fi efectiv re-procesate, asigurând astfel performanța procesului de randare.

### Sumar
În esență, `propagateContextChange` este "mesagerul" care străbate infrastructura de Fiber nodes pentru a invalida cache-ul de randare al consumatorilor atunci când datele din context devin învechite. Fără această funcție, React nu ar ști ce componente adânc imbricate trebuie actualizate atunci când un Provider de la un nivel superior își schimbă valoarea.

### useReducer

- Problema: Centralizarea managementului starii.
- Solutie:
- Se centralizeaza managementul starii intr-o singura functie (reducer).
- Aceasta in functie de un parametru(action), intoarce o noua stare, functie de vechea stare(trimisa ca prim parametru)
- In general parametrul action este un obiect cu 2 proprietati:
- type: tipul actiunii care se executa
- payload: datele care se transmit cu actiunea
- Avand acest reducer, o alta functie (dispacher) se poate folosi pentru a trimite actiunile la reducer (dispatch(action))
- Hook-ul useReducer seteaza o stare initiala, implementeaza un dispatcher pentru schimbarea starii si intoarce un array continand:
- starea actuala
- dispatcher-ul pentru schimbarea starii

- O implementare simplificata a lui useReducer ar fi:

```javascript
import { useState } from 'react';

/**
 * A conceptual implementation of useReducer using useState.
 * 
 * @param {Function} reducer - (state, action) => newState
 * @param {any} initialArg - The initial state value or argument
 * @param {Function} [init] - Optional initializer function
 * @returns {[any, Function]} - [state, dispatch]
 */
function useMyReducer(reducer, initialArg, init) {
  // 1. Initialize state (optionally using the init function)
  const [state, setState] = useState(init ? init(initialArg) : initialArg);

  // 2. Define the dispatch function
  function dispatch(action) {
    // 3. Update state by passing the current state and action to the reducer
    setState((prevState) => reducer(prevState, action));
  }

  // 4. Return the state and the dispatch function
  return [state, dispatch];
}
```
- A se vedea un exemplu de utilizare [aici](../supl/useReducer.js)
