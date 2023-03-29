export function generateRandomIntFromRange(min, max) {
    // Allows range to start with any int and includes min & max as potential return values
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function createNewArray(lengthOfArray, arrayMin, arrayMax) {
    const array = [];

    for (let i = 0; i < lengthOfArray; i++) {
        array.push(
            generateRandomIntFromRange(arrayMin, arrayMax)
        )
    }

    return array;
}
