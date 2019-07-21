/**
 * Function that creates copy of object and let of object's data
 * @param object {Object}
 */
export const onlyData = (object: Object) => JSON.parse(JSON.stringify(object));