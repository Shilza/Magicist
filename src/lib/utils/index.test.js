import {PubSub} from './PubSub';
import {DeepProxy} from './DeepProxy';
import {onlyData} from './onlyData';
import {createDeepSetProxy} from './createDeepSetProxy';


describe('utils index', () => {
    it('should import PubSub', () => {
        expect(PubSub).toBeTruthy();
    });

    it('should import DeepProxy', () => {
        expect(DeepProxy).toBeTruthy();
    });

    it('should import onlyData', () => {
        expect(onlyData).toBeTruthy();
    });

    it('should import createDeepSetProxy', () => {
        expect(createDeepSetProxy).toBeTruthy();
    });
});