import {model} from "./store";

describe('Store\'s model', () => {
    it('should increment count', () => {
        const localModel = {...model};
        localModel.increment();
        expect(localModel.count).toBe(1);
    });

    it('should decrement count', () => {
        const localModel = {...model};
        localModel.decrement();
        expect(localModel.count).toBe(-1);
    });

    it('should reset count', () => {
        const localModel = {...model};
        localModel.increment();
        localModel.increment();
        expect(localModel.count).toBe(2);

        localModel.reset();
        expect(localModel.count).toBe(0);
    });
});