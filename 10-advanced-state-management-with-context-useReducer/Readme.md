## Modulul 10  Reacr'c Context API & useRecucer - Advanced State Management

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

- createContext() - creaza un obiect
