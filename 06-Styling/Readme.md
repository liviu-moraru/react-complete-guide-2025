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