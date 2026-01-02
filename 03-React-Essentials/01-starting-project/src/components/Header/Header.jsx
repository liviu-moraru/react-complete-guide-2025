import {CORE_CONCEPTS} from "../../data.js";

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];
import reactImg from '../../assets/react-core-concepts.png';
import styles from './Header.module.css';

function genRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
    const description = reactDescriptions[genRandomInt(2)];
    console.log(styles);
    return (
        <header className={styles.header}>
            <img src={reactImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {description} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    );
}