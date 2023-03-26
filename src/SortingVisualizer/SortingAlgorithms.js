/*
 * Divide-and-conquer algorithm.
 * Partitions array into two sub-arrays.
 * Then recursively sorts & merges sub-arrays.
 * 
 * Visualize this execution: https://pythontutor.com/visualize.html#code=function%20quickSort%28array%20%3D%20%5B%5D,%20animations%20%3D%20%5B%5D,%20%20startIdx%20%3D%200,%20endIdx%20%3D%20array.length%20-%201%29%20%7B%0A%20%20%20%20//%20Track%20indices%20for%20visualizer%0A%20%20%20%20animations.push%28%5Btrue,%20startIdx,%20endIdx%5D%29%3B%0A%20%20%20%20%0A%20%20%20%20//%20Base%20case%20-%20array%20is%20empty%20or%20one%20element%0A%20%20%20%20if%20%28startIdx%20%3E%3D%20endIdx%29%20%7B%0A%20%20%20%20%20%20%20%20return%20array%3B%0A%20%20%20%20%7D%0A%0A%20%20%20%20//%20Establish%20pointers%0A%20%20%20%20let%20leftIdx%20%3D%20startIdx%3B%0A%20%20%20%20let%20rightIdx%20%3D%20endIdx%3B%0A%0A%20%20%20%20//%20Select%20a%20pivot%20value%0A%20%20%20%20const%20pivotIdx%20%3D%20Math.floor%28%28leftIdx%20%2B%20rightIdx%29%20/%202%29%3B%0A%20%20%20%20const%20pivotValue%20%3D%20array%5BpivotIdx%5D%3B%0A%0A%20%20%20%20//%20Partition%20%26%20sort%20sub-arrays%0A%20%20%20%20while%20%28leftIdx%20%3C%3D%20rightIdx%29%20%7B%0A%20%20%20%20%20%20%20%20//%20Increment%20leftIdx%20until%20we%20find%20the%20array%20value%20that%20is%20greater%20than%20the%20pivot%20value%0A%20%20%20%20%20%20%20%20while%20%28array%5BleftIdx%5D%20%3C%20pivotValue%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20animations.push%28%5Btrue,%20leftIdx,%20pivotIdx%5D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20//%20Move%20pointer%20to%20reduce%20array,%20i.e.%20to%20make%20progress%20towards%20base%20case%0A%20%20%20%20%20%20%20%20%20%20%20%20leftIdx%2B%2B%3B%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20//%20Decrement%20rightIdx%20until%20we%20find%20the%20array%20value%20that%20is%20less%20than%20the%20pivot%20value%0A%20%20%20%20%20%20%20%20while%20%28array%5BrightIdx%5D%20%3E%20pivotValue%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20animations.push%28%5Btrue,%20rightIdx,%20pivotIdx%5D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20//%20Move%20pointer%20to%20reduce%20array,%20i.e.%20to%20make%20progress%20towards%20base%20case%0A%20%20%20%20%20%20%20%20%20%20%20%20rightIdx--%3B%0A%20%20%20%20%20%20%20%20%7D%0A%0A%20%20%20%20%20%20%20%20//%20Once%20we've%20found%20the%20array%20value%20at%20leftIdx%20that%20is%20greater%20than%20our%20pivot%20value,%0A%20%20%20%20%20%20%20%20//%20and%20the%20array%20value%20at%20rightIdx%20that%20is%20less%20than%20our%20pivot%20value,%0A%20%20%20%20%20%20%20%20//%20we%20swap%20the%20array%20values%0A%20%20%20%20%20%20%20%20if%20%28leftIdx%20%3C%3D%20rightIdx%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20animations.push%28%5Bfalse,%20leftIdx,%20rightIdx%5D%29%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20//%20Swap%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20temp%20%3D%20array%5BleftIdx%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20array%5BleftIdx%5D%20%3D%20array%5BrightIdx%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20array%5BrightIdx%5D%20%3D%20temp%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20//%20Increment%20%26%20decrement%20pointers%20reduce%20array,%20i.e.%20to%20make%20progress%20towards%20base%20case%0A%20%20%20%20%20%20%20%20%20%20%20%20leftIdx%2B%2B%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20rightIdx--%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%0A%20%20%20%20//%20Recurse%0A%20%20%20%20quickSort%28array,%20animations,%20startIdx,%20rightIdx%29%3B%0A%20%20%20%20quickSort%28array,%20animations,%20leftIdx,%20endIdx%29%3B%0A%0A%20%20%20%20return%20%5Barray,%20animations%5D%3B%0A%7D%0A%0Aconsole.log%28quickSort%28%5B1,%204,%206,%208,%203%5D%29%29%3B&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=js&rawInputLstJSON=%5B%5D&textReferences=false
 * Other popular partitioning schemes: Lomuto, Hoare, randomized, median-of-three
*/
function quickSort(array = [], animations = [],  startIdx = 0, endIdx = array.length - 1) {
    // Track indices for visualizer
    animations.push([true, startIdx, endIdx]);
    
    // Base case - array is already sorted
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
            // Increment & decrement pointers to reduce array, i.e. to make progress towards base case
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