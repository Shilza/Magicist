import {equals} from "./equals";

describe('equals', () => {
    it('should return false(first param is not array)', () => {
        expect(equals('', [])).toBeFalsy();
    });

    it('should return false(second param is not array)', () => {
        expect(equals([], '')).toBeFalsy();
    });

    it('should return false' ,() => {
        expect(equals([1,2], [2,1])).toBeFalsy();
    });

    it('should return false(objects comparison)' ,() => {
        expect(equals([1,{x: 20}], [1, {x: 20}])).toBeFalsy();
    });

    it('should return false(length of the arrays is not the same)' ,() => {
        expect(equals([1, 2], [1, 2, 3])).toBeFalsy();
    });

    it('should return false(nested arrays is not the same)' ,() => {
        expect(equals([1, [1, 2]], [1, [2, 3]])).toBeFalsy();
    });

    it('should return true(nested arrays is the same)' ,() => {
        expect(equals([1, [1, 2]], [1, [1, 2]])).toBeTruthy();
    });

    it('should return true' ,() => {
        expect(equals([1, 2], [1, 2])).toBeTruthy();
    });
});