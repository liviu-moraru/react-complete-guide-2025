## Modulul 9: Practice Project Management App

### Managementul unei stari care consta intr-o lista in React

- Lista trebuie tratate ca `imutabila`
- Astfel ca mereu trebuie creata o `shallow copy` a ei pentru a fi setata ca noua stare
- Un item din lista trebuie sa aiba proprietatea `key` care sa o identifice in mod unic
1. Adaugarea unui item

```aiignore
setProjects(prevProjects => {
  const newProject = { ...projectData, id: Math.random() };
  return [...prevProjects, newProject];
});
```
2. Stergerea unui item

```aiignore
setItems(prevItems => prevItems.filter(item => item.id !== idToRemove));
```

3. Updatarea unui item

```aiignore
setItems(prevItems => 
  prevItems.map(item => 
    item.id === idToUpdate ? { ...item, name: 'New Name' } : item
  )
);
```