import React from 'react';
import styles from './AppTest.module.css';

function Todo({text}) {
    return <li>{text}</li>;
}

// don't remove the export keyword here!
export const DUMMY_TODOS = [
    'Learn React',
    'Practice React',
    'Profit!'
];

// don't change the Component name "App"
export default function App() {
    return (
        <ul>
            {DUMMY_TODOS.map(todo => <Todo key={todo} text={todo}></Todo>)}
        </ul>

    )
}
