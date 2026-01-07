## Cursul React - The Complete Guide2025 de Maximillian Scwarzmueller (Academind)

- Cursul [aici](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)
- Repo-ul cu resurse [aici](https://github.com/academind/react-complete-guide-course-resources/tree/main)
- [Documentatia oficiala React - Starting from scratch](https://react.dev/learn/build-a-react-app-from-scratch)

### Generare template cu vite

```
> cd 03-React-Essentials

# listarea templaturilor disponibile cu vite
> npm create vite@latest -- --help

Available templates:

Available templates:
vanilla-ts          vanilla
vue-ts              vue
react-ts            react
react-compiler-ts   react-compiler
react-swc-ts        react-swc
preact-ts           preact
lit-ts              lit
svelte-ts           svelte
solid-ts            solid
qwik-ts             qwik

# generarea unui template cu vite
> npm create vite@latest 01-starting-project -- --template react

# mai nou, la instalarea unui template te intreaba daca vrei sa foloseste rolldown (in stadiu experimental)

```

- Am generat proiectul 03-React-Essentials/01-starting-project folosind template-ul react si apoi raspunzand `yes` daca vreau sa folosesc rolldown

```
03-React-Essentials> npm create vite@latest 01-starting-project -- --template react
```

### Includerea imaginilor in bundle-ul de deployment

- Pentru a include imaginile in bundle-ul de deployment ele trebie importate in codul principal cu import

```
import reactImg from './assets/react-core-concepts.png';

function App() {
  return (
    ...
    <img src={reactImg} alt="Stylized atom" />
  );
}

```
Obs: In codul JSX `<img src={reactImg} alt="Stylized atom" />`, nu se pune src="{{reactImg}}". Asta ar pune o valoare string pentru src

### Sintaxe alternative pentru props

- Utilizarea operatorului spread pentru un obiect

```
export const CORE_CONCEPTS = [
    {
        image: componentsImg,
        title: 'Components',
        description:
            'The core UI building block - compose the user interface by combining multiple components.',
    },
  
];

function CoreConcept(props) {
    return (
        <li>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </li>
    );
}

function App() {
return (
    <ul>
        <CoreConcept {...CORE_CONCEPTS[0]} />
    </ul>
);

```
- Aici cheile obiectului devin chei pentru obiectul props al parametrului functiei
- Echivaleaza cu `const props = {...object}`

- O alterniva este si furnizarea unui obiect ca proprietate

```
<CoreConcept
  {...CORE_CONCEPTS[0]} />
```

- Bazandu-se pe faptul ca operatorul spread pt. un obiect in Javascript poate sa furnizeze valori default pentru cheile obiectului, se pot furniza valori default pentru props

```
export default function Button({ caption, type = "submit" }) { 
  // caption has no default value, type has a default value of "submit"
}

```

### Construire stiluri aplicabile doar unei componente cu Vite

- Se construieste un fisier cu extensia .module.css (Ex. Header.module.css)
- In acest fisier se pun stilurile aplicabile doar pentru componenta respectiva, utilizandu-se clase in loc de taguri html

```aiignore
.header {
    background-color:
}

.header img {
    height: 5rem;
    width: 10rem;
    object-fit: cover;
}

``` 
- Se importa in componenta stilurile cu import si se folosesc clasele pentru a aplica stilurile 
```
import styles from './Header.module.css';

<header className={styles.header}>
```

- Vite proceseaza astfel importuile de tip .module.css:

1. Transforma numele claselor in identificatori unici. Ex: .header => ._header_1tfqj_1

```
._header_1tfqj_1 {
    text-align: center;
    margin: 3rem 0;
}

._header_1tfqj_1 img {
    height: 5rem;
    width: 10rem;
    object-fit: cover;
}

```
2.Cand se importa un fisier .module.css (import styles from './Header.module.css'), vite (mai precis plugin-ul pe care vite il foloseste by default), creaza un obiect (ex. styles) cu proprietatile claselor din fisierul .module.css importat.

```aiignore
styles = {
  "header": "_header__123abc"
}
```
- Astfel, se poate folosi proprietatea className din componenta pentru a aplica stilurile din fisierul .module.css

```aiignore
<header className={styles.header}>
```
- In dev, vite va crea cate un link de tip style in head pentru fiecare fisier .module.css importat.
- In prod, vite va crea unul sau mai multe fisiere bundle-uri css pentru intreaga aplicatie

### Children props

- Exista o proprietate children in React care este un array cu elementele din componenta

### Pattern pentru event handler-uri

- Cand se declara o functie care va fi folosita ca handler pentru un event, este recomandat sa se foloseasca arrow function pentru a evita probleme de context (this) si pentru a face codul mai citibil
- In componenta se capteaza evenimente pe elemente din DOM. Atributele se definesc cu numele onXXX ex. onClick si trebuie sa fie functii

```aiignore
 <button onClick={onSelect}>{children}</button>
```

- Daca evenimentul trebuie captat de componenta parinete, handler-ul trebuie pasat ca parametru in functia componente

```aiignore
export default function TabButton({children, onSelect}) {

    return (
        <li>
            <button onClick={onSelect}>{children}</button>
        </li>
    )
}
```
- Apoi handler-ul este definit in componenta parinte.

App.jsx
```aiignore
function App() {
    function handleSelect(selectedButton) {
        // selectedButton => 'components', 'jsx', 'props', 'state'
        console.log(selectedButton);
    }

    return (
        <TabButton onSelect={() => handleSelect('components')}>Components</TabButton>
)
```

### useState

- A se vedea o implementare conceptuala a useState si useEffect in fisierul `supl/hooks.js`

### Randare conditiopnala

- Alternativa 1

```
return (
<>
 {!selectedTopic && <p>Please select a topic.</p>}
 {selectedTopic && (
       <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
                <code>
                   {EXAMPLES[selectedTopic].code}
                </code>
            </pre>
       </div>
 )}
 </>
```

**Observatie**: In React, statementul return trebuie sa intoarca un singur element root. 
De aceea rezultatul aici trebuie imbricat in <>...</>

- Alternativa 2
- Setarea unei variabile care sa tina continutul JSX

```
let tabContent = <p>Please select a topic.</p>;
    if (selectedTopic) {
        tabContent = (
            <div id="tab-content">
            <h3>{EXAMPLES[selectedTopic].title}</h3>
            <p>{EXAMPLES[selectedTopic].description}</p>
            <pre>
                            <code>
                            {EXAMPLES[selectedTopic].code}
                            </code>
                        </pre>
        </div>);
    }
 
 return (

 tabContent
);
```
**Observatie**: retunr ( {tabContent}) ar intoarce eroare, pentru ca return care intoare o singura variabila continand JSX nu trebuie pusa in {}.
Altfel React intelege ca trebuie sa intoarca obiectul {tabContent: tabContent}

- Daca insa return contine si fragment JSX, se pune {} 

```aiignore
return (
    <div>
        {tabContent}
    </div>
 
)
```

### Randarea listelor

- Un pattern este folosirea metodei map pentru a randa listele

```aiignore
function Todo({text}) {
    return <li>{text}</li>;
}


export const DUMMY_TODOS = [
    'Learn React',
    'Practice React',
    'Profit!'
];


export default function App() {
    return (
        <ul>
            {DUMMY_TODOS.map(todo => <Todo key={todo} text={todo}></Todo>)}
        </ul>

    )
}
```
**Observatie**: key este un atribut necesar pentru a randa listele.

### Fragment

- O componenta Fragment este un element care nu este randat in DOM,
- O componenta intoarce doar un parinte

```aiignore
return (
    <>
        <p>Hello</p>
        <p>World</p>
    </>
)
```
- Este syntactic sugar pentru <React.Fragment></React.Fragment>

```aiignore
import {Fragment, useState} from "react";

retunr (
    <Fragment>
        <p>Hello</p>
        <p>World</p>
    </Fragment>
)
```

### Splitting components

**Cand se schimba starea unei componente, doar aceasta este re-renderizata, restul componentelor nu sunt re-renderizate.**

### Patternul forwaring props

- Problema:
- Cand folosim o componenta ii furnizam diferite proprietati pe care le folosim in interiorul componentei.

```aiignore
<Section id="examples" title="Examples">
```
- In interiorul componentei putem desface proprietatile si le folosim in interiorul componentei.
- Dar putem, pe toate sau unele sa le transmitem ca atare in interior, astfel:

```aiignore
export default function Section({ title, children, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```
- Aici unele proprietati le desfacem individual (title, childrem)
- Restul, prin operatorul REST ..., le unim in obiectul props
- Apoi le desfacem in interiorul componentei section cu sintaza {...props} 

Aceasta sintaxa este tradusa in JavaScript cu:

```aiignore
React.createElement('section', { ...props }, null); 
```
- Mai nou, este tradus folosind functiile jsx sau jsxDEV(in development)
- Componenta Section de mai sus este echivalenta cu:

```aiignore
import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";

export default function Section({ children, title, ...rest }) {
    return _jsxDEV("section", {
        ...rest, // Operatorul spread rămâne valid în JS pentru obiectul de props
        children: [
            _jsxDEV("h2", {
                children: title
            }, undefined, false, {
                fileName: "src/Section.jsx",
                lineNumber: 6,
                columnNumber: 13
            }, this),
            children
        ]
    }, undefined, false, {
        fileName: "src/Section.jsx",
        lineNumber: 5,
        columnNumber: 9
    }, this);
}

```
### Pattern: Setarea dinamica a tipului componentei

- In JSX, un tag in lower case (ex: `<buttonContainer>`) este luata literal ca un element HTML (e compilat in <buttonsContainer>)
- un tag in upper case (ex: `<ButtonContainer>`) este compilata ca:

```aiignore
React.createElement(ButtonsContainer, null, null); //sau in React nou jsx
```
- Deci ButtonsContainer este considerata o variabila si evaluata. Daca evaluarea este un string,   React o trateaza ca un element HTML.
- Daca evaluarea este o functie, React o considera ca o componenta si o executa.

- Exemplu:
- In componenta Examples.jsx

```aiignore
<Tabs buttonsContainer={"menu"} buttons={
                <>
                    <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleSelect('components')}>Components</TabButton>
                    <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleSelect('jsx')}>JSX</TabButton>
                    <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleSelect('props')}>Props</TabButton>
                    <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleSelect('state')}>State</TabButton>
                </>
            }>
                {tabContent}
            </Tabs>
```

- Componenta Tabs:

```aiignore
export default function Tabs({children, buttons, buttonsContainer}) {
  const  ButtonsContainer = buttonsContainer || 'menu';
    return (
   <>
   <ButtonsContainer>
       { buttons}
   </ButtonsContainer>
       {children}
   </>
  );
}

```
- Esenta aici e linia unde se creaza o variabila in upper case care e folosita ca tag:

```
const  ButtonsContainer = buttonsContainer || 'menu';
```
- Mai simplu este sa se foloseasca direct proprietatea in upper case:

```aiignore
<Tabs ButtonsContainer={"menu"} >
```
si atunci nu mai e nevoie de linia respectiva in componenta
```
export default function Tabs({children, buttons, ButtonsContainer='menu'}) {
  //const  ButtonsContainer = buttonsContainer || 'menu';
    return (
   <>
   <ButtonsContainer>
       { buttons}
   </ButtonsContainer>
       {children}
   </>
  );
}
```