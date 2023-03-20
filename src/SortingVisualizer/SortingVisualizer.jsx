import React from 'react';

// TODO: Replace hardcoding
const LENGTH_OF_ARRAY = 100;

/**
 * TODO: Describe component here
 *
 */
export default class SortingVisualizer extends React.Component {
    // Instantiate the array
    state = { array: [] }

    // Load the array when the component loads
    componentDidMount() {
        this.createNewArray(LENGTH_OF_ARRAY);
    };

    createNewArray(LENGTH_OF_ARRAY) {
        // const rather than let because value is mutable, but we don't want the variable to be reassigned (like i below)
        const array = [];
        // Create an array of random ints
        for (let i = 0; i < LENGTH_OF_ARRAY; i++) {
            array.push(
                // Generate random int
                this.generateRandomIntFromRange(10, 1000)
            )
        }
        // Update state value
        this.setState({array});
    }

    generateRandomIntFromRange(min, max) {
        // Allows range to start with any int and includes min & max as potential return values
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    render() {
        // Get array from state
        // {} syntax allows mapping manipulation below
        const {array} = this.state;
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
                <button onClick={() => this.createNewArray(LENGTH_OF_ARRAY)}>Generate New Dataset</button>
            </div>
        )
    }
}