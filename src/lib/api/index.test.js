import {createStore} from './createStore';
import {useStore} from './useStore';

describe('api index', () => {
    it('should import useStore', () => {
        expect(useStore).toBeTruthy();
    });

    it('should import createStore', () => {
        expect(createStore).toBeTruthy();
    });
});