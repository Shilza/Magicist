import {includes} from './includes';

describe('includes', () => {
    it('should includes', () => {
        const arr1 = [1, 2, [3, 4]];
        const arr2 = [3, 4];
        expect(includes(arr1, arr2));
    });
});