export default function CoreConcept({image, title, description}) {
    return (
        <li>
            <img src={image} alt={title} />
            <h3>{title.toUpperCase()}</h3>
            <p>{description}</p>
        </li>
    );
}