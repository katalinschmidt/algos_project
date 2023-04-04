const animationInfo = {
    isCompare: false,
    isIdx: false,
    barOneIdx: null,
    barTwoIdx: null,
    logMessage: ""
}

/*
 * Divide-and-conquer algorithm.
 * Partitions array into two sub-arrays & recursively sorts in-place. 
 * Other popular partitioning schemes: Lomuto, Hoare, randomized, median-of-three
*/
export function quickSort(array = [], animations = [],  startIdx = 0, endIdx = array.length - 1) {
    // Track for visualizer
    animations.push({
      isCompare: true,
      isIdx: true,
      barOneIdx: startIdx,
      barTwoIdx: endIdx,
      logMessage: `Comparing indices ${startIdx} >= ${endIdx}\n`
    });

    // Base case - array is already sorted
    if (startIdx >= endIdx) {
        return [array, animations];
    }

    // Establish pointers
    let leftIdx = startIdx;
    let rightIdx = endIdx;

    // Select a pivot value
    const pivotIdx = Math.floor((leftIdx + rightIdx) / 2);
    const pivotValue = array[pivotIdx];

    // Partition & sort sub-arrays
    animations.push({
      isCompare: true,
      isIdx: true,
      barOneIdx: leftIdx,
      barTwoIdx: rightIdx,
      logMessage: `Comparing indices ${leftIdx} <= ${rightIdx}\n`
    });
    while (leftIdx <= rightIdx) {
        // Increment leftIdx until we find the array value that is greater than the pivot value
        animations.push({
          isCompare: true,
          isIdx: false,
          barOneIdx: leftIdx,
          barTwoIdx: pivotIdx,
          logMessage: `Comparing bar values ${array[leftIdx]} < ${pivotValue}\n`
        });
        while (array[leftIdx] < pivotValue) {
            // Move pointer to reduce array, i.e. to make progress towards base case
            leftIdx++;
            animations.push({
              isCompare: true,
              isIdx: true,
              barOneIdx: leftIdx,
              barTwoIdx: pivotIdx,
              logMessage: `Incremented left pointer\nRecomparing bar values ${array[leftIdx]} < ${pivotValue}\n`
            });
        }

        // Decrement rightIdx until we find the array value that is less than the pivot value
        animations.push({
          isCompare: true,
          isIdx: true,
          barOneIdx: rightIdx,
          barTwoIdx: pivotIdx,
          logMessage: `Comparing bar values ${array[rightIdx]} > ${pivotValue}`
        });
        while (array[rightIdx] > pivotValue) {
            // Move pointer to reduce array, i.e. to make progress towards base case
            rightIdx--;
            animations.push({
              isCompare: true,
              isIdx: true,
              barOneIdx: rightIdx,
              barTwoIdx: pivotIdx,
              logMessage: `Decremented right pointer\nRecomparing bar values ${array[rightIdx]} > ${pivotValue}`
            });
        }

        // Once we've found the array value at leftIdx that is greater than our pivot value,
        // and the array value at rightIdx that is less than our pivot value,
        // we swap the array values
        animations.push({
          isCompare: true,
          isIdx: true,
          barOneIdx: leftIdx,
          barTwoIdx: rightIdx,
          logMessage: `Comparing indices ${leftIdx} <= ${rightIdx}\n`
        });
        if (leftIdx <= rightIdx) {
            animations.push({
              isCompare: false,
              isIdx: false,
              barOneIdx: leftIdx,
              barTwoIdx: rightIdx,
              logMessage: `Swapping values ${array[leftIdx]} <-> ${array[rightIdx]}\n`
            });
            // Swap
            const temp = array[leftIdx];
            array[leftIdx] = array[rightIdx];
            array[rightIdx] = temp;
            // Increment & decrement pointers to reduce array, i.e. to make progress towards base case
            leftIdx++;
            rightIdx--;
            animations.push({
              isCompare: true,
              isIdx: true,
              barOneIdx: leftIdx,
              barTwoIdx: rightIdx,
              logMessage: `Incremented left pointer & decremented right pointer\nRecomparing indices ${leftIdx} <= ${rightIdx}\n`
            });
        }
    }

    // Recursively sort left & right half
    quickSort(array, animations, startIdx, rightIdx);
    quickSort(array, animations, leftIdx, endIdx);

    return [array, animations];
}


export function mergeSort(array = [], animations = [], startIdx = 0, endIdx = array.length - 1) {
    // Base case - array is already sorted
    if (startIdx >= endIdx) {
        return [array, animations];
    }
    
    // Divide the array into two halves
    const middleIdx = Math.floor((startIdx + endIdx) / 2);

    // Recursively sort left & right half
    mergeSort(array, animations, startIdx, middleIdx);
    mergeSort(array, animations, middleIdx + 1, endIdx);
    
    // Check if the two halves are sorted
    // If the last element of the left half is less than or equal to the first element of the right half, it is sorted    
    if (array[middleIdx] <= array[middleIdx + 1]) {
        return [array, animations];
    }
    
    // Merge the two sorted halves back together
    merge(array, animations, startIdx, middleIdx, endIdx);
    
    return [array, animations];
}


function merge(array, animations, startIdx, middleIdx, endIdx) {
    let tempArray = [];
    
    let leftIdx = startIdx;
    let rightIdx = middleIdx + 1;

    // Compare the first elements of each array and push the smaller one to the result array
    while (leftIdx <= middleIdx && rightIdx <= endIdx) {
        if (array[leftIdx] < array[rightIdx]) {
            tempArray.push(array[leftIdx]);
            leftIdx++;
        } 
        else {
            tempArray.push(array[rightIdx]);
            rightIdx++;
        }
    }

    // Add remaining elements from the left array to the temp array
    while (leftIdx <= middleIdx) {
        tempArray.push(array[leftIdx]);
        leftIdx++;
    }
    
    // Add remaining elements from the right array to the temp array
    while (rightIdx <= endIdx) {
        tempArray.push(array[rightIdx]);
        rightIdx++;
    }

    // Copy the temp array back to the original array
    for (let i = startIdx; i <= endIdx; i++) {
        array[i] = tempArray[i - startIdx];
    }
}


export function bubbleSort(array = [], animations = [], startIdx = 0, endIdx = array.length - 1) {

}