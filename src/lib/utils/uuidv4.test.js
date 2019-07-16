import {uuidv4} from "./uuidv4";

describe('uuidv4', () => {
    it('should generate 36 symbols', () => {
        expect(uuidv4().length).toBe(36);
    });

    it('should generate unique ids', () => {
        const firstId = uuidv4();
        const secondId = uuidv4();
        expect(firstId).not.toBe(secondId);
    });
});