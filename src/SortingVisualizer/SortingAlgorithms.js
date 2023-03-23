/*
 * Divide-and-conquer algorithm.
 * Partitions array into two sub-arrays.
 * Then recursively sorts & merges sub-arrays.
 * 
 * Popular partitioning schemes: Lomuto, Hoare, randomized, median-of-three
*/
function quickSort(array = [], animations = [],  startIdx = 0, endIdx = array.length - 1) {
    // Track indices for visualizer
    animations.push([true, startIdx, endIdx]);
    
    // Base case - array is empty or one element
    if (startIdx >= endIdx) {
        return array;
    }

    // Establish pointers
    let leftIdx = startIdx;
    let rightIdx = endIdx;

    // Select a pivot value
    const pivotIdx = Math.floor((leftIdx + rightIdx) / 2);
    const pivotValue = array[pivotIdx];

    // Partition & sort sub-arrays
    while (leftIdx <= rightIdx) {
        // Increment leftIdx until we find the array value that is greater than the pivot value
        while (array[leftIdx] < pivotValue) {
            animations.push([true, leftIdx, pivotIdx]);
            // Move pointer to reduce array, i.e. to make progress towards base case
            leftIdx++;
        }

        // Decrement rightIdx until we find the array value that is less than the pivot value
        while (array[rightIdx] > pivotValue) {
            animations.push([true, rightIdx, pivotIdx]);
            // Move pointer to reduce array, i.e. to make progress towards base case
            rightIdx--;
        }

        // Once we've found the array value at leftIdx that is greater than our pivot value,
        // and the array value at rightIdx that is less than our pivot value,
        // we swap the array values
        if (leftIdx <= rightIdx) {
            animations.push([false, leftIdx, rightIdx]);
            // Swap
            const temp = array[leftIdx];
            array[leftIdx] = array[rightIdx];
            array[rightIdx] = temp;
            // Increment & decrement pointers reduce array, i.e. to make progress towards base case
            leftIdx++;
            rightIdx--;
        }
    }

    // Recurse
    quickSort(array, animations, startIdx, rightIdx);
    quickSort(array, animations, leftIdx, endIdx);

    return [array, animations];
}

export default quickSort;