import quickSort from './SortingAlgorithms.js';


function generateRandomIntFromRange(min, max) {
    // Allows range to start with any int and includes min & max as potential return values
    // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) {
        return false;
    }

    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }

    return true;
  }

function generateTestingArrays() {
    const allTestingArrays = [];

    // Generate 100 test arrays
    for (let i = 0; i < 100; i++) {
        const testArray = [];
        const arrayLength = generateRandomIntFromRange(1, 100);
        for (let i = 0; i < arrayLength; i++) {
            testArray.push(generateRandomIntFromRange(-1000, 1000));
        }
        allTestingArrays.push(testArray);
    }

    return allTestingArrays;
}

function testQuickSort() {
    const allTestingArrays = generateTestingArrays();

    for (let i = 0; i < allTestingArrays.length; i++) {
        const javaScriptSortedArray = allTestingArrays[i].slice().sort((a, b) => a - b);
        const [quickSortedArray, _] = quickSort(allTestingArrays[i].slice());
        console.assert(arraysAreEqual(javaScriptSortedArray, quickSortedArray) === true, "Expected arraysAreEqual() to return True for quickSort");  
    }
}

export default testQuickSort;
