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