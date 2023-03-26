import { useState } from 'react';
import './SortingVisualizer.css';
import quickSort from './SortingAlgorithms.js';
import testQuickSort from './SortingAlgorithmsTests.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LENGTH_OF_ARRAY = 50;

const MIN_RANDOM_INT = 1;
const MAX_RANDOM_INT = 100;

const ANIMATION_SPEED_MS = 300;

const DEFAULT_BAR_COLOR = "pink";

/*
 * FIXMEs:
 * -- Generate new data btn click needs to stop sorts in progress
 * -- QuickSort failing test with single item in array, e.g. [[5]] -> [5] !=== 5
*/

function generateRandomIntFromRange(min, max) {
    // Allows range to start with any int and includes min & max as potential return values
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createNewArray() {
    const array = [];

    for (let i = 0; i < LENGTH_OF_ARRAY; i++) {
        array.push(
            generateRandomIntFromRange(MIN_RANDOM_INT, MAX_RANDOM_INT)
        )
    }

    return array;
}

function setBarColor(bars = [], color = DEFAULT_BAR_COLOR) {
    for (let i = 0; i < bars.length; i++) {
        try {
            bars[i].style.backgroundColor = color;
        }
        catch (error) {
            if (error instanceof TypeError) {
                // Handling animations bug - inspected in DOM & it doesn't seem that we are actually missing a bar.
                console.log(`Caught TypeError: Failed to style ${bars[i]}.`);
            } 
            else {
                console.log("Caught exception:", error.message);
            }
        }
    }
}

function visualizeQuickSort(array) {
    const [_, animations] = quickSort([...array]);

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
                setBarColor([arrayBars[barOneIdx], arrayBars[barTwoIdx]], DEFAULT_BAR_COLOR);
            }, i * ANIMATION_SPEED_MS + 100);
        }
        else {
            setTimeout(() => {
                // Highlight
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
            setTimeout(() => {
                // Remove highlight
                setBarColor([arrayBars[barOneIdx], arrayBars[barTwoIdx]], DEFAULT_BAR_COLOR);
            }, i * ANIMATION_SPEED_MS + 100);
        }
    }
}

function SortingVisualizer() {
    // Instantiate state values & display bar graph & code on render
    const [array, setArray] = useState(createNewArray());
    const [displayCode, setDisplayCode] = useState(createNewArray.toString());
    
    function handleRegenerateClick() {
        setArray(createNewArray());
        setDisplayCode(createNewArray.toString());
    }

    function handleQuickSortClick() {
        // testQuickSort();
        visualizeQuickSort(array);
        setDisplayCode(quickSort.toString());
    }

    // Return component for rendering
    return (
        <div className="visualizer-app">
            {/* Display user controls */}
            <div className="user-controls-container">
                <button onClick={handleRegenerateClick}>Generate New Dataset</button>
                <button onClick={handleQuickSortClick}>Quick Sort</button>
            </div>
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
                            width: `calc(75vw * 0.5 / ${LENGTH_OF_ARRAY})`,
                        }}
                    >
                        <span>{value}</span>
                    </div>
                ))}
            </div>
            <div className="code-container">
                <SyntaxHighlighter language="javascript" style={dark}>
                    {displayCode}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default SortingVisualizer;
