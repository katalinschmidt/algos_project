import { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { createNewArray } from './utils.js'
import { quickSort, mergeSort } from './SortingAlgorithms.js';
import { testQuickSort, testMergeSort } from './SortingAlgorithmsTests.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LENGTH_OF_ARRAY = 50;

const MIN_RANDOM_INT = 1;
const MAX_RANDOM_INT = 100;

const ANIMATION_SPEED_MS = 700;
const DEFAULT_BAR_COLOR = "pink";

/*
 * FIXMEs:
 * -- Generate new data btn click needs to stop sorts in progress
 * 
*/

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
        const arrayBars = document.getElementsByClassName('main-array-bar-value');
        
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

function visualizeMergeSort(array) {
    const [_, animations] = mergeSort([...array]);

    for (let i = 1; i < animations.length; i++) {
        // Get the bars currently on display
        const arrayBars = document.getElementsByClassName('main-array-bar-value');
        
        // TODO: Implement animation
    }
}

function SortingVisualizer() {
    // Instantiate state values & display bar graph & code on render
    const [array, setArray] = useState(createNewArray(LENGTH_OF_ARRAY, MIN_RANDOM_INT, MAX_RANDOM_INT));
    const [tempArray, setTempArray] = useState(createNewArray(LENGTH_OF_ARRAY, MIN_RANDOM_INT, MAX_RANDOM_INT));
    // const [tempArray, setTempArray] = useState([]);
    const [displayCode, setDisplayCode] = useState(createNewArray.toString());
    const [logMessages, setLogMessages] = useState([]);

    // Publish logs to div:
    useEffect(() => {
      const originalLog = console.log;
      console.log = function(...args) {
        setLogMessages(prevLogMessages => [args.join(' '), ...prevLogMessages]);
      };
    }, []);

    function handleRegenerateClick() {
        setArray(createNewArray(LENGTH_OF_ARRAY, MIN_RANDOM_INT, MAX_RANDOM_INT));
        setDisplayCode(createNewArray.toString());
    }

    function handleQuickSortClick() {
        testQuickSort();
        visualizeQuickSort(array);
        setDisplayCode(quickSort.toString());
    }

    function handleMergeSortClick() {
        testMergeSort();
        visualizeMergeSort(array);
        setDisplayCode(mergeSort.toString());
    }

    // Return component for rendering
    return (
        <div className="visualizer-app">
            {/* Display user controls */}
            <div className="user-controls-container">
                <button onClick={handleRegenerateClick}>Generate New Dataset</button>
                <button onClick={handleQuickSortClick}>Quick Sort</button>
                <button onClick={handleMergeSortClick}>Merge Sort</button>
            </div>
            {/* Display arrays */}
            <div className="array-container">
                <div id="main-array">
                    {/* Map each element in array to div for styling */}
                    {array.map((value, idx) => (
                        <div key={idx}>
                            <div className="main-array-bar-idx">{idx}</div>
                            <div
                                className="main-array-bar-value"
                                style={{
                                    height: `${(value / MAX_RANDOM_INT) * 100}%`,
                                    width: `calc(75vw * 0.5 / ${LENGTH_OF_ARRAY})`,
                                }}
                            >
                                <span>{value}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div id="temp-array">
                    {/* Map each element in array to div for styling */}
                    {tempArray.map((value, idx) => (
                        <div key={idx}>
                            <div className="temp-array-bar-idx">{idx}</div>
                            <div
                                className="temp-array-bar-value"
                                style={{
                                    height: `${(value / MAX_RANDOM_INT) * 100}%`,
                                    width: `calc(75vw * 0.5 / ${LENGTH_OF_ARRAY})`,
                                }}
                            >
                                <span>{value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="code-container">
                <div className="console-messages">
                    {logMessages.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))}
                </div>
                <SyntaxHighlighter language="javascript" style={dark}>
                    {displayCode}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default SortingVisualizer;
