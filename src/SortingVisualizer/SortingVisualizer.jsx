import React from 'react';
import { useState } from 'react';

// TODO: Replace hardcoding
const LENGTH_OF_ARRAY = 100;

function generateRandomIntFromRange(min, max) {
    // Allows range to start with any int and includes min & max as potential return values
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createNewArray() {
    // Instantiate the array
    // const rather than let because value is mutable, but we don't want the variable to be reassigned (like i below)
    const array = [];

    // Create an array of random ints
    for (let i = 0; i < LENGTH_OF_ARRAY; i++) {
        array.push(
            // Generate random int
            generateRandomIntFromRange(10, 1000)
        )
    }

    return array;
}

function SortingVisualizer() {
    // Instantiate array
    const [array, setArray] = useState(createNewArray());
    // Return component for rendering
    return (
        <div className="array-container">
            {/* Map each element in array to div for styling */}
            {array.map((value, idx) => (
                <div>
                    className="array-bar"
                    key={idx}
                    text={value}
                </div>
            ))}
            <button onClick={createNewArray()}>Generate New Dataset</button>
        </div>
    )
}

export default SortingVisualizer;
