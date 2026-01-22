## Modulul 6: Styling in React

- La importurile de stiluri prin `import "./Header.css";`, vite pune toate stilurile global:
- in dev, separat ca link-uri in headerul html, in prod, integrate in bundle-ul css

### Inline style

- Inline style este o alternativă la importuri de stiluri externe, în care se specifică stilurile direct în componentele React folosind proprietatea `style`. Aceasta oferă flexibilitatea de a aplica stiluri diferite în funcție de state-ul componentei sau a datelor primite ca props.
- Intr-un element React, atributul `style` acceptă un obiect cu proprietăți de stil.
- Ex:

```aiignore
<p
   style={{
      color: "green",
      textAlign: "left",
    }}
>
```

- Un avantaj al inline styling este ca foarte usor se pot aplica stiluri conditional.

```
 <input
    type="email"
     style={{
         backgroundColor: emailNotValid ? "#fed2d2" : "#d1d5db",
      }}
           
/>
```

### Aplicarea conditionala a unei clase

```aiignore
<input
            type="email"
            className={emailNotValid ? "invalid" : undefined}
/>
```
Obs: Pt. a nu se aplica clasa, valoarea lui className trebuie sa fie `undefined`.

- Cand trebuie aplicate mai multe clase, de preferat utilizarea **template literals**

```aiignore
<label className={`label ${emailNotValid ? "invalid" : ""}`}>
```
### CSS Modules. Construire stiluri aplicabile doar unei componente cu Vite

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

### Styled components

- Styled components este o librarie care permite crearea de componente cu stiluri integrate.
- [Documentatie](https://styled-components.com/)
- Sintaxa foloseste `tagged templates` (o caracteristica JavaScript). Vezi articol [MDN aici](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
- O implementare conceptuala este in acest repo in folderul [../supl/styled-components](../supl/styled-components).
- A se vedea in fisierul App.jsx din exemplu.
- styled.div este echivalent cu styled('div') din acest exemplu
- Exemplu de utilizare styled-components:

```aiignore
import { styled } from "styled-components";

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
```
- Se creaza o componenta (div in acest caz) si o clasa cu nume generat aleator.

```aiignore
<div class="sc-beySbL fdvMKt">
    <p class="paragraph">
        ...
     </p>
</div>

```
- Iar in headerul paginii se injecteaza **dinamic** un stil:

```aiignore
<style data-styled="active" data-styled-version="6.3.8">.fdvMKt{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:1.5rem;}</style>
```

### Transient props in styled components

- Un styled component injecteaza proprietatile primite ca props catre componenta nativa pe care o imbricheaza

Ex: const Label = styled.label`
...
`
catre label-ul interior

( In implementarea conceptuala din supl/styled-components/App.jsx:
```aiignore
// Remove className from props to avoid duplication
const { className: _, ...restProps } = props;

      return React.createElement(tag, {
        ...restProps,
        className: finalClassName,
      });
```

)

- Deci daca componenta styled primeste un prop cu un nume care nu e adecvat componentei native (ex. prop invalid pentru <label> ), se genereaza warning-uri in consola).
- De aceea in implementarea styled componetelor, s-a introdus facilitatea ca, daca numele prop-ului primit de componenta incepe cu $, aceasta nu e transmisa mai departe componentei native:

Ex:
```aiignore
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $invalid }) => ($invalid ? "red" : "green")};
`;


export default function CustomInput({ label, invalid, ...props }) {
  return (
    <p>
      <Label $invalid={invalid}>{label}</Label>
      
    </p>
  );
}
```

### Injectarea unei expresii intr-un styled component

- Cum o styled component foloseste `tagged templates` pentru a crea un stil, se pot folosi expresii JavaScript intr-un styled component.
- Exemplu:

```aiignore
const Label = styled.label`
  ...
  color: ${({ $invalid }) => ($invalid ? "red" : "green")};
`;
```
- Aici in atributul color se foloseste o expresie (cu sintaxa ${}).
- Daca expresia este o functie(ca in acest caz), argumentul primit de componenta la randare este props (obiectul continand proprietatile transmise componentei)
- In exemplul dat, props a fost destructurat in variabila $invalid.
- atributul va avea valoarea intoarsa de functia { $invalid }) => ($invalid ? "red" : "green")

### Nesting in styled components

- In interiorul stylului unui styled component, se poate folosi nesting pentru a crea stiluri complexe.
- Caracterul &  este un placeholder pentru selectorul componentei curente (adică selectorul pe care îl generează styled-components)
- Ex:

```aiignore
const StyledHeader = styled.header`
  
  & img {
    object-fit: contain;
    margin-bottom: 2rem;
    width: 11rem;
    height: 11rem;
  }
  & h1 {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.4em;
    text-align: center;
    text-transform: uppercase;
    color: #9a3412;
    font-family: "Pacifico", cursive;
    margin: 0;
  }
  & p {
    text-align: center;
    /*color: #a39191;*/
    color: red;
    margin: 0;
  }
  @media (min-width: 768px) {
    margin-bottom: 4rem;
    & h1 {
      font-size: 2.25rem;
    }
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </StyledHeader>
  );
}

```
- Astfel se poate crea un stil complex, cuprinzand si stiluri pentru elementele copil ale componentei styled.