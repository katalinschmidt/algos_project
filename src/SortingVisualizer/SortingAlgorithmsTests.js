import { quickSort, mergeSort } from './SortingAlgorithms.js';
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

export function testQuickSort() {
    const allTestingArrays = generateTestingArrays();

    for (let i = 0; i < allTestingArrays.length; i++) {
        const javaScriptSortedArray = getJavascriptSortedArray(allTestingArrays[i].slice());
        const [quickSortedArray, _] = quickSort(allTestingArrays[i].slice());
        console.assert(arraysAreEqual(javaScriptSortedArray, quickSortedArray) === true, "Expected arraysAreEqual() to return True for quickSort");  
    }

    console.log("* * * Quick sort test complete! * * *");
}

export function testMergeSort() {
    const allTestingArrays = generateTestingArrays();

    for (let i = 0; i < allTestingArrays.length; i++) {
        const javaScriptSortedArray =  getJavascriptSortedArray(allTestingArrays[i].slice());
        const [mergeSortedArray, _] = mergeSort(allTestingArrays[i].slice());
        console.assert(arraysAreEqual(javaScriptSortedArray, mergeSortedArray) === true, "Expected arraysAreEqual() to return True for mergeSort");  
    }

    console.log("* * * Merge sort test complete! * * *");
}
