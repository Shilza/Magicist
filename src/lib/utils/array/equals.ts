/**
 * Function that checks arrays for equality
 * @param firstArray {Array}
 * @param secondArray {Array}
 */
export function equals (firstArray: Array<any>, secondArray: Array<any>) {
    if (!Array.isArray(firstArray) || !Array.isArray(secondArray))
        return false;

    // compare lengths - can save a lot of time
    if (firstArray.length !== secondArray.length)
        return false;

    for (let i = 0, l = secondArray.length; i < l; i++) {
        // Check if we have nested arrays
        if (secondArray[i] instanceof Array && firstArray[i] instanceof Array) {
            // recurse into the nested arrays
            if (!equals(firstArray[i], secondArray[i]))
                return false;
        }
        else if (secondArray[i] !== firstArray[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}