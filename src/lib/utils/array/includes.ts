import {equals} from "./equals";

/**
 * Function thar checks if the array contains another array
 * @param arr {Array}
 * @param arr2 {Array}
 */
export const includes = (arr: Array<any>, arr2: Array<any>) => arr.some(item => equals(item, arr2));