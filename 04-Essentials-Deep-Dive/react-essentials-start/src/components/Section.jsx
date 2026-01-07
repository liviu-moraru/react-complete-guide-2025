export default function Section({ children, title, id }) {
    return (
        <section id={id}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}