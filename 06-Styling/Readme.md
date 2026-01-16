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