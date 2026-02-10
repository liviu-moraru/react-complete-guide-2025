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