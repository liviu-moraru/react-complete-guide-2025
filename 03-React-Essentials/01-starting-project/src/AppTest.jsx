import React from "react";

export default function App() {
    const [showWarning, setShowWarning] = React.useState(false);
    function handleDelete() {
        setShowWarning(true);
    }

    function handleProceed() {
        // Proceseaza stergerea efectiva
        setShowWarning(false);
    }

    return (
        <>
        {!showWarning && <button onClick={handleDelete}>Delete</button>}
        {showWarning && (
            <div data-testid="alert" id="alert">
                <h2>Are you sure?</h2>
                <p>These changes can't be reverted!</p>
                <button onClick={handleProceed}>Proceed</button>
            </div>
        )}
        </>
    )

}