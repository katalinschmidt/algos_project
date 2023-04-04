import { quickSort, mergeSort, bubbleSort } from './SortingAlgorithms.js';
import { generateRandomIntFromRange, createNewArray } from './utils.js'

const NUM_TESTING_ARRAYS = 100;

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

    for (let i = 0; i < NUM_TESTING_ARRAYS; i++) {
        const arrayLength = generateRandomIntFromRange(1, 100);
        allTestingArrays.push(
            createNewArray(arrayLength, -1000, 1000)
        );
    }

    return allTestingArrays;
}

function getJavascriptSortedArray(array) {
    return array.sort((a, b) => a - b);
}

export function testSortFunction(sortFunction) {
  const allTestingArrays = generateTestingArrays();

  for (let i = 0; i < allTestingArrays.length; i++) {
    const javaScriptSortedArray = getJavascriptSortedArray(allTestingArrays[i].slice());
    const [sortedArray, _] = sortFunction(allTestingArrays[i].slice());
    console.assert(arraysAreEqual(javaScriptSortedArray, sortedArray) === true, `Expected arraysAreEqual() to return True for ${sortFunction.name}`);
  }

  console.log(`* * * ${sortFunction.name} test complete! * * *`);
}
