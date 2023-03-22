import { useState } from 'react';
import './SortingVisualizer.css';
import quickSort from './SortingAlgorithms.js';

// TODO: Replace hardcoding
const LENGTH_OF_ARRAY = 100;

const MIN_RANDOM_INT = 10;
const MAX_RANDOM_INT = 500;

function generateRandomIntFromRange() {
    // Allows range to start with any int and includes min & max as potential return values
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (MAX_RANDOM_INT - MIN_RANDOM_INT + 1) + MIN_RANDOM_INT)
}

function createNewArray() {
    // Instantiate the array
    // const rather than let because value is mutable, but we don't want the variable to be reassigned (like i below)
    const array = [];

    // Create an array of random ints
    for (let i = 0; i < LENGTH_OF_ARRAY; i++) {
        array.push(
            // Generate random int
            generateRandomIntFromRange()
        )
    }

    return array;
}

function SortingVisualizer() {
    // Instantiate state value & display bar graph on render
    const [array, setArray] = useState(createNewArray());

    function handleRegenerateClick() {
        setArray(createNewArray());
    }

    function handleQuickSortClick() {
        const sortedArray = quickSort([...array]);
        setArray(sortedArray);
    }

    // Return component for rendering
    return (
        <div>
            {/* Display array */}
            <div className="array-container">
                {/* Map each element in array to div for styling */}
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="array-item"
                        style={{
                            height: `${(value / MAX_RANDOM_INT) * 100}%`,
                            width: `calc(75vw * 0.75 / ${LENGTH_OF_ARRAY})`,
                        }}
                    >
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            {/* Display user controls */}
            <button onClick={handleRegenerateClick}>Generate New Dataset</button>
            <button onClick={handleQuickSortClick}>Quick Sort</button>
        </div>
    )
}

export default SortingVisualizer;
