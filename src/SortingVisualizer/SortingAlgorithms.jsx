/*
 * Divide-and-conquer algorithm.
 * Partitions array into two sub-arrays.
 * Then recursively sorts & merges sub-arrays.
 * 
 * Popular partitioning schemes: Lomuto, Hoare, randomized, median-of-three
*/
function quickSort(array, startIdx = 0, endIdx = array.length - 1) {
    // Base case - array is empty or one element,
    if (startIdx >= endIdx) {
        return array;
    }

    // Establish pointers
    let leftIdx = startIdx;
    let rightIdx = endIdx;

    // Select a pivot value
    const pivotValue = array[Math.floor((leftIdx + rightIdx) / 2)];

    // Partition & sort sub-arrays
    while (leftIdx <= rightIdx) {
        // Increment leftIdx until we find the array value that is greater than the pivot value
        while (array[leftIdx] < pivotValue) {
            leftIdx++;
        }
        // Decrement rightIdx until we find the array value that is less than the pivot value
        while (array[rightIdx] > pivotValue) {
            rightIdx--;
        }
        // Once we've found the array value at leftIdx that is greater than our pivot value,
        // and the array value at rightIdx that is less than our pivot value,
        // we swap the array values
        if (leftIdx <= rightIdx) {
            const temp = array[leftIdx]
            array[leftIdx] = array[rightIdx];
            array[rightIdx] = temp;
            // Increment & decrement pointers to make progress towards base case
            leftIdx++;
            rightIdx--;
        }
    }

    // Recurse
    quickSort(array, startIdx, rightIdx);
    quickSort(array, leftIdx, endIdx);
    return array;
}
  
export default quickSort
