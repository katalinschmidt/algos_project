import { useState } from 'react';
import './SortingVisualizer.css';
import quickSort from './SortingAlgorithms.js';
import testQuickSort from './SortingAlgorithmsTests.js';

const LENGTH_OF_ARRAY = 10;

const MIN_RANDOM_INT = 1;
const MAX_RANDOM_INT = 10;

const ANIMATION_SPEED_MS = 500;

/*
 * FIXMEs:
 * -- Highlight & remove timing
 * -- Generate new data btn click needs to stop sorts in progress
 * -- QuickSort failing test with single item in array, e.g. [[5]] -> [5] !=== 5
 * -- Animations bug "Cannot read properties of undefined (reading 'style')"
*/

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

function setBarColor(bars = [], color = "pink") {
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = color;
    }
}

function visualizeQuickSort(array) {
    const [_, animations] = quickSort(array);

    for (let i = 1; i < animations.length; i++) {
        // Get the bars currently on display
        const arrayBars = document.getElementsByClassName('array-item');
        
        const [isCompare, barOneIdx, barTwoIdx] = animations[i];
        if (isCompare) {
            // Highlight
            setTimeout(() => {
                setBarColor([arrayBars[barOneIdx], arrayBars[barTwoIdx]], "orange");
            }, i * ANIMATION_SPEED_MS);
            // Remove highlight
            setTimeout(() => {
                setBarColor([arrayBars[barOneIdx], arrayBars[barTwoIdx]], "pink");
            }, i * (ANIMATION_SPEED_MS * 1.5));
        }
        else {
            // Highlight
            setTimeout(() => {
                setBarColor([arrayBars[barOneIdx], arrayBars[barTwoIdx]], "green");
                // Change value
                const barOneValue = arrayBars[barOneIdx].textContent;
                const barTwoValue = arrayBars[barTwoIdx].textContent;
                arrayBars[barOneIdx].textContent = barTwoValue;
                arrayBars[barTwoIdx].textContent = barOneValue;
                // Change height to visualize swap
                const barOneHeight = arrayBars[barOneIdx].style.height;
                const barTwoHeight = arrayBars[barTwoIdx].style.height;
                arrayBars[barOneIdx].style.height = barTwoHeight;
                arrayBars[barTwoIdx].style.height = barOneHeight;
            }, i * ANIMATION_SPEED_MS);
            // Remove highlight
            setTimeout(() => {
                setBarColor([arrayBars[barOneIdx], arrayBars[barTwoIdx]], "pink");
            }, i * (ANIMATION_SPEED_MS * 1.5));
        }
    }
}

function SortingVisualizer() {
    // Instantiate state value & display bar graph on render
    const [array, setArray] = useState(createNewArray());

    function handleRegenerateClick() {
        setArray(createNewArray());
    }

    function handleQuickSortClick() {
        testQuickSort();
        visualizeQuickSort(array);
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
                            // height: `${(value / MAX_RANDOM_INT) * (window.innerHeight * 0.75)}px`,
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
