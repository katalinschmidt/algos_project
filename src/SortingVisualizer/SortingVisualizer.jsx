import { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { createNewArray } from './utils.js'
import { quickSort, mergeSort, bubbleSort } from './SortingAlgorithms.js';
import { testSortFunction } from './SortingAlgorithmsTests.js';
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
 * -- Idx border highlighting is pushing user control buttons
*/

function setBarColor(bars = [], color = DEFAULT_BAR_COLOR) {
    for (let i = 0; i < bars.length; i++) {
        try {
            bars[i].style.backgroundColor = color;
        }
        catch (error) {
            console.error("Caught exception:", error.message);
        }
    }
}


function highlightBarIndex(bars = [], color = "none") {
    for (let i = 0; i < bars.length; i++) {
        try {
            bars[i].style.border = color;
        }
        catch (error) {
            console.error("Caught exception:", error.message);
        }
    }
}


function renderLogMessage(logMessage) {
    const consoleMessages = document.getElementsByClassName('console-messages')[0];
    const newDiv = document.createElement('div');
    newDiv.textContent = logMessage;
    consoleMessages.insertBefore(newDiv, consoleMessages.firstChild);
}


function visualizeQuickSort(array) {
    const [_, animations] = quickSort([...array]);

    for (let i = 1; i < animations.length; i++) {
        // Get the bars currently on display
        const mainArrayBarValues = document.getElementsByClassName('main-array-bar-value');
        const mainArrayBarIdxs = document.getElementsByClassName('main-array-bar-idx');

        if (animations[i].isCompare) {
            if (animations[i].isIdx) {
                setTimeout(() => {
                    renderLogMessage(animations[i].logMessage);
                    // Highlight bar index
                    highlightBarIndex([mainArrayBarIdxs[animations[i].barOneIdx], mainArrayBarIdxs[animations[i].barTwoIdx]], "2px solid orange")
                }, i * ANIMATION_SPEED_MS);
                setTimeout(() => {
                    // Remove highlight
                    highlightBarIndex([mainArrayBarIdxs[animations[i].barOneIdx], mainArrayBarIdxs[animations[i].barTwoIdx]])
                }, i * ANIMATION_SPEED_MS + 100);
            }
            else {
                setTimeout(() => {
                    renderLogMessage(animations[i].logMessage);
                    // Highlight bar value
                    setBarColor([mainArrayBarValues[animations[i].barOneIdx], mainArrayBarValues[animations[i].barTwoIdx]], "orange");
                }, i * ANIMATION_SPEED_MS);
                setTimeout(() => {
                    // Remove highlight
                    setBarColor([mainArrayBarValues[animations[i].barOneIdx], mainArrayBarValues[animations[i].barTwoIdx]]);
                }, i * ANIMATION_SPEED_MS + 100);
            }
        }
        else {
            setTimeout(() => {
                renderLogMessage(animations[i].logMessage);
                // Highlight swap values
                setBarColor([mainArrayBarValues[animations[i].barOneIdx], mainArrayBarValues[animations[i].barTwoIdx]], "green");
                // Change value
                const barOneValue = mainArrayBarValues[animations[i].barOneIdx].textContent;
                const barTwoValue = mainArrayBarValues[animations[i].barTwoIdx].textContent;
                mainArrayBarValues[animations[i].barOneIdx].textContent = barTwoValue;
                mainArrayBarValues[animations[i].barTwoIdx].textContent = barOneValue;
                // Change height to visualize swap
                const barOneHeight = mainArrayBarValues[animations[i].barOneIdx].style.height;
                const barTwoHeight = mainArrayBarValues[animations[i].barTwoIdx].style.height;
                mainArrayBarValues[animations[i].barOneIdx].style.height = barTwoHeight;
                mainArrayBarValues[animations[i].barTwoIdx].style.height = barOneHeight;
            }, i * ANIMATION_SPEED_MS);
            setTimeout(() => {
                // Remove highlight
                setBarColor([mainArrayBarValues[animations[i].barOneIdx], mainArrayBarValues[animations[i].barTwoIdx]]);
            }, i * ANIMATION_SPEED_MS + 100);
        }
    }
}

function visualizeMergeSort(array) {
    const [_, animations] = mergeSort([...array]);

    for (let i = 1; i < animations.length; i++) {
        // Get the bars currently on display
        const mainArrayBarValues = document.getElementsByClassName('main-array-bar-value');
        
        // TODO: Implement animation
    }
}

function visualizeBubbleSort(array) {
    const [_, animations] = bubbleSort([...array]);

    for (let i = 1; i < animations.length; i++) {
        // Get the bars currently on display
        const mainArrayBarValues = document.getElementsByClassName('main-array-bar-value');

        // TODO: Implement animation
    }
}

function SortingVisualizer() {
    // Instantiate state values & display bar graph & code on render
    const [array, setArray] = useState(createNewArray(LENGTH_OF_ARRAY, MIN_RANDOM_INT, MAX_RANDOM_INT));
    const [tempArray, setTempArray] = useState([]);
    const [displayCode, setDisplayCode] = useState(createNewArray.toString());

    function handleRegenerateClick() {
        setArray(createNewArray(LENGTH_OF_ARRAY, MIN_RANDOM_INT, MAX_RANDOM_INT));
        setDisplayCode(createNewArray.toString());
    }

    function handleQuickSortClick() {
        // testSortFunction(quickSort);
        visualizeQuickSort(array);
        setDisplayCode(quickSort.toString());
    }

    function handleMergeSortClick() {
        testSortFunction(mergeSort);
        visualizeMergeSort(array);
        setDisplayCode(mergeSort.toString());
    }

    function handleBubbleSortClick() {
        testSortFunction(bubbleSort);
        visualizeBubbleSort(array);
        setDisplayCode(bubbleSort.toString());
    }

    // Return component for rendering
    return (
        <div className="visualizer-app">
            {/* Display user controls */}
            <div className="user-controls-container">
                <button onClick={handleRegenerateClick}>Generate New Dataset</button>
                <button onClick={handleQuickSortClick}>Quick Sort</button>
                <button onClick={handleMergeSortClick}>Merge Sort</button>
                <button onClick={handleBubbleSortClick}>Bubble Sort</button>
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
                    {/* Populated dynamically by renderLogMessage() */}
                </div>
                <SyntaxHighlighter language="javascript" style={dark}>
                    {displayCode}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}

export default SortingVisualizer;
