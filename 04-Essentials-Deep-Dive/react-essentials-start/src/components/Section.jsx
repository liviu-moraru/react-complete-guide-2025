export default function Section({ children, title, ...props }) {
    console.log(props);
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

// import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
//
// export default function Section({ children, title, ...props }) {
//     return _jsxDEV("section", {
//         ...props, // Operatorul spread rămâne valid în JS pentru obiectul de props
//         children: [
//             _jsxDEV("h2", {
//                 children: title
//             }, undefined, false, {
//                 fileName: "src/Section.jsx",
//                 lineNumber: 6,
//                 columnNumber: 13
//             }, this),
//             children
//         ]
//     }, undefined, false, {
//         fileName: "src/Section.jsx",
//         lineNumber: 5,
//         columnNumber: 9
//     }, this);
// }